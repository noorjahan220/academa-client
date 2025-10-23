import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Importing icons to match the theme
import {
    FaUniversity,
    FaCalendarCheck,
    FaMicroscope,
    FaFutbol,
    FaArrowLeft
} from 'react-icons/fa';

const CollegeDetailsPage = () => {
    const { id } = useParams(); // Get the 'id' from the URL
    const [college, setCollege] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the specific college data when the component mounts or id changes
        fetch(`https://academa-server.vercel.app/colleges/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('College not found');
                }
                return res.json();
            })
            .then(data => {
                setCollege(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]); // Dependency array ensures it refetches if the id in the URL changes

    if (loading) {
        return <div className="text-center py-40 text-2xl font-bold text-[#0A5275]">Loading College Details...</div>;
    }

    if (error || !college) {
        return (
            <div className="text-center py-40">
                <h1 className="text-3xl font-bold text-red-600 mb-4">Error: {error || 'College not found'}</h1>
                <Link to="/" className="inline-flex items-center gap-2 bg-green-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-green-600 transition-colors">
                    <FaArrowLeft /> Go Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* --- Hero Section with College Image and Name --- */}
            <header
                className="relative h-96 bg-cover bg-center text-white flex items-center justify-center"
                style={{ backgroundImage: `url(${college.image})` }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative text-center px-4">
                    <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg">{college.name}</h1>
                </div>
                <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 bg-white text-gray-800 font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-gray-200 transition-colors">
                    <FaArrowLeft /> Back to Home
                </Link>
            </header>

            {/* --- Main Content Area --- */}
            <main className="max-w-7xl mx-auto py-16 px-4 space-y-16">
                
                {/* --- Admission Process Section --- */}
                <section className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-[#0A5275] mb-6 flex items-center gap-3">
                        <FaUniversity /> Admission Process
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{college.admissionProcess}</p>
                </section>

                {/* --- Events, Research, and Sports in a Grid --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* --- Events Details Section --- */}
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold text-[#0A5275] mb-6 flex items-center gap-3">
                            <FaCalendarCheck /> Upcoming Events
                        </h2>
                        <ul className="space-y-6">
                            {college.eventsDetails?.map((event, index) => (
                                <li key={index} className="border-l-4 border-green-500 pl-4">
                                    <h3 className="font-bold text-xl text-gray-800">{event.name}</h3>
                                    <p className="text-sm text-gray-500 font-semibold mb-1">Date: {event.date}</p>
                                    <p className="text-gray-600">{event.description}</p>
                                </li>
                            )) || <p className="text-gray-500">No event details available.</p>}
                        </ul>
                    </div>

                    {/* --- Research and Sports Sections --- */}
                    <div className="space-y-12">
                         {/* --- Research Works Section --- */}
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h2 className="text-3xl font-bold text-[#0A5275] mb-6 flex items-center gap-3">
                                <FaMicroscope /> Featured Research
                            </h2>
                            <ul className="space-y-4">
                                {college.researchWorks?.map((work, index) => (
                                    <li key={index} className="text-gray-700">
                                        <p className="font-semibold">{work.title}</p>
                                        <p className="text-sm text-gray-500">- {work.author}</p>
                                    </li>
                                )) || <p className="text-gray-500">No research works available.</p>}
                            </ul>
                        </div>
                        
                        {/* --- Sports Categories Section --- */}
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h2 className="text-3xl font-bold text-[#0A5275] mb-6 flex items-center gap-3">
                                <FaFutbol /> Sports Categories
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {college.sports?.length > 0 ? college.sports.map((sport, index) => (
                                    <span key={index} className="bg-green-100 text-green-800 text-md font-semibold px-4 py-2 rounded-full">
                                        {sport}
                                    </span>
                                )) : <p className="text-gray-500">No sports categories listed.</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CollegeDetailsPage;