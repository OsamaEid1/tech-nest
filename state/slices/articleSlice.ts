import ArticlesCards from "@components/home/maincard/ArticlesCards";
import { createSlice } from "@reduxjs/toolkit";
import { Article, ArticleCard, PendingArticle } from "app/helpers/constants";

export const articleSlice = createSlice({
    name: "articles",
    initialState: {
        articles: [] as ArticleCard[],
        pendingArticles: [] as PendingArticle[],
        myArticles: [] as ArticleCard[],
        article: {}
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
        setArticle(state, action) {
            const article = action.payload;
            state.article = {...article};
        },
        updateArticlesWithUpdatedArticle(state, action) {
            const updatedArticle = action.payload;
            const index = state.articles.findIndex(article => article.id === updatedArticle.id);
            if (index !== -1) {
                state.articles[index] = updatedArticle;
            }
        }
    },
});

export const { setUpdatedArticles, setPendingArticles, setMyLatestArticles, setArticle, updateArticlesWithUpdatedArticle } = articleSlice.actions;

