// src/lib/knowledge-base.ts
import fs from "fs";
import path from "path";

interface KnowledgeDocument {
  id: string;
  title: string;
  filename: string;
  topics: string;
}

// ─── LANDING PAGE KNOWLEDGE BASE ────────────────────────────────────────────
// Purpose: General questions from doctors, practice owners, and clinical staff
//          visiting the main landing page.
//
// Intentionally excluded from this set:
//   • Market-Opportunities.md   — reserved for the Board Member journey
//   • Market-Research-VSDP.md   — reserved for the Board Member journey
//   • Strategic-Plan.md         — reserved for the Board Member journey
//   • tech-presentation.md      — reserved for the Tech section chatbot
//
// Combined size of these 8 documents is ~117 KB (~29 000 tokens), comfortably
// within Anthropic's 30 000 input-token/minute limit with headroom for the
// system prompt and multi-turn conversation history.
const DOCUMENTS: KnowledgeDocument[] = [
  {
    id: "VSDP",
    title: "VSDP: Vision Source Digital Platform Overview",
    filename: "VSDP.md",
    topics:
      "Platform overview, what VSDP does for patients and practices, stakeholder value propositions, provider benefits, pharma partnerships, big tech opportunities",
  },
  {
    id: "Optometrys-future",
    title: "Optometry's Future: From Episodic to Continuous Care",
    filename: "Optometrys-future.md",
    topics:
      "Optometry transformation, moving from annual visits to year-round patient health monitoring, preventive health, Vision Source network, practice economics and growth",
  },
  {
    id: "LIVING-INTELLIGENCE",
    title: "Living Intelligence: The VSDP AI Framework",
    filename: "LIVING-INTELLIGENCE.md",
    topics:
      "Living Intelligence concept, continuously updated patient health profiles, whole-body health monitoring through the eye, predictive health insights for clinicians",
  },
  {
    id: "Strategic-Assessment",
    title: "Strategic Assessment: Vision Source and VSDP",
    filename: "Strategic-Assessment.md",
    topics:
      "Strategic strengths, risks, organizational readiness, implementation considerations, long-term competitive advantages for Vision Source",
  },
  {
    id: "Emerging-Technologies",
    title: "Emerging Technologies in Optometry and Digital Health",
    filename: "Emerging-Technologies.md",
    topics:
      "Smart contact lenses, retinal imaging breakthroughs, wearable health sensors, new diagnostic tools coming to optometry",
  },
  {
    id: "Cross-Sector-Impact",
    title: "Cross-Sector Impact: The Strategic Horizon",
    filename: "Cross-Sector-Impact.md",
    topics:
      "How AI and health technology are converging, what this means for independent optometry over the next 1–10 years, strategic planning for practice owners and boards",
  },
  {
    id: "Collaborative-Intelligence",
    title: "Collaborative Intelligence",
    filename: "Collaborative-Intelligence.md",
    topics:
      "How AI and clinicians work together, human-AI collaboration in healthcare, augmenting doctor judgment — not replacing it",
  },
  {
    id: "Tech-Trends",
    title: "Technology Trends Shaping Digital Health",
    filename: "Tech-Trends.md",
    topics:
      "Broad technology trends in healthcare, AI adoption, wearables, connected health — explained in terms of patient and practice impact",
  },
];

function buildKnowledgeBase(): string {
  const knowledgeDir = path.join(process.cwd(), "knowledge");

  const header = `
=================================================================
VSDP KNOWLEDGE BASE — ${DOCUMENTS.length} DOCUMENTS FOR EXECUTIVE & CLINICAL AUDIENCES
=================================================================
AUDIENCE REMINDER: You are speaking to board members, practice owners, 
optometrists, and healthcare executives — NOT software engineers.

When drawing from these documents:
- Translate any technical language into plain clinical or business terms
- Focus on patient outcomes, practice impact, and strategic opportunity
- Never quote or describe software architecture, APIs, or code
- If a document contains technical details, extract only the business 
  or clinical insight it represents and express that in plain English
- Cross-reference documents to give complete, confident answers
=================================================================\n\n`;

  const sections = DOCUMENTS.map((doc) => {
    const filePath = path.join(knowledgeDir, doc.filename);
    let content: string;

    try {
      content = fs.readFileSync(filePath, "utf-8");
    } catch {
      content = `[Document not yet loaded in this environment. Topics: ${doc.topics}]`;
    }

    return `-----------------------------------------------------------------
DOCUMENT: ${doc.title}
KEY TOPICS: ${doc.topics}
-----------------------------------------------------------------
${content}\n\n`;
  }).join("\n");

  return header + sections;
}

// Cache — files read once per server process. Vercel resets per cold start (fine for demo).
let cachedKnowledgeBase: string | null = null;

export function getKnowledgeBase(): string {
  if (!cachedKnowledgeBase) {
    cachedKnowledgeBase = buildKnowledgeBase();
    console.log(
      `[KnowledgeBase] Loaded ${DOCUMENTS.length} documents. ` +
        `Total: ${(cachedKnowledgeBase.length / 1024).toFixed(0)}KB`,
    );
  }
  return cachedKnowledgeBase;
}
