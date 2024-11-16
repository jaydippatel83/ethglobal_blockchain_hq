

const EditProfileModal = ({ isOpen, closeModal, editedProfile, handleInputChange, handleUpdateProfile, loader }) => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
        <div className="bg-white rounded-lg w-full max-w-md relative">
            <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-xl font-medium text-gray-900">Edit Profile</h3>
                <button onClick={closeModal} type="button" className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none">
                    <span className="sr-only">Close modal</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <div className="max-w-full min-w-56 md:min-w-96 mx-auto p-5 text-ct-footer-text">
                <div className='space-y-4'>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={editedProfile.username}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={editedProfile.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={editedProfile.bio}
                            onChange={handleInputChange}
                            rows="3"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        ></textarea>
                    </div>
                </div>
            </div>

            <div className="flex justify-end space-x-2 px-5 pb-5">
                <button onClick={closeModal} className="px-4 my-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Cancel
                </button>
                <button
                    onClick={handleUpdateProfile}
                    className="mx-auto my-3   capitalize px-4 sm:px-6 sm:py-2 bg-blue-800  py-2 rounded-lg hover:bg-blue-600 block text-center text-white"
                >
                    {loader ? <div className="circular-progress"></div> : `Update Profile`}
                </button>
            </div>
        </div>
    </div>
);

export default EditProfileModal;
