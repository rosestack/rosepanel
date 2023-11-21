"use client";

import React from "react";

import { SWRConfig, SWRConfiguration } from "swr";

const swrConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const SWRProvider = (props: React.PropsWithChildren) => {
  return (
    <SWRConfig value={ swrConfig }>
      {props.children}
    </SWRConfig>
  );
};

export default SWRProvider;