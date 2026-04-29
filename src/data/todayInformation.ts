export type TodayInfoType = {
  day: string
  date: string
  time: string
}

export function getTodayInformation(): TodayInfoType {
  const today = new Date()
  const day = today.toLocaleDateString(undefined, { weekday: "long" })

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const date = `${monthNames[today.getMonth()]} - ${today.getDate()} - ${today.getFullYear()}`

  const time = today.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })

  return { day, date, time }
}
