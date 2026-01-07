import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import { ensureAdminExists } from "./src/utils/ensureAdmin.js";

const PORT = process.env.PORT;
// console.log(PORT)

app.get("/", (req, res) => {
  res.send("<h1>API is running...<h1/>");
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  // Ensure admin email exists on startup
  await ensureAdminExists();
});
