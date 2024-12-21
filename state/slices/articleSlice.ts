import { createSlice } from "@reduxjs/toolkit";
import { ArticleCard, PendingArticle } from "app/helpers/constants";

export const articleSlice = createSlice({
    name: "articles",
    initialState: {
        articles: [] as ArticleCard[],
        pendingArticles: [] as PendingArticle[],
        myArticles: [] as ArticleCard[],
    },
    reducers: {
        setUpdatedArticles(state, action) {
            const updatedArticles = action.payload;
            state.articles = [...updatedArticles];
        },
        setPendingArticles(state, action) {
            const updatedArticles = action.payload;
            state.pendingArticles = [...updatedArticles];
        },
        setMyLatestArticles(state, action) {
            const updatedArticles = action.payload;
            state.myArticles = [...updatedArticles];
        },
    },
});

export const { setUpdatedArticles, setPendingArticles, setMyLatestArticles } = articleSlice.actions;

