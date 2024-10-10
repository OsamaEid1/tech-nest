"use client"
import React, { useState } from 'react';

function SelectTopicsBox() {
    const allTopics = [
            'Blockchain',
            'Data Science',
            'Technology',
            'Programming',
            'Machine Learning',
            'Python',
            'JavaScript',
            'Artificial Intelligence',
            'Data Visualization',
            'Science',
            'Tech',
            'UX',
            'Deep Learning',
            'Data',
            'Coding',
            'Software Engineering',
            'Web Development',
            'AWS',
            'DevOps',
            'Big Data',
            'Java',
            'Android',
            'Nodejs',
            'Docker',
            'Algorithms'
    ]


    const [topics, setTopics] = useState<string []>(allTopics);
    const [selectedTopics, setSelectedTopics] = useState<string []>([]);

    const handleSelectTopic = (topic : string) => {
        // Remove The Selected Topic From A Select Topic Box
        const updatedTopics = [...topics];
        const selectedTopicIndx = updatedTopics.indexOf(topic);

        updatedTopics.splice(selectedTopicIndx, 1);
        setTopics(updatedTopics);

        // Add The Selected Topic To Selected Topics Box
        setSelectedTopics([...selectedTopics, topic]);
    };
    const handleDeselectTopic = (topic : string) => {
        // Deselect the Topic From Selected Topics
        const updatedSelectedTopics = [...selectedTopics];
        const selectedTopicIndx = updatedSelectedTopics.indexOf(topic);

        updatedSelectedTopics.splice(selectedTopicIndx, 1);
        setSelectedTopics(updatedSelectedTopics);

        // Add The Deselected Topic To The Select A Topic Box
        setTopics([...topics, topic]);
    };

    return (
        <>
            <div className="bg-light flex flex-wrap rounded-main p-2">
                {/* Display & Select The Topics */}
                {topics.map((topic, indx) => (
                    <span 
                        key={indx}
                        className={`m-1 p-2 rounded-full whitespace-nowrap cursor-pointer font-medium
                                    duration-200 bg-white hover:bg-hovers hover:text-white
                        `}
                        onClick={() => handleSelectTopic(topic)}
                    >
                        <span className='text-xl font-bold me-px'>+</span>
                        {topic}
                    </span>
                ))}
            </div>
            {/* Display & Remove Selected Topics */}
            <h3 className="mt-4 mb-3">Selected Topics: <span className='text-hovers'>{selectedTopics?.length}</span></h3>
            <div className='bg-light flex flex-wrap rounded-main p-2'>
                {selectedTopics?.length ? selectedTopics.map((topic, indx) => (
                    <span 
                        key={indx}
                        className={`m-1 p-2 rounded-full whitespace-nowrap cursor-pointer font-medium
                            duration-200 text-white bg-hovers hover:bg-red-500
                            `}
                            onClick={() => handleDeselectTopic(topic)}
                        >
                            <span className='text-xl font-bold'>- </span>
                            {topic}
                    </span>
                ))
                : (
                    <p className='ms-1'>No topics selected yet!</p>
                )
            }
            </div>
        </>
    );
}

export default SelectTopicsBox;
