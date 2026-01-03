import React from "react";

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-50 p-4 sm:p-6 rounded shadow hover:shadow-lg transition-shadow">
      <img
        src={icon}
        alt={title}
        className="w-8 sm:w-10 mx-auto mb-2 sm:mb-3"
      />
      <h3 className="font-bold text-base sm:text-lg mb-2">{title}</h3>
      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function About() {
  const features = [
    {
      icon: "https://cdn-icons-png.flaticon.com/512/456/456212.png",
      title: "Secure Savings",
      description: "Grow your wealth with trusted saving plans.",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/3063/3063825.png",
      title: "Fair Credit Access",
      description: "Low-interest loans for every member's need.",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/1484/1484567.png",
      title: "Community Growth",
      description: "Empowering people for financial independence.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 text-center max-w-5xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6 leading-snug">
        About Shreejan Credit
      </h2>
      <p className="text-gray-600 mb-8 sm:mb-10 text-xs sm:text-sm md:text-base leading-relaxed">
        Shreejan Credit Co-operative Society is dedicated to providing ethical
        financial services — from personal loans to savings schemes — that
        uplift our members and communities across India.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}

export default About;
