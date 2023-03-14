declare global {
  interface Window {
    Config: AppConfig;
  }
}

export type AppConfig = {
  endpoint: string;
  username: string;
  password: string;
};

const defaultConfig = {
  endpoint: "http://localhost",
};

const appConfig = (window["Config"] as AppConfig) || defaultConfig;

export default appConfig;
