import { useEffect, useMemo, useState } from 'react';
import { AxiosHttpClient } from '../api/AxiosHttpClient';
import { ApiService } from '../api/api';
import { year } from '../utils/moment';

export const useFetchHolidays = () => {
  const [yearHolidays, setYearHolidays] = useState<string[][]>();
  const httpClient = useMemo(() => new AxiosHttpClient(), []);
  const apiService = useMemo(() => new ApiService(httpClient), [httpClient]);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const promises = Array.from({ length: 12 }, (_, month) =>
          apiService.fetchData(
            `https://isdayoff.ru/api/getdata?year=${year}&month=${
              month + 1
            }&cc=ru`,
          ),
        );

        const results = await Promise.all(promises);

        const holidays = results.map((result) => {
          if (typeof result === 'string') {
            return result.split('');
          }
          return [];
        });

        setYearHolidays(holidays);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchHolidays();
  }, [apiService]);

  console.log(yearHolidays);

  return {
    yearHolidays,
  };
};
