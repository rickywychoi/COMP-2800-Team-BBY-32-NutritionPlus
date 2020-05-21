/**
 * Takes a timestamp as an input and converts it into a readable date format.
 * 
 * Converts into different time formats depending on timestamp input and provides 
 * the day/date and time for myMeals, myCart, myOrder, and Order History.
 * 
 * Uses date-fns.
 * @see https://date-fns.org/
 */

import { format } from 'date-fns'

const DateFormatter = ({ date }) => {
  let dateString = format(date, 'yyyy-MM-dd')
  
  let formattedDate
  let givenDate = date
  let today = new Date().setHours(0, 0, 0)
  let yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).setHours(0, 0, 0)
  let thisWeek = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).setHours(0, 0, 0)

  if (givenDate >= today) {
    formattedDate = format(date, 'h:mm aaaa')
  } else if (givenDate >= yesterday && givenDate < today) {
    formattedDate = 'yesterday, ' + format(date, 'h:mm aaaa')  
  } else if (givenDate >= thisWeek && givenDate < yesterday) {
    formattedDate = format(date, 'EEE. h:mm aaaa')
  } else {
    formattedDate = format(date, 'MMM. d')
  }

  return <time dateTime={dateString}>{formattedDate}</time>
}

export default DateFormatter