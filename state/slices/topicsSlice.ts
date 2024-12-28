import { createSlice } from "@reduxjs/toolkit";
import { Topic } from "app/helpers/constants";

export const topicsSlice = createSlice({
    name: "topics",
    initialState: {
        topics: [] as Topic[],
        allTopics: [] as Topic[]
    },
    reducers: {
        setUpdatedTopics(state, action) {
            const updatedTopics = action.payload;
            state.topics = [...updatedTopics];
        },
        setAllTopics(state, action) {
            const updatedTopics = action.payload;
            state.allTopics = [...updatedTopics];
        }
    },
});

export const { setUpdatedTopics, setAllTopics } = topicsSlice.actions;
