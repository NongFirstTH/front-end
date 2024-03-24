import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";
import Stomp from "stompjs";

export enum messageType {
    CHAT= 'CHAT',
    JOIN = 'JOIN',
    LEAVE = 'LEAVE'
}

export enum gameStateType {
    START = 'START',
    INIT = 'INIT',
    ADD = 'ADD',
    DEVISE = 'DEVISE',
    TURN = 'TURN',
    REVISE = 'REVISE',
    END = 'END'
}

interface webSocketMessage {
    sender: string;
    content: string;
    timestamp: string;
    type: messageType;
}
interface webSocketState {
    isConnected: boolean;
    stompClient: Stomp.Client | undefined;
    messages: webSocketMessage[] | undefined;
    count: string;
    gameState: string;
    turn: string|null;
    isHead: boolean;
    isStart: boolean;
}

const initialState: webSocketState = {
    isConnected: false,
    stompClient: undefined,
    messages: [],
    count: 0,
    gameState: 'START',
    turn: null,
    isHead: false,
    isStart: false,
};

export const webSocketSlice = createSlice({
    name: 'webSocket',
    initialState,
    reducers: {
        setIsConnected: (state, action : PayloadAction<boolean>) => {
            state.isConnected = action.payload;
        },
        appendMessage: (state, action : PayloadAction<webSocketMessage>) => {
            state.messages?.push(action.payload);
            if (action.payload.type=='JOIN'||action.payload.type=='LEAVE') state.count = action.payload.count;
        },
        setStompClient: (state, action : PayloadAction<Stomp.Client>) => {
            state.stompClient = action.payload;
        },
        setGameState: (state, action : PayloadAction<gameStateType>) => {
            state.gameState = action.payload;
            if(action.payload === 'START') {
                state.isStart = false;
            }
        },
        setTurn: (state, action : PayloadAction<String>) => {
            state.turn = action.payload;
        },
        setHead: (state, action : PayloadAction<boolean>) => {
            state.isHead = action.payload;
        },
        setStart: (state) => {
            state.isStart = true;
        },
    },
});

export const {setIsConnected, appendMessage,setStompClient,setGameState,setTurn,setHead,setStart} = webSocketSlice.actions;
export default webSocketSlice.reducer;
export const selectWebSocket = (state: RootState) => state.webSocket;