import React from 'react'

function SelectedTopics() {
    const selectedTopics = [
        'Blockchain',
        'Data Science',
        'Technology',
    ] 

    return (
        <div>
            <h3 className="mt-4 mb-2">Selected Topics:</h3>
            <div >
                {selectedTopics?.map((topic, indx) => (
                    <span 
                        key={indx}
                        className={`m-1 p-2 rounded-full whitespace-nowrap cursor-pointer font-medium
                                duration-200 text-white bg-hovers hover:bg-red-500
                        `}
                    >
                        <span className='text-xl font-bold'>-</span> {topic}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default SelectedTopics