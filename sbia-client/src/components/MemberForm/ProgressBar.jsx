import React from 'react';

function ProgressBar({ current, total, percentage, color = 'green' }) {
  const percentValue = percentage !== undefined ? percentage : (current / total) * 100;

  // Determine color classes based on percentage
  let barColor;
  if (percentValue === 0) {
    barColor = 'bg-gray-400';
  } else {
    const colorClasses = {
      green: 'bg-green-600',
      teal: 'bg-teal-600',
    };
    barColor = colorClasses[color] || colorClasses.green;
  }

  return (
    <div className="mb-8">
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`${barColor} h-full rounded-full transition-all duration-300`}
          style={{ width: `${percentValue}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
