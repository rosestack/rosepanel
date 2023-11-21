import { Server } from "socket.io";

import { Inject, Module, InjectorService, Configuration } from "@tsed/di";

import { PlatformApplication, AfterListen } from "@tsed/common";

import http from "http";

@Module()
class SocketModule extends Server implements AfterListen {
  @Configuration()
  configuration: Configuration;

  @Inject()
  app: PlatformApplication;

  @Inject()
  protected http: http.Server;

  @Inject()
  protected injector: InjectorService;

  $afterListen() {
    this.attach(this.http);

    this.on("connection", (socket) => {
      console.log("connection", socket.id);
    });
  }
}

export default SocketModule;