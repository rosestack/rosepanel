import React from "react";

import { Metadata } from "next";

import SystemSection from "./sections/system/section";

const metadata: Metadata = {
  title: "Rosepanel | Overview",
};

const Page = () => {
  return (
    <SystemSection/>
  );
};

export {
  metadata,
};

export default Page;