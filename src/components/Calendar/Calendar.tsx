import styles from './Calendar.module.css';
import Day from '../Day/Day';
import { MonthData } from '../../types/types';
import { useState } from 'react';
import { daysName, month } from '../../utils/moment';

interface Props {
  yearCalendar: MonthData[];
}

const Calendar = ({ yearCalendar }: Props) => {
  const [currentMonth, setCurrentMonth] = useState(month);

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev > 0 ? prev - 1 : 11));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev < 11 ? prev + 1 : 0));
  };

  return (
    <>
      <div className={styles.calendarButtons}>
        <button
          type="button"
          onClick={handlePrevMonth}
          disabled={currentMonth === 0}
        >
          Previous
        </button>
        {yearCalendar.slice(currentMonth, currentMonth + 1).map((motth) => (
          <h2 key={motth.month}>{motth.month}</h2>
        ))}

        <button
          type="button"
          onClick={handleNextMonth}
          disabled={currentMonth === 11}
        >
          Next
        </button>
      </div>
      <ul className={styles.calendar}>
        <div className={styles.calendarDays}>
          {daysName.map((day) => (
            <li key={day}>{day}</li>
          ))}
        </div>

        <div className={styles.calendarWeeks}>
          {yearCalendar
            .slice(currentMonth, currentMonth + 1)
            .map((motth) =>
              motth.weeks.map((week) =>
                week.week.map((day) => (
                  <Day
                    key={day.id}
                    day={day.day}
                    holiday={day.holiday}
                    isFromOtherMonth={day.isFromOtherMonth}
                  />
                )),
              ),
            )}
        </div>
      </ul>
    </>
  );
};

export default Calendar;
