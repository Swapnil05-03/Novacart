import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'novacart-delivery-location'

function readStoredLocation() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function persistLocation(location) {
  try {
    if (location) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(location))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // localStorage unavailable — location still works for this session
  }
}

/**
 * Delivery-location state: GPS detect (with reverse geocoding via the free,
 * keyless OpenStreetMap Nominatim API) or manual text entry, persisted to
 * localStorage. This is a display/UX feature only — it is NOT wired into
 * checkout or any database table; the real shipping address a person
 * enters at checkout is unaffected by this.
 */
export function useLocation() {
  const [location, setLocation] = useState(readStoredLocation)
  const [isDetecting, setIsDetecting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    persistLocation(location)
  }, [location])

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Location detection is not supported in this browser.')
      return
    }

    setIsDetecting(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=14&addressdetails=1`,
            { headers: { Accept: 'application/json' } }
          )
          if (!res.ok) throw new Error('Reverse geocoding failed')
          const data = await res.json()
          const addr = data.address || {}

          const area = addr.suburb || addr.city_district || addr.town || addr.village || addr.city || ''
          const city = addr.city || addr.town || addr.state_district || ''
          const postcode = addr.postcode || ''

          const label = [area || city, postcode].filter(Boolean).join(', ') || data.display_name

          setLocation({ label, source: 'gps', lat: latitude, lng: longitude })
        } catch {
          setError("Couldn't determine your address from your location. Try entering it manually.")
        } finally {
          setIsDetecting(false)
        }
      },
      () => {
        setError('Location permission denied. You can enter your location manually instead.')
        setIsDetecting(false)
      },
      { timeout: 10000 }
    )
  }, [])

  const setManualLocation = useCallback((label) => {
    if (!label?.trim()) return
    setLocation({ label: label.trim(), source: 'manual' })
    setError(null)
  }, [])

  const clearLocation = useCallback(() => {
    setLocation(null)
  }, [])

  return {
    location,
    isDetecting,
    error,
    detectLocation,
    setManualLocation,
    clearLocation,
  }
}