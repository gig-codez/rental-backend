import express, { json } from "express";
import "dotenv/config";
import cors from "cors";
import { set, connect } from "mongoose";
import path from 'path';
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app libraries
import postRoutes from "./src/routes/post.routes.mjs";
import getRoutes from "./src/routes/get.routes.mjs";
import deleteRoutes from "./src/routes/delete.routes.mjs";
import updateRoutes from "./src/routes/update.routes.mjs";
import specificRoutes from "./src/routes/specific.route.mjs";
import authRoutes from "./src/routes/auth/login.routes.mjs";
import chalk from "chalk";
import UsersController from "./src/controllers/users.controller.mjs";
import {fileURLToPath} from "url";
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
app.use("/login",authRoutes);
// db connection
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Serve static files from "node_modules/bootstrap"
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

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

