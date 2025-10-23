import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBuilding, FaCalendarAlt, FaFlask, FaStar, FaChevronRight, FaFileAlt, FaQuoteLeft } from 'react-icons/fa';

const galleryImages = [
    "https://i.ibb.co/rfxBjBM5/47274.jpg",         // 0
    "https://i.ibb.co/dJ71LZzf/images-1.jpg",      // 1
    "https://i.ibb.co/zHLQYFY6/images-2.jpg",      // 2
    "https://i.ibb.co/6RzjLZcf/images.jpg",        // 3
    "https://i.ibb.co/ymVNKN2J/download.jpg",      // 4
    "https://i.ibb.co/JjbwCpwY/images-3.jpg",      // 5
    "https://i.ibb.co/8LhnZQ0m/images-4.jpg",      // 6
    "https://i.ibb.co/nsp8Hkvy/images-5.jpg",      // 7 (This one was being skipped)
    "https://i.ibb.co/YTXHZV1C/download-1.jpg",    // 8
    "https://i.ibb.co/6RNGzZ0g/download-2.jpg"    
];
const researchPapers = [
    { title: 'The Impact of AI on Modern Education Systems', link: '#', author: 'Dr. Jane Doe, Northwood Tech' },
    { title: 'Sustainable Urban Farming: A Case Study', link: '#', author: 'John Smith, Evergreen State' },
];

