/**
 * POST /api/lead
 *
 * Receives the "Become a Partner" (driver) and "B2B Rate Card" form submissions,
 * validates them, and forwards each one as JSON to the URL in the LEAD_WEBHOOK_URL
 * environment variable (for example a Google Apps Script web app that appends a row
 * to a Google Sheet, or a Zapier / Make webhook). See README.md for setup.
 *
 * The form only shows "received" when this endpoint answers 200, so a missing or
 * failing webhook is reported to the visitor instead of silently losing the lead.
 *
 * Kept free of relative imports so Vercel can build it as a standalone function.
 */

type LeadType = 'driver' | 'b2b';

export interface LeadResult {
  status: number;
  body: { ok: boolean; error?: string };
}

const GSTIN_RE = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

const clean = (value: unknown, max = 200): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

/** Accepts 10-digit Indian mobile numbers with an optional +91 / 91 / 0 prefix. */
export const isValidIndianMobile = (value: string): boolean =>
  /^(?:\+91|91|0)?[6-9]\d{9}$/.test(value.replace(/[\s()-]/g, ''));

const fail = (status: number, error: string): LeadResult => ({ status, body: { ok: false, error } });

export async function handleLead(
  input: unknown,
  env: Record<string, string | undefined> = process.env,
): Promise<LeadResult> {
  const data = input && typeof input === 'object' ? (input as Record<string, unknown>) : {};

  // Honeypot: the "website" field is hidden from people, so only bots fill it in.
  if (clean(data.website)) return { status: 200, body: { ok: true } };

  const type: LeadType | null = data.type === 'b2b' ? 'b2b' : data.type === 'driver' ? 'driver' : null;
  if (!type) return fail(400, 'Unknown form type.');

  const phone = clean(data.phone, 20);
  if (!isValidIndianMobile(phone)) return fail(400, 'Enter a valid 10-digit mobile number.');

  let lead: Record<string, string>;
  if (type === 'driver') {
    const fullName = clean(data.fullName, 100);
    if (fullName.length < 2) return fail(400, 'Enter your full name.');
    lead = {
      type,
      fullName,
      phone,
      city: clean(data.city, 50) || 'Jaipur',
      vehicleType: clean(data.vehicleType, 50),
    };
  } else {
    const companyName = clean(data.companyName, 150);
    const contactPerson = clean(data.contactPerson, 100);
    const gstin = clean(data.gstin, 15).toUpperCase();
    if (!companyName) return fail(400, 'Enter your company or business name.');
    if (!contactPerson) return fail(400, 'Enter a contact person.');
    if (gstin && !GSTIN_RE.test(gstin)) return fail(400, 'Enter a valid 15-character GSTIN.');
    lead = {
      type,
      companyName,
      contactPerson,
      phone,
      gstin,
      monthlyVolume: clean(data.monthlyVolume, 60),
      notes: clean(data.notes, 1000),
    };
  }

  const webhook = env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    console.error('[lead] LEAD_WEBHOOK_URL is not set, so this lead was not saved.');
    return fail(503, 'not_configured');
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...lead, submittedAt: new Date().toISOString(), source: 'justclickit.in' }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`Webhook answered ${res.status}`);
    return { status: 200, body: { ok: true } };
  } catch (err) {
    console.error('[lead] Forwarding to LEAD_WEBHOOK_URL failed:', err);
    return fail(502, 'delivery_failed');
  }
}

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid request.' }, 400);
  }
  const result = await handleLead(body);
  return json(result.body, result.status);
}
