import { useState, useEffect } from 'react';
import AwsStudentBuilderLoader from './components/AwsStudentBuilderLoader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import CoreProtocols from './components/CoreProtocols';
import WhyJoinUs from './components/WhyJoinUs';
import TheBuilders from './components/TheBuilders';
import Callout from './components/Callout';
import Footer from './components/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loader for 8 seconds to demonstrate the animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <AwsStudentBuilderLoader />}
      <div className="bg-background text-on-surface bg-grid-pattern min-h-screen relative overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container font-body-md">
        <Navbar />
        <main className="pt-20">
          <Hero />
          <Marquee />
          <About />
          <CoreProtocols />
          <WhyJoinUs />
          <TheBuilders />
          <Callout />
          <Footer />
        </main>
      </div>
    </>
  );
}
