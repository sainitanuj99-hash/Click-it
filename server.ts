import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { SAMPLE_SHIPMENTS, VEHICLE_FLEET } from './src/data/mockData.ts';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API 1: Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Clickit Logistics API', timestamp: new Date().toISOString() });
  });

  // API 2: Shipment Tracking API
  app.get('/api/track/:trackingId', (req, res) => {
    const trackingId = (req.params.trackingId || '').trim().toUpperCase();
    const shipment = SAMPLE_SHIPMENTS.find(s => s.trackingId.toUpperCase() === trackingId || s.waybillNo.toUpperCase() === trackingId);
    
    if (shipment) {
      return res.json({ success: true, shipment });
    }

    // Dynamic fallback for any other tracking ID entered
    if (trackingId.length >= 4) {
      const dynamicShipment = {
        trackingId: trackingId.startsWith('CLK-') ? trackingId : `CLK-${trackingId.slice(-6)}`,
        waybillNo: `WB-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        senderName: 'Clickit Express Sender',
        senderCompany: 'Reliable Supply Chain Pvt Ltd',
        senderAddress: 'VKIA Freight Terminal, Gate 4',
        senderCity: 'Jaipur',
        receiverName: 'Consignee Receiver',
        receiverCompany: 'Metro Distribution Hub',
        receiverAddress: 'Sitapura Industrial Phase 3',
        receiverCity: 'Jaipur',
        vehicleId: 'container-14ft',
        vehicleName: '14ft Closed Container',
        vehicleNo: 'RJ-14-TR-4920',
        goodsCategory: 'General Industrial Freight',
        weightKg: 1850,
        status: 'in_transit' as const,
        progressPercent: 55,
        scheduledDate: new Date(Date.now() - 86400000).toLocaleString(),
        estimatedDelivery: new Date(Date.now() + 86400000).toLocaleString(),
        driverName: 'Gurdeep Singh',
        driverPhone: '+91 98765 12345',
        driverRating: 4.88,
        currentLocationName: 'NH-48 Highway Waystation (In Transit)',
        currentLat: 20.2118,
        currentLng: 73.0158,
        totalDistanceKm: 1240,
        baseFare: 28500,
        gstAmount: 5130,
        totalFare: 33630,
        checkpoints: [
          { id: '1', locationName: 'Origin Cargo Depot', timestamp: '1 day ago', status: 'completed' as const, description: 'Manifest verified & sealed' },
          { id: '2', locationName: 'State Border Toll Plaza', timestamp: '12 hours ago', status: 'completed' as const, description: 'E-Way bill scanned OK' },
          { id: '3', locationName: 'Intercity Highway Hub', timestamp: 'Currently here', status: 'current' as const, description: 'Cruising at 62 km/h' },
          { id: '4', locationName: 'Destination Freight Yard', timestamp: 'Tomorrow AM', status: 'pending' as const, description: 'Scheduled for final mile delivery' }
        ]
      };
      return res.json({ success: true, shipment: dynamicShipment });
    }

    return res.status(404).json({ success: false, message: 'Shipment or Waybill not found.' });
  });

  // API 3: AI Logistics & Cargo Sizing Advisor (using @google/genai)
  app.post('/api/ai-advisor', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({
          advice: "For optimum B2B cargo movement with Clickit, we recommend using a 14ft Closed Container for multi-box FMCG goods or a 32ft MX Container for heavy volume freight. Ensure all items are palletized and E-Way bills are attached.",
          recommendedVehicle: "14ft Closed Container"
        });
      }

      const { goodsType, weightKg, origin, destination, specialInstructions } = req.body;

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are Clickit Senior B2B Cargo Logistics & Freight Specialist.
Provide a concise, professional recommendation for a B2B shipment:
- Cargo Type: ${goodsType || 'General Freight'}
- Weight: ${weightKg || 1000} kg
- Pickup: ${origin || 'Jaipur'}
- Drop: ${destination || 'Jaipur'}
- Notes: ${specialInstructions || 'None'}

Vehicles available:
${VEHICLE_FLEET.map(v => `- ${v.name}: ${v.capacityDisplay}, Body: ${v.bodyType}, Base Rate: ₹${v.baseFare} + ₹${v.perKmRate}/km`).join('\n')}

Format your response cleanly with bullet points:
1. Recommended Vehicle & Why
2. Route & Transit Estimate
3. Safety & Packaging Tips
4. B2B Documentation needed (e.g. E-Way Bill, GST invoice, Insurance)`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      const text = response.text || 'Recommendation generated based on optimal fleet payload.';
      res.json({ success: true, advice: text });
    } catch (err: any) {
      console.error('Gemini AI Advisor Error:', err);
      res.json({
        success: true,
        advice: "• Recommended Vehicle: 14ft Closed Container or Tata Ace\n• Packaging Tip: Ensure goods are shrink-wrapped and securely palletized.\n• Docs Needed: GST Invoice & E-Way Bill for intercity transit (> ₹50,000 value)."
      });
    }
  });

  // Route metadata for server-rendered SEO
  const ROUTE_SEO: Record<string, { title: string; description: string; canonical: string }> = {
    '/': {
      title: 'Clickit Jaipur – On-Demand Intracity Logistics & Delivery Network',
      description: 'Clickit Jaipur: Book instant bike couriers, 3-wheeler loaders, Tata Ace, and pickup trucks with real-time GPS tracking across Jaipur. 10-minute pickup guaranteed.',
      canonical: 'https://www.justclickit.in/'
    },
    '/about-us': {
      title: 'About Clickit Jaipur – Moving Jaipur & India Forward',
      description: 'Learn about Clickit Jaipur, our verified driver partner network, intracity freight innovation, and headquarters in Bani Park, Jaipur. On-demand logistics with zero surge.',
      canonical: 'https://www.justclickit.in/about-us'
    },
    '/help-support': {
      title: '24/7 Help & Support – Clickit Jaipur Helpline & Dispatch Office',
      description: 'Contact Clickit Jaipur 24/7 support at +91 141 498 2200 or email support@justclickit.in. Visit our Bani Park HQ for immediate dispatch or enterprise assistance.',
      canonical: 'https://www.justclickit.in/help-support'
    },
    '/driver-faqs': {
      title: 'Driver FAQs & Earnings – Join Clickit Jaipur Fleet',
      description: 'Frequently asked questions for delivery drivers and vehicle owners in Jaipur. Learn about daily payouts, commercial vehicle requirements, fuel perks, and joining Clickit.',
      canonical: 'https://www.justclickit.in/driver-faqs'
    },
    '/driver-agreement': {
      title: 'Driver Partner Agreement – Clickit Logistics Jaipur',
      description: 'Statutory onboarding terms, delivery partner code of conduct, payment settlement cycles, and terms of service for Clickit Logistics driver partners.',
      canonical: 'https://www.justclickit.in/driver-agreement'
    },
    '/terms-and-conditions': {
      title: 'Terms & Conditions – Clickit Logistics Private Limited',
      description: 'Official user terms, cargo booking rules, pricing policies, cancellation terms, and dispute jurisdiction under competent courts in Jaipur, Rajasthan.',
      canonical: 'https://www.justclickit.in/terms-and-conditions'
    },
    '/privacy-policy': {
      title: 'Privacy Policy – Clickit Logistics Data Protection',
      description: 'Clickit Logistics privacy policy: how we collect, safeguard, and use GPS coordinates, booking records, and contact information under Indian IT Act regulations.',
      canonical: 'https://www.justclickit.in/privacy-policy'
    },
    '/app': {
      title: 'Download Clickit App – Jaipur’s Fastest Mini-Truck & Courier App',
      description: 'Download the Clickit app for Android & iOS. Book instant Tata Ace, 3-wheeler loaders, and bike deliveries anywhere in Jaipur with live GPS tracking.',
      canonical: 'https://www.justclickit.in/app'
    }
  };

  // Explicit XML & robots headers
  app.get('/sitemap.xml', (req, res) => {
    const sitemapPath = path.join(process.cwd(), process.env.NODE_ENV === 'production' ? 'dist' : 'public', 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      return res.sendFile(sitemapPath);
    }
    const publicSitemap = path.join(process.cwd(), 'public', 'sitemap.xml');
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.sendFile(publicSitemap);
  });

  app.get('/robots.txt', (req, res) => {
    const robotsPath = path.join(process.cwd(), process.env.NODE_ENV === 'production' ? 'dist' : 'public', 'robots.txt');
    if (fs.existsSync(robotsPath)) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      return res.sendFile(robotsPath);
    }
    const publicRobots = path.join(process.cwd(), 'public', 'robots.txt');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.sendFile(publicRobots);
  });

  // Vite middleware for development vs production static handler
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      if (!fs.existsSync(indexPath)) {
        return res.status(404).send('Not Found');
      }

      const reqPath = req.path.replace(/\/$/, '') || '/';
      const seo = ROUTE_SEO[reqPath] || ROUTE_SEO['/'];

      try {
        let html = fs.readFileSync(indexPath, 'utf-8');
        // Pre-render exact route title, description, and canonical for crawlers
        html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${seo.title}</title>`);
        html = html.replace(/<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/i, `<meta name="description" content="${seo.description}" />`);
        html = html.replace(/<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="og:title" content="${seo.title}" />`);
        html = html.replace(/<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="og:description" content="${seo.description}" />`);
        html = html.replace(/<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="og:url" content="${seo.canonical}" />`);
        html = html.replace(/<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/?>/i, `<meta name="twitter:title" content="${seo.title}" />`);
        html = html.replace(/<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/?>/i, `<meta name="twitter:description" content="${seo.description}" />`);
        html = html.replace(/<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/i, `<link rel="canonical" href="${seo.canonical}" />`);

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.send(html);
      } catch (err) {
        res.sendFile(indexPath);
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Clickit Logistics server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

