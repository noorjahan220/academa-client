// src/Pages/ErrorPage/ErrorPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const ErrorPage = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header with matching style */}
            <header className="relative bg-[#0A5275] text-white pt-12 pb-24 text-center">
                <h1 className="text-4xl font-bold">Something's Missing</h1>
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[75px]">
                        <path d="M1200 120L0 120 0 0 1200 0 1200 120z" className="fill-gray-50"></path>
                    </svg>
                </div>
            </header>
            
            <main className="flex items-center justify-center -mt-12">
                 <div className="bg-white max-w-2xl mx-auto rounded-lg shadow-lg p-8 md:p-12 text-center relative z-10">
                    <h2 className="text-8xl md:text-9xl font-extrabold text-[#0A5275] tracking-wider">404</h2>
                    <p className="mt-4 text-2xl font-semibold text-gray-700">Page Not Found</p>
                    <p className="mt-2 text-gray-500">
                        Oops! The page you are looking for does not exist. It might have been moved or deleted.
                    </p>
                    <div className="mt-8">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 py-3 px-6 border border-transparent rounded-full shadow-sm text-lg font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            <FaHome />
                            Go Back Home
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ErrorPage;