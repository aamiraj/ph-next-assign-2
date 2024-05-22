import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function main() {
  try {
    // listening event the mongoose connected
    mongoose.connection.on("connected", () =>
      console.log("Mongo DB is connected successfully.")
    );

    await mongoose.connect(config.mongodb_uri);

    app.listen(config.port, () =>
      console.log(`Server is listening on port: ${config.port}`)
    );
  } catch (error) {
    console.log(error);
  }
}

// starting the server
main();
