import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Importing necessary icons
import { FaSearch, FaBuilding, FaCalendarAlt, FaFlask, FaFutbol, FaChevronRight, FaFileAlt, FaQuoteLeft } from 'react-icons/fa';

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
const reviews = [
    { id: 1, name: 'Alex Johnson', college: 'Maplewood University', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', review: 'The research opportunities are unparalleled. The professors are incredibly supportive!' },
    { id: 2, name: 'Maria Garcia', college: 'Northwood Technical Institute', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', review: 'I loved my time at Northwood. The hands-on approach to learning prepared me for my career.' },
];

const Home = () => {
    const [allColleges, setAllColleges] = useState([]);
    const [filteredColleges, setFilteredColleges] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/colleges')
            .then(res => res.json())
            .then(data => {
                setAllColleges(data);
                // When there's no search, show all colleges, not just the first 3
                setFilteredColleges(data); 
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch college data:", error);
                setLoading(false);
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
            // If search is empty, show all colleges again
            setFilteredColleges(allColleges);
        }
    };

    return (
        <main className="bg-gray-50">
            {/* Search Section */}
            <section className="bg-white pt-10 pb-16">
                 {/* ... (search input code is correct) ... */}
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
                            <button
                                type="button"
                                className="bg-green-500 text-white p-4 rounded-md hover:bg-green-600 transition-colors"
                                aria-label="Search"
                            >
                                <FaSearch />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* College Cards Section - CORRECTED */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-[#0A5275] mb-12">
                        {searchTerm ? 'Search Results' : 'Our Colleges'}
                    </h2>
                    {loading ? (
                        <p className="text-center text-gray-500 text-xl">Loading colleges...</p>
                    ) : filteredColleges.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* This is the only mapping block needed */}
                            {filteredColleges.map((college) => (
                                <div key={college._id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                                    <img src={college.image} alt={college.name} className="w-full h-48 object-cover" />
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{college.name}</h3>
                                        <p className="flex items-center gap-2 text-gray-600 mb-4">
                                            <FaCalendarAlt className="text-green-500" />
                                            <span className="font-semibold">Admission:</span> {college.admissionDates}
                                        </p>
                                        <div className="mb-4">
                                            {/* ... (highlights code is fine) ... */}
                                        </div>
                                        <Link
                                            to={`/college/${college._id}`} // This uses the correct MongoDB ID
                                            className="w-full mt-6 inline-flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none"
                                        >
                                            View Details <FaChevronRight size="0.8em" />
                                        </Link>
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

            {/* ===== 5. Review Section ===== */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-[#0A5275] mb-12">What Our Alumni Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {reviews.map((review) => (
                            <div key={review.id} className="bg-gray-50 p-8 rounded-lg shadow-lg relative">
                                <FaQuoteLeft className="absolute top-4 left-4 text-5xl text-gray-200" />
                                <p className="relative text-gray-600 italic text-lg mb-6">"{review.review}"</p>
                                <div className="flex items-center">
                                    <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-green-500" />
                                    <div>
                                        <p className="font-bold text-gray-800">{review.name}</p>
                                        <p className="text-sm text-gray-500">{review.college}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;