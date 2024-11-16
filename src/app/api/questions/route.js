import { fetchAllQuestions, fetchQuestionsByAuthor } from "@/lib/questions";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    const searchParams = req.nextUrl.searchParams;
    const authorId = searchParams.get("authorId");
    const page = parseInt(searchParams.get("page"), 10) || 1;  

    let data;
    try {
        if (authorId) {
            data = await fetchQuestionsByAuthor(authorId, page);  
        } else {
            data = await fetchAllQuestions(page);  
        }

        return NextResponse.json({ questions: data.questions, pageInfo: data.pageInfo }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
