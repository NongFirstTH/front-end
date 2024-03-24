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

function RevisePlan() {
    const dispatch = useDispatch();
    const planState = useAppSelector(selectPlan);
    const [plan, setPlan] = useState(planState.plan || '');
    const { revisePlan } = useWebSocket();

    const onSubmit = () => {
        revisePlan(plan);
        dispatch(sliceSetPlan(plan));
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh'
        }}>
            <div className="app-container">
                <form>
                    <div className="form-group">
                        <label htmlFor="plan" className="form-label">Plan:</label>
                        <Plan plan={plan} setPlan={setPlan} isDisable={false}/>
                    </div>
                </form>
                <button type="submit" onClick={onSubmit}>Submit Plan</button>
            </div>
        </div>
    );
}

export default RevisePlan;