// "use client";

// import { useEffect } from "react";
// import RainOverlay from "@/components/RainOverlay";

// type Props = {
//   /** Minimum size for an element to be considered a rain collider */
//   minWidth?: number;
//   minHeight?: number;
//   /** Max number of colliders (keeps perf sane) */
//   maxColliders?: number;
//   /** Extra class keywords that should count as “cards/containers” */
//   classHints?: string[];
//   /** Whether to include <section>, <header>, <footer>, etc. */
//   includeSemantic?: boolean;
//   /** Optional selector allowlist (matched first). */
//   allowSelectors?: string[];
//   /** Optional selector blocklist (never tagged). */
//   blockSelectors?: string[];
//   /** Pass-through props to RainOverlay (e.g., density/speed tweaks) */
//   rainProps?: React.ComponentProps<typeof RainOverlay>;
// };

// export default function AutoSplashRain({
//   minWidth = 160,
//   minHeight = 80,
//   maxColliders = 300,
//   classHints = ["card", "panel", "container", "box", "section", "hero", "glass", "surface", "paper", "shadow", "widget"],
//   includeSemantic = true,
//   allowSelectors = [".card", ".panel", ".container", ".surface", ".widget", "[role='region']"],
//   blockSelectors = ["canvas", "video", "img", "[aria-hidden='true']", "[data-nosplash]"],
//   rainProps,
// }: Props) {

//   useEffect(() => {
//     const body = document.body;

//     const tagCandidate = (el: Element) => {
//       const node = el as HTMLElement;
//       if (!node || node.hasAttribute("data-splash")) return;
//       if (blockSelectors.some((sel) => node.matches(sel))) return;

//       const cs = getComputedStyle(node);
//       if (cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0") return;
//       if (cs.position === "fixed" && cs.pointerEvents === "none") return;

//       // semantic tags that usually act as layout containers
//       const semanticTags = includeSemantic ? ["SECTION", "HEADER", "FOOTER", "MAIN", "NAV", "ASIDE", "ARTICLE"] : [];
//       const looksSemantic = semanticTags.includes(node.tagName);

//       // class name hints (e.g., "card", "container", "shadow")
//       const className = (node.className || "").toString().toLowerCase();
//       const looksCardy = classHints.some((k) => className.includes(k));

//       // allowlist selectors
//       const isExplicitAllow = allowSelectors.some((sel) => {
//         try { return node.matches(sel); } catch { return false; }
//       });

//       // basic block-like layouts
//       const isBlocky = ["block", "flex", "grid"].includes(cs.display);

//       // must be big enough & visible
//       const r = node.getBoundingClientRect();
//       const bigEnough = r.width >= minWidth && r.height >= minHeight;

//       // has some visual surface (bg or border or shadow)
//       const hasSurface =
//         (parseFloat(cs.borderTopWidth) > 0 ||
//           parseFloat(cs.borderLeftWidth) > 0 ||
//           cs.boxShadow !== "none" ||
//           (cs.backgroundColor && cs.backgroundColor !== "rgba(0, 0, 0, 0)" && cs.backgroundColor !== "transparent"));

//       // decide
//       if ((isExplicitAllow || looksCardy || looksSemantic || (isBlocky && hasSurface)) && bigEnough) {
//         node.setAttribute("data-splash", "");
//       }
//     };

//     const scan = () => {
//       // quick first pass: tag explicit allows immediately
//       allowSelectors.forEach((sel) => document.querySelectorAll(sel).forEach(tagCandidate));

//       // broader pass: tag common containers
//       const candidates = document.querySelectorAll<HTMLElement>(
//         [
//           // likely content containers:
//           "div, section, article, aside, main, header, footer, nav",
//         ].join(",")
//       );

//       let tagged = 0;
//       for (const el of candidates) {
//         tagCandidate(el);
//         if ((el as HTMLElement).hasAttribute("data-splash")) {
//           tagged++;
//           if (tagged >= maxColliders) break; // cap
//         }
//       }
//     };

//     // initial scan
//     scan();

//     // observe DOM changes to auto-tag new nodes
//     const mo = new MutationObserver((mut) => {
//       for (const m of mut) {
//         if (m.type === "childList") {
//           m.addedNodes.forEach((n) => {
//             if (n.nodeType === 1) {
//               // Tag the added node and some of its descendants
//               tagCandidate(n as Element);
//               (n as Element).querySelectorAll?.("*").forEach(tagCandidate);
//             }
//           });
//         } else if (m.type === "attributes") {
//           tagCandidate(m.target as Element);
//         }
//       }
//     });

//     mo.observe(body, {
//       childList: true,
//       subtree: true,
//       attributes: true,
//       attributeFilter: ["class", "style"],
//     });

//     // re-scan on viewport size changes (affects min size criteria)
//     const ro = new ResizeObserver(() => {
//       // Remove tags that shrank below minimum
//       document.querySelectorAll<HTMLElement>("[data-splash]").forEach((el) => {
//         const r = el.getBoundingClientRect();
//         if (r.width < minWidth || r.height < minHeight) el.removeAttribute("data-splash");
//       });
//       // Tag newly eligible nodes
//       scan();
//     });
//     ro.observe(document.documentElement);

//     return () => {
//       mo.disconnect();
//       ro.disconnect();
//     };
//   }, [minWidth, minHeight, maxColliders, classHints, includeSemantic, allowSelectors, blockSelectors]);

//   return (
//     // your refined RainOverlay already uses collideSelectors=["[data-splash]"]
//     <RainOverlay {...rainProps} collideSelectors={["[data-splash]"]} />
//   );
// }
