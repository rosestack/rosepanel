import express from "express";

import compress from "compression";
import cors from "cors";

import type { BeforeRoutesInit } from "@tsed/common";
import { PlatformApplication } from "@tsed/common";
import { Configuration, Inject } from "@tsed/di";

import "@tsed/platform-express";
import "@tsed/swagger";

import "~modules/socket";
import "~modules/next";

import SystemController from "~controllers/system/controller";

import config from "~utils/config";

@Configuration({
  logger: {
    level: "info",
  },
  env: config.mode,
  httpPort: "0.0.0.0:8118",
  mount: {
    "/api": [
      SystemController,
    ],
  },
  swagger: [
    {
      path: "/swagger",
      specVersion: "3.0.3",
      pathPatterns: [
        "/api/**",
      ],
    },
  ],
  acceptMimes: [
    "application/json",
  ],
})
class Server implements BeforeRoutesInit {
  @Inject()
  app: PlatformApplication;

  $beforeRoutesInit() {
    this.app.use(express.json());

    this.app.use(express.urlencoded({
      extended: true,
    }));

    this.app.use(compress());

    this.app.use(cors({
      origin: "*",
    }));
  }
}

export default Server;