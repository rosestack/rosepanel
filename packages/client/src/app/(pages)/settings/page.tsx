import React from "react";

import { Metadata } from "next";

import { Center } from "@mantine/core";

const metadata: Metadata = {
  title: "Settings",
};

const Page = () => {
  return (
    <Center h={ "100%" }>
      <span>settings</span>
    </Center>
  );
};

export {
  metadata,
};

export default Page;