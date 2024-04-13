import { stat } from 'fs';
import {useContext, useState} from 'react'
import {QuizContext} from '../store/QuizContext'
const Score = () => {
    const { state,dispatch } = useContext(QuizContext)
    const [rate, setRate] = useState<string>("Good");
    const handelRate = () => {
        if (state.score < 5) {
            setRate("Bad")
        } else if (state.score > 5 && state.score < 7) {
            setRate("Good")
        }else if (state.score > 7 && state.score <9) {
            setRate("Very Good")
        }else if (state.score =10) {
            setRate("Perfect")
        }
    }
    return (
        <div className="mx-16 md:mx-32 my-36 flex justify-center items-center flex-col z-20 bg-black/50 p-6  rounded ">
            <h1 className='text-2xl text-sky-400 py-2 font-bold'>Game Over</h1>
            <h2 className='text-xl font-semibold text-gray-300 text-center py-2 '>Your score is {state.score} /10 </h2>
            <h3 className={`${rate === "Bad" ? "text-red-500":"text-green-400"} py-2 text-3xl font-semibold text-center `}>{rate}</h3>
            <button
                    onClick={() => {
                        dispatch({ type: "setStatus", payload: "idel" })
                        dispatch({type:"setNumOfQuestion",payload:1})
                    }}
                    className='py-1 px-2 w-[200px] my-6 bg-blue-600 hover:bg-sky-400 text-lg rounded-lg font-semibold '>Try Again</button>
        </div>
    )
}

export default Score