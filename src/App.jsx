import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import CoreProtocols from './components/CoreProtocols';
import Callout from './components/Callout';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-background text-on-surface bg-grid-pattern min-h-screen relative overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container font-body-md">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <Marquee />
        <About />
        <CoreProtocols />
        <Callout />
        <Footer />
      </main>
    </div>
  );
}
