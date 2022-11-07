import React, { useEffect, useRef, useState } from 'react'
import { Footer } from './Footer'
import { Question } from './Question'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const Profile = ({setToken}) => {

    const count = useRef(1);
    const navigate = useNavigate();

    const userName = JSON.parse(localStorage.getItem('user'));
    let token = JSON.parse(localStorage.getItem('token'));

    async function fetchData() {
        let url='http://localhost:8000/profile';
        await axios(url, {
            method: "get",
            headers: { "Authorization": "Bearer " + token },
        }).then((res) => {
            console.log(res.data);
            localStorage.setItem('user', JSON.stringify(res.data.username));
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchData();
    }, [token])

    return (
        <>
            <div className='row align-items-center justify-content-center mx-5 ' style={{ minHeight: '96vh' }}>
                <div className="card mt-5">
                    <div className="card-body">
                        <h5 className="card-title">
                            <div className="row mt-3 justify-content-between">
                                <h5 className='col-2' >Student Name : {userName}</h5>
                                <h5 className='col-2'><button className='btn btn-outline-dark' onClick={() => {
                                   setToken(null);
                                   localStorage.clear(); 
                                   navigate('/login');                                       
                                }}>Logout</button></h5>
                            </div>
                        </h5>
                        <Question count={count.current} />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
