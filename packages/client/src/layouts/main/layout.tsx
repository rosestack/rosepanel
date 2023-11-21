"use client";

import React from "react";

import { AppShell, AppShellMain, Box } from "@mantine/core";

import Header from "./header";
import Navbar from "./navbar";

const MainLayout = (props: React.PropsWithChildren) => {
  return (
    <AppShell header={ { height: 56 } } navbar={ { width: 60, breakpoint: 0 } } withBorder={ false }>
      <Header/>
      <Navbar/>
      <AppShellMain pos={ "relative" }>
        <Box inset={ 0 } pos={ "absolute" } style={ { padding: "inherit" } }>
          <Box h={ "100%" } p={ "md" } w={ "100%" }>
            {props.children}
          </Box>
        </Box>
      </AppShellMain>
    </AppShell>
  );
};

export default MainLayout;