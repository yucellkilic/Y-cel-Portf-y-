import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layout, Cloud, Code, Settings, Compass, Orbit, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Service } from '../types';

interface ServicesSectionProps {
  onServiceSelect: (color: string) => void;
}

export default function ServicesSection({ onServiceSelect }: ServicesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const services: Service[] = [
    {
      id: "web-design",
      title: "UI / UX Luxury Web Design",
      subtitle: "AESTHETIC DIGITAL ARCHITECTURE",
      description: "Designing award-winning browser layouts featuring elite typography pairs, fluid canvas shaders, responsive motion frameworks, and flawless layout pixel density.",
      highlights: ["Figma masterpieces", "WebGL canvas integrations", "Custom physics interactions", "Swiss precision grids"],
      accentColor: "emerald",
      systemCode: `// STYLING SPECIFICATION CORE\nexport const designTheme = {\n  family: 'Space Grotesk, Sans-Serif',\n  contrast: 'Infinite-High',\n  vibe: 'Cinematic Glassmorphism'\n};`
    },
    {
      id: "saas-dev",
      title: "SaaS Product Engineering",
      subtitle: "ROBUST MULTI-TENANT ARCHITECTURE",
      description: "Developing custom cloud software with absolute server security, clean modular React/Node, secure multi-tenant structures, and fully optimized database endpoints.",
      highlights: ["Vite & TypeScript stacks", "Next/Express backends", "Encrypted session tokens", "Real-time user sync"],
      accentColor: "crimson",
      systemCode: `// MULTI-TENANT PROVISION ENGINE\nasync function dispatchTenantServer(id: string) {\n  const env = await loadSecureVault(id);\n  return await CloudServices.boot(env);\n}`
    },
    {
      id: "script-systems",
      title: "Tailored Script Systems",
      subtitle: "COMPACT SYSTEM COMMANDERS",
      description: "Creating high performance scripts in Node, Python, and Bash that handle batch operations, API integrations, real-time syncs, server automation, and heavy system tasks.",
      highlights: ["Dynamic cron clusters", "Binary speed optimization", "Self-healing crash recovery", "Isolated memory structures"],
      accentColor: "cyber",
      systemCode: `// CRON MULTI-QUEUE THREADED RUNNER\nexport class CronCommander {\n  public static async executeScheduled(jobId: string) {\n    return ThreadPool.dispatch(jobId);\n  }\n}`
    },
    {
      id: "automation-solutions",
      title: "System Automation Pipelines",
      subtitle: "COHERENT WORKFLOW NETWORKS",
      description: "Unifying disassociated services like Slack, Stripe, Gmail, CRM databases, or custom ERP systems into cohesive automatic workflows that run on autopilot.",
      highlights: ["End-to-End API Webhooks", "Automated payment funnels", "Bi-directional system sync", "Telemetry performance logs"],
      accentColor: "monochrome",
      systemCode: `// TELEMETRY STRIPE WEBHOOK DISPATCH\napp.post("/webhook/stripe", async (req, res) => {\n  const event = StripeService.parseSecure(req.body);\n  await UserRegistry.upgradeTier(event.payload);\n});`
    },
    {
      id: "ai-integrations",
      title: "Advanced Cognitive AI Systems",
      subtitle: "NEURAL NETWORK HARNESSING",
      description: "Harnessing deep Gemini generative engines, model fine-tuning, retrieval augmented generation systems (RAG), text/image vectors, and intelligent auto-categorizations.",
      highlights: ["Gemini API Orchestrators", "Context cache buffers", "Secure AI agent routing", "Low-latency streaming feeds"],
      accentColor: "emerald",
      systemCode: `// COGNITIVE GENERATIVE AI SYSTEM\nconst client = new GoogleGenAI({ apiKey: SECRET });\nconst response = await client.models.generateContent({\n  model: "gemini-2.1-flash",\n  prompt: SYSTEM_PROMPT\n});`
    }
  ];

  const handleServiceClick = (index: number) => {
    setActiveIndex(index);
    onServiceSelect(services[index].accentColor);
  };

  const currentService = services[activeIndex];

  const getIcon = (id: string, color: string) => {
    const cls = color === 'crimson' ? "h-5 w-5 text-red-500" : "h-5 w-5 text-green-400";
    switch (id) {
      case "web-design": return <Layout className={cls} />;
      case "saas-dev": return <Cloud className={cls} />;
      case "script-systems": return <Code className={cls} />;
      case "automation-solutions": return <Settings className={cls} />;
      case "ai-integrations": return <Orbit className={cls} />;
      default: return <Compass className={cls} />;
    }
  };

  return (
    <section 
      id="services-section" 
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-24 sm:px-12 md:py-32 overflow-hidden bg-[#030304]/80"
    >
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto w-full z-10 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-white/5 pb-8">
          <div className="space-y-3">
            <span className="font-mono text-[9px] text-green-400 tracking-[0.3em] uppercase block">SERVICES & CAPABILITIES</span>
            <h2 className="font-heading text-4xl sm:text-5xl font-black tracking-tight text-white uppercase sm:leading-none">
              ENGINEERED EFFICIENCY
            </h2>
          </div>
          <p className="max-w-md font-sans text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
            Every pipeline is crafted custom to maximize raw throughput, enhance systemic safety, and render beautiful visual balance. Select a service node below to explore blueprint specifications.
          </p>
        </div>

        {/* Modular Cinematic Service Scene Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Services Navigation Rail (5 Options) */}
          <div className="lg:col-span-5 flex flex-col gap-3 justify-center">
            {services.map((service, index) => {
              const isActive = index === activeIndex;
              const hasRedTheme = service.accentColor === 'crimson';
              return (
                <button
                  id={`service-nav-button-${service.id}`}
                  key={service.id}
                  onClick={() => handleServiceClick(index)}
                  className={`relative w-full text-left p-5 border rounded-xl flex items-center justify-between transition-all duration-500 group overflow-hidden ${
                    isActive 
                      ? hasRedTheme
                        ? 'bg-gradient-to-r from-red-950/20 to-black border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.15)]'
                        : 'bg-gradient-to-r from-green-950/20 to-black border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.15)]'
                      : 'bg-black/30 border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <span className={`font-mono text-xs transition-colors duration-300 ${isActive ? hasRedTheme ? 'text-red-500' : 'text-green-400' : 'text-gray-500 group-hover:text-gray-300'}`}>
                      0{index + 1}
                    </span>
                    <div className="flex flex-col">
                      <span className={`font-sans text-sm font-semibold transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                        {service.title}
                      </span>
                      <span className="font-mono text-[8px] text-gray-500 tracking-widest uppercase mt-0.5">
                        {service.subtitle}
                      </span>
                    </div>
                  </div>

                  <div className={`p-2 rounded-lg border transition-all duration-500 ${
                    isActive 
                      ? hasRedTheme 
                        ? 'bg-red-500/10 border-red-400/30 rotate-45' 
                        : 'bg-green-500/10 border-green-400/30 rotate-45'
                      : 'bg-white/5 border-white/5 group-hover:bg-white/10 group-hover:border-white/20'
                  }`}>
                    {getIcon(service.id, service.accentColor)}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Side: Immersive Adaptive Console Panel displaying technical details */}
          <div className="lg:col-span-7 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className={`flex-1 flex flex-col justify-between border border-white/10 rounded-xl bg-black/85 backdrop-blur-md p-6 sm:p-8 hover:border-white/20 transition-colors relative`}
              >
                {/* Visual HUD grid details */}
                <div className={`absolute top-0 right-0 w-24 h-24 pointer-events-none rounded-tr-xl ${
                  currentService.accentColor === 'crimson'
                    ? 'bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.15),transparent_60%)]'
                    : 'bg-[radial-gradient(ellipse_at_top_right,rgba(34,197,94,0.15),transparent_60%)]'
                }`}></div>

                <div className="space-y-6">
                  {/* Service Core Spec Indicator */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                      <span className={`flex h-2 w-2 rounded-full animate-pulse ${currentService.accentColor === 'crimson' ? 'bg-red-500' : 'bg-green-400'}`}></span>
                      <span className={`font-mono text-[10px] tracking-widest uppercase ${currentService.accentColor === 'crimson' ? 'text-red-400' : 'text-green-400'}`}>
                        SCENE_SYSTEM_ONLINE  // {currentService.subtitle}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-gray-500">
                      SECURE PIPELINE V2.0
                    </span>
                  </div>

                  {/* Descriptions */}
                  <div className="space-y-3">
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                      {currentService.title}
                    </h3>
                    <p className="font-sans text-sm text-gray-400 leading-relaxed font-light">
                      {currentService.description}
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
                    {currentService.highlights.map((hilight) => (
                      <div key={hilight} className="flex items-center gap-2.5 font-mono text-xs text-slate-300">
                        <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${currentService.accentColor === 'crimson' ? 'text-red-500' : 'text-green-400'}`} />
                        <span>{hilight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated live compiler code snippet related to each task */}
                <div className="mt-8">
                  <span className="block font-mono text-[9px] text-gray-500 mb-2 uppercase">BUILD COMPILER RAW FEED</span>
                  <div className="rounded-lg bg-[#07070a] border border-white/5 p-4 overflow-x-auto">
                    <pre className="font-mono text-[10px] leading-relaxed text-slate-300">
                      <code>{currentService.systemCode}</code>
                    </pre>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
