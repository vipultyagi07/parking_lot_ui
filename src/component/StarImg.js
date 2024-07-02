import React from "react";

const StarImg = ({ filled, halfFilled, color }) => {
  let fillColor = "black";
  if (filled) {
    fillColor = color;
  } else if (halfFilled) {
    fillColor = `url(#half-fill-${color})`;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <defs>
        <linearGradient
          id={`half-fill-${color}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="50%" style={{ stopColor: color, stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: "black", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        fill={fillColor}
        d="M12 2l2.4 7.4H22l-6 4.6 2.4 7.4-6.4-5.2-6.4 5.2 2.4-7.4-6-4.6h7.6z"
      />
    </svg>
  );
};

export default StarImg;
