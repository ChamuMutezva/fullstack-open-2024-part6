import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: "",
    reducers: {
        updateNotification(state, action) {
            return action.payload;
        },
    },
});

export const { updateNotification } = notificationSlice.actions;

export const setNotification = (content) => {
    return async (dispatch) => {
        dispatch(updateNotification(`You voted ${content}`));
        setTimeout(() => dispatch(updateNotification("")), 5000);
    };
};

export default notificationSlice.reducer;
