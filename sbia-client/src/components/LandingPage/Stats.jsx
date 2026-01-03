import React from "react";

function StatCard({ value, label }) {
  return (
    <div className="space-y-1 sm:space-y-2">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700">
        {value}
      </h3>
      <p className="text-gray-600 text-xs sm:text-sm md:text-base">{label}</p>
    </div>
  );
}

function Stats() {
  const stats = [
    { value: "5,000+", label: "Active Members" },
    { value: "₹10 Cr+", label: "Deposits Managed" },
    { value: "10%", label: "Annual Interest Returns" },
    { value: "2 States", label: "Operational Reach" },
  ];

  return (
    <section className="bg-gray-50 py-12 sm:py-16 md:py-20 text-center px-4 sm:px-6 md:px-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8 leading-snug">
        Our Growth in Numbers
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
        {stats.map((stat, index) => (
          <StatCard key={index} value={stat.value} label={stat.label} />
        ))}
      </div>
    </section>
  );
}

export default Stats;
