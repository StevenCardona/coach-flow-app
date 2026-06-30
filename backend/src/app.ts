import express from "express";
import cors from "cors";
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//
app.get("/", (_req, res) => {
  res.json({ message: "🚀 API working..." });
});

export default app;
