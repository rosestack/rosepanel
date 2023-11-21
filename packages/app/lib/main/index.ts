import { $log } from "@tsed/common";

import { PlatformExpress } from "@tsed/platform-express";

import Server from "~www/server";

const platform = await PlatformExpress.bootstrap(Server);

platform.listen().catch((error) => {
  $log.error("Server failed to start:", error);
});

process.on("unhandledRejection", (reason, promise) => {
  $log.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  $log.error("Uncaught Exception thrown:", error);
});
