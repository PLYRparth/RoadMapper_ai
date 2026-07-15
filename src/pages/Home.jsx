import { useEffect } from "react";
import { useNavigate } from "react-router";

import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import RoadmapForm from "../components/roadmap/RoadmapForm";
import { getAppData } from "../utils/storage";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { roadmaps } = getAppData();

    if (roadmaps.length > 0) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <Layout>
      <section className="mx-auto flex items-center py-8 lg:min-h-[calc(100vh-110px)]">

        <div className="grid w-full items-center gap-14 lg:grid-cols-2">

          {/* Left */}

          <div className="max-w-xl">

            <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">

              AI Roadmap Generator

            </div>

            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">

              Turn any goal into a focused daily plan.

            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-zinc-400">

              Build personalized AI roadmaps for learning, fitness,
              business, career, or any long-term goal.

              <br />
              <br />

              Stay focused with daily tasks, track progress,
              and achieve goals consistently.

            </p>

          </div>

          {/* Right */}

          <div className="w-full">

            <Card
              className="mx-auto w-full max-w-xl"
              hover={false}
            >

              <div className="mb-8">

                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">

                  Create Roadmap

                </p>

                <h2 className="mt-3 text-2xl font-semibold text-white">

                  What are you working toward?

                </h2>

                <p className="mt-3 text-sm leading-7 text-zinc-400">

                  Describe your goal and Roadmapper AI will generate a personalized day-by-day roadmap.

                </p>

              </div>

              <RoadmapForm
                onSuccess={(roadmap) =>
                  navigate(`/roadmap/${roadmap.id}?new=true`)
                }
              />

            </Card>

          </div>

        </div>

      </section>
    </Layout>
  );
};

export default Home;
