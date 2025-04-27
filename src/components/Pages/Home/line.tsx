import React from 'react';

interface LineProps {
  className?: string;
}

const Line: React.FC<LineProps> = ({ className = '' }) => {
  return (
    <hr
      className={`border-t-2 border-blue-500 my-4 ${className}`}
    />
  );
};

export default Line;