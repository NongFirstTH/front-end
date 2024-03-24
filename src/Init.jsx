// Init.tsx
import React, { useState } from 'react';
import './forApp.css';
import { useDispatch } from "react-redux";
import { setGameState, setHead } from "./store/Slices/webSocketSlice.ts";
import { useAppSelector } from "./store/hooks.ts";
import useWebSocket from "./customHook/useWebSocket.ts";
import { selectConfig, setConfig } from "./store/Slices/configSlice.ts";

function Init() {
    const dispatch = useDispatch();
    const configState = useAppSelector(selectConfig);
    const [m, setM] = useState(configState.m);
    const [n, setN] = useState(configState.n);
    const [initPlanMin, setInitPlanMin] = useState(configState.init_plan_sec/60);
    const [initPlanSec, setInitPlanSec] = useState(configState.init_plan_sec%60);
    const [initBudget, setInitBudget] = useState(configState.init_budget);
    const [initCenterDep, setInitCenterDep] = useState(configState.init_center_dep);
    const [planRevMin, setPlanRevMin] = useState(configState.plan_rev_sec/60);
    const [planRevSec, setPlanRevSec] = useState(configState.plan_rev_sec%60);
    const [revCost, setRevCost] = useState(configState.rev_cost);
    const [maxDep, setMaxDep] = useState(configState.max_dep);
    const [interestPct, setInterestPct] = useState(configState.interest_pct);
    const {gameConfig} = useWebSocket()

    const onSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission

        const config = {
            m,
            n,
            init_plan_sec: initPlanSec+60*initPlanMin,
            init_budget: initBudget,
            init_center_dep: initCenterDep,
            plan_rev_sec: planRevSec+60*planRevMin,
            rev_cost: revCost,
            max_dep: maxDep,
            interest_pct: interestPct,
            init: true,
        };

        dispatch(setConfig(config)); // Update the Redux store with the new config
        dispatch(setGameState('ADD')); // Assuming you're also dispatching this action
        dispatch(setHead(true)); // Assuming you're also dispatching this action
         gameConfig(
                    m,
                    n,
                    initPlanMin,
                    initPlanSec,
                    initBudget,
                    initCenterDep,
                    planRevMin,
                    planRevSec,
                    revCost,
                    maxDep,
                    interestPct
                );
    };

    const handleChange = (e, setter) => {
        setter(e.target.value);
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

        }}>
            <div className="app-container">
                <form>
                    <div className="form-group">
                        <label htmlFor="m" className="form-label">M:</label>
                        <input
                            type="number"
                            id="m"
                            name="m"
                            className="form-input"
                            placeholder='rows'
                            value={m}
                            onChange={(e) => handleChange(e, setM)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="n">N:</label>
                        <input
                            type="number"
                            id="n"
                            name="n"
                            className="form-input"
                            placeholder='cols'
                            value={n}
                            onChange={(e) => handleChange(e, setN)}
                            required
                        />
                    </div>
                </form>

                <form>
                    <div className="form-group">
                        <label htmlFor="init_plan_min">Initial Plan Min:</label>
                        <input
                            type="number"
                            id="init_plan_min"
                            name="init_plan_min"
                            className="form-input"
                            placeholder='Initial Plan Minute'
                            value={initPlanMin}
                            onChange={(e) => handleChange(e, setInitPlanMin)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="init_plan_sec">Initial Plan Sec:</label>
                        <input
                            type="number"
                            id="init_plan_sec"
                            name="init_plan_sec"
                            className="form-input"
                            placeholder='Initial Plan Second'
                            value={initPlanSec}
                            onChange={(e) => handleChange(e, setInitPlanSec)}
                            required
                        />
                    </div>
                </form>

                <form>
                    <div className="form-group">
                        <label htmlFor="init_budget">Init Budget:</label>
                        <input
                            type="number"
                            id="init_budget"
                            name="init_budget"
                            className="form-input"
                            placeholder='Initial Plan Minute'
                            value={initBudget}
                            onChange={(e) => handleChange(e, setInitBudget)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="init_center_dep">Init Center Dep:</label>
                        <input
                            type="number"
                            id="init_center_dep"
                            name="init_center_dep"
                            className="form-input"
                            placeholder='Init Center Deposit'
                            value={initCenterDep}
                            onChange={(e) => handleChange(e, setInitCenterDep)}
                            required
                        />
                    </div>
                </form>


                <form>
                    <div className="form-group">
                        <label htmlFor="plan_rev_min">Plan Rev Min:</label>
                        <input
                            type="number"
                            id="plan_rev_min"
                            name="plan_rev_min"
                            className="form-input"
                            placeholder='Plan revisions Minute'
                            value={planRevMin}
                            onChange={(e) => handleChange(e, setPlanRevMin)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="plan_rev_sec">Plan Rev Sec:</label>
                        <input
                            type="number"
                            id="plan_rev_sec"
                            name="plan_rev_sec"
                            className="form-input"
                            placeholder='Plan revisions Second'
                            value={planRevSec}
                            onChange={(e) => handleChange(e, setPlanRevSec)}
                            required
                        />
                    </div>
                </form>

                <form>
                    <div className="form-group">
                        <label htmlFor="rev_cost">Rev Cost:</label>
                        <input
                            type="number"
                            id="rev_cost"
                            name="rev_cost"
                            className="form-input"
                            placeholder='Plan revisions Second'
                            value={revCost}
                            onChange={(e) => handleChange(e, setRevCost)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="max_dep">Max Dep:</label>
                        <input
                            type="number"
                            id="max_dep"
                            name="max_dep"
                            className="form-input"
                            placeholder='Max Deposit'
                            value={maxDep}
                            onChange={(e) => handleChange(e, setMaxDep)}
                            required
                        />
                    </div>
                </form>

                <form>
                    <div className="form-group">
                        <label htmlFor="interest_pct">Interest Percentage:</label>
                        <input
                            type="number"
                            id="interest_pct"
                            name="interest_pct"
                            className="form-input"  
                            style={{ width: '841px' }}
                            placeholder='Interest Percentage'
                            value={interestPct}
                            onChange={(e) => handleChange(e, setInterestPct)}
                            required
                        />
                    </div>
                </form>
                <button type="submit" onClick={onSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default Init;
       