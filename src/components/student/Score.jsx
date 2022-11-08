import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Graph from './Graph';

export const Score = ({ setToken }) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className='row mt-5 align-items-center justify-content-center' style={{ minHeight: '90vh' }}>
            <div className="card col-md-8 col-lg- col-sm-auto">
                <div className="card-body">
                    <h1> Your Total Score : {location.state}</h1>
                    <Graph/>
                    <div className='row'>
                        <h5 className='col-sm-12'><button className='btn btn-dark' onClick={() => {
                            setToken(null);
                            localStorage.clear();
                            navigate('/');
                        }}>Logout</button></h5>
                        <h5 className='col-sm-12 mx-1'><button className='btn btn-outline-dark' onClick={() => {
                            localStorage.removeItem('scoreData');
                            navigate('/profile');
                        }}>Replay</button></h5>
                    </div>
                </div>
            </div>
        </div>
    )
}
