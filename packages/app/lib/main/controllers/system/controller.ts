import si from "systeminformation";

import { Controller } from "@tsed/di";
import { Get } from "@tsed/schema";

@Controller({
  path: "/system",
})
class SystemController {
  @Get("/time")
  async time() {
    return {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  }

  @Get("/os")
  async os() {
    const osInfo = await si.osInfo();

    return {
      distro: osInfo.distro,
      platform: osInfo.platform,
      release: osInfo.release,
      arch: osInfo.arch,
    };
  }

  @Get("/cpu")
  async cpu() {
    const cpu = await si.cpu();
    const cpuTemperature = await si.cpuTemperature();
    const cpuCurrentSpeed = await si.cpuCurrentSpeed();

    return {
      manufacturer: cpu.manufacturer,
      brand: cpu.brand,
      temperature: {
        max: cpuTemperature.max,
        avg: cpuTemperature.main,
        cores: cpuTemperature.cores,
      },
      speed: {
        max: cpuCurrentSpeed.max,
        min: cpuCurrentSpeed.min,
      },
    };
  }

  @Get("/memory")
  async memory() {
    const memory = await si.mem();
    const memoryLayout = await si.memLayout();

    return {
      memory: {
        total: memory.total,
        available: memory.available,
        used: memory.used,
      },
      layouts: memoryLayout.map((memory) => ({
        total: memory.size,
        type: memory.type,
        speed: memory.clockSpeed,
      })),
    };
  }

  @Get("/disk")
  async disk() {
    const diskLayout = await si.diskLayout();
    const fsSize = await si.fsSize();

    return {
      layouts: diskLayout.map((disk) => ({
        name: disk.name,
        type: disk.type,
        vendor: disk.vendor,
        total: disk.size,
      })),
      sizes: fsSize.map((disk) => ({
        fs: disk.fs,
        type: disk.type,
        size: disk.size,
        used: disk.used,
        usedPercentage: disk.use,
      })),
    };
  }

  @Get("/network")
  async network() {
    const networkInterface = await si.networkInterfaceDefault();
    const networkGateway = await si.networkGatewayDefault();

    return {
      interface: networkInterface,
      gateway: networkGateway,
    };
  }
}

export default SystemController;