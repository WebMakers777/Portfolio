import type { VercelRequest, VercelResponse } from "@vercel/node";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxCaEQWft1iItNEauWhgqTTCOCRJ7ZdtY9j-ETE0tt2gESRjzFxVDGTqMzryiQiimus/exec";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS for all origins
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle OPTIONS preflight
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  // Only allow POST
  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
    return;
  }

  try {
    // Forward the request to Apps Script
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    // Parse response from Apps Script
    const data = await response.json();

    // Return with CORS headers
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(data);
  } catch (error: any) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: String(error) });
  }
}
