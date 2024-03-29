import {useContext} from 'react'
import { QuizContext } from '../store/QuizContext'
import {decode, encode} from 'html-entities';
import { stat } from 'fs/promises';
import Result from './Result';
const Game = () => {
    const { state,dispatch } = useContext(QuizContext)
    const question = state.question
    console.log(question)
    return (
            <div className="mx-16 md:mx-32 flex justify-center items-center flex-col bg-black/20 p-6  rounded ">
                <h2 className='text-2xl font-bold text-black py-2'>Question</h2>
                <h4 className='text-lg font-semibold text-black py-2 text-center'>{decode(question?.question)}</h4>
                <div className="options">
                    {question?.incorrect_answers.map((answer) => {
                        return (
                            <button onClick={()=>{dispatch({type:"setUserAnswer",payload:answer})}}
                                disabled={state.gameStatus=="answered"}
                                className={`
                                ${answer == state.userAnswer ? "bg-sky-400" : "bg-white"}
                                ${state.gameStatus =="answered" && answer ==state.question?.correct_answer ? "bg-green-400" : "bg-white"}
                                w-[300px] h-[40px] flex items-center justify-center  py-1 px-6 rounded-r-full rounded-l-full text-lg font-semibold my-2`}>{decode(answer)}</button>
                        );
                    })}
            </div>
            {state.userAnswer && state.gameStatus !=="answered" &&
                <button
                    onClick={() => { dispatch({ type: "setStatus", payload :"answered"})}}
                    className='py-1 px-2 w-[300px] my-6 bg-blue-600 hover:bg-sky-400 text-lg rounded-lg font-semibold '>Submit</button>
            }
            {state.gameStatus == "answered" &&
                <>
                <Result></Result>
                <button
                    onClick={() => { dispatch({ type: "setStatus", payload :"idel"})}}
                    className='py-1 px-2 w-[300px] my-6 bg-blue-600 hover:bg-sky-400 text-lg rounded-lg font-semibold '>Next</button>
                </>}
            </div>
            


    )
}

export default Game