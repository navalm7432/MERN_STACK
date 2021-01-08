// All the import stuffs
import express from "express";
import mongoose from "mongoose";
import items from "./routes/api/items.js";
import users from "./routes/api/usersRegistration.js";
import auth from "./routes/api/userAuthorization.js";
import cors from "cors";
import config from "config";

// configuring our express framework
const app = express();

// Middlewares = methods/functions/operations that are called BETWEEN processing the Request and sending the Response in our application method.
app.use(express.json()); // it for POST and PUT requests, because in both these requests we are sending data (in the form of some data object) to the server and we are asking the server to accept or store that data (object), which is enclosed in the body (i.e. req.body) of that (POST or PUT) Request
app.use(cors()); // Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any other origins (domain, scheme, or port) than its own from which a browser should permit loading of resources.
app.use("/api/items", items); // it basically means that anything that starts with "/api/items" should look into items file which we imported
app.use("/api/users", users);
app.use("/api/auth", auth); // "

//DB Config
const dbURI = config.get("mongoURI"); //passed the mongodb url  for connection

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  // just logging when db is connected
  console.log("DB connected");
});

const port = process.env.PORT || 5000; // for devlopment using port:5000 but when deployed it will use process.env.PORT

app.listen(port, () => console.log(`Server running on port ${port}`));
