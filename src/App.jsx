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
            background: "#18181b",
            color: "#fff",
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