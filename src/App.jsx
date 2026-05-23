import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AwsStudentBuilderLoader from './components/AwsStudentBuilderLoader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import CoreProtocols from './components/CoreProtocols';
import WhyJoinUs from './components/WhyJoinUs';
import TheBuilders from './components/TheBuilders';
import Callout from './components/Callout';
import Blog from './components/Blog';
import Footer from './components/Footer';
import BlogBedrock from './pages/BlogBedrock';
import BlogLambda from './pages/BlogLambda';
import BlogPredictiveAnalytics from './pages/BlogPredictiveAnalytics';
import BlogGoogleMaps from './pages/BlogGoogleMaps';
import LoginModal from './components/LoginModal';
import AwsQuiz from './pages/AwsQuiz';
import QuizHub from './pages/QuizHub';
import CaseStudyQuiz from './pages/CaseStudyQuiz';

function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Hero />
        <Marquee />
        <About />
        <CoreProtocols />
        <WhyJoinUs />
        <TheBuilders />
        <Callout />
        <Blog />
        <Footer />
      </main>
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => setIsLoginModalOpen(true);
    window.addEventListener('open-login-modal', handleOpenModal);
    return () => window.removeEventListener('open-login-modal', handleOpenModal);
  }, []);

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
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <div className="bg-background text-on-surface bg-grid-pattern min-h-screen relative overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container font-body-md">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog/aws-bedrock" element={<BlogBedrock />} />
          <Route path="/blog/aws-lambda" element={<BlogLambda />} />
          <Route path="/blog/predictive-analytics" element={<BlogPredictiveAnalytics />} />
          <Route path="/blog/google-maps-traffic" element={<BlogGoogleMaps />} />
          <Route path="/quiz" element={<QuizHub />} />
          <Route path="/quiz/:quizId" element={<AwsQuiz />} />
          <Route path="/case-study/:caseId" element={<CaseStudyQuiz />} />
        </Routes>
      </div>
    </>
  );
}
