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

    const ref1 = useRef();
    const ref2 = useRef();
    const ref3 = useRef();
    const ref4 = useRef();

    let filterArr=[];
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
                    setScore(score - 2);
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
            filterArr = questions.filter((e)=> e.difficulty<=10)
            let i = questions[Math.floor(Math.random() * filterArr.length)];
            // to make sure that the randomly generated question is of given difficulty
            if (i.difficulty === difficulty.current) {
                setQues(i);
                setOptions(i.options);
                return;
            }
        }

    }
    const onAnswerSelect = (e) => {
        setAnswer(e.target.value);
        console.log(e.target.value);
        console.log(ref1.current.checked);
        ref1.current.checked = false;
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

                <div className="card-body"  >
                    <h5 className="card-title">{ques.title}</h5>
                    <div onChange={onAnswerSelect}>
                        <div className="form-check">
                            <input type="radio" name="option" ref={ref1} defaultChecked={null} value={options[0]} />
                            <span>  {options[0]}</span>
                        </div>
                        <div className="form-check">
                            <input type="radio" name="option" ref={ref2} defaultChecked={null} value={options[1]} />
                            <span>  {options[1]}</span>
                        </div>
                        <div className="form-check">
                            <input type="radio" name="option" ref={ref3} defaultChecked={null} value={options[2]} />
                            <span>  {options[2]}</span>
                        </div>
                        <div className="form-check">
                            <input type="radio" name="option" ref={ref4} defaultChecked={null} value={options[3]} />
                            <span>  {options[3]}</span>
                        </div>
                    </div>
                    <button onClick={handleClick} className="btn btn-success mt-2">Submit</button>
                </div>
            </div>
        </div>
    )
}
