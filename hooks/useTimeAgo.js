import { useEffect, useState } from "react"

const isRelativeTimeFormatSupported = typeof Intl !== 'undefined' && Intl.DateTimeFormat
const DATE_UNITS = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
]

const getDateDiffs = (timestamp) => {
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000
  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === "second") {
      const value = Math.round(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}

export default function useTimeAgo(timestamp) {
  const [timeago, setTimeago] = useState(() => getDateDiffs(timestamp))

  useEffect(() => {
    //en caso de que el Intl lo soporte el navegador hacemos el timeago
    if(isRelativeTimeFormatSupported){
      const interval = setInterval(() => {
        const newTimeAgo = getDateDiffs(timestamp)
        setTimeago(newTimeAgo)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [timestamp])

  //en caso de que Intl no este soportado por el navegador del usario le devolvemos un formato para la fecha con mas soporte
  if(!isRelativeTimeFormatSupported){
    const date = new Date(timestamp)
    const options = {
      weekday:'short',
      year:'numeric',
      month:'short',
      day:'numeric'
    }
    return date.toLocaleDateString('es-AR',options)
  }

  const rtf = new Intl.RelativeTimeFormat('es', { style: 'short' })
  const { value, unit } = timeago
  return rtf.format(value, unit)
}