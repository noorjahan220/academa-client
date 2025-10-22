import  { useContext, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
 
import { FaSearch, FaEye, FaEyeSlash, FaChevronRight } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';

const RegisterPage = () => {
  
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [error, setError] = useState('');

    // Get auth functions from context and navigate function from router
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    // Handle form submission for registration
    const handleSignUp = (event) => {
        event.preventDefault();
        setError(''); // Reset error on new submission

        const form = event.target;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const fullName = `${firstName} ${lastName}`;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const terms = form.terms.checked;

        // --- Basic Validations ---
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        if (!terms) {
            setError("You must agree to the Terms & Conditions.");
            return;
        }

        // --- Firebase User Creation ---
        createUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log("New user created:", loggedUser);

                // Update the new user's profile with their full name
                return updateUserProfile(fullName, null); // We pass null for the photo URL
            })
            .then(() => {
                console.log("User profile updated successfully.");
                // You can add a success alert/toast here if you like
                navigate('/'); // Redirect to the home page after successful registration
            })
            .catch(err => {
                console.error(err);
                // Set a user-friendly error message
                setError(err.message);
            });
    };


    return (
        <div className="bg-gray-50 min-h-screen">
            {/* ===== Top Section with Curve (from Login Page) ===== */}
            <header className="relative bg-[#0A5275] text-white pt-12 pb-24 text-center">
                <h1 className="text-4xl font-bold">Register</h1> {/* Changed text to Register */}
                {/* Search Bar */}
                <div className="mt-8 max-w-2xl mx-auto px-4">
                    <div className="relative bg-white rounded-lg shadow-md p-1 border-l-4 border-green-500">
                        <form className="flex items-center">
                            <input type="text" placeholder="What do you want to learn?" className="w-full py-3 pl-4 text-gray-700 bg-transparent focus:outline-none" />
                            <button type="submit" className="bg-green-500 text-white p-4 rounded-md hover:bg-green-600 transition-colors" aria-label="Search"> <FaSearch /> </button>
                        </form>
                    </div>
                </div>
                {/* SVG Curve */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[75px]">
                        <path d="M1200 120L0 120 0 0 1200 0 1200 120z" className="fill-gray-50"></path>
                    </svg>
                </div>
            </header>

            {/* ===== Main Content - THE NEW REGISTRATION FORM ===== */}
            <main className="py-16 px-4">
                <div className="bg-white max-w-4xl mx-auto rounded-lg shadow-lg p-8 space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-800">Create an Account</h2>
                        <p className="mt-2 text-sm text-green-600">
                            Join us and start your learning journey!
                        </p>
                    </div>

                    {/* Form now handles submission with handleSignUp */}
                    <form onSubmit={handleSignUp} className="mt-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* All inputs now have a `name` attribute */}
                            <div>
                                <label htmlFor="firstName" className="text-sm font-medium text-gray-600">First Name</label>
                                <input id="firstName" name="firstName" type="text" placeholder="First Name" required className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="text-sm font-medium text-gray-600">Last Name</label>
                                <input id="lastName" name="lastName" type="text" placeholder="Last Name" required className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                            </div>
                            <div>
                                <label htmlFor="email" className="text-sm font-medium text-gray-600">Email Address</label>
                                <input id="email" name="email" type="email" placeholder="abcd@gmail.com" required className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="text-sm font-medium text-gray-600">Phone Number</label>
                                <input id="phone" name="phone" type="tel" placeholder="+1 (800) 123-4567" className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                            </div>
                            <div>
                                <label htmlFor="password" className="text-sm font-medium text-gray-600">Password</label>
                                <div className="relative">
                                    <input id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" required className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500">
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-600">Confirm Password</label>
                                <div className="relative">
                                    <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm Password" required className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500">
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <fieldset>
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center"><input id="male" name="gender" type="radio" className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500" /><label htmlFor="male" className="ml-2 block text-sm text-gray-700">Male</label></div>
                                <div className="flex items-center"><input id="female" name="gender" type="radio" className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500" /><label htmlFor="female" className="ml-2 block text-sm text-gray-700">Female</label></div>
                                <div className="flex items-center"><input id="others" name="gender" type="radio" className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500" /><label htmlFor="others" className="ml-2 block text-sm text-gray-700">Others</label></div>
                            </div>
                        </fieldset>

                        <div className="flex items-center">
                            <input id="terms" name="terms" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">I agree the user agreement and <a href="#" className="font-bold text-green-600 hover:underline">Terms & Conditions</a></label>
                        </div>
                        
                        {/* Error message display */}
                        {error && (
                            <div className="text-center text-red-600 font-medium bg-red-100 p-3 rounded-md">
                                {error}
                            </div>
                        )}

                        <div>
                            <button type="submit" className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                Sign Up <FaChevronRight size="0.8em" />
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        {/* Use Link for client-side navigation */}
                        <Link to="/login" className="font-medium text-green-600 hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </main>

            {/* ===== Bottom Section with Curve (from Login Page) ===== */}
            <footer className="relative bg-[#0A5275] text-white pt-32 pb-20 text-center">
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

export default RegisterPage;