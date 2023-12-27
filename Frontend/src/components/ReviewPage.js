import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ReviewForm() {
  const { productId, userName } = useParams();
  console.log('productId:', productId);
  console.log('userName:', userName);

  const [formData, setFormData] = useState({
    rating: 0, // Initial rating
    comment: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStarClick = (rating) => {
    setFormData({
      ...formData,
      rating,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      productId,
      userName,
      rating: formData.rating,
      comment: formData.comment,
    };
    try {
      const response = await axios.post(
        `http://localhost:3005/review/${productId}/${userName}`,
        reviewData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(reviewData);
      if (response.status === 201) {
        alert('Review created successfully!');
      } else {
        alert('Failed to create the review.');
      }
    } catch (error) {
      console.error('Error creating review:', error);
      alert('Failed to create the review.');
    }
  };

  const renderStars = () => {
    const maxRating = 5;
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <span
          key={i}
          className={`text-4xl cursor-pointer  ${
            i <= formData.rating ? 'text-yellow-500' : 'text-gray-300'
          }`}
          onClick={() => handleStarClick(i)}
        >
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="w-1/3 p-8 my-8">
        <h2 className="text-2xl mb-4 text-center font-bold text-white bg-gray-900  rounded-full">
          Write a Review
        </h2>
        <div className="container p-4 bg-cyan-900  rounded shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="rating" className="block font-bold">
                Rating *
              </label>
              <div className="flex">{renderStars()}</div>
            </div>
            <div className="mb-4">
              <label htmlFor="comment" className="block font-bold">
                Review Comment *
              </label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-blue-500"
                rows="4"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="bg-gray-900 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-600 cursor-pointer"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
