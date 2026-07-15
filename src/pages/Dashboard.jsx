import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Layout from "../components/layout/Layout";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

import RoadmapForm from "../components/roadmap/RoadmapForm";
import TodaysTasks from "../components/dashboard/TodaysTasks";
import OverallProgress from "../components/dashboard/OverallProgress";
import RoadmapCard from "../components/roadmap/RoadmapCard";

import { getAllRoadmaps } from "../utils/storage";

const Dashboard = () => {
  const navigate = useNavigate();

  const [roadmaps, setRoadmaps] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const refresh = () => {
    setRoadmaps(getAllRoadmaps().filter((roadmap) => roadmap.status === "active"));
  };

  useEffect(() => {
    const data = getAllRoadmaps().filter((roadmap) => roadmap.status === "active");

    if (data.length === 0) {
      navigate("/");
      return;
    }

    setRoadmaps(data);
  }, [navigate]);

  return (
    <Layout>
      <div className="mb-2 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            Workspace
          </h2>

          {/* <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-4xl">
            Today&apos;s execution plan.
          </h1>
          */
          // <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
          //   Focus on the tasks that unlock progress today, then review your active roadmaps at a glance.
          // </p>
}
        </div>

        <Button onClick={() => setShowModal(true)}>
          New Roadmap
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6 xl:gap-7">
        <div className="col-span-12 xl:col-span-8">
          <Section
            title="Today's Tasks"
            subtitle="Complete today's work to unlock the next day."
          >
            <TodaysTasks roadmaps={roadmaps} refresh={refresh} />
          </Section>
        </div>

        <div className="col-span-12 xl:col-span-4">
          <Section
            title="Overall Progress"
            subtitle="Your journey at a glance."
          >
            <OverallProgress roadmaps={roadmaps} />
          </Section>
        </div>
      </div>

      <Section
        title="Your Roadmaps"
        subtitle={`${roadmaps.length} active roadmap${roadmaps.length !== 1 ? "s" : ""}`}
      >
        {roadmaps.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/[0.12] bg-white/[0.025] px-6 py-14 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              Empty state
            </p>

            <h3 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-white">
              No roadmaps yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-400">
              Generate your first AI roadmap and your active plans will appear here.
            </p>

            <Button className="mt-6" onClick={() => setShowModal(true)}>
              Create Roadmap
            </Button>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {roadmaps.map((roadmap) => (
              <RoadmapCard key={roadmap.id} roadmap={roadmap} />
            ))}
          </div>
        )}
      </Section>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="mb-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            New roadmap
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-white">
            Create a new plan
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Tell AI your goal and it will generate a personalized day-by-day roadmap.
          </p>
        </div>

        <RoadmapForm
          onSuccess={(roadmap) => {
            setShowModal(false);
            refresh();
            navigate(`/roadmap/${roadmap.id}?new=true`);
          }}
        />
      </Modal>
    </Layout>
  );
};

export default Dashboard;
