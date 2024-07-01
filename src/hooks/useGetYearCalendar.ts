import moment, { Moment } from 'moment';
import { useFetchHolidays } from './useFetchHolidaysInMonth';
import { year } from '../utils/moment';
import { MonthData } from '../types/types';
import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useGetYearCalendar = (): { yearCalendar: MonthData[] } => {
  // Fetch the holidays for the year using the custom hook
  const { yearHolidays }: { yearHolidays: string[][] | undefined } =
    useFetchHolidays();

  // Calculate the calendar data based on the fetched holidays
  const yearCalendar: MonthData[] = useMemo(() => {
    // If no holidays are fetched, return an empty array
    if (!yearHolidays) return [];

    // Iterate over all the months of the year
    return Array.from({ length: 12 }, (_, month: number): MonthData => {
      // Get the number of days in the month
      const daysInMonth = (
        moment().year(year).month(month) as Moment
      ).daysInMonth();
      const holidaysInMonth = yearHolidays[month];

      // Get the first day of the current month and the last day of the month
      const firstDayOfMonth = moment().year(year).month(month).date(1);
      const lastDayOfMonth = moment().year(year).month(month).date(daysInMonth);

      // Get the day of the week for the first and last day of the month
      const startDayOfWeek = (firstDayOfMonth.day() + 6) % 7;
      const endDayOfWeek = (lastDayOfMonth.day() + 6) % 7;

      // Create an array of objects representing the days of the previous month
      const prevMonthDays = Array.from({ length: startDayOfWeek }, (_, i) => {
        const date = firstDayOfMonth
          .clone()
          .subtract(startDayOfWeek - i, 'days');
        return {
          id: uuidv4(),
          day: date.format('DD'),
          dayOfWeek: date.format('dddd'),
          holiday: false,
          isFromOtherMonth: true,
        };
      });

      // Create an array of objects representing the days of the current month
      const currentMonthDays = Array.from(
        { length: daysInMonth },
        (_, day: number) => {
          const date: Moment = moment()
            .year(year)
            .month(month)
            .date(day + 1);
          const isHoliday: boolean = holidaysInMonth?.[day] === '1';

          return {
            id: uuidv4(),
            day: date.format('DD'),
            dayOfWeek: date.format('dddd'),
            holiday: isHoliday,
            isFromOtherMonth: false,
          };
        },
      );

      // Create an array of objects representing the days of the next month
      const nextMonthDays = Array.from({ length: 7 - endDayOfWeek }, (_, i) => {
        const date = lastDayOfMonth.clone().add(i + 1, 'days');
        return {
          id: uuidv4(),
          day: date.format('DD'),
          dayOfWeek: date.format('dddd'),
          holiday: false,
          isFromOtherMonth: true,
        };
      });

      // Combine the arrays of previous, current and next month days
      const days = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

      // Group the days into weeks and return an object representing the current month
      const weeks = [];
      for (let i = 0; i < 6; i++) {
        weeks.push({ week: days.slice(i * 7, (i + 1) * 7) });
      }

      return {
        month: moment().year(year).month(month).format('MMMM'),
        weeks,
      };
    });
  }, [yearHolidays]);

  return { yearCalendar };
};
