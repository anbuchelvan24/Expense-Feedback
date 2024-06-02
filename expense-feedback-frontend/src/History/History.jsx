import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './History.css';
import Navbar from '../Navbar/Navbar';

const History = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
          const userData = localStorage.getItem('user');
          const userObject = JSON.parse(userData);
          const email = userObject.email;
          console.log(email);
      
          axios.get(`http://127.0.0.1:5000/user-expenses/${email}`)
            .then(response => {
                setFeedbacks(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the feedbacks!', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="history-container">Loading...</div>;
    }

    if (error) {
        return <div className="history-container">Error loading feedbacks: {error.message}</div>;
    }

    return (
      <div>
      <Navbar />

        <div className="history-container">

            <h1>User Feedback History</h1>
            {feedbacks.length > 0 ? (
                <div className="feedback-list">
                    {feedbacks.slice().reverse().map((feedback, index) => (
                        <div key={feedback.id} className="feedback-card">
                            <div className="feedback-header">
                                <span className="feedback-date">{new Date(feedback.transactionDate).toLocaleDateString()}</span>
                                <p>Expense Report {feedbacks.length - index}</p> {/* Printing the index */}
                                <span className="feedback-amount">{feedback.amount} {feedback.currency}</span>
                            </div>
                            <div className="feedback-body">
                                <p><strong>Business Purpose:</strong> {feedback.businessPurpose}</p>
                                <p><strong>Vendor:</strong> {feedback.vendorDescription}</p>
                                <p><strong>City:</strong> {feedback.city}</p>
                                <p><strong>Payment Type:</strong> {feedback.paymentType}</p>
                                <p><strong>Tax & Posted Amount:</strong> {feedback.taxAndPostedAmount}</p>
                                <p><strong>Personal Expense:</strong> {feedback.personalExpense ? 'Yes' : 'No'}</p>
                                <p><strong>Comment:</strong> {feedback.comment}</p>
                                <div className= "feedback-scrollable">
                                <p><strong>Feedback:</strong> {feedback.response_from_query_rag}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
              <div className="nofeedback">
                <p>No feedbacks found.</p>
              </div>
            )}
        </div>

        </div>
    );
};

export default History;
