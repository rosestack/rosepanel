import { defineRoserepo, Runner, Cache } from "roserepo";

export default defineRoserepo({
  root: true,
  monorepo: {
    runner: {
      watch: Runner.many({
        parallel: true,
      }),
      dev: Runner.many({
        parallel: true,
      }),
      build: Runner.pipeline({
        parallel: true,
        cache: Cache.file({
          include: [
            "package.json",
            "tsconfig.json",
            "source/**",
            "lib/**",
            "dist/**",
            "public/**",
          ],
        }),
      }),
      start: Runner.pipeline({
        parallel: true,
        selfScript: "build",
        dependencyScript: "build",
      }),
      lint: Runner.many({
        parallel: false,
        throwOnError: true,
      }),
    },
  },
});