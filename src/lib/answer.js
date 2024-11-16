import { collection, query, where, getDocs, limit, startAfter, orderBy ,serverTimestamp, addDoc, doc, updateDoc, deleteDoc} from "firebase/firestore";
import { db } from "./firebase";

export async function fetchAnswersByQuestionId(questionId, page = 1, pageSize = 10, lastVisible = null) {
    try {
        const answersRef = collection(db, "answers");

        let answersQuery = query(
            answersRef,
            where("questionId", "==", questionId),
            orderBy("createdAt", "desc"),
            limit(pageSize)
        );

        if (lastVisible) {
            answersQuery = query(
                answersRef,
                where("questionId", "==", questionId),
                orderBy("createdAt", "desc"),
                startAfter(lastVisible),
                limit(pageSize)
            );
        }

        const querySnapshot = await getDocs(answersQuery);
        const answers = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

        return {
            answers,
            pageInfo: {
                currentPage: page,
                hasMore: querySnapshot.size === pageSize,
                lastVisible: lastDoc,
            },
        };
    } catch (error) {
        console.error(`Failed to fetch answers for question ID ${questionId}:`, error.message);
        throw error;
    }
}
export async function fetchAnswersByAuthor(authorId, page = 1, pageSize = 10, lastVisible = null) {
    try {
        const answersRef = collection(db, "answers");

        let authorQuery = query(
            answersRef,
            where("authorId", "==", authorId),
            orderBy("createdAt", "desc"),
            limit(pageSize)
        );

        if (lastVisible) {
            authorQuery = query(
                answersRef,
                where("authorId", "==", authorId),
                orderBy("createdAt", "desc"),
                startAfter(lastVisible),
                limit(pageSize)
            );
        }

        const querySnapshot = await getDocs(authorQuery);
        const answers = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

        return {
            answers,
            pageInfo: {
                currentPage: page,
                hasMore: querySnapshot.size === pageSize,
                lastVisible: lastDoc,
            },
        };
    } catch (error) {
        console.error("Error fetching answers by author:", error.message);
        throw error;
    }
} 

export async function addAnswer(questionId, content, authorId) {
    try {
        const answersRef = collection(db, "answers");

        const newAnswer = {
            questionId,
            content,
            authorId,
            createdAt: serverTimestamp(),
        };

        const docRef = await addDoc(answersRef, newAnswer);
        return {
            id: docRef.id,
            ...newAnswer,
        };
    } catch (error) {
        console.error("Error adding answer:", error.message);
        throw error;
    }
} 

export async function editAnswer(answerId, content) {
    try {
        const answerRef = doc(db, "answers", answerId);

        await updateDoc(answerRef, {
            content,
            updatedAt: serverTimestamp(),
        });

        return { message: "Answer updated successfully" };
    } catch (error) {
        console.error("Error editing answer:", error.message);
        throw error;
    }
} 

export async function deleteAnswer(answerId) {
    try {
        const answerRef = doc(db, "answers", answerId);

        await deleteDoc(answerRef);

        return { message: "Answer deleted successfully" };
    } catch (error) {
        console.error("Error deleting answer:", error.message);
        throw error;
    }
}
