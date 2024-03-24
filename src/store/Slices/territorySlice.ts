import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store.ts";

interface Territory {
    player: string|null;
    deposit: number;
}

interface Player {
    name: string;
    row: number;
    col: number;
    currow: number;
    curcol: number;
}

interface TerritoryState {
    territory: Territory[][];
    players: Player[];
}

const initialState: TerritoryState = {
    territory: [],
    players: [],
};

export const territorySlice = createSlice({
    name: 'territory',
    initialState,
    reducers: {
        setTerritory: (state, action: PayloadAction<TerritoryState>) => {
            state.territory = action.payload.territory;
            state.players = action.payload.players;
        },
    },
});

export const { setTerritory } = territorySlice.actions;
export default territorySlice.reducer;
export const selectTerritory = (state: RootState) => state.territory;