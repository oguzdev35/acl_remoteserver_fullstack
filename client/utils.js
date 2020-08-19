import { formatToTimeZone } from 'date-fns-timezone';

export const formatDate = dateString => {
  return formatToTimeZone(
      new Date(dateString),
      'D.M.YYYY',
      { timeZone: 'Europe/Istanbul' }
  )
}