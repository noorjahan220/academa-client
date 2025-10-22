import React, { useState } from 'react';
// Importing icons from react-icons
import { FaSearch, FaEye, FaEyeSlash, FaChevronRight } from 'react-icons/fa';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* ===== Top Section with Curve ===== */}
            <header className="relative bg-[#0A5275] text-white pt-12 pb-24 text-center">
                <h1 className="text-4xl font-bold">Login</h1>

                {/* Search Bar */}
                <div className="mt-8 max-w-2xl mx-auto px-4">
                    <div className="relative bg-white rounded-lg shadow-md p-1 border-l-4 border-green-500">
                        <form className="flex items-center">
                            <input
                                type="text"
                                placeholder="What do you want to learn?"
                                className="w-full py-3 pl-4 text-gray-700 bg-transparent focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="bg-green-500 text-white p-4 rounded-md hover:bg-green-600 transition-colors"
                                aria-label="Search"
                            >
                                <FaSearch />
                            </button>
                        </form>
                    </div>
                </div>

                {/* SVG Curve for the bottom of the header */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[75px]">
                        <path d="M1200 120L0 120 0 0 1200 0 1200 120z" className="fill-gray-50"></path>
                    </svg>
                </div>
            </header>

            {/* ===== Main Content - Login Form ===== */}
            <main className="py-16 px-4">
                <div className="bg-white max-w-md mx-auto rounded-lg shadow-lg p-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-800">Login</h2>
                        <p className="mt-2 text-sm text-green-600">
                            Welcome! Please confirm that you are visiting
                        </p>
                    </div>

                    <form className="mt-8 space-y-6">
                        {/* User Name Field */}
                        <div>
                            <label htmlFor="username" className="text-sm font-medium text-gray-600">
                                User Name
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="User Name"
                                className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-600">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-gray-700">
                                    Remember Password
                                </label>
                            </div>
                            <a href="#" className="font-medium text-gray-600 hover:text-green-500 underline">
                                Forgot Password?
                            </a>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Login <FaChevronRight size="0.8em" />
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        New User?{' '}
                        <a href="#" className="font-medium text-green-600 hover:underline">
                            Sign Up
                        </a>
                    </p>
                </div>
            </main>

            {/* ===== Bottom Section with Curve ===== */}
            <footer className="relative bg-[#0A5275] text-white pt-32 pb-20 text-center">
                {/* SVG Curve for the top of the footer */}
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
                     <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[75px]">
                        <path d="M1200 0L0 0 0 120 1200 120 1200 0z" className="fill-gray-50"></path>
                    </svg>
                </div>

                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-4xl font-bold">Ready to get started?</h2>
                    <p className="mt-4 text-gray-300">
                        Replenish him third creature and meat blessed void a fruit gathered you're, they're two waters own morning gathered greater shall had behold had seed.
                    </p>
                    <div className="mt-8 flex justify-center items-center gap-4">
                        <button className="flex items-center gap-2 bg-green-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-green-600 transition-colors">
                            Get Started <FaChevronRight size="0.8em" />
                        </button>
                        <button className="flex items-center gap-2 bg-white text-gray-800 font-semibold py-3 px-6 rounded-full hover:bg-gray-200 transition-colors">
                            All Courses <FaChevronRight size="0.8em" />
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LoginPage;