export const formatDateTime = (date: Date) => {
  // Months array (0-indexed)
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  // Days of the week array
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  // Get components of the date
  const month = months[date.getUTCMonth()]; // Get abbreviated month name
  const dayOfMonth = date.getUTCDate(); // Get day of the month
  const dayOfWeek = daysOfWeek[date.getUTCDay()]; // Get full day name
  const hours = date.getUTCHours(); // Get hours (0-23)
  const minutes = date.getUTCMinutes(); // Get minutes

  // Format hours to 12-hour format with AM/PM
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // Convert midnight (0) to 12
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Ensure minutes are two digits

  // Construct the formatted date and time string
  // const formattedDateTime = `${month} ${dayOfMonth}, ${dayOfWeek}, ${formattedHours}:${formattedMinutes}${ampm}`;
  const formattedDateTime = {
    month,
    dayOfMonth,
    dayOfWeek,
    formattedHours,
    formattedMinutes,
    ampm
  };

  return formattedDateTime;
};
