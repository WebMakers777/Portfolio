// src/lib/contactService.ts

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  service?: string;
  budget?: string;
  message: string;
  source: string;
  timestamp: string;
  syncedToSheet?: boolean;
}

const LEADS_STORAGE_KEY = "vincie_leads_inbox_v1";
const SHEET_CONFIG_KEY = "vincie_sheet_webhook_url";

export const DEFAULT_SHEET_WEBHOOK_URL =
  import.meta.env.VITE_CONTACT_SHEET_URL ||
  "https://script.google.com/macros/s/AKfycbxkLWWtp_6iDSGlA8ncs1FM67Ihrvc7EM1IH9XY00-7PFIt1Xt0Y7Q9VfRqKpyLsvHf/exec";

export const contactService = {
  getSheetWebhookUrl: (): string => {
    try {
      const customUrl = localStorage.getItem(SHEET_CONFIG_KEY);
      if (
        customUrl &&
        customUrl.trim() &&
        !customUrl.includes("AKfycbwy2sLXQabMqpdaHudrewxRmxLdzlqPTH5qr0BML77ymvnxzl32CNA931pUt72VFU9C")
      ) {
        return customUrl.trim();
      }
    } catch (e) {
      console.warn("Could not read custom sheet url", e);
    }
    return DEFAULT_SHEET_WEBHOOK_URL;
  },

  setSheetWebhookUrl: (url: string): void => {
    try {
      localStorage.setItem(SHEET_CONFIG_KEY, url.trim());
    } catch (e) {
      console.error("Could not save custom sheet url", e);
    }
  },

  getLeads: (): ContactInquiry[] => {
    try {
      const stored = localStorage.getItem(LEADS_STORAGE_KEY);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error("Error reading leads from storage", e);
      return [];
    }
  },

  saveLeadLocally: (inquiry: Omit<ContactInquiry, "id" | "timestamp">): ContactInquiry => {
    const leads = contactService.getLeads();
    const newLead: ContactInquiry = {
      ...inquiry,
      id: "lead_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toISOString(),
      syncedToSheet: false,
    };
    leads.unshift(newLead);
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    } catch (e) {
      console.error("Failed to save lead locally", e);
    }
    return newLead;
  },

  markLeadSynced: (id: string): void => {
    try {
      const leads = contactService.getLeads();
      const updated = leads.map((l) =>
        l.id === id ? { ...l, syncedToSheet: true } : l
      );
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not mark lead synced", e);
    }
  },

  deleteLead: (id: string): void => {
    try {
      const leads = contactService.getLeads();
      const filtered = leads.filter((l) => l.id !== id);
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(filtered));
    } catch (e) {
      console.error("Failed to delete lead", e);
    }
  },

  clearAllLeads: (): void => {
    try {
      localStorage.removeItem(LEADS_STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear leads", e);
    }
  },

  submitInquiry: async (data: {
    name: string;
    email: string;
    service?: string;
    budget?: string;
    message: string;
    source?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    const payload = {
      name: data.name.trim(),
      email: data.email.trim(),
      service: data.service || "General Inquiry",
      budget: data.budget || "Not Specified",
      message: data.message.trim(),
      source: data.source || "Website Contact Form",
      timestamp: new Date().toISOString(),
    };

    // 1. Always back up locally in Admin leads inbox
    const localRecord = contactService.saveLeadLocally(payload);

    let synced = false;

    // Try Vercel / serverless API route /api/contact if available
    try {
      const apiRes = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (apiRes.ok) {
        synced = true;
      }
    } catch {
      // Local/offline fallback continues below
    }

    // 2. Transmit to Google Drive / Excel Sheet via Webhook
    const webhookUrl = contactService.getSheetWebhookUrl();

    if (webhookUrl) {
      // Channel 1: URL Query Params via GET (Immune to all CORS preflights on localhost)
      try {
        const queryParams = new URLSearchParams({
          name: payload.name,
          email: payload.email,
          service: payload.service,
          budget: payload.budget,
          message: payload.message,
          source: payload.source,
          timestamp: payload.timestamp,
        });

        const targetUrl = webhookUrl.includes("?")
          ? `${webhookUrl}&${queryParams.toString()}`
          : `${webhookUrl}?${queryParams.toString()}`;

        // Fetch GET with no-cors
        await fetch(targetUrl, {
          method: "GET",
          mode: "no-cors",
        });

        // Also trigger image beacon to ensure background delivery
        if (typeof Image !== "undefined") {
          const img = new Image();
          img.src = targetUrl;
        }

        synced = true;
      } catch (err) {
        console.warn("GET sync attempt:", err);
      }

      // Channel 2: FormData POST with no-cors
      try {
        const formData = new FormData();
        formData.append("name", payload.name);
        formData.append("email", payload.email);
        formData.append("service", payload.service);
        formData.append("budget", payload.budget);
        formData.append("message", payload.message);
        formData.append("source", payload.source);
        formData.append("timestamp", payload.timestamp);

        await fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          body: formData,
        });

        synced = true;
      } catch (err) {
        console.warn("FormData direct POST attempt:", err);
      }

      // Channel 3: text/plain JSON payload backup
      try {
        await fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(payload),
        });
        synced = true;
      } catch {
        // Fallback
      }
    }

    if (synced) {
      contactService.markLeadSynced(localRecord.id);
    }

    return { success: true };
  },

  exportToCsv: (): void => {
    const leads = contactService.getLeads();
    if (leads.length === 0) return;

    const headers = [
      "ID",
      "Timestamp",
      "Name",
      "Email",
      "Service Requested",
      "Budget",
      "Message",
      "Source Page",
    ];

    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${new Date(l.timestamp).toLocaleString()}"`,
      `"${(l.name || "").replace(/"/g, '""')}"`,
      `"${(l.email || "").replace(/"/g, '""')}"`,
      `"${(l.service || "").replace(/"/g, '""')}"`,
      `"${(l.budget || "").replace(/"/g, '""')}"`,
      `"${(l.message || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
      `"${(l.source || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `vincie_client_leads_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};
