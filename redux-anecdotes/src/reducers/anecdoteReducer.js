import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
    name: "anecdotes",
    initialState: [],
    reducers: {
        appendAnecdote(state, action) {
            state.push(action.payload);
        },
        setAnecdotes(state, action) {
            return action.payload;
        },
    },
});

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll();
        dispatch(setAnecdotes(anecdotes));
    };
};

export const createAnecdote = (content) => {
    return async (dispatch) => {
        const newAnecdote = await anecdoteService.createAnecdote(content);
        dispatch(appendAnecdote(newAnecdote));
    };
};

export const updateAnecdote = (id) => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll();
        const anecdote = anecdotes.find((data) => data.id === id);
        const updateAnecdote = { ...anecdote, votes: anecdote?.votes + 1 };
        console.log(updateAnecdote);
        const updates = await anecdoteService.updateAnecdote(
            id,
            updateAnecdote
        );
        dispatch(initializeAnecdotes(updates));
    };
};

export default anecdoteSlice.reducer;
