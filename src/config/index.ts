// src/config/index.js

const config: {
  [key: string]: {
    apiBaseUrl: string;
  };
} = {
  development: {
    apiBaseUrl: "http://localhost:8080/api/v1"
  },
  qa: {
    apiBaseUrl: "http://qa-backend-url/api/v1"
  },
  production: {
    apiBaseUrl: "http://3.108.66.142:8080/api/v1/auth/test"
  }
};

const getConfig = () => {
  const env = process.env.NODE_ENV || "development";
  return config[env];
};

export default getConfig;
