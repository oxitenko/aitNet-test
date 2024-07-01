export interface Day {
  id?: string;
  day: string;
  dayOfWeek?: string;
  holiday: boolean;
  isFromOtherMonth: boolean;
}

export interface Week {
  week: Day[];
}

export interface MonthData {
  month: string;
  weeks: Week[];
}
