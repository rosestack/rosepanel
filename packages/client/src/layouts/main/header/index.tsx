"use client";

import React from "react";

import { AppShellHeader, Image, Center, Group, Text } from "@mantine/core";

import dayjs from "dayjs";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { useTime } from "~api/system";

dayjs.extend(utc);
dayjs.extend(timezone);

const Header = () => {
  const { data } = useTime();

  const [timezone, setTimezone] = React.useState<string | undefined>();
  const [current, setCurrent] = React.useState<number | undefined>();

  React.useEffect(() => {
    if ( !data ) {
      return;
    }

    setTimezone(data.timezone);
  }, [data]);

  React.useEffect(() => {
    if ( !timezone ) {
      return;
    }

    const interval = setInterval(() => {
      setCurrent(new Date().getTime());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timezone]);

  return (
    <AppShellHeader bg={ "dark.8" } pr={ "md" }>
      <Center>
        <Group justify={ "space-between" } w={ "100%" }>
          <Center w={ 60 }>
            <Image alt={ "Rosepanel" } h={ 26 } src={ "logo.svg" }/>
          </Center>

          {
            current && (
              <Text>{dayjs(current).tz(timezone).format("MMM D - h:mm:ss A")}</Text>
            )
          }
        </Group>
      </Center>
    </AppShellHeader>
  );
};

export default Header;