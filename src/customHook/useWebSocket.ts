import Stomp from "stompjs";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import SockJS from "sockjs-client/dist/sockjs";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {setIsConnected, appendMessage,setStompClient, setHead as sliceSetHead} from "../store/Slices/webSocketSlice.ts";
import {selectWebSocket} from "../store/Slices/webSocketSlice.ts";
import {setTerritory as sliceSetTerritory} from "../store/Slices/territorySlice.ts";
import {setTurn as sliceSetTurn, setGameState as sliceSetGameState} from "../store/Slices/webSocketSlice.ts";
import {setInit as sliceSetInit, setConfig as sliceSetConfig} from "../store/Slices/configSlice.ts";
import {setUsernames as sliceSetUsernames, selectUsername} from "../store/Slices/usernameSlice.ts";
import {setOK as sliceSetOK, reset as sliceReset} from "../store/Slices/planSlice.ts";
//import React, { useState } from 'react';

function useWebSocket(){
    const dispatch = useAppDispatch()
    const webSocket = useAppSelector(selectWebSocket)
    const usernameState = useAppSelector(selectUsername)
//    const {stompClient1, setStompClient1} = useState();

    function connect(username : string){
        try {
            const socket: WebSocket = new SockJS(`http://localhost:8080/ws`);
            const stompClient: Stomp.Client = Stomp.over(socket);
//            setStompClient1(stompClient);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            stompClient.connect({}, () =>onConnected(stompClient,username), onError);
        } catch (e) {
            console.log(e);
        }
    }

    function start(){
        if (webSocket.stompClient && webSocket.stompClient.connected) {
            webSocket.stompClient.send("/app/game.start", {}, JSON.stringify(""));
        }
    }

    function gameConfig(
            m: number, n: number, init_plan_min: number, init_plan_sec: number, init_budget: number,
            init_center_dep: number, plan_rev_min: number, plan_rev_sec: number, rev_cost: number,
            max_dep: number, interest_pct: number
    ){
        if (webSocket.stompClient && webSocket.stompClient.connected) {
            const init = {
                m: m,
                n: n,
                init_plan_sec: init_plan_min*60+init_plan_sec,
                init_budget: init_budget,
                init_center_dep: init_center_dep,
                plan_rev_sec: plan_rev_min*60+plan_rev_sec,
                rev_cost: rev_cost,
                max_dep: max_dep,
                interest_pct: interest_pct
            };
            webSocket.stompClient.send("/app/game.new", {}, JSON.stringify(init));
        }
    }

    function addPlayer(username: string) {
        if (webSocket.stompClient && webSocket.stompClient.connected) {
            const wrapper = {
                text: username
            };
            webSocket.stompClient.send("/app/game.addPlayer", {}, JSON.stringify(wrapper));

            webSocket.stompClient.subscribe('/topic/plan.' + username, onDevisePlan);
        }
    }

    function getPlayers(){
        if (webSocket.stompClient && webSocket.stompClient.connected) {
            webSocket.stompClient.send("/app/game.getPlayers", {}, JSON.stringify(""));
        }
    }

    function devisePlan(plan: string) {
        if (webSocket.stompClient && webSocket.stompClient.connected) {
            const wrapper = {
                player: usernameState.username,
                plan: plan
            };
            webSocket.stompClient.send("/app/game.devise", {}, JSON.stringify(wrapper));
        }
    }

    function revisePlan(plan: string) {
        if (webSocket.stompClient && webSocket.stompClient.connected) {
            const wrapper = {
                text: plan
            };
            webSocket.stompClient.send("/app/game.revise", {}, JSON.stringify(wrapper));
        }
    }

    function executePlan() {
        if (webSocket.stompClient && webSocket.stompClient.connected) {
            webSocket.stompClient.send("/app/game.execute", {}, JSON.stringify({}));
        }
    }

    function nextTurn() {
        if (webSocket.stompClient && webSocket.stompClient.connected) {
            webSocket.stompClient.send("/app/game.nextTurn", {}, JSON.stringify({}));
        }
    }

    function setState(stateSet: string) {
        if (webSocket.stompClient && webSocket.stompClient.connected) {
            webSocket.stompClient.send("/app/game.setState", {}, stateSet);
        }
    }

    function restart(){
        if (webSocket.stompClient && webSocket.stompClient.connected) {
            webSocket.stompClient.send("/app/game.restart", {}, JSON.stringify({}));
        }
    }

//    function getTerritory (){
//        if (webSocket.stompClient && webSocket.stompClient.connected) {
//            webSocket.stompClient.send("/app/game.getTerritory", {}, JSON.stringify({}));
//        }
//    }

    const onConnected = (stompClient : Stomp.Client) => {
        stompClient.subscribe('/topic/config', onConfig);
        stompClient.subscribe('/topic/territory', onGetTerritory);
        stompClient.subscribe('/topic/status');
        stompClient.subscribe('/topic/turn', onGetTurn);
        stompClient.subscribe('/topic/setState', onSetState);
        stompClient.subscribe('/topic/init', onGetInit);
        stompClient.subscribe('/topic/addPlayer', onAddPlayer);
        stompClient.subscribe('/topic/restart', onRestart);
        dispatch(setIsConnected(true))
        dispatch(setStompClient(stompClient))
    }
    const onMessageReceived = (payload : Stomp.Message) => {
        dispatch(appendMessage(JSON.parse(payload.body)))
    }
    const onConfig = (payload : Stomp.Message) => {
        dispatch(sliceSetConfig(JSON.parse(payload.body)))
    }
    const onGetTerritory = (payload : Stomp.Message) => {
        dispatch(sliceSetTerritory(JSON.parse(payload.body)))
    }
    const onGetTurn = (payload : Stomp.Message) => {
        dispatch(sliceSetTurn(JSON.parse(payload.body)))
    }
    const onSetState = (payload : Stomp.Message) => {
        dispatch(sliceSetGameState(JSON.parse(payload.body)));
        if (JSON.parse(payload.body) === 'INIT') {
            dispatch(sliceSetInit(false));
            dispatch(sliceSetHead(false));
            dispatch(sliceReset());
        }
    }
    const onGetInit = (payload : Stomp.Message) => {
        dispatch(sliceSetInit(true))
    }
    const onAddPlayer = (payload : Stomp.Message) => {
        dispatch(sliceSetUsernames(JSON.parse(payload.body)))
    }
    const onDevisePlan = (payload : Stomp.Message) => {
        dispatch(sliceSetOK(JSON.parse(payload.body)))
    }
    const onRestart = (payload : Stomp.Message) => {
        window.location.reload();
    }
//     const count = (count : String) => {
//         stompClient.subscribe('/topic/public', onMessageReceived);
//         stompClient.send("/app/chat.getCount", {}, JSON.stringify({count : getCount}));
//         dispatch(setCount(count))
//     }

    return {gameConfig,addPlayer,getPlayers,devisePlan,revisePlan,executePlan,nextTurn,connect,start,setState,restart}
}

export default useWebSocket;

const onError = (err: Stomp.Message) => {
    console.log(err);
}