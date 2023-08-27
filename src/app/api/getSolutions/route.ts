import { db } from '@/lib/db'
import { generateHtml } from "@/layouts/editor/utils/generateHtml"
import parse from 'html-react-parser';
import { JSDOM } from "jsdom";
import type { EditorDocument } from './types';
import { getAuthSession } from '@/lib/auth'

export async function GET(req: Request) {
    const url = new URL(req.url)
    const problemId = Number(url.searchParams.get('problemId'))
    const page = Number(url.searchParams.get('page'))
    const sortBy = url.searchParams.get('sortBy')
    const session = await getAuthSession()


    if (!problemId) return new Response('Invalid query', { status: 400 })
    try {
        let results = null
        if (sortBy === 'likes') {
            results = await db.submissions.findMany({
                where: {
                    problemId,
                    isPublic: true
                },
                include: {
                    user: true,
                    votes: true,
                    comments: true,
                },
                
                orderBy: {
                    votes: {
                      _count: 'desc',
                    },
                  },
                
                take: 5,
                skip: (page - 1) * 5
            })
        }
        else {
            results = await db.submissions.findMany({
                orderBy: {
                    createdAt: 'desc',
                },
                where: {
                    problemId,
                    isPublic: true
                },
                include: {
                    user: true,
                    votes: true,
                    comments: true
                },
                take: 5,
                skip: (page - 1) * 5
            })
        }

        if (!results) return new Response('No results', { status: 401 })

        // let likeStatus = null
        // if (!session?.user.id){
        //     likeStatus = await db.vote.findFirst({
        //         where: {
        //             SubmissionId,
        //             userId: session?.user.id
        //         },
        //     })
        // }

        const dom = new JSDOM()
        global.window = dom.window as unknown as Window & typeof globalThis
        global.document = dom.window.document
        global.DocumentFragment = dom.window.DocumentFragment
        global.Element = dom.window.Element
        global.navigator = dom.window.navigator

        let newResults: { [key: string]: any } = results
        for (let i = 0; i < results.length; i++) {
            // parse the json content to html to display the answer
            const document = results[i].content
            const documentt = { id: '1', data: document } as unknown as EditorDocument
            const htmlData = await generateHtml(documentt.data);
            newResults[i].html = htmlData

            //check if the user has already like the submission
            const flag = newResults[i].votes.some((obj: { userId: string | undefined; }) => obj.userId === session?.user.id);
            newResults[i].likeStatus = flag
        }
        return new Response(JSON.stringify(newResults))
    }
    catch (error) {
        return new Response('Could not fetch posts', { status: 500 })
    }
}
