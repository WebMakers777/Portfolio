import React, { useEffect } from 'react';
import Hero from '../components/Hero/Hero';
import Features from '../components/Features/Features';
import Execution from '../components/Execution/Execution';
import Testimonials from '../components/Testimonials/Testimonials';

const Home = () => {
  useEffect(() => {
    document.title = 'Vincie Studios — Custom Software Engineering, SaaS Platforms, AI Automation & Web/Mobile Apps';
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      'Vincie Studios is a software engineering studio specializing in SaaS platform development, custom CRM & ERP software, AI workflow automation, high-performance web & mobile apps, and cloud architecture.'
    );
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
