# ClickIt Delivery Network 🚚📦

> On-demand and scheduled intracity & intercity logistics platform built for enterprises, local businesses, and individual deliveries across Jaipur and Rajasthan.

## ✨ Features

- **Dynamic Fleet Selection**: Instant pricing & capacity metrics across 2-Wheelers, 3-Wheelers, Tata Ace (Chhota Hathi), and 8ft Pickup.
- **Live Consignment Tracking**: Interactive tracking by Waybill number or Order ID with milestone statuses, ETA indicators, and e-POD verification logs.
- **Enterprise Logistics Engine**: Dedicated multi-point routing, cold-chain handling, and quote consultation flow.
- **Legal & Compliance**: Complete Privacy Policy (updated 15th Sept 2026), Terms of Service, and 24/7 dedicated escalation desk.
- **Modern Brand Identity**: Custom vector SVG monogram logo and responsive UI styled with Tailwind CSS.

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Motion
- **Backend / Dev**: Express.js, Vite
- **Deployment**: Vercel & Node.js container ready

## 🛠️ Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/sainitanuj99-hash/Click-it.git

# Navigate to project directory
cd Click-it

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

The application will start on `http://localhost:3000`.

### Production Build

```bash
npm run build
npm start
```

## 📬 Receiving form submissions

The "Become a Partner" and "B2B Rate Card" forms post to `/api/lead` (a Vercel function in `api/lead.ts`).
It forwards each submission as JSON to the URL in the **`LEAD_WEBHOOK_URL`** environment variable.
Until that variable is set, the forms show an error with the phone number and email instead of a false "received" message.

**Quickest setup: a Google Sheet**

1. Create a Google Sheet and add a header row: `submittedAt, type, fullName, companyName, contactPerson, phone, gstin, city, vehicleType, monthlyVolume, notes`.
2. In the sheet, open **Extensions → Apps Script**, replace the code with the script below, and save.
3. Click **Deploy → New deployment → Web app**. Set *Execute as* to **Me** and *Who has access* to **Anyone**. Copy the web app URL.
4. In Vercel, open the project → **Settings → Environment Variables**, add `LEAD_WEBHOOK_URL` with that URL (Production and Preview), then redeploy.

```js
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  sheet.appendRow(headers.map((h) => data[h] || ''));
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
```

Any other webhook that accepts a JSON POST (Zapier, Make, Pabbly, a Slack workflow) works the same way.

**AI Route & Cargo Advisor:** set `GEMINI_API_KEY` in Vercel to use Gemini. Without it, `/api/ai-advisor` returns standard guidance.

## 📄 License
© 2026 Clickit Delivery Network Pvt. Ltd. All rights reserved.
