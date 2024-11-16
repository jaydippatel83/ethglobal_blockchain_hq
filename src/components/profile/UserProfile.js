'use client';
import React, { useEffect, useState } from 'react'; 
import { toast } from 'react-toastify';
import ProfileInfo from './ProfileInfoFor';
import QuestionList from './QuestionList';
import AnswerList from './AnswerList';     
import SkeletonLoader from './SkeletonLoader';
import EditProfileModal from './EditProfileModal';
import { useAccount } from 'wagmi';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const UserProfile = () => {
    const { address, isConnected} = useAccount();
    const [profileData, setProfileData] = useState(null);
    const [activeTab, setActiveTab] = useState('questions');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedProfile, setEditedProfile] = useState({
        username: '',
        email: '',
        bio: ''
    });
    const [loader, setLoader] = useState(false);
    const [loading, setLoading] = useState(true);   

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [questionPage, setQuestionPage] = useState(1);
    const [answerPage, setAnswerPage] = useState(1);
    const [hasMoreQuestions, setHasMoreQuestions] = useState(true);
    const [hasMoreAnswers, setHasMoreAnswers] = useState(true); 

    useEffect(() => {
        if (isConnected && address) {
            getUserData(address);
        }
    }, [isConnected, address]);

    useEffect(() => {
        if (profileData) {
            fetchQuestionsAndAnswers(profileData?.id);
        }
    }, [profileData]);

    const getUserData = async (wallet) => {
        setLoading(true); // Start loading
        try {
            // Reference to the "users" collection in Firestore
            const usersRef = collection(db, "users");
    
            // Create a query to find the user by wallet address
            const userQuery = query(usersRef, where("wallet", "==", wallet));
    
            // Execute the query
            const querySnapshot = await getDocs(userQuery);
            console.log(querySnapshot,"querySnapshot");
            
    
            if (!querySnapshot.empty) {
                // Assuming there's only one user with this wallet
                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data(); 
                const id = userDoc.id;
    
                setProfileData({id,...userData});
                setEditedProfile({
                    username: userData.username || '',
                    email: userData.email || '',
                    bio: userData.bio || '',
                });
            } else {
                console.error("No user found with the provided wallet address");
            }
        } catch (error) {
            console.error("Error fetching user data from Firestore:", error.message);
        } finally {
            setLoading(false); // End loading
        }
    };
 
    const fetchQuestionsAndAnswers = async (wallet) => {
        setLoading(true); // Start loading when fetching questions/answers
        try {
            const response = await fetch(`/api/profile?authorId=${wallet}&page=${questionPage}`);
            const data = await response.json(); 
            const { questions, answers } = data; 
            if (questions?.questions?.length > 0) {
                setQuestions((prev) => {
                    const newQuestions = questions.questions.filter(
                        (newQ) => !prev.some((existingQ) => existingQ._id === newQ._id)
                    );
                    return [...prev, ...newQuestions];
                });
                setQuestionPage((prev) => prev + 1);
            }
    
            if (answers?.answers?.length > 0) {
                setAnswers((prev) => {
                    const newAnswers = answers.answers.filter(
                        (newA) => !prev.some((existingA) => existingA._id === newA._id)
                    );
                    return [...prev, ...newAnswers];
                });
                setAnswerPage((prev) => prev + 1);
            }
    
            if (questions?.questions?.length < 10) {
                setHasMoreQuestions(false);
            }
            if (answers?.answers?.length < 10) {
                setHasMoreAnswers(false);
            }
        } catch (error) {
            console.error('Error fetching questions and answers:', error);
        } finally {
            setLoading(false);  // End loading
        }
    };

    const handleEditProfile = () => {
        setIsModalOpen(true);
    };

    const handleUpdateProfile = async () => { 
            setLoader(true);
            try { 
                
                // Reference to the Firestore document for the user using the user ID
                const userDocRef = doc(db, "users", profileData.id); // Specify the user ID here
                await updateDoc(userDocRef, {
                    username: editedProfile.username,
                    email: editedProfile.email,
                    bio: editedProfile.bio,
                    wallet: profileData.wallet || address, 
                });

                setProfileData({
                    id: profileData.id, // Ensure this matches the user ID
                    username: editedProfile.username,
                    email: editedProfile.email,
                    bio: editedProfile.bio,
                    wallet: profileData.wallet || address,
                });
                setIsModalOpen(false);
                toast.success("Profile updated successfully"); // Updated success message
            } catch (error) {
                console.error("Error updating profile:", error.message);
                toast.error("Error updating profile.");
            } finally {
                setLoader(false);
            } 
        
    };

    return (
        <div className="section-padding">
            <div className="container mx-auto py-8 px-4">
                <ProfileInfo
                    profileData={profileData}
                    handleEditProfile={handleEditProfile}
                />

                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Your Q&A</h3>
                    <div className="flex mb-4">
                        <button
                            className={`mr-2 px-4 py-2 rounded-t-lg ${activeTab === 'questions' ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setActiveTab('questions')}
                        >
                            Questions
                        </button>
                        <button
                            className={`px-4 py-2 rounded-t-lg ${activeTab === 'answers' ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setActiveTab('answers')}
                        >
                            Answers
                        </button>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4">
                        {loading ? (
                            // Show skeleton loader while loading
                            <>
                                <SkeletonLoader />
                                <SkeletonLoader />
                                <SkeletonLoader />
                            </>
                        ) : activeTab === 'questions' ? (
                            <QuestionList
                                questions={questions}
                                hasMore={hasMoreQuestions}
                                loadMore={() => fetchQuestionsAndAnswers(profileData?._id)}
                            />
                        ) : (
                            <AnswerList
                                answers={answers}
                                hasMore={hasMoreAnswers}
                                loadMore={() => fetchQuestionsAndAnswers(profileData?._id)}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isModalOpen && (
                <EditProfileModal
                    isOpen={isModalOpen}
                    closeModal={() => setIsModalOpen(false)}
                    editedProfile={editedProfile}
                    handleInputChange={e => setEditedProfile(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                    handleUpdateProfile={handleUpdateProfile}
                    loader={loader}
                />
            )}
        </div>
    );
};

export default UserProfile;
