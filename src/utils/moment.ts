import moment from 'moment';

export const year = moment().get('year');
export const month = moment().get('month');
export const daysInMonth = moment().year(year).month(month).daysInMonth();
export const monthName = moment(`${year}-${month}`).format('MMMM');
export const daysName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
