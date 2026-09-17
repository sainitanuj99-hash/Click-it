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
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Clickit Logistics server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

