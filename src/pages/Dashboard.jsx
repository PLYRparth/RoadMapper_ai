import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";

import OverallProgress from "../components/dashboard/OverallProgress";
import TodaysTasks from "../components/dashboard/TodaysTasks";
import RoadmapCard from "../components/roadmap/RoadmapCard";

import { getAllRoadmaps } from "../utils/storage";

const Dashboard = () => {
  const navigate = useNavigate();

  const [roadmaps, setRoadmaps] = useState([]);

  const refresh = () => {
    setRoadmaps(getAllRoadmaps());
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <Layout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-neutral-500">
            Track all your goals in one place.
          </p>
        </div>

        <Button
          className="w-auto"
          onClick={() => navigate("/")}
        >
          + New Roadmap
        </Button>
      </div>

      <TodaysTasks
        roadmaps={roadmaps}
        refresh={refresh}
      />

      <OverallProgress roadmaps={roadmaps} />

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">
          Your Roadmaps
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {roadmaps.map((roadmap) => (
            <RoadmapCard
              key={roadmap.id}
              roadmap={roadmap}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;