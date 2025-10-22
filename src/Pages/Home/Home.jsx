import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Importing necessary icons
import { FaSearch, FaBuilding, FaCalendarAlt, FaFlask, FaStar, FaChevronRight, FaFileAlt, FaQuoteLeft } from 'react-icons/fa';

// Dummy data for sections not yet in backend
const galleryImages = [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto-format&fit=crop',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto-format&fit=crop',
    'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1974&auto-format&fit=crop',
    'https://images.unsplash.com/photo-1571260899241-312d143a4501?q=80&w=2070&auto-format&fit=crop',
];
const researchPapers = [
    { title: 'The Impact of AI on Modern Education Systems', link: '#', author: 'Dr. Jane Doe, Northwood Tech' },
    { title: 'Sustainable Urban Farming: A Case Study', link: '#', author: 'John Smith, Evergreen State' },
];
// REMOVED: Dummy reviews array is no longer needed.

const Home = () => {
    const [allColleges, setAllColleges] = useState([]);
    const [filteredColleges, setFilteredColleges] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    // --- NEW: State for dynamic reviews ---
    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(true);

    // useEffect for fetching colleges
    useEffect(() => {
        fetch('http://localhost:5000/colleges')
            .then(res => res.json())
            .then(data => {
                setAllColleges(data);
                setFilteredColleges(data.slice(0, 3)); 
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch college data:", error);
                setLoading(false);
            });
    }, []);

    // --- NEW: useEffect for fetching reviews ---
    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => {
                setReviews(data);
                setReviewsLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch reviews:", error);
                setReviewsLoading(false);
            });
    }, []);

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        if (term) {
            const results = allColleges.filter(college =>
                college.name.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredColleges(results);
        } else {
            setFilteredColleges(allColleges.slice(0, 3));
        }
    };

    return (
        <main className="bg-gray-50">
            {/* ===== 1. Search Section ===== */}
            <section className="bg-white pt-10 pb-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#0A5275]">Find Your Future College</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Search our full directory of institutions to start your journey.
                    </p>
                    <div className="mt-8 max-w-2xl mx-auto">
                        <div className="relative bg-white rounded-lg shadow-md p-1 border-l-4 border-green-500">
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    placeholder="Search by college name..."
                                    className="w-full py-3 pl-4 text-gray-700 bg-transparent focus:outline-none"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                                <button type="button" className="bg-green-500 text-white p-4 rounded-md hover:bg-green-600 transition-colors" aria-label="Search">
                                    <FaSearch />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== 2. College Cards Section ===== */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-[#0A5275] mb-12">
                        {/* MODIFIED: More descriptive title for the initial view */}
                        {searchTerm ? 'Search Results' : 'Featured Colleges'}
                    </h2>
                    {loading ? (
                        <p className="text-center text-gray-500 text-xl">Loading colleges...</p>
                    ) : filteredColleges.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredColleges.map((college) => (
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
                    ) : (
                        <p className="text-center text-gray-500 text-xl">No colleges found matching your search.</p>
                    )}
                </div>
            </section>

            {/* ===== 3. Graduate Image Gallery Section ===== */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-[#0A5275] mb-12">Moments from Campus Life</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="grid gap-4">
                            <div><img className="h-auto max-w-full rounded-lg shadow-md transition-transform duration-300 hover:scale-105" src={galleryImages[0]} alt="Graduation ceremony"/></div>
                            <div><img className="h-auto max-w-full rounded-lg shadow-md transition-transform duration-300 hover:scale-105" src={galleryImages[1]} alt="Students studying together"/></div>
                        </div>
                        <div className="grid gap-4">
                            <div><img className="h-auto max-w-full rounded-lg shadow-md transition-transform duration-300 hover:scale-105" src={galleryImages[2]} alt="Students in a group"/></div>
                            <div><img className="h-auto max-w-full rounded-lg shadow-md transition-transform duration-300 hover:scale-105" src={galleryImages[3]} alt="Campus event"/></div>
                        </div>
                         <div className="grid gap-4">
                            <div><img className="h-auto max-w-full rounded-lg shadow-md transition-transform duration-300 hover:scale-105" src={galleryImages[1]} alt="Students studying together"/></div>
                            <div><img className="h-auto max-w-full rounded-lg shadow-md transition-transform duration-300 hover:scale-105" src={galleryImages[0]} alt="Graduation ceremony"/></div>
                        </div>
                        <div className="grid gap-4">
                           <div><img className="h-auto max-w-full rounded-lg shadow-md transition-transform duration-300 hover:scale-105" src={galleryImages[3]} alt="Campus event"/></div>
                           <div><img className="h-auto max-w-full rounded-lg shadow-md transition-transform duration-300 hover:scale-105" src={galleryImages[2]} alt="Students in a group"/></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== 4. Research Papers Section ===== */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-[#0A5275] mb-12">Pioneering Research</h2>
                    <ul className="space-y-6">
                        {researchPapers.map((paper, index) => (
                            <li key={index} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                                <a href={paper.link} className="text-xl font-semibold text-gray-800 hover:text-green-600 transition-colors flex items-start gap-3">
                                    <FaFileAlt className="text-green-500 mt-1 flex-shrink-0" />
                                    <span>{paper.title}</span>
                                </a>
                                <p className="text-gray-500 mt-2 ml-6">{paper.author}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

        <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-[#0A5275] mb-12">What Our Alumni Say</h2>
                    {reviewsLoading ? (
                        <p className="text-center text-gray-500">Loading reviews...</p>
                    ) : reviews.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {reviews.map((review) => (
                                <div key={review._id} className="bg-gray-50 p-8 rounded-lg shadow-lg relative">
                                    <FaQuoteLeft className="absolute top-4 left-4 text-5xl text-gray-200" />
                                    <p className="relative text-gray-600 italic text-lg mb-6">"{review.reviewText}"</p>
                                    <div className="flex items-center">
                                        <img 
                                            src={review.reviewerImage || 'https://i.ibb.co/6HFLcN8/default-avatar.png'} 
                                            alt={review.reviewerName} 
                                            className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-green-500" 
                                        />
                                        <div>
                                            <p className="font-bold text-gray-800">{review.reviewerName}</p>
                                            <p className="text-sm text-gray-500">{review.collegeName}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No reviews have been submitted yet.</p>
                    )}
                </div>
            </section>
        </main>
    );
};

export default Home;