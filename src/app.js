const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/database");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestsRouter = require("./routes/requests");
const userRouter = require("./routes/user");
const cors = require("cors");
const http = require("http");
const initialiseSocket = require("./utils/socket");

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "https://usedevtinder.netlify.app/",
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const server = http.createServer(app);
initialiseSocket(server);

app.use(cors(corsOptions));

app.use(authRouter);
app.use("/profile", profileRouter);
app.use(requestsRouter);
app.use(userRouter);

connectDB()
  .then(() => {
    console.log("Connected to the database...");
    server.listen(3000, () => {
      console.log("Server is successfully listening on PORT 3000");
    });
  })
  .catch((err) => {
    console.log("Couldn't connect to database", err);
  });
