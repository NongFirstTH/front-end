import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";

interface planState {
    plan: string;
    isOK: boolean;
}

const initialState: planState = {
    plan: '',
    isOK: false,
};

export const planSlice = createSlice({
    name: 'plan',
    initialState,
    reducers: {
        setPlan: (state, action: PayloadAction<string>) => {
            state.plan = action.payload;
        },
        setOK: (state, action: PayloadAction<string>) => {
            state.isOK = action.payload;
            if(!state.isOK) {
                alert("invalid plan");
            }
        },
        reset: (state) => {
            state.isOK = false;
            state.plan = '';
        },
    },
});

export const {setPlan, setOK, reset} = planSlice.actions;
export default planSlice.reducer;
export const selectPlan = (state: RootState) => state.plan;