import React, { useState, useEffect, useContext } from 'react';
import { FaStar } from 'react-icons/fa'; 
import { AuthContext } from '../../Provider/AuthProvider';


const MyCollegePage = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [myAdmissions, setMyAdmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [reviewingCollege, setReviewingCollege] = useState(null);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    useEffect(() => {
        if (!authLoading && user?.email) {
            fetch(`http://localhost:5000/my-admissions/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setMyAdmissions(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Failed to fetch admissions:", error);
                    setLoading(false);
                });
        } else if (!authLoading && !user) {
            setLoading(false);
        }
    }, [user, authLoading]);

    
    const handleOpenReviewModal = (admission) => {
        setReviewingCollege(admission);
        setShowReviewModal(true);
    };

    const handleCloseReviewModal = () => {
        setShowReviewModal(false);
        setReviewingCollege(null);
        setRating(0);
        setReviewText('');
        setHoverRating(0);
    };

    const handleReviewSubmit = (event) => {
        event.preventDefault();
        if (rating === 0) {
            alert('Please select a rating.');
            return;
        }

        const reviewData = {
            collegeId: reviewingCollege.collegeId,
            collegeName: reviewingCollege.collegeName,
            reviewerName: user.displayName,
            reviewerEmail: user.email,
            reviewerImage: user.photoURL,
            rating: rating,
            reviewText: reviewText,
        };

        fetch('http://localhost:5000/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData)
        })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                alert('Thank you! Your review has been submitted.');
                handleCloseReviewModal();
            } else {
                throw new Error('Failed to submit review.');
            }
        })
        .catch(err => {
            console.error(err);
            alert('An error occurred. Please try again.');
        });
    };

  
    if (loading || authLoading) {
        return <div className="text-center py-40 text-2xl font-bold text-[#0A5275]">Loading Your Applications...</div>;
    }

    if (!user) {
        return <div className="text-center py-40 text-xl font-bold text-red-600">Please log in to view your college applications.</div>;
    }

    return (
        <>
            <div className="bg-gray-50 py-20 px-4 min-h-screen">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-[#0A5275]">My College Applications</h1>
                        <p className="mt-4 text-lg text-gray-600">Here are the applications you have submitted.</p>
                    </div>

                    {myAdmissions.length > 0 ? (
                        <div className="space-y-8">
                            {myAdmissions.map(admission => (
                                <div key={admission._id} className="bg-white p-8 rounded-lg shadow-lg">
                                    <div className="flex flex-col md:flex-row gap-8 items-center">
                                        <img src={admission.image} alt={admission.candidateName} className="w-32 h-32 rounded-full object-cover border-4 border-green-500" />
                                        <div className="flex-1 w-full">
                                            <h2 className="text-3xl font-bold text-gray-800">{admission.collegeName}</h2>
                                            <p className="text-lg text-gray-600 mt-1">
                                                Applying for: <span className="font-semibold">{admission.subject}</span>
                                            </p>
                                            <hr className="my-4" />
                                           
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-gray-700">
                                                <p><strong>Name:</strong> {admission.candidateName}</p>
                                                <p><strong>Email:</strong> {admission.candidateEmail}</p>
                                                <p><strong>Phone:</strong> {admission.candidatePhone}</p>
                                                <p><strong>Date of Birth:</strong> {admission.dateOfBirth}</p>
                                                <p className="sm:col-span-2"><strong>Address:</strong> {admission.address}</p>
                                            </div>
                                            
                                        </div>
                                    </div>
                                   
                                    <div className="text-right mt-6">
                                        <button onClick={() => handleOpenReviewModal(admission)} className="bg-green-500 text-white font-semibold py-2 px-5 rounded-md hover:bg-green-600 transition-colors">
                                            Add a Review
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                         <div className="text-center bg-white p-12 rounded-lg shadow-lg">
                            <p className="text-xl text-gray-500">You have not submitted any college applications yet.</p>
                        </div>
                    )}
                </div>
            </div>

           
            {showReviewModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Leave a Review for {reviewingCollege.collegeName}</h2>
                        <form onSubmit={handleReviewSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600 mb-2">Your Rating</label>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar
                                            key={star}
                                            size={30}
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            color={(hoverRating || rating) >= star ? '#FFC107' : '#E4E5E9'}
                                            className="cursor-pointer"
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="reviewText" className="block text-sm font-medium text-gray-600">Your Review</label>
                                <textarea
                                    id="reviewText"
                                    rows="4"
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-md shadow-sm"
                                    placeholder="Share your experience..."
                                ></textarea>
                            </div>
                            <div className="flex justify-end gap-4">
                                <button type="button" onClick={handleCloseReviewModal} className="py-2 px-5 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300">
                                    Cancel
                                </button>
                                <button type="submit" className="py-2 px-5 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600">
                                    Submit Review
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default MyCollegePage;