import { db } from '@/lib/db'
import { generateHtml } from "@/layouts/editor/utils/generateHtml"
import parse from 'html-react-parser';
import { JSDOM } from "jsdom";
import type { EditorDocument } from './types';

// import type { EditorDocument } from './types';

import "mathlive/static.css";
import '@/layouts/editor/theme.css';
//TODO: handle problem status by user

export async function GET(req: Request) {
    const url = new URL(req.url)
    const problemId = Number(url.searchParams.get('problemId'))
    const page = Number(url.searchParams.get('page'))
    if (!problemId) return new Response('Invalid query', { status: 400 })
    try {
        const results = await db.submissions.findMany({
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

        if (!results) return new Response('No results', { status: 401 })

        const dom = new JSDOM()
        global.window = dom.window as unknown as Window & typeof globalThis
        global.document = dom.window.document
        global.DocumentFragment = dom.window.DocumentFragment
        global.Element = dom.window.Element
        global.navigator = dom.window.navigator

        let newResults: { [key: string]: any } = results
        for (let i = 0; i < results.length; i++) {
            const document = results[i].content
            const documentt = {id:'1', data:document} as unknown as EditorDocument
            const htmlData = await generateHtml(documentt.data);
            newResults[i].html = htmlData
        }
        return new Response(JSON.stringify(newResults))
    }
    catch (error) {
        return new Response('Could not fetch posts', { status: 500 })
    }
}
