// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NotFound from "./pages/NotFound";
import Gateway from "./pages/gateway";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Process from "./pages/Process";
import Contact from "./pages/Contact";
import Blog from "./pages/blog";
import BlogPost from "./pages/BlogPost";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ScrollToTop from "./components/ScrollToTop";
import CustomCursor from "./components/CustomCursor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CustomCursor />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Main landing page */}
          <Route path="/" element={<Gateway />} />

          {/* Dedicated pages */}
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/process" element={<Process />} />
          <Route path="/contact" element={<Contact />} />

          {/* Blog & Admin Pages */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
