import { useState, useEffect, useContext, useRef } from "react";
import { ZodSchema, ZodError } from "zod";
import { NerdGraphQuery, PlatformStateContext } from "nr1";

import { nerdGraphQuery } from "./queries";
import { useProps } from "../../context/VizPropsProvider";

const FETCH_INTERVAL_DEFAULT = 60; // fetch interval in s - 1 min
const FETCH_INTERVAL_MESSAGE = `Fetch interval less than 1 second is not allowed. Setting to default: ${FETCH_INTERVAL_DEFAULT}s.`;
const ZOD_VALIDATION_MESSAGE =
  "It appears the data returned from the query is not in the expected format. Please check the query and try again.";

type QueryResult<T> = {
  data: Array<T>;
  error: any;
  lastUpdateStamp: number;
};

export const useNerdGraphQuery = <T,>(
  query: string,
  responseSchema: ZodSchema<Array<T>>,
): QueryResult<T> => {
  const { timeRange } = useContext(PlatformStateContext);
  const {
    accountId,
    fetchInterval = FETCH_INTERVAL_DEFAULT,
    ignorePicker = false,
    defaultSince = "",
  } = useProps();
  const [data, setData] = useState<Array<T>>([]);
  const [error, setError] = useState<any>(null);
  const [lastUpdateStamp, setLastUpdateStamp] = useState<number>(0);
  const isInitialFetchRef = useRef<boolean>(true);
  const isFetchingRef = useRef<boolean>(false);

  useEffect(() => {
    if (!query || query === null || query === undefined) {
      console.log("❌ [useNerdGraphQuery] Query is required to fetch data.");
      setData([]);
      return;
    }

    // Don't run query if accountId is not available yet
    if (!accountId) {
      return;
    }

    // Prevent multiple simultaneous fetches
    if (isFetchingRef.current) {
      return;
    }

    const fetchData = async () => {
      // Prevent overlapping fetches from interval calls
      if (isFetchingRef.current) {
        return;
      }

      isFetchingRef.current = true;
      const fetchStartTime = performance.now();
      console.log(`⏱️ [Performance] Query initiated at ${fetchStartTime}ms`);
      
      const nrql = nerdGraphQuery(query, timeRange, defaultSince, ignorePicker);
      const variables = { id: parseInt(accountId, 10) };

      try {
        const response = await NerdGraphQuery.query({ query: nrql, variables });
        const queryDuration = performance.now() - fetchStartTime;
        console.log(`⏱️ [Performance] Query completed in ${queryDuration}ms`);
        
        const results = response?.data?.actor?.account?.result?.results;

        if (results) {
          const validatedData = responseSchema.parse(results);
          setData(validatedData);
          setLastUpdateStamp(performance.now()); // Use performance.now() for consistent timing
        }
      } catch (error) {
        if (error instanceof ZodError) {
          console.error("Validation error:", error.errors);
          setError(ZOD_VALIDATION_MESSAGE);
        } else {
          console.error("Error fetching data:", error);
          setError((error as Error).message || 'Unknown error occurred');
        }
      } finally {
        isFetchingRef.current = false;
        if (isInitialFetchRef.current) {
          isInitialFetchRef.current = false;
        }
      }
    };

    fetchData();

    if (fetchInterval < 1) {
      console.log(FETCH_INTERVAL_MESSAGE);
      return;
    }

    const fetchIntervalms = (fetchInterval || FETCH_INTERVAL_DEFAULT) * 1000;
    const intervalId = setInterval(fetchData, fetchIntervalms);

    return () => {
      clearInterval(intervalId);
      isFetchingRef.current = false;
    };
  }, [query, accountId, timeRange, fetchInterval, ignorePicker, defaultSince]);

  return { data, error, lastUpdateStamp };
};
