import { fetchAnswersByQuestionId } from "@/lib/answer"; 
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { questionId } = params;  
    const page = req.nextUrl.searchParams.get('page') || 1;
    const limit = req.nextUrl.searchParams.get('limit') || 10;

    try {
        const answers = await fetchAnswersByQuestionId(questionId, page, limit);  
        const data = answers.data;
        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error('Error fetching answers:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}