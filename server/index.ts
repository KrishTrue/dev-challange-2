import express from "express";

const app = express();

app.get("/api/test", (req, res) => {
  res.json({
    message: "TypeScript + Express is working!"
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});