import {
  Hero,
  About,
  Stats,
  CallToAction,
  Footer,
} from "../components/LandingPage";

function LandingFormPage() {
  return (
    <div className="bg-white text-gray-800">
      <Hero />
      <About />
      <Stats />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default LandingFormPage;
