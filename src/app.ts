import express from "express";
import cors from "cors";
import router from "./app/routes";
import notFound from "./app/middileWare/notFound";
import globalErrorhandler from "./app/middileWare/globalErrorHandler";

const app = express();

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

app.use(express.json());

// application route
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Bookify Welcoming you.Enter this Arena,Find Your best Room.");
});
app.use(notFound);
// global error
app.use(globalErrorhandler);

export default app;
