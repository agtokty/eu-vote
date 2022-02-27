import React from 'react';
import European_stars from '../assets/European_stars.svg';
import '../style/Page.css';
import { Link } from 'react-router-dom';

function HomePage() {

    return (
        <div className="Page">
            <div className='Page-content'>
                <img src={European_stars} className="Page-logo" alt="logo" />

                <div className='mt-10'>
                    <p className='text-3xl font-bold underline'>
                        Welcome to eu-vote
                    </p>
                </div>

                <div className='p-6 flex space-x-2'>
                    <Link to="verify">
                        <button type="button" className='bg-blue-600 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white'>
                            Verify & Vote Using Covid Pass
                        </button>
                    </Link>
                    <Link to="result">
                        <button type="button" className='bg-yellow-600 hover:bg-yellow-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white'>
                            Show Latest Results
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
