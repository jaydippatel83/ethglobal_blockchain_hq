 
import { fetchAnswersByAuthor } from "@/lib/answer";
import { fetchQuestionsByAuthor } from "@/lib/questions"; 
import { NextResponse } from "next/server";

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams;
    const authorId = searchParams.get("authorId");
    const page = parseInt(searchParams.get("page"), 10) || 1;

    try { 
        const [questions, answers] = await Promise.all([
            fetchQuestionsByAuthor(authorId, page),  
            fetchAnswersByAuthor(authorId, page) 
        ]);  
        return NextResponse.json({ questions, answers }, { status: 200 });
    } catch (error) { 
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
} 