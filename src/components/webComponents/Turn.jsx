import React, { useState } from 'react';
import '../../forApp.css';
import { useDispatch } from "react-redux";
import { selectConfig } from "../../store/Slices/configSlice.ts";
import { setGameState } from "../../store/Slices/webSocketSlice.ts";
import { useAppSelector } from "../../store/hooks.ts";
import useWebSocket from "../../customHook/useWebSocket.ts";
import {
    selectPlan,
    setPlan as sliceSetPlan,
} from "../../store/Slices/planSlice.ts";
import Plan from './Plan.jsx';
import Timer from './Timer.jsx';

function Turn() {
    const dispatch = useDispatch();
    const configState = useAppSelector(selectConfig);
    const planState = useAppSelector(selectPlan);
    const [plan, setPlan] = useState(planState.plan || '');
    const { executePlan, setState, revisePlan } = useWebSocket();
    const [isRevise, setIsRevise] = useState(false);
    const [isPlanVisible, setIsPlanVisible] = useState(true);

    const onRevise = () => {
        setIsRevise(true);
    };

    const onExecute = () => {
        executePlan();
        setIsRevise(false);
    };

    const onSubmitPlan = () => {
        revisePlan(plan);
        dispatch(sliceSetPlan(plan));
        setIsRevise(false);
    };

    const onTimeOut = () => {
        onExecute(); // Call onExecute when the timer runs out
    };

    const togglePlanVisibility = () => {
        setIsPlanVisible(!isPlanVisible);
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh'
        }}>
            <div className="app-container">
                <Timer initialTime={configState.plan_rev_sec} onTimeOut={onTimeOut} />
                {isPlanVisible && (
                    <form>
                        <div className="form-group">
                            <label htmlFor="plan" className="form-label">Plan:</label>
                            <Plan plan={plan} setPlan={setPlan} isDisable={!isRevise} />
                        </div>
                    </form>
                )}
                {!isRevise && isPlanVisible && (
                        <button type="button" onClick={onRevise}>Revise Plan</button>
                )}
                {!isRevise && isPlanVisible && (
                        <button type="button" onClick={onExecute}>Execute Plan</button>
                )}
                {isRevise && isPlanVisible && (
                    <div style={{ marginTop: '10px' }}> {/* Added space */}
                        <button type="button" onClick={onSubmitPlan}>Execute Plan</button>
                    </div>
                )}
                <div style={{ marginTop: '10px' }}> {/* Added space */}
                    <button onClick={togglePlanVisibility}>{isPlanVisible ? "Hide Plan" : "Show Plan"}</button>
                </div>
            </div>
        </div>
    );
}

export default Turn;
