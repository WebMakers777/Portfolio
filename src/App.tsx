// src/App.tsx
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ElixorTech page removed — redirects to elixortech.com
import NotFound from "./pages/NotFound";

// 🆕 add these imports
import Gateway from "./pages/gateway";
import Builders from "./pages/builders";
import Blog from "./pages/blog";
import BlogPost from "./pages/BlogPost";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

// Instantly redirects the browser to an external URL
const ExternalRedirect = ({ to }: { to: string }) => {
  React.useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Main landing page */}
          <Route path="/" element={<Gateway />} />

          {/* ElixorTech redirects to the live domain */}
          <Route
            path="/elixortech"
            element={<ExternalRedirect to="https://elixortech.com" />}
          />

          {/* ClickCrafters = new interface */}
          <Route path="/clickcrafters" element={<Builders />} />

          {/* Blog routes */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
