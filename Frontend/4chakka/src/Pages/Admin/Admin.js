import React, { useEffect } from 'react';

function Admin() {
  useEffect(() => {
    window.location.href = 'http://localhost:8000/admin';
  }, []);

  return (
    <div>
      <p>Redirecting to admin panel...</p>
    </div>
  );
}

export default Admin;
