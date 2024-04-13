import {useContext} from 'react'
import { QuizContext } from '../store/QuizContext'
import {decode, encode} from 'html-entities';

import Result from './Result';
import { stat } from 'fs';
import { type } from 'os';
const Game = () => {
    const { state,dispatch } = useContext(QuizContext)
    const question = state.question
    const handelSubmit = () => {
        dispatch({ type: "setStatus", payload: "answered" })
        if (state.userAnswer == state.question?.correct_answer) {
            dispatch({type:"setScore" ,payload:state.score+1})
        }
    }
    return (
            <div className="mx-16 md:mx-32 my-36 flex justify-center items-center flex-col z-20 bg-black/50 p-6  rounded ">
            <h2 className='text-2xl font-bold text-sky-200 py-2'>Question { state.numOfQuestion} / 10</h2>
            <h2>{}</h2>
            
                <h4 className='text-lg font-semibold text-white py-2 text-center'>{decode(question?.question)}</h4>
                <div className="options">
                    {question?.incorrect_answers.map((answer) => {
                        return (
                            <button disabled={state.gameStatus=="answered"?true:false} onClick={()=>{dispatch({type:"setUserAnswer",payload:answer})}}
                                className=
                                {`${answer === state.userAnswer ? `${state.gameStatus=="answered" && answer == state.question?.correct_answer ? "bg-green-500" : "bg-sky-500"}`: `${state.gameStatus=="answered" && answer == state.question?.correct_answer ? "bg-green-500" : "bg-white"}`}
                                w-[300px] h-[40px] flex items-center justify-center  py-1 px-6 rounded-r-full rounded-l-full text-lg font-semibold my-2`}>{decode(answer)}</button>
                        );
                        
                    })}
            </div>
            {state.userAnswer && state.gameStatus !=="answered" &&
                <button
                    onClick={handelSubmit}
                    className='py-1 px-2 w-[300px] my-6 bg-blue-600 hover:bg-sky-400 text-lg rounded-lg font-semibold '>Submit</button>
            }
            {state.gameStatus == "answered" && <>
                <Result></Result>
                <button
                    onClick={() => {
                        dispatch({ type: "setStatus", payload: "idel" })
                        dispatch({type:"setNumOfQuestion",payload:state.numOfQuestion+1})
                    }}
                    className='py-1 px-2 w-[300px] my-6 bg-blue-600 hover:bg-sky-400 text-lg rounded-lg font-semibold '>Next Question</button>
            </>}
            
            </div>
            


    )
}

export default Game