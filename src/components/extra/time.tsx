import { useEffect, useState } from 'react'

const timeFormatter = Intl.DateTimeFormat('en-US', {
  dateStyle: 'short',
  timeStyle: 'short',
  hour12: true,
})

export default function Time({ date }: { date: Date }) {
  const [time, setTime] = useState(timeFormatter.format(date))

  useEffect(() => {
    const handler = setInterval(() => {
      setTime(timeFormatter.format(date))
    }, 1000)
    return () => clearInterval(handler)
  }, [])
  return <time dateTime={date.toISOString()}>{time}</time>
}
