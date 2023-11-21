import React, { JSX } from "react";

import { Metadata } from "next";
import { Tabs, TabsPanel, TabsTab, TabsList, rem } from "@mantine/core";
import { IconSettingsAutomation } from "@tabler/icons-react";

const metadata: Metadata = {
  title: "Monitor",
};

interface Tabs {
  id: string;
  label: string;
  icon: typeof IconSettingsAutomation;
  component: JSX.Element;
}

const tabs: Tabs[] = [
  {
    id: "services",
    label: "Services",
    icon: IconSettingsAutomation,
    component: (
      <span>Services</span>
    ),
  },
];

const Page = () => {
  const iconStyle = { width: rem(18), height: rem(18) };

  return (
    <Tabs defaultValue={ "services" } display={ "flex" } h={ "100%" } style={ {flexDirection: "column"} } variant={ "default" }>
      <TabsList>
        {
          tabs.map((tab) => (
            <TabsTab key={ tab.id } leftSection={ <tab.icon style={ iconStyle }/> } value={ tab.id }>
              { tab.label }
            </TabsTab>
          ))
        }
      </TabsList>

      {
        tabs.map((tab) => (
          <TabsPanel bg={ "dark.8" } key={ tab.id } mt={ "sm" } p={ "sm" } style={ {flex: 1} } value={ tab.id }>
            { tab.component }
          </TabsPanel>
        ))
      }
    </Tabs>
  );
};

export {
  metadata,
};

export default Page;