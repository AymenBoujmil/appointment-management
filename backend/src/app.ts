import express = require("express");
var cors = require("cors");
import staffRoutes from "./routes/staffRoutes";
import clientRoutes from "./routes/clientRoutes";
import appointmentRoutes from "./routes/appointmentRoutes";

(async () => {
  const app = express();
  const PORT = process.env.PORT || 3001;

  app.use(cors());
  app.use(express.json());

  app.use("/api/staff", staffRoutes);
  app.use("/api/client", clientRoutes);
  app.use("/api/appointment", appointmentRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();
