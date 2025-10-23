import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
// Adjust path to your AuthProvider

const AdmissionPage = () => {
    const { user } = useContext(AuthContext); // Get the logged-in user
    const [colleges, setColleges] = useState([]);
    const [selectedCollege, setSelectedCollege] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch all colleges to display their names
    useEffect(() => {
        fetch('https://academa-server.vercel.app/colleges')
            .then(res => res.json())
            .then(data => {
                setColleges(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch colleges:", error);
                setLoading(false);
            });
    }, []);

    const handleCollegeSelect = (college) => {
        setSelectedCollege(college);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (!user) {
            alert("Please log in to submit an application.");
            return;
        }

        const form = event.target;
        const admissionData = {
            collegeId: selectedCollege._id,
            collegeName: selectedCollege.name,
            candidateName: form.candidateName.value,
            subject: form.subject.value,
            candidateEmail: user.email, // Use the logged-in user's email
            candidatePhone: form.candidatePhone.value,
            address: form.address.value,
            dateOfBirth: form.dateOfBirth.value,
            image: form.image.value, // This would be a URL to the image
        };

        // POST the data to the server
        fetch('https://academa-server.vercel.app/admissions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(admissionData),
        })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                alert('Application submitted successfully!');
                form.reset();
                setSelectedCollege(null); // Go back to the college list view
            }
        })
        .catch(error => {
            console.error('Error submitting application:', error);
            alert('Failed to submit application.');
        });
    };

    return (
        <div className="bg-gray-50 py-20 px-4 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#0A5275]">College Admission</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        {selectedCollege ? `Applying to: ${selectedCollege.name}` : 'Select a college to start your application.'}
                    </p>
                </div>

                {/* If a college is selected, show the form. Otherwise, show the list. */}
                {selectedCollege ? (
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <button 
                            onClick={() => setSelectedCollege(null)}
                            className="text-green-600 font-semibold mb-6 hover:underline"
                        >
                            &larr; Back to College List
                        </button>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* ===== THIS IS THE NEWLY ADDED BLOCK ===== */}
                                <div className="md:col-span-2">
                                    <label htmlFor="collegeName" className="text-sm font-medium text-gray-600">Applying for College</label>
                                    <input 
                                        id="collegeName" 
                                        name="collegeName" 
                                        type="text" 
                                        value={selectedCollege.name} 
                                        readOnly 
                                        className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-md shadow-sm bg-gray-100 cursor-not-allowed" 
                                    />
                                </div>
                                {/* ======================================= */}

                                {/* Existing Form fields */}
                                <div>
                                    <label htmlFor="candidateName" className="text-sm font-medium text-gray-600">Candidate Name</label>
                                    <input id="candidateName" name="candidateName" type="text" defaultValue={user?.displayName || ''} required className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-md shadow-sm" />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="text-sm font-medium text-gray-600">Subject</label>
                                    <input id="subject" name="subject" type="text" placeholder="e.g., Computer Science" required className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-md shadow-sm" />
                                </div>
                                <div>
                                    <label htmlFor="candidateEmail" className="text-sm font-medium text-gray-600">Candidate Email</label>
                                    <input id="candidateEmail" name="candidateEmail" type="email" value={user?.email || ''} readOnly className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-md shadow-sm bg-gray-100 cursor-not-allowed" />
                                </div>
                                <div>
                                    <label htmlFor="candidatePhone" className="text-sm font-medium text-gray-600">Candidate Phone</label>
                                    <input id="candidatePhone" name="candidatePhone" type="tel" required className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-md shadow-sm" />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="address" className="text-sm font-medium text-gray-600">Address</label>
                                    <input id="address" name="address" type="text" required className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-md shadow-sm" />
                                </div>
                                <div>
                                    <label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-600">Date of Birth</label>
                                    <input id="dateOfBirth" name="dateOfBirth" type="date" required className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-md shadow-sm" />
                                </div>
                                <div>
                                    <label htmlFor="image" className="text-sm font-medium text-gray-600">Image URL</label>
                                    <input id="image" name="image" type="url" placeholder="http://example.com/photo.jpg" required className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-md shadow-sm" />
                                </div>
                            </div>
                            <button type="submit" className="w-full py-3 px-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors">
                                Submit Application
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <ul className="space-y-4">
                            {loading ? <p>Loading colleges...</p> : colleges.map(college => (
                                <li key={college._id}>
                                    <button 
                                        onClick={() => handleCollegeSelect(college)}
                                        className="w-full text-left p-4 bg-gray-100 rounded-md hover:bg-green-100 hover:text-green-800 transition-colors font-semibold text-lg"
                                    >
                                        {college.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdmissionPage;