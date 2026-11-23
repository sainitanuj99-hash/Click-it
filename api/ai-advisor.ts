/**
 * POST /api/ai-advisor
 *
 * Powers the "AI Route & Cargo Advisor" button in the B2B Rate Card form.
 * Uses Gemini when GEMINI_API_KEY is set in the Vercel project; otherwise (or if the
 * call fails) it answers with standard guidance so the button always shows something.
 *
 * Kept free of relative imports so Vercel can build it as a standalone function.
 */
import { GoogleGenAI } from '@google/genai';

// Keep in sync with the fleet shown on the homepage (src/components/HeroBooking.tsx).
const FLEET = [
  '2-Wheeler: up to 20 kg (documents, parcels, food)',
  '3-Wheeler Cargo Loader: up to 500 kg (crates, retail restocking)',
  'Tata Ace 7ft (Chota Hathi): up to 750 kg (wholesale, home shifting)',
  '8ft Pickup / Bolero: up to 1,500 kg (heavy goods, furniture, raw material)',
];

export const FALLBACK_ADVICE = [
  '• Recommended vehicle: Tata Ace (up to 750 kg) for mixed cartons and shop restocking, or an 8ft Pickup / Bolero (up to 1,500 kg) for heavier loads.',
  '• Route: Clickit serves all of Jaipur, with a driver at pickup in about 10–15 minutes.',
  '• Packaging: shrink-wrap or tape cartons, keep fragile items on top, and label multi-drop boxes by stop.',
  '• Documents: a GST invoice for every consignment, plus an e-way bill for high-value goods where GST rules require one.',
].join('\n');

const clean = (value: unknown, max = 200): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

export async function getCargoAdvice(
  input: unknown,
  apiKey: string | undefined = process.env.GEMINI_API_KEY,
): Promise<{ advice: string; source: 'ai' | 'standard' }> {
  if (!apiKey) return { advice: FALLBACK_ADVICE, source: 'standard' };

  const data = input && typeof input === 'object' ? (input as Record<string, unknown>) : {};
  const prompt = `You are a cargo specialist for Clickit, an on-demand goods transport service inside Jaipur.
Clickit only operates these vehicles, within Jaipur. Never recommend any other vehicle or intercity transport.
${FLEET.map((v) => `- ${v}`).join('\n')}

Customer request:
- Goods: ${clean(data.goodsType, 100) || 'General goods'}
- Expected monthly volume: ${clean(data.monthlyVolume, 60) || 'Not given'}
- Pickup area: ${clean(data.origin, 100) || 'Jaipur'}
- Drop area: ${clean(data.destination, 100) || 'Jaipur'}
- Notes: ${clean(data.specialInstructions, 500) || 'None'}

Reply in plain text with four short bullet points starting with "•":
1. Recommended vehicle and why
2. Route and timing within Jaipur
3. Packaging and safety tips
4. Documents needed (GST invoice, e-way bill when required)`;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
    const text = (response.text || '').trim();
    return text ? { advice: text, source: 'ai' } : { advice: FALLBACK_ADVICE, source: 'standard' };
  } catch (err) {
    console.error('[ai-advisor] Gemini request failed:', err);
    return { advice: FALLBACK_ADVICE, source: 'standard' };
  }
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown = {};
  try {
    body = await request.json();
  } catch {
    // An empty or invalid body still gets the standard advice.
  }
  const result = await getCargoAdvice(body);
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
