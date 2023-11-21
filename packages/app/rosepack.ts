import { defineRosepack } from "rosepack";

export default defineRosepack((config) => ({
  clean: config.mode === "production",
  defineRuntime: {
    mode: true,
  },
  entry: {
    bin: "lib/bin/index.ts",
    main: "lib/main/index.ts",
  },
  output: {
    esm: {
      shims: true,
    },
  },
  declaration: {
    entry: {
      main: "lib/main/index.ts",
    },
  },
  externalDeps: true,
  externalPeerDeps: true,
}));