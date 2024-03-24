import React, { useState } from 'react';
import '../../forApp.css';
import { useDispatch } from "react-redux";
import { setGameState } from "../../store/Slices/webSocketSlice.ts";
import { useAppSelector } from "../../store/hooks.ts";
import useWebSocket from "../../customHook/useWebSocket.ts";
import {
    selectPlan,
    setPlan as sliceSetPlan,
} from "../../store/Slices/planSlice.ts";
import Plan from './Plan.jsx';

function Wait() {
    const dispatch = useDispatch();
    const planState = useAppSelector(selectPlan);
    const [plan, setPlan] = useState(planState.plan || '');
    const { devisePlan, executePlan } = useWebSocket();

    const onRevise = () => {
        dispatch(setGameState('REVISE'));
    };

    const onExecute = () => {
        executePlan();
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh'
        }}>
            <div className="app-container">
                <label htmlFor="plan" className="form-label">Plan:</label>
                <Plan plan={plan} setPlan={setPlan} isDisable={true}/>
            </div>
        </div>
    );
}

export default Wait;