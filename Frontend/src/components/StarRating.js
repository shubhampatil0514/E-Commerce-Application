import React from 'react';

const StarRating = ({ rating }) => {
 
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={i} className="text-yellow-500">&#9733;</span>);
  }
  if (hasHalfStar) {
    stars.push(<span key="half" className="text-yellow-500">&#9734;</span>);
  }

  return (
    <div className="flex">
      {stars.map((star, index) => (
        <span key={index}>{star}</span>
      ))}
    </div>
  );
};

export default StarRating;
