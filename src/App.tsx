import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

// The PASTED Library
import Vault from "./pages/library/Vault";
import Welcome from "./pages/library/Welcome";
import LibraryLogin from "./pages/library/Login";
import LibraryHome from "./pages/library/LibraryHome";
import AssetDetail from "./pages/library/AssetDetail";
import LibraryCardPage from "./pages/library/Card";
import Gate from "./pages/library/Gate";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* The PASTED Library */}
          <Route path="/" element={<Vault />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<LibraryLogin />} />
          <Route path="/gate" element={<Gate />} />
          <Route path="/library" element={<LibraryHome />} />
          <Route path="/library/:slug" element={<AssetDetail />} />
          <Route path="/card" element={<LibraryCardPage />} />

          {/* Admin (kept) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Archived legacy routes — redirect to the Vault */}
          <Route path="/discover" element={<Navigate to="/" replace />} />
          <Route path="/case-study/:slug" element={<Navigate to="/" replace />} />
          <Route path="/yourbrand" element={<Navigate to="/" replace />} />
          <Route path="/library/doctrine" element={<Navigate to="/library" replace />} />
          <Route path="/library/vol-i" element={<Navigate to="/library" replace />} />
          <Route path="/library/cover" element={<Navigate to="/library" replace />} />
          <Route path="/founders" element={<Navigate to="/" replace />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
