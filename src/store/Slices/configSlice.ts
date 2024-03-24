// configSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store.ts";

interface ConfigState {
    m: number;
    n: number;
    init_plan_min: number;
    init_plan_sec: number;
    init_budget: number;
    init_center_dep: number;
    plan_rev_min: number;
    plan_rev_sec: number;
    rev_cost: number;
    max_dep: number;
    interest_pct: number;
    init: boolean;
}

const initialState: ConfigState = {
    m: 8,
    n: 8,
    init_plan_sec: 60,
    init_budget: 10000,
    init_center_dep: 100,
    plan_rev_sec: 60,
    rev_cost: 100,
    max_dep: 1000000,
    interest_pct: 5,
    init: false
};

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setConfig: (state, action: PayloadAction<Partial<ConfigState>>) => {
            Object.assign(state, action.payload);
            console.log(state.plan_rev_sec)
        },
        setInit: (state, action: PayloadAction<boolean>) => {
            state.init = action.payload;
        },
    },
});

export const { setConfig, setInit } = configSlice.actions;

export default configSlice.reducer;

export const selectConfig = (state: RootState) => state.config;
