import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getMikrotiks } from "@/lib/actions/actions";
import { fetchMikrotikSystemResources } from "@/lib/actions/mikrotik";
import { bytesToGB } from "@/lib/utils";
import { ActivityIcon, ClockIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const mikrotiks = await getMikrotiks();

  if (mikrotiks.total === 0) {
    return redirect("/main/network/add");
  }
  const data = {
    username: mikrotiks.documents[0].username,
    password: mikrotiks.documents[0].password,
    ipAddress: mikrotiks.documents[0].ipAddress,
  };
  const resources = await fetchMikrotikSystemResources(data);

  const resourceData = {
    cpu: resources.cpu,
    buildTime: resources["build-time"],
    platform: resources.platform,
    architecture: resources[`architecture-name`],
    cpuLoad: resources["cpu-load"],
    totalMemory: bytesToGB(resources["total-memory"]),
    availableMemory: bytesToGB(resources["free-memory"]),
    totalDisk: bytesToGB(resources["total-hdd-space"]),
    availableDisk: bytesToGB(resources["free-hdd-space"]),
    uptime: resources.uptime,
    writeSectTotal: resources["write-sect-total"],
    writeSectSinceReboot: resources["write-sect-since-reboot"],
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>System Overview</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Platform
            </div>
            <div className="font-medium">{resources.platform}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Architecture
            </div>
            <div className="font-medium">{resources[`architecture-name`]}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">CPU</div>
            <div className="font-medium">{resourceData.cpu}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Build Time
            </div>
            <div className="font-medium">{resourceData.buildTime}</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Resource Utilization</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              CPU Load
            </div>
            <div className="font-medium">
              <Progress value={resourceData.cpuLoad} />
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Memory
            </div>
            <div className="font-medium">
              <div className="flex items-center gap-2">
                <p className="text-sm">
                  {resourceData.availableMemory} / {resourceData.totalMemory}
                </p>
                <Progress value={50} />
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Storage
            </div>
            <div className="font-medium">
              <div className="flex items-center gap-2">
                <p className="text-sm">
                  {resourceData.availableDisk} / {resourceData.totalDisk}
                </p>
                <Progress value={50} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Uptime and Activity</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Uptime
            </div>
            <div className="font-medium">
              <ClockIcon className="w-4 h-4 inline-block mr-1" />
              {resourceData.uptime}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Write Sectors Total
            </div>
            <div className="font-medium">
              <ActivityIcon className="w-4 h-4 inline-block mr-1" />
              {resourceData.writeSectTotal}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Write Sectors since reboot
            </div>
            <div className="font-medium">
              <ActivityIcon className="w-4 h-4 inline-block mr-1" />
              {resourceData.writeSectSinceReboot}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
