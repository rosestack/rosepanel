import useSWR, { SWRConfiguration } from "swr";

import fetcher from "~api/fetcher";

const url = (path: string) => {
  return `/api/system/${path}`;
};

interface ITime {
  timezone: string,
}

const useTime = (config?: SWRConfiguration) => {
  return useSWR<ITime>("time", () => {
    return fetcher(url("time"));
  }, config);
};

export {
  useTime,
};