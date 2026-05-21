import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

// The PASTED Library — launch rebuild
import Atrium from "./pages/library/Atrium";
import Apply from "./pages/library/Apply";
import Pending from "./pages/library/Pending";
import SignIn from "./pages/library/SignIn";
import Members from "./pages/library/Members";
import DoctrineOnBrand from "./pages/DoctrineOnBrand";
import {
  StacksRoom,
  CinemaRoom,
  PeriodicalsRoom,
  VaultRoom,
  ReadingRoomRoom,
  IndexRoom,
} from "./pages/library/OpeningSoon";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* The PASTED Library — public */}
          <Route path="/" element={<Navigate to="/library" replace />} />
          <Route path="/library" element={<Atrium />} />
          <Route path="/library/apply" element={<Apply />} />
          <Route path="/library/pending" element={<Pending />} />
          <Route path="/library/login" element={<SignIn />} />
          <Route path="/login" element={<Navigate to="/library/login" replace />} />

          {/* Gated */}
          <Route path="/library/members" element={<Members />} />
          <Route path="/library/me" element={<Navigate to="/library/members" replace />} />
          <Route path="/card" element={<Navigate to="/library/members" replace />} />
          <Route path="/library/doctrine" element={<DoctrineOnBrand />} />

          {/* Opening soon rooms */}
          <Route path="/library/stacks" element={<StacksRoom />} />
          <Route path="/library/cinema" element={<CinemaRoom />} />
          <Route path="/library/periodicals" element={<PeriodicalsRoom />} />
          <Route path="/library/vault" element={<VaultRoom />} />
          <Route path="/library/reading-room" element={<ReadingRoomRoom />} />
          <Route path="/library/index" element={<IndexRoom />} />

          {/* Admin (kept) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Archived legacy routes — redirect to the Vault */}
          <Route path="/discover" element={<Navigate to="/library" replace />} />
          <Route path="/case-study/:slug" element={<Navigate to="/library" replace />} />
          <Route path="/yourbrand" element={<Navigate to="/library" replace />} />
          <Route path="/library/vol-i" element={<Navigate to="/library/doctrine" replace />} />
          <Route path="/library/cover" element={<Navigate to="/library" replace />} />
          <Route path="/founders" element={<Navigate to="/library" replace />} />
          <Route path="/welcome" element={<Navigate to="/library/pending" replace />} />
          <Route path="/gate" element={<Navigate to="/library" replace />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
