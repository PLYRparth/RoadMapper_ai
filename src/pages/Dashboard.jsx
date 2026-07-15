import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Layout from "../components/layout/Layout";
import PageHeader from "../components/ui/PageHeader";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

import RoadmapForm from "../components/roadmap/RoadmapForm";
import TodaysTasks from "../components/dashboard/TodaysTasks";
import OverallProgress from "../components/dashboard/OverallProgress";
import RoadmapCard from "../components/roadmap/RoadmapCard";

import {
  getAllRoadmaps,
} from "../utils/storage";

const Dashboard = () => {
  const navigate = useNavigate();

  const [roadmaps, setRoadmaps] = useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const refresh = () => {
    setRoadmaps(getAllRoadmaps().filter(roadmap =>roadmap.status === "active"));
  };

  useEffect(() => {
    const data = getAllRoadmaps().filter(roadmap =>roadmap.status === "active");

    if (data.length === 0) {
      navigate("/");
      return;
    }

    setRoadmaps(data);
  }, []);

  return (
    <Layout>
      <PageHeader
        title=""
        description=""
        action={
          <Button
            onClick={() =>
              setShowModal(true)
            }
          >
            + New Roadmap
          </Button>
        }
      />

      <div className="grid grid-cols-12 gap-10">

        {/* Today's Tasks */}

        <div className="col-span-12 xl:col-span-8">
          
          <Section
            title="Today's Tasks"
            subtitle="Complete today's work to unlock the next day."
          >
            <div className="mb-16 mt-50">
            <TodaysTasks
              roadmaps={roadmaps}
              refresh={refresh}
            /></div>
          </Section>

        </div>

        {/* Overall Progress */}

        <div className="col-span-12 xl:col-span-4">

          <Section
            title="Overall Progress"
            subtitle="Your journey at a glance."
          >
            <OverallProgress
              roadmaps={roadmaps}
            />
          </Section>

        </div>

      </div>

      <Section
        title="Your Roadmaps"
        subtitle={`${roadmaps.length} active roadmap${roadmaps.length !== 1
            ? "s"
            : ""
          }`}
      >

        {roadmaps.length === 0 ? (

          <div className="rounded-3xl border border-dashed border-zinc-700 py-28 text-center">

            <h3 className="text-2xl font-semibold">

              No roadmaps yet

            </h3>

            <p className="mt-2 text-zinc-400">

              Generate your first AI roadmap to get started.

            </p>

            <Button
              className="mt-8"
              onClick={() =>
                setShowModal(true)
              }
            >

              Create Roadmap

            </Button>

          </div>

        ) : (

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {roadmaps.map((roadmap) => (

              <RoadmapCard
                key={roadmap.id}
                roadmap={roadmap}
              />

            ))}

          </div>

        )}

      </Section>

      <Modal
        open={showModal}
        onClose={() =>
          setShowModal(false)
        }
      >

        <h2 className="mb-4 text-3xl font-bold">

          Create New Roadmap

        </h2>

        <p className="mb-10 text-zinc-400">

          Tell AI your goal and it will generate a personalized day-by-day roadmap.

        </p>

        <RoadmapForm
          onSuccess={(roadmap) => {
            setShowModal(false);

            refresh();

            navigate(
              `/roadmap/${roadmap.id}?new=true`
            );
          }}
        />

      </Modal>

    </Layout>
  );
};

export default Dashboard;