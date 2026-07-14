import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const SYSTEM_PROMPT = `
You are an expert mentor and curriculum designer.

Your task is to generate a personalized learning roadmap.

Imagine you are the world's best mentor.

Your roadmap should be practical.

Avoid generic advice.

Every task should be actionable.

Never repeat tasks.

Difficulty should gradually increase.

Return ONLY JSON.

IMPORTANT RULES

Return ONLY valid JSON.

Do not use markdown.

Do not wrap inside \`\`\`.

Do not explain anything.

Return exactly the requested number of days.

Every lesson depends on previous lessons.

Every day must contain

day
title
description
estimatedTime
focus
resources
tasks
challenge
reflection
motivation

Resources MUST NOT be URLs.

Resources should be search queries.

Example:

"React useState official documentation"

"React useState tutorial"

Output format:

{
  "days":[
    {
      "day":1,
      "title":"",
      "description":"",
      "estimatedTime":"",
      "focus":[],
      "resources":[],
      "tasks":[],
      "challenge":"",
      "reflection":"",
      "motivation":""
    }
  ]
}

Refer roadmap.sh like sites for better approach
`;

export async function generateRoadmapFromGemini({
    goal,
    duration,
    experience,
    difficulty,
}) {
    const prompt = `
Goal:
${goal}

Duration:
${duration} days

Experience:
${experience}

Difficulty:
${difficulty}
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: `${SYSTEM_PROMPT}\n\n${prompt}`,
    });

    let text = response.text.trim();

    // Sometimes models still return ```json
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    text = text.slice(start, end + 1);

    try {

        return JSON.parse(text);

    }
    catch (error) {

        throw new Error(
            "Invalid roadmap generated."
        );

    }
}