import { parsePhoneNumberFromString, isValidPhoneNumber } from 'libphonenumber-js';

/**
 * Returns the phone in strict E.164 form (e.g. "+15551234567") or null when
 * the input is invalid. Empty/whitespace input is treated as "no phone" and
 * also returns null, which the caller can map to a database NULL.
 */
export function toE164(input: string | null | undefined, defaultCountry?: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  if (!trimmed) return null;
  try {
    const parsed = parsePhoneNumberFromString(trimmed, defaultCountry as any);
    if (parsed && parsed.isValid()) return parsed.number; // E.164
  } catch {
    // fall through
  }
  return null;
}

export function isValidPhone(input: string, defaultCountry?: string): boolean {
  if (!input || !input.trim()) return true; // empty allowed (optional field)
  try {
    return isValidPhoneNumber(input.trim(), defaultCountry as any);
  } catch {
    return false;
  }
}
