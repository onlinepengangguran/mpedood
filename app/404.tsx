import React from 'react';

const Custom404 = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>Redirecting to the home page...</p>
    </div>
  );
};

export default Custom404;

// Redirect to home after 5 seconds
setTimeout(() => {
  window.location.href = "/";
}, 5000);
