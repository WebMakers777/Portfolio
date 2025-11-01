// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Makers";
import NotFound from "./pages/NotFound";

// 🆕 add these imports
import Gateway from "./pages/gateway";
import Builders from "./pages/builders";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          {/* New landing with two blocks */}
          <Route path="/" element={<Gateway />} />

          {/* ElixorTech = your existing interface (was "/") */}
          <Route path="/elixortech" element={<Index />} />

          {/* ClickCrafters = new interface */}
          <Route path="/clickcrafters" element={<Builders />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
