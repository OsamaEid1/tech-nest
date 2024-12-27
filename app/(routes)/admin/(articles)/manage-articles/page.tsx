'use client'
import React from 'react'
import ManageArticlesTable from './components/ManageArticlesTable'
import { useAppSelector } from 'state/hooks';

function ManageArticles() {
    const pendingArticles = useAppSelector(state => state.articles.pendingArticles);

    return (
        <>
            <h2 className='text-secTextColor'>Manage Articles</h2>
            <div
                className='mt-10 mb-2 p-5 bg-white shadow rounded-main font-medium'
            >
                Pending Articles: <span className='font-bold text-hovers'>{pendingArticles.length}</span>
            </div>
            <div>
                <ManageArticlesTable />
            </div>
        </>
    )
}

export default ManageArticles