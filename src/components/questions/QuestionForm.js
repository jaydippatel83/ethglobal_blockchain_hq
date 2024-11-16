'use client';
import React, { useEffect, useState, useCallback } from 'react';
import ReactQuill from 'react-quill';
import TagInput from './TagInput';  
import { toast } from 'react-toastify';
import { useAccount } from "wagmi";
import { addQuestion, uploadQuestionImage } from '@/lib/questions';
import { getUserData } from '@/lib/profile';

const AskQuestionForm = ({ mutate }) => {
    const { address, isConnected } = useAccount();
    const [question, setQuestion] = useState({
        title: '',
        details: '',
        tags: [],
        slug: '',
        authorName: '',
        authorId: ''
    });
 
    const [loader, setLoader] = useState(false);

    const generateSlug = useCallback((name) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    }, []);

    // Handle input changes for title and slug
    const handleInput = useCallback((e) => {
        const { name, value } = e.target;
        setQuestion(prevQuestion => ({
            ...prevQuestion,
            [name]: value,
            slug: name === 'title' ? generateSlug(value) : prevQuestion.slug
        }));
    }, [generateSlug]);

    const urlToFile = async (url, filename) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], filename, { type: blob.type });
    };

    // Handle changes to the question details (ReactQuill)
    const handleDetailsChange = async (value) => {
        // Create a temporary DOM element to parse the HTML content
        const parser = new DOMParser();
        const doc = parser.parseFromString(value, 'text/html');

        // Find all image tags
        const imgTags = doc.querySelectorAll('img');
        const imgSrcArray = [];

        // Push the src of each image into imgSrcArray
        imgTags.forEach((imgTag) => {
            const imgSrc = imgTag.getAttribute('src'); 
            imgSrcArray.push(imgSrc);
        });


        let newImgSrcArray = [];

        // If we have any new images to process
        if (imgSrcArray.length > 0) {
            try {
                // Call your image upload API and get the new URLs
                await Promise.all(imgSrcArray.map(async (src, index) => {
                    const file = await urlToFile(src, `image${index}.jpg`);
                    const resultUrl = await uploadQuestionImage(file); // Upload new image
                    newImgSrcArray.push(resultUrl); // Store the new S3 URL
                }));

                // Replace the old src with the new src in the HTML content
                imgTags.forEach((imgTag, index) => {
                    const imgSrc = imgTag.getAttribute('src');
                    if (imgSrcArray.includes(imgSrc)) {
                        imgTag.setAttribute('src', newImgSrcArray[imgSrcArray.indexOf(imgSrc)]); // Replace with new S3 URL
                    }
                });

                // Serialize the updated HTML content back into a string
                const updatedValue = doc.body.innerHTML;

                // Set the updated value in the editor
                setQuestion((prevQuestion) => ({
                    ...prevQuestion,
                    details: updatedValue,
                }));
            } catch (error) {
                console.error('Error uploading images:', error);
            }
        } else {
            // No new images to upload, just update the content normally
            setQuestion((prevQuestion) => ({
                ...prevQuestion,
                details: value,
            }));
        }
    };


    // Handle changes to tags
    const handleTagsChange = (tags) => {
        setQuestion(prevQuestion => ({
            ...prevQuestion,
            tags
        }));
    };

    

    // Handle form submission to add a new question
    const handleSubmit = async (e) => {
        setLoader(true);
            const data = await getUserData(address); 
            const questionData = {
                ...question,
                authorId: data?.id,
            };
            e.preventDefault();
            try {  
                await addQuestion(questionData);
                toast.success('Question added successfully!');
                setLoader(false);
                mutate()
                setQuestion({ details: "", tags: [], title: "" });

            } catch (error) {
                console.error('Error:', error);
                toast.error('Failed to publish your question.');
                setLoader(false);
            }
    };

    return (
        <div className='justify-between'>
            <div className="p-4 border rounded-lg shadow-sm bg-white mt-4 mb-28">
                <h2 className="text-xl font-bold mb-4">Ask a Question</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Question Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                        className="w-full px-3 py-2 border rounded"
                        value={question.title}
                        onChange={handleInput}
                    />
                    <p className="text-xs text-gray-500 mt-1">Be specific and imagine you’re asking a question to another person</p>
                </div>

                <div className="mb-4">
                    <TagInput value={question.tags} onChange={handleTagsChange} />
                </div>

                <div className="mb-8">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Details</label>
                    <ReactQuill
                        value={question.details}
                        onChange={handleDetailsChange} 
                        modules={AskQuestionForm.modules}
                        formats={AskQuestionForm.formats}
                        className="h-48 mb-14"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="mt-4 font-bold text-sm sm:text-sm bg-gradient-to-r text-white px-2 sm:px-2 py-1 sm:py-2 from-ct-blue-dark to-ct-blue-light min-w-[80px] sm:min-w-[100px] text-center rounded-md"
                >
                    {loader ? <div className="circular-progress"></div> : `Publish your question`}
                </button>
            </div>
        </div>
    );
};

AskQuestionForm.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        ['link', 'image', 'code-block'],
        [{ 'align': [] }],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
    ],
};

AskQuestionForm.formats = [
    'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'link', 'image', 'code-block', 'align', 'color', 'background'
];

export default AskQuestionForm;
