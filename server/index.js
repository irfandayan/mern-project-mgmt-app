const express = require("express");
const cors = require("cors");
const path = require("path");

const colors = require("colors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

const connectDB = require("./config/db");

const port = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "client", "build", "index.html"));
  });
}

app.listen(
  port,
  console.log(`Server running on port ${port} in ${process.env.NODE_ENV}`)
);
