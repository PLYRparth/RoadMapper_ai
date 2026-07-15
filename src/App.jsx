import { Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import Settings from "./pages/Settings";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#111113",
            color: "#fafafa",
            boxShadow: "0 16px 40px -20px rgba(0,0,0,0.9)",
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/roadmap/:roadmapId" element={<Roadmap />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;
