import { useState, useEffect } from 'react'

/**
 * Returns a live HH:MM:SS countdown that resets every `windowHours` hours,
 * so a "Flash Sale" timer always appears to be counting down to something
 * imminent rather than expiring and freezing at 00:00:00.
 */
export function useCountdown(windowHours = 8) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(windowHours))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(windowHours))
    }, 1000)
    return () => clearInterval(interval)
  }, [windowHours])

  return timeLeft
}

function getTimeLeft(windowHours) {
  const windowMs = windowHours * 60 * 60 * 1000
  const now = Date.now()
  const msIntoWindow = now % windowMs
  const msRemaining = windowMs - msIntoWindow

  const hours = Math.floor(msRemaining / (60 * 60 * 1000))
  const minutes = Math.floor((msRemaining % (60 * 60 * 1000)) / (60 * 1000))
  const seconds = Math.floor((msRemaining % (60 * 1000)) / 1000)

  return {
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  }
}