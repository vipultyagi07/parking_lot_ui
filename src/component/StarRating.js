// StarRating.js
import React from "react";
import StarImg from "./StarImg";

const StarRating = ({ rating }) => {
  const stars = [];
  const totalStars = 5;
  const filledStars = Math.floor(rating);
  const isHalfStar = rating - filledStars >= 0.5;

  for (let i = 1; i <= totalStars; i++) {
    if (i <= filledStars) {
      stars.push(<StarImg key={i} filled color="yellow" />);
    } else if (i === filledStars + 1 && isHalfStar) {
      stars.push(<StarImg key={i} halfFilled filled={false} color="yellow" />);
    } else {
      stars.push(<StarImg key={i} filled={false} color="black" />);
    }
  }

  return <div>{stars}</div>;
};

export default StarRating;
