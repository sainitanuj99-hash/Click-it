/**
 * Shared contact details and the client side of the lead forms
 * (PartnerModal and EnterpriseQuoteModal post to /api/lead).
 */

export const SUPPORT_PHONE_DISPLAY = '+91 141 498 2200';
export const SUPPORT_PHONE_TEL = 'tel:+911414982200';
export const SUPPORT_EMAIL = 'support@justclickit.in';

/** Accepts 10-digit Indian mobile numbers with an optional +91 / 91 / 0 prefix. */
export const isValidIndianMobile = (value: string): boolean =>
  /^(?:\+91|91|0)?[6-9]\d{9}$/.test(value.replace(/[\s()-]/g, ''));

export type LeadPayload =
  | { type: 'driver'; fullName: string; phone: string; city: string; vehicleType: string; website?: string }
  | {
      type: 'b2b';
      companyName: string;
      gstin: string;
      contactPerson: string;
      phone: string;
      monthlyVolume: string;
      notes: string;
      website?: string;
    };

// message is empty on success and written for the visitor on failure.
export type LeadSubmitResult = { ok: boolean; message: string };

const GENERIC_FAILURE = "We couldn't send your details just now. Please try again in a minute.";

export async function submitLead(payload: LeadPayload): Promise<LeadSubmitResult> {
  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    if (res.ok && data.ok) return { ok: true, message: '' };
    // 400 errors carry a message written for the visitor; anything else is a server-side problem.
    if (res.status === 400 && data.error) return { ok: false, message: data.error };
    return { ok: false, message: GENERIC_FAILURE };
  } catch {
    return { ok: false, message: GENERIC_FAILURE };
  }
}
