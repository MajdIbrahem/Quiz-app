import {useContext,useEffect} from 'react';
import {QuizContext} from './store/QuizContext'
import Score from './components/Score';
import Game from './components/Game';
import {Question,QuestionResponse} from './types'
import Loader from './components/Loader';
function App() {
  const { state, dispatch } = useContext(QuizContext);
  const fetchQuestion = async () => {
    try {
    dispatch({type:"setStatus",payload:"fetching"})
    const response = await fetch(`https://opentdb.com/api.php?amount=10&category=18`)
    const data:QuestionResponse = await response.json()
      const question: Question = data.results[0]
      let randomIndex = Math.round(Math.random() * question.incorrect_answers.length);
      question.incorrect_answers.splice(randomIndex,0,question.correct_answer)
      dispatch({type:'setQuestion',payload:question})
      dispatch({type:"setStatus",payload:"ready"})
    } catch (err) {
      dispatch({type:"setStatus",payload:"error"})
    }
    
  }
  
  useEffect(() => {
    if (state.gameStatus =="idel" || state.gameStatus=="error") {
      fetchQuestion()
    }
  },[state.gameStatus ])
  return (<div className='bg-image bg-cover w-screen h-screen z-10 fixed'>
    <div >
      {state.gameStatus === "fetching" ?<Loader></Loader>:state.gameStatus === "error" ? <p>error</p>: state.numOfQuestion <11 ?<Game />:<Score></Score>}
    </div>
    </div>
  );
}

export default App;
