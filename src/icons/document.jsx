import React from 'react';

const Document = ({color, large = true}) => {
  if (large) {
    return (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M42 18H22V46H37L42 41V18ZM40 40L40 40.1716L36.1716 44H36V40H40ZM24 21H30V23H24V21ZM40 26H24V28H40V26ZM24 30H38V32H24V30ZM40 34H24V36H40V34Z" fill={color}/>
      </svg>
    );
  } else {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M16 2H4V18H13L16 15V2ZM14 4H6V6H14V4ZM6 8H13V10H6V8ZM12 16V14H14V14.1716L12.1716 16H12Z" fill={color}/>
      </svg>
    );
  }
};

export default Document;