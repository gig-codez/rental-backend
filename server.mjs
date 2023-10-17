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
import specificRoutes from "./src/routes/specific.route.mjs";
import authRoutes from "./src/routes/auth/login.routes.mjs";
import chalk from "chalk";
// app routes
app.use(json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/image", express.static("./uploads"));
app.use("/post", postRoutes);
app.use("/get", getRoutes);
app.use("/delete", deleteRoutes);
app.use("/update", updateRoutes);
app.use("/specific",specificRoutes);
app.use("/post",authRoutes);
// db connection
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// connecting to the database
set("strictQuery", false);
connect(process.env.DB_URL, dbOptions)
  .then(() => {
    
    console.log(chalk.green("Connected to database successfully"));
  })
  .catch((err) => {
    console.error(chalk.red("Connection error"), err);
    process.exit(0);
  });
// -------------- end of db connection ---------------------

app.listen(process.env.PORT, () => {
  console.log(chalk.blueBright(`\nServer running on port http://${process.env.HOST_URL}:${process.env.PORT}\n`));
  console.log(chalk.yellow('Waiting for connection from database.'));
});
