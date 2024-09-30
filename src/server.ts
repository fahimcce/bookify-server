import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

async function main() {
  await mongoose.connect(config.db_url as string);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

  app.listen(config.port, () => {
    console.log(`app listening on port ${config.port}`);
  });
}
main();
