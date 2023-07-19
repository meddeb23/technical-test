import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "./.env") });

interface ENV {
  NODE_ENV: string | undefined;
  PORT: number | undefined;
  isDevMode: boolean;
}

interface Config {
  NODE_ENV: string;
  PORT: number;
  isDevMode: boolean;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT ? Number(process.env.PORT) : 5000,
    isDevMode: process.env.NODE_ENV === "development",
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
