import { fetchAllQuestions, fetchQuestionsByAuthor } from "@/lib/questions";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    const searchParams = req.nextUrl.searchParams;
    const wallet = searchParams.get("wallet");
    const page = parseInt(searchParams.get("page"), 10) || 1;  

    let data;
    try {
        if (wallet) {
            data = await fetchQuestionsByAuthor(wallet, page);  
        } else {
            data = await fetchAllQuestions(page);  
        }

        return NextResponse.json({ questions: data.questions, pageInfo: data.pageInfo }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
