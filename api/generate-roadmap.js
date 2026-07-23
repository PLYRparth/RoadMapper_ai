import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
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

function extractJson(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("No JSON found in AI response.");
  }

  return text.slice(start, end + 1);
}

function validateRoadmap(roadmap) {
  if (!roadmap || !Array.isArray(roadmap.days)) {
    throw new Error("Invalid roadmap structure.");
  }

  for (const day of roadmap.days) {
    if (
      typeof day.day !== "number" ||
      !day.title ||
      !day.description ||
      !day.estimatedTime ||
      !Array.isArray(day.focus) ||
      !Array.isArray(day.resources) ||
      !Array.isArray(day.tasks) ||
      !day.challenge ||
      !day.reflection ||
      !day.motivation
    ) {
      throw new Error("Incomplete roadmap returned by Gemini.");
    }
  }

  return roadmap;
}

async function generateRoadmap(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: `${SYSTEM_PROMPT}\n\n${prompt}`,
  });

  let text = response.text.trim();

  text = extractJson(text);

  return validateRoadmap(JSON.parse(text));
}

export default async function handler(req, res) {
  // Allow only POST
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed",
    });
  }

  try {
    const {
      goal,
      duration,
      experience,
      difficulty,
    } = req.body;

    if (!goal || !duration || !experience || !difficulty) {
      return res.status(400).json({
        error: "Missing required fields.",
      });
    }

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

    let roadmap;

    // Retry once if Gemini returns malformed JSON
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        roadmap = await generateRoadmap(prompt);
        break;
      } catch (err) {
        if (attempt === 1) throw err;

        console.warn(
          "Retrying roadmap generation due to invalid AI response..."
        );
      }
    }

    return res.status(200).json(roadmap);
  } catch (error) {
    console.error("Roadmap Generation Error:", error);

    return res.status(500).json({
      error: "Failed to generate roadmap.",
      message: error.message,
    });
  }
}