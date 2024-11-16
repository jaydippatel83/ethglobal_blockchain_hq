import { collection, query, where, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export const fetchUserQuestions = async (userId) => {
    try {
        const questionsRef = collection(db, "questions");
        const userQuestionsQuery = query(questionsRef, where("authorId", "==", userId));
        const querySnapshot = await getDocs(userQuestionsQuery);

        const questions = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return questions;
    } catch (error) {
        console.error("Error fetching user questions:", error.message);
        throw error;
    }
};

export const fetchUserAnswers = async (userId) => {
    try {
        const answersRef = collection(db, "answers");
        const userAnswersQuery = query(answersRef, where("authorId", "==", userId));
        const querySnapshot = await getDocs(userAnswersQuery);

        const answers = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return answers;
    } catch (error) {
        console.error("Error fetching user answers:", error.message);
        throw error;
    }
};

export const updateUserProfile = async (userId, profileData) => {
    try {
        const userDocRef = doc(db, "users", userId);
        await updateDoc(userDocRef, profileData);

        return { message: "User profile updated successfully", profileData };
    } catch (error) {
        console.error("Error updating user profile:", error.message);
        throw error;
    }
};

export const getUserData = async (wallet) => {
    try {
        const usersRef = collection(db, "users");
        const userQuery = query(usersRef, where("wallet", "==", wallet));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            return { id: userDoc.id, ...userDoc.data() };
        } else {
            console.error("No user found with the provided wallet address");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user data by wallet:", error.message);
        throw error;
    }
};
export const getUserById = async (userId) => {
    try {
        const userDocRef = doc(db, "users", userId);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
            return { id: userId, ...userSnapshot.data() };
        } else {
            console.error("No user found with the provided ID");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user data by ID:", error.message);
        throw error;
    }
};

export const getQandAbyUserId = async (userId) => {
    try {
        const questions = await fetchUserQuestions(userId);
        const answers = await fetchUserAnswers(userId);

        return { questions, answers };
    } catch (error) {
        console.error("Error fetching Q&A by user ID:", error.message);
        throw error;
    }
};