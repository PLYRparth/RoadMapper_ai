import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Slider from "../components/ui/Slider";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";

import { createRoadmap } from "../services/roadmapService";
import { getAppData } from "../utils/storage";

const Home = () => {

  useEffect(() => {
    const { roadmaps } = getAppData();

    if (roadmaps.length > 0) {
      navigate("/dashboard");
    }
  }, []);

  const navigate = useNavigate();

  const [goal, setGoal] = useState("");
  const [duration, setDuration] = useState(60);
  const [experience, setExperience] = useState("Beginner");
  const [difficulty, setDifficulty] = useState("Medium");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!goal.trim()) return;

    try {
      setLoading(true);

      await createRoadmap({
        goal,
        duration,
        experience,
        difficulty,
      });

      toast.success("Roadmap generated successfully!");
      navigate(`/roadmap/${roadmap.id}?new=true`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate roadmap");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto mt-16 max-w-xl">
        <Card>
          <h1 className="mb-2 text-4xl font-bold">
            Roadmapper AI
          </h1>

          <p className="mb-8 text-neutral-500">
            Create a personalized roadmap for any goal using AI.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <Input
              label="Goal"
              placeholder="e.g. Lose 10kg in 3 months"
              value={goal}
              onChange={(e) =>
                setGoal(e.target.value)
              }
            />

            <Slider
              value={duration}
              onChange={(e) =>
                setDuration(Number(e.target.value))
              }
            />

            <Select
              label="Experience"
              value={experience}
              onChange={(e) =>
                setExperience(e.target.value)
              }
              options={[
                "Beginner",
                "Intermediate",
                "Advanced",
              ]}
            />

            <Select
              label="Difficulty"
              value={difficulty}
              onChange={(e) =>
                setDifficulty(e.target.value)
              }
              options={[
                "Easy",
                "Medium",
                "Hard",
              ]}
            />

            <Button type="submit">
              Generate Roadmap →
            </Button>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default Home;