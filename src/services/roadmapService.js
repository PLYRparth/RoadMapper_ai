import { generateRoadmapFromGemini } from "./gemini";

import { transformRoadmap } from "../utils/transformRoadmap";

import { initializeRoadmap } from "../utils/storage";

export async function createRoadmap(formData) {
  const aiRoadmap =
    await generateRoadmapFromGemini(formData);

  const roadmap =
    transformRoadmap(aiRoadmap, formData);

  initializeRoadmap(roadmap);

  return roadmap;
}