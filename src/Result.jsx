import React from 'react';

const Result = ({ title, image, content }) => {
  return (
    <div className="blog-post">
      <h2>{title}</h2>
      <img src={image} alt={title} />
      <div>content</div>
    </div>
  );
}

export default Result; 