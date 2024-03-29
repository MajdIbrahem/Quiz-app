import { useContext} from 'react'
import {QuizContext} from '../store/QuizContext'
const Result = () => {
    const {state}=useContext(QuizContext)
    return (<>
        {state.userAnswer == state.question?.correct_answer?
        <div className='py-2 text-green-400'>You Anwered correctly </div>
        :
    <div className='py-2 text-red-400'>your answer  is wrong !! </div>}
    </>
)
}

export default Result