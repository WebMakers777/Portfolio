const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxCaEQWft1iItNEauWhgqTTCOCRJ7ZdtY9j-ETE0tt2gESRjzFxVDGTqMzryiQiimus/exec";

export default async function handler(req: any, res: any) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method Not Allowed" });
  }

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body || {}),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, error: String(error) });
  }
}
