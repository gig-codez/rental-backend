import express, { json } from "express";
import "dotenv/config";
import cors from "cors";
import { join, dirname } from "path";
import { set, connect } from "mongoose";
const app = express();
// app libraries
import postRoutes from "./src/routes/post.routes.mjs";
import getRoutes from "./src/routes/get.routes.mjs";
import deleteRoutes from "./src/routes/delete.routes.mjs";
import updateRoutes from "./src/routes/update.routes.mjs";
// app routes
app.use(json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/image", express.static("./uploads"));
app.use("/post", postRoutes);
app.use("/get", getRoutes);
app.use("/delete", deleteRoutes);
app.use("/update", updateRoutes);
// db connection
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// connecting to the database
set("strictQuery", false);
connect(process.env.DB_URL, dbOptions)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });
// -------------- end of db connection ---------------------

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
