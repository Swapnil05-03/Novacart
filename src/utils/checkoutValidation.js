/**
 * Validation helpers for the checkout flow (shipping address + payment
 * details). Each `validate*` function returns `true` when the value is
 * valid, or a human-friendly error string when it isn't — this is the
 * exact shape react-hook-form's `validate` option expects, so these can be
 * passed straight into `register('field', { validate: validateX })`.
 */

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
]

// ----------------------------------------------------------------------------
// Address fields
// ----------------------------------------------------------------------------

const NAME_PATTERN = /^[A-Za-z][A-Za-z\s.'-]*$/
const PLACE_PATTERN = /^[A-Za-z][A-Za-z\s.'-]*$/

export function validateFullName(value) {
  const trimmed = (value || '').trim()
  if (!trimmed) return 'Full name is required'
  if (trimmed.length < 2) return 'Full name must be at least 2 characters'
  if (!NAME_PATTERN.test(trimmed)) return 'Full name should only contain letters'
  if (!/[A-Za-z].*[A-Za-z]/.test(trimmed.replace(/\s/g, '')) && trimmed.replace(/\s/g, '').length < 2) {
    return 'Please enter a valid full name'
  }
  return true
}

/**
 * Accepts "9876543210", "+919876543210", "919876543210", and formats with
 * spaces/dashes — normalizes down to the bare 10-digit number and checks
 * it looks like a real Indian mobile number (starts 6-9, isn't a string of
 * the same repeated digit).
 */
export function validateIndianPhone(value) {
  const raw = (value || '').trim()
  if (!raw) return 'Phone number is required'

  const digitsOnly = raw.replace(/[\s()-]/g, '')
  if (!/^(\+?91)?[0-9]{10}$/.test(digitsOnly)) {
    if (/[a-zA-Z]/.test(digitsOnly)) return 'Phone number cannot contain letters'
    return 'Please enter a valid 10-digit phone number'
  }

  const tenDigits = digitsOnly.slice(-10)
  if (!/^[6-9]/.test(tenDigits)) {
    return 'Please enter a valid Indian mobile number'
  }
  if (/^(\d)\1{9}$/.test(tenDigits)) {
    return 'Please enter a valid phone number'
  }
  return true
}

export function normalizeIndianPhone(value) {
  const digitsOnly = (value || '').replace(/[\s()-]/g, '')
  const tenDigits = digitsOnly.slice(-10)
  return `+91${tenDigits}`
}

export function validateAddressLine1(value) {
  const trimmed = (value || '').trim()
  if (!trimmed) return 'Address is required'
  if (trimmed.length < 8) return 'Please enter your full address (house/flat no., street, area)'
  if (!/[A-Za-z]/.test(trimmed)) return 'Please enter a valid address'
  // Reject inputs that are just digits/punctuation repeated, e.g. "123", "1111111"
  if (/^[0-9\s.,-]+$/.test(trimmed)) return 'Please enter a valid address'
  return true
}

export function validateCity(value) {
  const trimmed = (value || '').trim()
  if (!trimmed) return 'City is required'
  if (trimmed.length < 2) return 'Please enter a valid city name'
  if (!PLACE_PATTERN.test(trimmed)) return 'City should only contain letters'
  return true
}

export function validateStateName(value) {
  const trimmed = (value || '').trim()
  if (!trimmed) return 'State is required'
  const isKnownState = INDIAN_STATES.some((s) => s.toLowerCase() === trimmed.toLowerCase())
  if (isKnownState) return true
  if (!PLACE_PATTERN.test(trimmed) || trimmed.length < 2) {
    return 'Please select or enter a valid state'
  }
  return true
}

export function validatePincode(value) {
  const trimmed = (value || '').trim()
  if (!trimmed) return 'PIN code is required'
  if (!/^[0-9]{6}$/.test(trimmed)) {
    if (/[a-zA-Z]/.test(trimmed)) return 'PIN code cannot contain letters'
    return 'Please enter a valid 6-digit PIN code'
  }
  if (trimmed === '000000' || /^0{6}$/.test(trimmed) || /^(\d)\1{5}$/.test(trimmed)) {
    return 'Please enter a valid PIN code'
  }
  if (trimmed[0] === '0') return 'Please enter a valid PIN code'
  return true
}

// ----------------------------------------------------------------------------
// Payment fields
// ----------------------------------------------------------------------------

export function validateUpiId(value) {
  const trimmed = (value || '').trim()
  if (!trimmed) return 'UPI ID is required'
  // e.g. "name@upi", "9876543210@okhdfcbank"
  if (!/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z][a-zA-Z0-9]{1,64}$/.test(trimmed)) {
    return 'Please enter a valid UPI ID (e.g. name@upi)'
  }
  return true
}

export function formatCardNumberInput(value) {
  const digits = (value || '').replace(/\D/g, '').slice(0, 19)
  return digits.replace(/(.{4})/g, '$1 ').trim()
}

export function detectCardBrand(cardNumber) {
  const digits = (cardNumber || '').replace(/\D/g, '')
  if (/^4/.test(digits)) return 'visa'
  if (/^(5[1-5]|2[2-7])/.test(digits)) return 'mastercard'
  if (/^3[47]/.test(digits)) return 'amex'
  if (/^6/.test(digits)) return 'rupay'
  return 'card'
}

function luhnCheck(digits) {
  let sum = 0
  let shouldDouble = false
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10)
    if (shouldDouble) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    sum += digit
    shouldDouble = !shouldDouble
  }
  return sum % 10 === 0
}

export function validateCardNumber(value) {
  const digits = (value || '').replace(/\D/g, '')
  if (!digits) return 'Card number is required'
  if (/[a-zA-Z]/.test(value || '')) return 'Card number can only contain digits'
  if (digits.length < 13 || digits.length > 19) return 'Card number is invalid'
  if (!luhnCheck(digits)) return 'Card number is invalid'
  return true
}

export function validateCardName(value) {
  const trimmed = (value || '').trim()
  if (!trimmed) return 'Name on card is required'
  if (trimmed.length < 2 || !NAME_PATTERN.test(trimmed)) return 'Please enter the name as it appears on the card'
  return true
}

export function formatExpiryInput(value) {
  const digits = (value || '').replace(/\D/g, '').slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

export function validateExpiry(value) {
  const trimmed = (value || '').trim()
  if (!trimmed) return 'Expiry date is required'
  const match = /^(\d{2})\/(\d{2})$/.exec(trimmed)
  if (!match) return 'Use MM/YY format'

  const month = parseInt(match[1], 10)
  const year = 2000 + parseInt(match[2], 10)
  if (month < 1 || month > 12) return 'Enter a valid expiry month'

  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1
  const expiryTotalMonths = year * 12 + month
  const nowTotalMonths = currentYear * 12 + currentMonth
  if (expiryTotalMonths < nowTotalMonths) return 'This card has expired'
  if (year > currentYear + 20) return 'Enter a valid expiry date'
  return true
}

export function validateCVV(value, cardNumber) {
  const trimmed = (value || '').trim()
  if (!trimmed) return 'CVV is required'
  if (!/^\d+$/.test(trimmed)) return 'CVV can only contain digits'
  const brand = detectCardBrand(cardNumber)
  const expectedLength = brand === 'amex' ? 4 : 3
  if (trimmed.length !== expectedLength) {
    return `CVV must be ${expectedLength} digits for this card`
  }
  return true
}