const Home = () => {
    const [allColleges, setAllColleges] = useState([]);
    const [filteredColleges, setFilteredColleges] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(true);

    useEffect(() => {
        fetch('https://academa-server.vercel.app/colleges')
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

    useEffect(() => {
        fetch('https://academa-server.vercel.app/reviews')
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
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow">
                <section className="bg-gradient-to-r from-blue-900 to-teal-800 text-white py-20">
                    <div className="max-w-6xl mx-auto px-4 text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">Discover Your Perfect College</h1>
                        <p className="text-xl md:text-2xl mb-8 opacity-90">Find the institution that will shape your future success</p>
                        <div className="max-w-2xl mx-auto">
                            <div className="relative bg-white rounded-xl shadow-2xl p-1">
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Search by college name..."
                                        className="w-full py-4 pl-6 text-gray-700 bg-transparent focus:outline-none text-lg rounded-xl"
                                        value={searchTerm}
                                        onChange={handleSearch}
                                    />
                                    <button type="button" className="bg-green-500 text-white p-4 rounded-xl hover:bg-green-600 transition-colors mr-1" aria-label="Search">
                                        <FaSearch size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 px-4">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
                            {searchTerm ? 'Search Results' : 'Featured Colleges'}
                        </h2>
                        {loading ? (
                            <p className="text-center text-gray-500 text-xl">Loading colleges...</p>
                        ) : filteredColleges.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredColleges.map((college) => (
                                    <div key={college._id} className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-3 transition-all duration-300 flex flex-col hover:shadow-2xl">
                                        <img src={college.image} alt={college.name} className="w-full h-52 object-cover" />
                                        
                                        <div className="p-7 flex-grow flex flex-col">
                                            <h3 className="text-2xl font-bold text-gray-800 mb-4">{college.name}</h3>
                                            
                                            <div className="grid grid-cols-2 gap-4 mb-5 text-gray-700">
                                                <div className="flex items-center gap-2">
                                                    <FaStar className="text-yellow-500" />
                                                    <span className="font-semibold">{college.rating || 'N/A'}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FaFlask className="text-blue-500" />
                                                    <span className="font-semibold">{college.researchWorks?.length || 0} Researches</span>
                                                </div>
                                            </div>

                                            <p className="flex items-center gap-2 text-gray-600 mb-5">
                                                <FaCalendarAlt className="text-green-500" />
                                                <span className="font-semibold">Admission:</span> {college.admissionDates}
                                            </p>
                                            
                                            <div className="mt-auto">
                                                <Link
                                                    to={`/college/${college._id}`}
                                                    className="w-full mt-4 inline-flex justify-center items-center gap-2 py-3 px-5 border border-transparent rounded-xl shadow-sm text-md font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none transition-colors"
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

                {/* --- Campus Life Gallery Section (THE FIX IS HERE) --- */}
                <section className="py-20 px-4 ">
    <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
                Campus Life Gallery
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Experience the vibrant moments that make our campus community truly special
            </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {/* Column 1 */}
            <div className="flex flex-col gap-4 md:gap-6">
                <div className="group relative overflow-hidden rounded-2xl shadow-xl">
                    <img 
                        className="h-auto w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75" 
                        src={galleryImages[0]} 
                        alt="Graduation ceremony"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <p className="font-semibold text-sm">Graduation Ceremony</p>
                        </div>
                    </div>
                </div>
                <div className="group relative overflow-hidden rounded-2xl shadow-xl">
                    <img 
                        className="h-auto w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75" 
                        src={galleryImages[1]} 
                        alt="Students studying together"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <p className="font-semibold text-sm">Collaborative Learning</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4 md:gap-6">
                <div className="group relative overflow-hidden rounded-2xl shadow-xl">
                    <img 
                        className="h-auto w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75" 
                        src={galleryImages[2]} 
                        alt="Students in a group"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <p className="font-semibold text-sm">Student Community</p>
                        </div>
                    </div>
                </div>
                <div className="group relative overflow-hidden rounded-2xl shadow-xl">
                    <img 
                        className="h-auto w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75" 
                        src={galleryImages[3]} 
                        alt="Campus event"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <p className="font-semibold text-sm">Campus Events</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-4 md:gap-6">
                <div className="group relative overflow-hidden rounded-2xl shadow-xl">
                    <img 
                        className="h-auto w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75" 
                        src={galleryImages[4]} 
                        alt="University building"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <p className="font-semibold text-sm">Campus Architecture</p>
                        </div>
                    </div>
                </div>
                <div className="group relative overflow-hidden rounded-2xl shadow-xl">
                    <img 
                        className="h-auto w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75" 
                        src={galleryImages[5]} 
                        alt="Library interior"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <p className="font-semibold text-sm">Modern Library</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-4 md:gap-6">
                <div className="group relative overflow-hidden rounded-2xl shadow-xl">
                    <img 
                        className="h-auto w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75" 
                        src={galleryImages[6]} 
                        alt="Sports activity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <p className="font-semibold text-sm">Athletic Programs</p>
                        </div>
                    </div>
                </div>
                <div className="group relative overflow-hidden rounded-2xl shadow-xl">
                    <img 
                        className="h-auto w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75" 
                        src={galleryImages[7]} 
                        alt="Classroom lecture"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <p className="font-semibold text-sm">Interactive Learning</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

                <section className="py-20 px-4 ">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Pioneering Research</h2>
                        <ul className="space-y-6">
                            {researchPapers.map((paper, index) => (
                                <li key={index} className="bg-white p-7 rounded-2xl shadow-lg border-l-4 border-green-500 hover:shadow-xl transition-shadow">
                                    <a href={paper.link} className="text-xl font-semibold text-gray-800 hover:text-green-600 transition-colors flex items-start gap-4">
                                        <FaFileAlt className="text-green-500 mt-1 flex-shrink-0" />
                                        <span>{paper.title}</span>
                                    </a>
                                    <p className="text-gray-500 mt-3 ml-7">{paper.author}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="py-20 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">What Our Alumni Say</h2>
                        {reviewsLoading ? (
                            <p className="text-center text-gray-500">Loading reviews...</p>
                        ) : reviews.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {reviews.map((review) => (
                                    <div key={review._id} className="bg-gray-50 p-8 rounded-2xl shadow-xl relative hover:shadow-2xl transition-shadow">
                                        <FaQuoteLeft className="absolute top-6 left-6 text-5xl text-gray-200" />
                                        <p className="relative text-gray-600 italic text-lg mb-7">"{review.reviewText}"</p>
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

           
        </div>
    );
};

export default Home;