export type status = "idel" | "fetching" | "ready" | "error" |"answered"



export interface QuizState {
    gameStatus: status
    question: Question | null
    userAnswer:string |null
};


export type QuizAction = { type: "setStatus", payload: status } |{type: "setQuestion", payload: Question } |{type: "setUserAnswer", payload: string }

export interface QuizContextType{
    state: QuizState,
    dispatch:React.Dispatch<QuizAction>
}

export interface Question {
    type: 'multiple' | 'boolean'; 
    difficulty: 'easy' | 'medium' | 'hard'; 
    category: string; 
    question: string; 
    correct_answer: string; 
    incorrect_answers: string[]; 
}
export interface QuestionResponse {
    response_code: number; 
    results: Question[]; 
}