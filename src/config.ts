import { config } from "dotenv";
import path from "path";

const env = path.join(process.cwd(), ".env");
config({ path: env });

export default {
  port: process.env.PORT as string,
  mongodb_uri: process.env.MONGODB_URI as string,
};
