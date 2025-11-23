import Link from 'next/link';
import Navbar from '../components/Navbar';
import Hero from '../components/sections/hero';
import Features from '../components/sections/features';
import About from '../components/sections/about';
import Testimonials from '../components/sections/testimonial';
import CTA from '../components/sections/cta';

export default function Home() {
  return (
    <div className="min-h-screen">

      <main>
        {/* Hero Section */}
        <Hero />



        {/* Features Section */}
        <Features />
        {/* About Section */}
        <About />
        {/*testimonials Section */}
        <Testimonials />
        <CTA />


      </main >
    </div >
  );
}
