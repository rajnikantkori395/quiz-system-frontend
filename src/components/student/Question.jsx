import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Question = () => {

    const [ques, setQues] = useState({});
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [answer, setAnswer] = useState();
    const difficulty = useRef(5);
    const questionCount = useRef(1);
    const navigate = useNavigate();

    async function fetchQuestions() {
        await axios('http://localhost:8000/questions', {
            method: "get",
            headers: { "Content-Type": "application/json" }
        }).then((res) => {
            localStorage.setItem('questions', JSON.stringify([...res.data]));
        })
        getQuestion();
    }
    function handleClick() {
        getAnswer();
    }

    function getAnswer() {
        if (questionCount.current >= 10) {
            // alert('done',score)
            
            return navigate('/score', { state: score });
        }
        else {
            if (ques.correct === answer) {
                if (difficulty.current === 10) {
                    setScore(score + 5);
                    return navigate('/score', { state: score });
                }
                setScore(score + 5);
                difficulty.current = difficulty.current + 1;
            }
            else {
                if (difficulty.current === 1) {
                    setScore(score -2);
                    return navigate('/score', { state: score });
                }
                setScore(score - 2);
                difficulty.current = difficulty.current - 1;
            }
            getQuestion();
            questionCount.current = questionCount.current + 1;
        }

    }

    async function getQuestion() {
        // to make sure that the randomly generated question is of given difficulty
        while (true) {
            let questions = JSON.parse(localStorage.getItem('questions'));
            console.log(questions);
            let i = questions[Math.floor(Math.random() * questions.length)];
            // to make sure that the randomly generated question is of given difficulty
            if (i.difficulty === difficulty.current) {
                setQues(i);
                setOptions(i.options);
                return;
            }
        }

    }


    useEffect(() => {
        fetchQuestions();

    }, [])

    return (
        <div className='row align-items-center justify-content-center mt-5 mb-5'>
            <div className="card" style={{ width: '60rem' }}>
                <div className="card-header row justify-content-between">
                    <h5 className='col-2' >Q. No. {questionCount.current}</h5>
                    <h5 className='col-3'>Difficulty level : {ques.difficulty}</h5>
                </div>

                <div className="card-body">
                    <h5 className="card-title">{ques.title}</h5>

                    <div className="form-check">
                        <input type="radio" name="address" onClick={(e) => setAnswer(e.target.value)} value={options[0]} defaultChecked={false}/>
                        <span>  {options[0]}</span>
                    </div>
                    <div className="form-check">
                        <input type="radio" name="address"onClick={(e) => setAnswer(e.target.value)} value={options[1]} defaultChecked={false} />
                        <span>  {options[1]}</span>
                    </div>
                    <div className="form-check">
                        <input type="radio" name="address"onClick={(e) => setAnswer(e.target.value)} value={options[2]} defaultChecked={false} />
                        <span>  {options[2]}</span>
                    </div>
                    <div className="form-check">
                        <input type="radio" name="address"onClick={(e) => setAnswer(e.target.value)} value={options[3]} defaultChecked={false} />
                        <span>  {options[3]}</span>
                    </div>
                   
                    <button onClick={handleClick} className="btn btn-success mt-2">Submit</button>
                </div>
            </div>
        </div>
    )
}