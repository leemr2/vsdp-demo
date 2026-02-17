// src/lib/knowledge-base.ts
import fs from "fs";
import path from "path";

interface KnowledgeDocument {
  id: string;
  title: string;
  filename: string;
  topics: string;
}

const DOCUMENTS: KnowledgeDocument[] = [
  {
    id: "Collaborative-Intelligence",
    title: "Collaborative Intelligence",
    filename: "Collaborative-Intelligence.md",
    topics:
      "A developmental framework for artificial understanding, human-AI collaboration, intelligence augmentation",
  },
  {
    id: "Cross-Sector-Impact",
    title: "Cross-Sector Impact: The 2025 Tech Convergence and the 1–10 Year Strategic Horizon",
    filename: "Cross-Sector-Impact.md",
    topics:
      "AI convergence, sensor technology, biotechnology breakthroughs, market forces, strategic planning",
  },
  {
    id: "Emerging-Technologies",
    title: "Emerging Technologies in Optometry and Digital Health",
    filename: "Emerging-Technologies.md",
    topics:
      "Smart contact lenses, retinal imaging AI, biosensors, digital health devices, ophthalmic innovation",
  },
  {
    id: "LIVING-INTELLIGENCE",
    title: "Living Intelligence: The VSDP AI Framework",
    filename: "LIVING-INTELLIGENCE.md",
    topics:
      "Living Intelligence concept, AI-powered digital twins, continuous health monitoring, predictive analytics",
  },
  {
    id: "Market-Opportunities",
    title: "Market Opportunities for VSDP",
    filename: "Market -Opportunities.md",
    topics:
      "Market sizing, revenue opportunities, growth projections, partnership models, competitive landscape",
  },
  {
    id: "Market-Research-VSDP",
    title: "Market Research: VSDP Competitive Analysis",
    filename: "Market-Research-VSDP.md",
    topics:
      "Competitive analysis, market positioning, EHR landscape, digital health competitors, differentiation",
  },
  {
    id: "Optometrys-future",
    title: "Optometry's Future: From Episodic to Continuous Care",
    filename: "Optometrys-future.md",
    topics:
      "Optometry transformation, episodic to continuous care, preventive health, Vision Source network, practice economics",
  },
  {
    id: "Strategic-Assessment",
    title: "Strategic Assessment: Vision Source and VSDP",
    filename: "Strategic-Assessment.md",
    topics:
      "SWOT analysis, strategic risks, organizational readiness, implementation challenges, competitive moats",
  },
  {
    id: "Strategic-Plan",
    title: "Strategic Plan: VSDP Rollout and Execution",
    filename: "Strategic-Plan.md",
    topics:
      "Implementation roadmap, phased rollout, milestones, resource requirements, partnership strategy",
  },
  {
    id: "Tech-Trends",
    title: "Technology Trends Shaping Digital Health",
    filename: "Tech-Trends.md",
    topics:
      "AI in healthcare, wearable technology, interoperability standards, FHIR, cloud health platforms",
  },
  {
    id: "tech-presentation",
    title: "VSDP Technology Presentation",
    filename: "tech-presentation.md",
    topics:
      "Platform architecture, digital twin technology, data pipeline, clinical AI models, integration points",
  },
  {
    id: "VSDP",
    title: "VSDP: Vision Source Digital Platform Overview",
    filename: "VSDP.md",
    topics:
      "Platform overview, stakeholder value propositions, provider benefits, pharma partnerships, EHR integration, big tech opportunities",
  },
];

function buildKnowledgeBase(): string {
  const knowledgeDir = path.join(process.cwd(), "knowledge");

  const header = `
=================================================================
VSDP COMPLETE KNOWLEDGE BASE — ${DOCUMENTS.length} SOURCE DOCUMENTS
=================================================================
You have access to all primary research and strategy documents.
When answering questions:
- Draw from specific documents for precise, credible answers
- Cross-reference documents when questions span multiple topics
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
