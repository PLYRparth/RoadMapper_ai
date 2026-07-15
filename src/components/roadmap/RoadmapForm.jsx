import { useState } from "react";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import Slider from "../ui/Slider";
import { createRoadmap } from "../../services/roadmapService";
import toast from "react-hot-toast";
import Loader from "../ui/Loader";

const RoadmapForm = ({ onSuccess }) => {
  const [goal, setGoal] = useState("");
  const [duration, setDuration] = useState(30);
  const [experience, setExperience] = useState("Beginner");
  const [difficulty, setDifficulty] = useState("Medium");
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!goal.trim()) return;

    try {
      setLoading(true);

      const roadmap = await createRoadmap({
        goal,
        duration,
        experience,
        difficulty,
      });

      toast.success("Roadmap generated successfully!");
      setCompleted(true);

      setTimeout(() => {
        onSuccess?.(roadmap);
      }, 800);
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate roadmap");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader completed={completed} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Goal"
        placeholder="e.g. Learn React deeply in 30 days"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />

      <Slider
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Select
          label="Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          options={["Beginner", "Intermediate", "Advanced"]}
        />

        <Select
          label="Difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          options={["Easy", "Medium", "Hard"]}
        />
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        Generate Roadmap
      </Button>
    </form>
  );
};

export default RoadmapForm;
