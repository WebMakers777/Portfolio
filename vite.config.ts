import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables for the current mode and print important VITE_ values
  try {
    const env = loadEnv(mode, process.cwd());
    // Print to stdout so remote build logs capture this
    // eslint-disable-next-line no-console
    console.log(
      "[vite.config] mode=",
      mode,
      "VITE_API_BASE=",
      env.VITE_API_BASE,
      "VITE_BASE_URL=",
      env.VITE_BASE_URL
    );
  } catch (e) {
    // ignore
  }

  return {
    server: {
      host: "::",
      port: 8080,
      // Dev proxy to avoid CORS when calling external web apps (Apps Script)
      proxy: {
        // Forward local /api/contact -> Apps Script URL
        "/api/contact": {
          target:
            "https://script.google.com/macros/s/AKfycbxCaEQWft1iItNEauWhgqTTCOCRJ7ZdtY9j-ETE0tt2gESRjzFxVDGTqMzryiQiimus/exec",
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api\/contact/, ""),
        },
      },
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(
      Boolean
    ),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
