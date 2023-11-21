interface Config {
  mode: "development" | "production";
}

const config: Config = {
  mode: __MODE__,
};

export default config;