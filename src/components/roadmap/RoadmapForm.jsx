import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Layout from '../layout/Layout';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import Slider from '../ui/Slider';
import { createRoadmap } from '../../services/roadmapService';
import toast from 'react-hot-toast';
import Loader from '../ui/Loader';

const RoadmapForm = ({ onSuccess }) => {
    const navigate = useNavigate();

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
        return (
            <Layout>
                <Loader
                    completed={completed}
                />
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
    )
}

export default RoadmapForm
