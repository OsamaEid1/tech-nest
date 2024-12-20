import { Article } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { ArticleCard } from "app/helpers/constants";

export const articleSlice = createSlice({
    name: "articles",
    initialState: {
        articles: [] as ArticleCard[]
    },
    reducers: {
        setUpdatedArticles(state, action) {
            const updatedArticles = action.payload;
            state.articles = [...updatedArticles];
        },
    },
});

export const { setUpdatedArticles } = articleSlice.actions;

