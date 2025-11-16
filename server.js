import express from "express";
import OpenAI from "openai";
import cors from "cors";

const app = express();
app.use(cors()); // allow frontend requests
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Railway secret
});

app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages
    });
    res.json({ reply: response.choices[0].message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: { role: "assistant", content: "AI unavailable" } });
  }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Bloop AI backend running on port ${PORT}`));
