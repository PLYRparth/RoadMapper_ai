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

import {
  getRoadmapById,
} from "../utils/storage";

const Roadmap = () => {
  const { roadmapId } = useParams();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const isNewRoadmap =
    searchParams.get("new") === "true";

  const [roadmap, setRoadmap] = useState(null);

  const [selectedDay, setSelectedDay] =
    useState(null);

  const refresh = () => {
    const updatedRoadmap =
      getRoadmapById(roadmapId);

    setRoadmap(updatedRoadmap);

    if (!updatedRoadmap) return;

    // Keep selected day in sync after updates
    if (selectedDay) {
      const updatedDay =
        updatedRoadmap.days.find(
          (day) =>
            day.day === selectedDay.day
        );

      setSelectedDay(updatedDay);
    } else {
      setSelectedDay(
        updatedRoadmap.days[
          updatedRoadmap.currentDayIndex
        ]
      );
    }
  };

  useEffect(() => {
    const data =
      getRoadmapById(roadmapId);

    if (!data) {
      navigate("/dashboard");
      return;
    }

    setRoadmap(data);

    // Open current day by default
    setSelectedDay(
      data.days[data.currentDayIndex]
    );
  }, [roadmapId]);

  if (!roadmap || !selectedDay) {
    return (
      <Layout>
        <p>Loading roadmap...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      {isNewRoadmap && (
        <div className="mb-8 rounded-2xl border border-green-200 bg-green-50 p-6">
          <h2 className="text-2xl font-bold">
            🎉 Your AI roadmap is ready!
          </h2>

          <p className="mt-2 text-neutral-600">
            Review your roadmap before
            starting. Future days are
            visible, but you'll unlock
            them one at a time by
            completing the current day.
          </p>

          <Button
            className="mt-5"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            Start My Journey →
          </Button>
        </div>
      )}

      <RoadmapHeader roadmap={roadmap} />

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <RoadmapTimeline
            roadmap={roadmap}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
        </div>

        <div className="lg:col-span-2">
          <RoadmapSidebar
            roadmap={roadmap}
            selectedDay={selectedDay}
            refresh={refresh}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Roadmap;