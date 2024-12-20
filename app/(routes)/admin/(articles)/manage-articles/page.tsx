import React from 'react'
import ManageArticlesTable from './components/ManageArticlesTable'

function ManageArticles() {

    const articles = [
        {
            id: '00',
            title: 'Article Title',
            authorName: 'Osama',
            createdAt: new Date()
        },
        {
            id: '00',
            title: 'Article Title2',
            authorName: 'Ahmed',
            createdAt: new Date()
        },
        {
            id: '00',
            title: 'Article Title2',
            authorName: 'Ahmed',
            createdAt: new Date()
        },
        {
            id: '00',
            title: 'Article Title2',
            authorName: 'Ahmed',
            createdAt: new Date()
        },
        {
            id: '00',
            title: 'Article Title2',
            authorName: 'Ahmed',
            createdAt: new Date()
        },
        {
            id: '00',
            title: 'Article Title2',
            authorName: 'Ahmed',
            createdAt: new Date()
        },
        {
            id: '00',
            title: 'Article Title2',
            authorName: 'Ahmed',
            createdAt: new Date()
        },
        {
            id: '00',
            title: 'Article Title2',
            authorName: 'Ahmed',
            createdAt: new Date()
        },
        // {
        //     id: '00',
        //     title: 'Article Title2',
        //     authorName: 'Ahmed',
        //     createdAt: new Date()
        // },
        // {
        //     id: '00',
        //     title: 'Article Title2',
        //     authorName: 'Ahmed',
        //     createdAt: new Date()
        // },
        // {
        //     id: '00',
        //     title: 'Article Title2',
        //     authorName: 'Ahmed',
        //     createdAt: new Date()
        // },
        // {
        //     id: '00',
        //     title: 'Article Title2',
        //     authorName: 'Ahmed',
        //     createdAt: new Date()
        // },
        // {
        //     id: '00',
        //     title: 'Article Title2',
        //     authorName: 'Ahmed',
        //     createdAt: new Date()
        // },
        // {
        //     id: '00',
        //     title: 'Article Title2',
        //     authorName: 'Ahmed',
        //     createdAt: new Date()
        // },
        // {
        //     id: '00',
        //     title: 'Article Title2',
        //     authorName: 'Ahmed',
        //     createdAt: new Date()
        // },
        // {
        //     id: '00',
        //     title: 'Article Title2',
        //     authorName: 'Ahmed',
        //     createdAt: new Date()
        // },
        // {
        //     id: '00',
        //     title: 'Article Title2',
        //     authorName: 'Ahmed',
        //     createdAt: new Date()
        // },
        // {
        //     id: '00',
        //     title: 'Article Title2',
        //     authorName: 'Ahmed',
        //     createdAt: new Date()
        // },
    ];


    return (
        <>
            <h2 className='text-secTextColor'>Manage Articles</h2>
            <div
                className='mt-10 mb-2 p-5 bg-white shadow rounded-main font-medium'
            >
                Pending Articles: <span className='font-bold text-hovers'>{articles?.length}</span>
            </div>
            <div>
                <ManageArticlesTable
                    body={articles}
                />
            </div>
        </>
    )
}

export default ManageArticles