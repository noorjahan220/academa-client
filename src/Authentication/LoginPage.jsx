import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSearch, FaEye, FaEyeSlash, FaChevronRight } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // 1. Import router hooks and Link
import { AuthContext } from '../Provider/AuthProvider';



const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState(''); // State to hold login errors

    // 3. Access the signIn function from your context
    const { signIn } = useContext(AuthContext);

    // 4. Initialize navigation and location hooks for redirection
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"; // Redirect to previous page or homepage

    const {
        register,
        handleSubmit, // We will use handleSubmit now
        formState: { errors }
    } = useForm({
        mode: 'onBlur'
    });

    // 5. Create the onSubmit function to handle login logic
    const onSubmit = (data) => {
        setLoginError(''); // Clear previous errors
        console.log("Attempting to log in with:", data.email);

        signIn(data.email, data.password)
            .then(result => {
                const loggedInUser = result.user;
                console.log("Successfully logged in:", loggedInUser);
                // Redirect the user after successful login
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error("Login Error:", error.message);
                // Set a user-friendly error message
                setLoginError("Failed to login. Please check your email and password.");
            });
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* ===== Top Section (No changes) ===== */}
            <header className="relative bg-[#0A5275] text-white pt-12 pb-24 text-center">
                <h1 className="text-4xl font-bold">Login</h1>
                <div className="mt-8 max-w-2xl mx-auto px-4">
                    {/* ... search bar ... */}
                </div>
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

                    {/* 6. Connect the form tag with react-hook-form's handleSubmit */}
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-6">
                        {/* Email Address Field */}
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-600">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="your.email@example.com"
                                className={`mt-1 block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-green-500'}`}
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Please enter a valid email address"
                                    }
                                })}
                            />
                            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-600">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    className={`mt-1 block w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-green-500'}`}
                                    {...register("password", {
                                        required: "Password is required"
                                    })}
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
                            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
                        </div>
                        
                        {/* ... Remember Me and Forgot Password ... */}
                        
                        {/* 7. Display login error message if it exists */}
                        {loginError && <p className="text-sm text-red-600 text-center">{loginError}</p>}

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
                        {/* 8. Use Link component for internal navigation */}
                        <Link to="/register" className="font-medium text-green-600 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </main>

            {/* ===== Bottom Section (No changes) ===== */}
            <footer className="relative bg-[#0A5275] text-white pt-32 pb-20 text-center">
               {/* ... footer content ... */}
            </footer>
        </div>
    );
};

export default LoginPage;