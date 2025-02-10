require("dotenv").config({ path: "../.env" });

const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", taskRoutes);

// Import Routes
const userRoutes = require("./routes/taskRoutes");
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await db.sync();
});
