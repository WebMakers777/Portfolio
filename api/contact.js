export default async function handler(req, res) {
  console.log("API Route Hit - Method:", req.method);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    console.log("Wrong method, returning 405");
    return res.status(405).send("Method not allowed");
  }

  try {
    console.log("Forwarding to Apps Script...");
    const appScriptUrl =
      "https://script.google.com/macros/s/AKfycbxkLWWtp_6iDSGlA8ncs1FM67Ihrvc7EM1IH9XY00-7PFIt1Xt0Y7Q9VfRqKpyLsvHf/exec";

    const response = await fetch(appScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body || {}),
    });

    const data = await response.json();
    console.log("Apps Script response:", data);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in API route:", error);
    return res.status(500).json({ success: false, error: String(error) });
  }
}
