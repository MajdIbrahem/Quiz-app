import React from "react";

import { createContext, useReducer } from 'react';

import {QuestionResponse,Question,QuizContextType,QuizAction,QuizState,status} from '../types'
const initialState: QuizState = {
    gameStatus: "idel",
    question: null,
    userAnswer:null
}
function QuizReducer(state: QuizState, action: QuizAction): QuizState {
    switch (action.type) {
        case "setStatus":
        return {...state,gameStatus:action.payload};
        case "setQuestion":
        return {...state,question:action.payload};
        case "setUserAnswer":
        return {...state,userAnswer:action.payload};
        default:
        throw new Error("Unknown action");
    }
}
export const QuizContext = createContext<QuizContextType>({
    state: initialState,
    dispatch:()=>null
});

const QuizProvieder = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(QuizReducer, initialState);
    return (
        <QuizContext.Provider value={{state,dispatch}}>{ children}</QuizContext.Provider>
    )
}

export default QuizProvieder;