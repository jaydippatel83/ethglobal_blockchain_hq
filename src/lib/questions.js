import { collection, query, getDocs, limit, orderBy, startAfter, serverTimestamp, doc, updateDoc, where, addDoc } from "firebase/firestore";
import { cache } from "react";
import { db } from "./firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export const getQuestionsList = async (page = 1, pageSize = 12, lastVisible = null) => {
    try {
        // Reference the "questions" collection
        const questionsRef = collection(db, "questions");

        // Build Firestore query
        let questionsQuery = query(
            questionsRef,
            orderBy("createdAt", "desc"), // Order by creation date
            limit(pageSize) // Limit results to pageSize
        );

        // Add pagination with `startAfter` if `lastVisible` exists
        if (lastVisible) {
            questionsQuery = query(
                questionsRef,
                orderBy("createdAt", "desc"),
                startAfter(lastVisible), // Start after the last visible document
                limit(pageSize)
            );
        }

        // Fetch documents from Firestore
        const querySnapshot = await getDocs(questionsQuery);

        // Map Firestore documents to a questions array
        const questions = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        // Capture the last visible document for pagination
        const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

        // Return questions and page information
        return {
            questions,
            pageInfo: {
                totalPages: null, // Firestore does not provide total pages directly
                currentPage: page,
                totalCount: questions.length, // Use the length of fetched questions
                lastVisible: lastDoc, // For the next query's pagination
            },
        };
    } catch (err) {
        console.error(err, "Error fetching questions from Firestore");
        return {
            questions: [],
            pageInfo: {
                totalPages: 0,
                currentPage: page,
                totalCount: 0,
            },
        };
    }
};
// get all active questions
export async function fetchAllQuestions(page = 1, pageSize = 12, lastVisible = null) {
    try { 
        const questionsRef = collection(db, "questions");

        // Build the query with pagination
        let questionsQuery = query(
            questionsRef,
            orderBy("createdAt", "desc"),  
            limit(pageSize)  
        );

        // Apply pagination using startAfter
        if (lastVisible) {
            questionsQuery = query(
                questionsRef,
                orderBy("createdAt", "desc"),
                startAfter(lastVisible), // Start after the last document from the previous query
                limit(pageSize)
            );
        }

        // Execute the query
        const querySnapshot = await getDocs(questionsQuery);

        // Extract questions data and the last visible document for pagination
        const questions = [];
        querySnapshot.forEach((doc) => {
            questions.push({ id: doc.id, ...doc.data() });
        }); 
        return {
            questions 
        };

    } catch (error) {
        console.error("Error fetching questions from Firestore:", error.message);
        throw error;
    }
}

export async function fetchQuestionsByAuthor(wallet, page = 1, pageSize = 12, lastVisible = null) {
    try {
        // Reference the Firestore "questions" collection
        const questionsRef = collection(db, "questions");

        // Build query to filter by authorId
        let questionsQuery = query(
            questionsRef,
            where("wallet", "==", wallet), // Filter by authorId
            orderBy("createdAt", "desc"), // Order by creation date
            limit(pageSize) // Limit results to pageSize
        );

        // Apply pagination using startAfter
        if (lastVisible) {
            questionsQuery = query(
                questionsRef,
                where("wallet", "==", wallet),
                orderBy("createdAt", "desc"),
                startAfter(lastVisible), // Start after the last document from the previous query
                limit(pageSize)
            );
        }

        // Execute the query
        const querySnapshot = await getDocs(questionsQuery);

        // Extract questions data and the last visible document for pagination
        const questions = [];
        querySnapshot.forEach((doc) => {
            questions.push({ id: doc.id, ...doc.data() });
        });

        const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

        // Return questions and pagination info
        return {
            questions,
            pageInfo: {
                lastVisible: lastDoc, // Store the last document for the next query
                hasMore: querySnapshot.size === pageSize, // Check if there are more pages
                currentPage: page,
                totalCount: questions.length, // Count of current questions fetched
            },
        };

    } catch (error) {
        console.error("Error fetching questions by author from Firestore:", error.message);
        throw error;
    }
}

// get question data by id
export async function fetchQuestionById(id, slug) {
    try {
        // Reference the document in Firestore
        const questionDocRef = doc(db, "questions", id);

        // Fetch the document
        const questionSnapshot = await getDoc(questionDocRef);

        // Check if the document exists
        if (!questionSnapshot.exists()) {
            throw new Error(`Question with id ${id} not found.`);
        }

        // Get the document data
        const questionData = questionSnapshot.data();

        // Optionally, verify the slug
        if (questionData.slug !== slug) {
            throw new Error(`Slug mismatch for question with id ${id}.`);
        }

        // Return the question data
        return { id, ...questionData };
    } catch (error) {
        console.error("Error fetching question from Firestore:", error.message);
        throw error;
    }
}

export async function addQuestion(questionData) {
    try {
         
        // Reference the "questions" collection in Firestore
        const questionsRef = collection(db, "questions");

        // Add a new document with question data
        const newQuestion = {
            ...questionData,
            createdAt: serverTimestamp(), // Add a timestamp for when the question is created
        };

        const docRef = await addDoc(questionsRef, newQuestion);

        return {
            message: "Question added successfully",
            questionId: docRef.id,
        };
    } catch (error) {
        console.error("Error adding question to Firestore:", error.message);
        throw error;
    }
}

export const uploadQuestionImage = async (file) => {
    if (!file) {
        console.error("No file selected");
        return;
    }

    try {
        // Initialize Firebase Storage
        const storage = getStorage();

        // Create a unique file name using UUID
        const uniqueFileName = `${uuidv4()}_${file.name}`;

        // Create a storage reference
        const storageRef = ref(storage, `questions/${uniqueFileName}`);

        // Start the file upload
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Wait for the upload to complete
        await new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Optional: Track upload progress
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    console.error("Error during upload:", error);
                    reject(error);
                },
                () => {
                    resolve();
                }
            );
        });

        // Get the file's download URL
        const downloadURL = await getDownloadURL(storageRef);

        console.log("File uploaded successfully. URL:", downloadURL);

        return downloadURL;
    } catch (error) {
        console.error("Error uploading file:", error.message);
        throw error;
    }
};
// edite question
export async function updateQuestion(questionId, updateData, accessToken) {
    try {
        

        // Reference to the Firestore document
        const questionDocRef = doc(db, "questions", questionId);

        // Update the document in Firestore
        await updateDoc(questionDocRef, updateData);

        return {
            message: "Question updated successfully",
            updatedData: updateData,
        };
    } catch (error) {
        console.error("Failed to update the question in Firestore:", error.message);
        throw error;
    }
}
// delete question
export async function softDeleteQuestion(questionId) {
    try {
         
        // Reference to the Firestore document
        const questionDocRef = doc(db, "questions", questionId);

        // Update the `isDeleted` field to `true` to mark it as deleted
        await updateDoc(questionDocRef, { isDeleted: true });

        return {
            message: "Question soft-deleted successfully",
            questionId,
        };
    } catch (error) {
        console.error("Failed to soft-delete the question in Firestore:", error.message);
        throw error;
    }
}
export const calculateTimeDifference = (createdAt) => {
    const now = new Date();
    const createdAtDate = new Date(createdAt);
    const diffInMilliseconds = now - createdAtDate;
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else {
        return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
};


