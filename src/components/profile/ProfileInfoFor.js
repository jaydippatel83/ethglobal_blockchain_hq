import { generateAvatar } from "@/lib/generateAvatar";

const ProfileInfo = ({ profileData, handleEditProfile }) => {
   const avatar = generateAvatar(profileData?.wallet);
    
    return (
        <>
            <div className="relative w-full h-12 rounded-lg mb-16">
                <div className="absolute bottom-0 left-24 transform -translate-x-1/2 translate-y-1/2">
                    {profileData ? (
                        <img
                            src={avatar } 
                            className="rounded-full border-4 border-white h-32 w-32 object-cover"
                        />
                    ) : (
                        <div className="bg-gray-200 rounded-full border-4 border-white h-32 w-32"></div>
                    )}
                </div>
            </div>

            <div className="mt-8 flex justify-between items-start align-baseline align-center border-b pb-5">
                <div>
                    <h1 className="text-3xl font-semibold">{profileData?.username || 'User'}</h1>
                    <p className="text-gray-600 mt-2">{profileData?.email || profileData?.wallet}</p>
                    <p className="text-sm text-gray-500 mt-1">{profileData?.bio || ''}</p>
                </div>
                <button
                    onClick={handleEditProfile}
                    className="align-baseline  bg-blueCustom  capitalize px-4 sm:px-6 sm:py-2   py-2 rounded-lg hover:bg-blue-600 block text-center text-white"
                >
                    Edit Profile
                </button>
            </div>
        </>
    )
};

export default ProfileInfo;
