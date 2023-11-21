import { PropsWithChildren } from "react";

import { Metadata } from "next";

import { Kanit } from "next/font/google";

import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import { theme } from "~styles/mantine/provider";

import MainLayout from "~layouts/main/layout";

import { SocketProvider } from "~common/context/socket";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import "~styles/main.scss";
import SWRProvider from "~common/providers/swr";

const metadata: Metadata = {
  title: {
    default: "Rosepanel",
    template: "Rosepanel | %s",
  },
};

const kanit = Kanit({
  subsets: [
    "latin",
  ],
  weight: [
    "500",
    "600",
    "700",
  ],
  preload: false,
});

const Layout = (props: PropsWithChildren) => {
  return (
    <html>
      <head>
        <link href={ "favicon.svg" } rel={ "icon" }/>
        <ColorSchemeScript/>
      </head>
      <body style={ kanit.style }>
        <SWRProvider>
          <SocketProvider>
            <MantineProvider defaultColorScheme={ "dark" } theme={ theme }>
              <Notifications/>
              <MainLayout>
                {props.children}
              </MainLayout>
            </MantineProvider>
          </SocketProvider>
        </SWRProvider>
      </body>
    </html>
  );
};

export {
  metadata,
};

export default Layout;