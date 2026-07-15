import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";

import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";

import RoadmapHeader from "../components/roadmap/RoadmapHeader";
import RoadmapTimeline from "../components/roadmap/RoadmapTimeline";
import RoadmapSidebar from "../components/roadmap/RoadmapSidebar";

import { getRoadmapById } from "../utils/storage";

const Roadmap = () => {
  const { roadmapId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isNewRoadmap = searchParams.get("new") === "true";

  const [roadmap, setRoadmap] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const refresh = () => {
    const updatedRoadmap = getRoadmapById(roadmapId);

    setRoadmap(updatedRoadmap);

    if (!updatedRoadmap) return;

    if (selectedDay) {
      const updatedDay = updatedRoadmap.days.find(
        (day) => day.day === selectedDay.day
      );

      setSelectedDay(updatedDay);
    } else {
      setSelectedDay(updatedRoadmap.days[updatedRoadmap.currentDayIndex]);
    }
  };

  useEffect(() => {
    const data = getRoadmapById(roadmapId);

    if (!data) {
      navigate("/dashboard");
      return;
    }

    setRoadmap(data);
    setSelectedDay(data.days[data.currentDayIndex]);
  }, [roadmapId, navigate]);

  if (!roadmap || !selectedDay) {
    return (
      <Layout>
        <div className="rounded-xl border border-white/[0.08] bg-[#111113] p-8 text-zinc-400">
          Loading roadmap...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {isNewRoadmap && (
        <div className="mb-6 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-5">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-300/80">
                Ready
              </p>

              <h2 className="mt-1.5 text-xl font-semibold tracking-[-0.035em] text-white">
                Your AI roadmap is ready
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-300">
                Review your roadmap before starting. Future days are visible, and you will unlock them one at a time by completing the current day.
              </p>
            </div>

            <Button onClick={() => navigate("/dashboard")}>
              Start My Journey
            </Button>
          </div>
        </div>
      )}

      <RoadmapHeader roadmap={roadmap} />

      <div className="mt-6 grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        <RoadmapTimeline
          roadmap={roadmap}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />

        <RoadmapSidebar
          roadmap={roadmap}
          selectedDay={selectedDay}
          refresh={refresh}
        />
      </div>
    </Layout>
  );
};

export default Roadmap;

