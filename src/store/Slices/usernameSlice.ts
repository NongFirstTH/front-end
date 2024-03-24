import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";

interface usernameState {
    username: string;
    usernames: string[];
}

const initialState: usernameState = {
    username: '',
    usernames: [],
};

export const usernameSlice = createSlice({
    name: 'username',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
            console.log(state.username)
        },
        setUsernames: (state, action: PayloadAction<string[]>) => {
            state.usernames = action.payload;
        },
    },
});

export const {setUsername, setUsernames} = usernameSlice.actions;
export default usernameSlice.reducer;
export const selectUsername = (state: RootState) => state.username;