import React, { useState } from "react";

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "bi bi-heart-fill" : "bi bi-heart"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="bi bi-heart-fill">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;