import React, { useEffect, useState } from 'react'

export const Footer = () => {
    const [date, setDate] = useState('');
    useEffect(() => {
        setDate(new Date().toString());   
    }, [])
    
    return (
        <div className="card mx-5">
            <div className="card-header text-end">
                {date}
            </div>
            <div className="card-body">
                <blockquote className="blockquote mb-0">
                    <p>Every correct answer conatains 5 marks and every wrong answer minus 2 marks.</p>
                    <footer className="blockquote-footer"><cite title="Source Title">Admin</cite></footer>
                </blockquote>
            </div>
        </div>
    )
}
