import next from "next";

import { Request, Response, NextFunction } from "express";

import { AfterRoutesInit, Module, OnInit, PlatformApplication } from "@tsed/common";

import { Inject, Configuration } from "@tsed/di";

import config from "~utils/config";

import path from "path";

@Module()
class NextModule implements OnInit, AfterRoutesInit {
  @Inject()
  app: PlatformApplication;

  nextApp: ReturnType<typeof next>;

  @Configuration()
  configuration: Configuration;

  async $onInit() {
    const appDir = require.resolve("@rosepanel/client/package.json");

    this.nextApp = next({
      dev: config.mode === "development",
      dir: path.dirname(appDir),
    });

    await this.nextApp.prepare();
  }

  $afterRoutesInit() {
    const handle = this.nextApp.getRequestHandler();

    this.app.get("*", (request: Request, response: Response, next: NextFunction) => {
      if ( !response.headersSent ) {
        return handle(request, response);
      }
    });
  }
}

export default NextModule;