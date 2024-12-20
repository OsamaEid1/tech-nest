import { createSlice } from "@reduxjs/toolkit";
import { Topic } from "app/helpers/constants";

export const topicsSlice = createSlice({
    name: "topics",
    initialState: {
        topics: [] as Topic[]
    },
    reducers: {
        setUpdatedTopics(state, action) {
            const updatedTopics = action.payload;
            state.topics = [...updatedTopics];
        },
    },
});

export const { setUpdatedTopics } = topicsSlice.actions;
