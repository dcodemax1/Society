import React from 'react';

function FormMessage({ message, type }) {
  if (!message) return null;

  const styles = {
    success: 'bg-green-50 border border-green-200 text-green-700',
    error: 'bg-red-50 border border-red-200 text-red-700',
    info: 'bg-blue-50 border border-blue-200 text-blue-700'
  };

  return (
    <div className={`mb-4 p-3 rounded text-sm ${styles[type] || styles.info}`}>
      {message}
    </div>
  );
}

export default FormMessage;
