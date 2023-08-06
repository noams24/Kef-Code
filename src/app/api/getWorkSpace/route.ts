import { db } from '@/lib/db'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GET(req: Request) {
    const url = new URL(req.url)
    const problemId = url.searchParams.get('problemId')
    const userId = url.searchParams.get('userId')
    if (!problemId) return new Response('Invalid query', { status: 400 })
    try {
        let result = null
        if (userId) {
            result = await prisma.$queryRaw`SELECT * FROM User`
        }
        else {
            result = null
        }

        return new Response(JSON.stringify(result))
    }
    catch (error) {
        return new Response('Could not get data', { status: 500 })
    }
}
