import React from 'react'
import { Register } from './Register';

export const CardRegister = () => {
    return (
        <div className='row align-items-center justify-content-center text-center' style={{ minHeight: '96vh' }}>
            <div className="card bg-light shadow p-3 mb-5 bg-body rounded" style={{ width: '50rem' }}>
                <div className="card-body">
                    <h5>Registration</h5>
                    <Register />
                </div>
            </div>
        </div>
    )
}
