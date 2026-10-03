import React, { useEffect } from 'react';
import Hero from '../components/Hero/Hero';
import Features from '../components/Features/Features';
import Execution from '../components/Execution/Execution';
import Testimonials from '../components/Testimonials/Testimonials';

const Home = () => {
  useEffect(() => {
    document.title = 'Vincie Studios — Complete Tech Stack Support, SaaS & Custom Software';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Vincie Studios provides complete online tech stack support, SaaS platform development, and custom-tailored software solutions for modern businesses.');
  }, []);

  return (
    <main className="main-content">
      <Hero />
      <Features />
      <Execution />
      <Testimonials />
    </main>
  );
};

export default Home;
