"use client";

import React from "react";

import { Loader, useMantineTheme, Center } from "@mantine/core";

const Loading = () => {
  const theme = useMantineTheme();

  return (
    <Center>
      <Loader color={ theme.primaryColor } size={ "md" } variant={ "oval" }/>
    </Center>
  );
};

export default Loading;