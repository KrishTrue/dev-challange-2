import express from "express";

const app = express();

app.use(express.json());


app.post("/api/activities/suggest", async (req, res) => {
  try {
    const { city, interests, budget } = req.body;

    const response = await fetch(
      `${process.env.OLLAMA_URL}/api/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.OLLAMA_MODEL,
          messages: [
            {
              role: "system",
              content:
                "You suggest fun, practical activities for groups of people. Never claim a venue is verified unless reliable data is provided.",
            },
            {
              role: "user",
              content: `Suggest 3 activities in ${city} for people interested in ${interests.join(", ")}. Budget: ${budget}.`,
            },
          ],
          stream: false,
          think: false,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Ollama returned ${response.status}`);
    }

    const data = await response.json();

    res.json({ suggestions: data.message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate activities" });
  }
});

export default app