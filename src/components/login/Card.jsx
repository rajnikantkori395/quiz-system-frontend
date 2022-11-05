import React from 'react'
import { Login } from './Login';

export const Card = ({setToken}) => {
    return (
        <div className='row align-items-center justify-content-center text-center ' style={{ minHeight: '96vh' }}>
            <div className="card bg-light shadow p-3 mb-5 bg-body rounded" style={{ width: '50rem' }}>
                <div className="card-body">
                    <h5>Candidate Login</h5>
                    <Login setToken={setToken} />
                </div>
            </div>
        </div>
    )
}
