import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import icons for the new card design and pagination
import { FaStar, FaFlask, FaCalendarAlt, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const CollegesPage = () => {
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- NEW: State for pagination ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        // Fetch data from your server
        fetch('http://localhost:5000/colleges')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch data from server');
                }
                return res.json();
            })
            .then(data => {
                setColleges(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // --- NEW: Pagination Logic ---
    const totalPages = Math.ceil(colleges.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentColleges = colleges.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    
    const handleGoToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    if (loading) {
        return <div className="text-center py-40 text-2xl font-bold text-[#0A5275]">Loading Colleges...</div>;
    }

    if (error) {
        return <div className="text-center py-40 text-2xl font-bold text-red-600">Error: {error}</div>;
    }

    return (
        <div className="bg-gray-50 py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#0A5275]">All Our Colleges</h1>
                    <p className="mt-4 text-lg text-gray-600">Browse and discover the perfect institution for you.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* MODIFIED: Map over `currentColleges` instead of all colleges */}
                    {currentColleges.map((college) => (
                        <div key={college._id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                            <img src={college.image} alt={college.name} className="w-full h-48 object-cover" />
                            
                            <div className="p-6 flex-grow flex flex-col">
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">{college.name}</h3>
                                
                                <div className="grid grid-cols-2 gap-4 mb-4 text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <FaStar className="text-yellow-500" />
                                        <span className="font-semibold">{college.rating || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaFlask className="text-blue-500" />
                                        <span className="font-semibold">{college.researchWorks?.length || 0} Researches</span>
                                    </div>
                                </div>

                                <p className="flex items-center gap-2 text-gray-600 mb-4">
                                    <FaCalendarAlt className="text-green-500" />
                                    <span className="font-semibold">Admission:</span> {college.admissionDates}
                                </p>
                                
                                <div className="mt-auto">
                                    <Link
                                        to={`/college/${college._id}`}
                                        className="w-full mt-4 inline-flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none"
                                    >
                                        View Details <FaChevronRight size="0.8em" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- NEW: Pagination Controls --- */}
                {totalPages > 1 && (
                    <div className="mt-16 flex justify-center items-center gap-2">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-md shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <FaChevronLeft size="0.8em" />
                            Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                            <button
                                key={pageNumber}
                                onClick={() => handleGoToPage(pageNumber)}
                                className={`px-4 py-2 rounded-md shadow-sm transition-colors ${
                                    currentPage === pageNumber
                                        ? 'bg-green-500 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {pageNumber}
                            </button>
                        ))}

                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-md shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Next
                            <FaChevronRight size="0.8em" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CollegesPage;