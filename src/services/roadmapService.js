import { transformRoadmap } from "../utils/transformRoadmap";
import { initializeRoadmap } from "../utils/storage";

export async function createRoadmap(formData) {

    const response = await fetch(
        "/api/generate-roadmap",
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json",
            },

            body: JSON.stringify(formData),
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to generate roadmap."
        );
    }

    const aiRoadmap =
        await response.json();

    const roadmap =
        transformRoadmap(
            aiRoadmap,
            formData
        );

    initializeRoadmap(roadmap);

    return roadmap;
}