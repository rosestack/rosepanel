"use client";

import React from "react";

import Link from "next/link";

import { Center, Text, Stack, Button } from "@mantine/core";

const NotFound = () => {
  return (
    <Center>
      <Stack align={ "center" }>
        <Text>Page Not Found</Text>
        <Link href={ "/" }>
          <Button>Return</Button>
        </Link>
      </Stack>
    </Center>
  );
};

export default NotFound;