import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, ShieldCheck, Mail, ArrowUpRight, Plus } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Creator / Founder',
    projectType: 'SaaS Platform Development',
    message: ''
  });
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roles = [
    "Creator / Founder",
    "Agency Lead",
    "Technical Director",
    "Enterprise Exec",
    "Independent Dreamer"
  ];

  const projectTypes = [
    "SaaS Platform Development",
    "Immersive Web Design",
    "Advanced System Automations",
    "Cognitive AI Integration",
    "Unspecified Mystery Core"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const selectRole = (role: string) => {
    setFormData(prev => ({ ...prev, role }));
  };

  const selectProjectType = (projectType: string) => {
    setFormData(prev => ({ ...prev, projectType }));
  };

  const triggerFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    setIsSubmitting(true);
    // Mimic deep server sync verification
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitSuccessful(true);
    }, 1800);
  };

  return (
    <section 
      id="contact-section" 
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-24 sm:px-12 md:py-32 overflow-hidden bg-gradient-to-t from-black via-[#040406]/60 to-[#030304]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center z-10">
        
        {/* Left Side: Outro visual presentation */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-10">
          <div className="space-y-4">
            <span className="font-mono text-[9px] text-green-400 tracking-[0.3em] uppercase block">IMPACT OUTRO</span>
            <h2 className="font-heading text-5xl sm:text-7xl font-black text-white leading-none tracking-tight">
              LET'S BUILD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-white to-red-500">
                THE FUTURE.
              </span>
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed font-light">
            You are not commissioning a temporary template. You are constructing an immersive, performance-hardened system engineered to persist and command attention. 
          </p>

          <div className="space-y-4 font-mono text-[11px] text-gray-400">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 bg-green-400 rounded-full"></span>
              <span>SECURE END-TO-END TLS CHANNELS</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 bg-white rounded-full"></span>
              <span>BI-LATERAL CONTRACTOR SCHEDULER ACTIVE</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
              <span>ENCRYPTED RECIPIENT TELEMETRY</span>
            </div>
          </div>

          {/* Social connections */}
          <div className="pt-6 border-t border-white/5 space-y-3">
            <span className="block font-mono text-[9px] text-gray-500 uppercase">DIRECT DISPATCH NODES</span>
            <div className="flex flex-wrap gap-4">
              <a 
                id="contact-email-link"
                href="mailto:arasteknikerzurum@gmail.com" 
                className="flex items-center gap-2 font-mono text-xs text-white hover:text-green-400 transition-colors"
              >
                <Mail className="h-4 w-4 text-green-400" />
                arasteknikerzurum@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Heavy luxury Glassmorphic Inquiry Cockpit */}
        <div className="lg:col-span-12 xl:col-span-7">
          <div className="border border-white/10 rounded-2xl bg-black/85 backdrop-blur-md p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,rgba(34,197,94,0.1),transparent_60%)] pointer-events-none rounded-tr-2xl"></div>

            {isSubmitSuccessful ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center py-12"
              >
                <div className="mx-auto h-16 w-16 bg-green-500/10 border border-green-400/30 rounded-full flex items-center justify-center text-green-400 animate-pulse mb-6">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  SYSTEM BIOMETRICS VERIFIED
                </h3>
                <p className="font-sans text-sm text-gray-300 leading-relaxed font-light max-w-md mx-auto">
                  Salutations, <span className="text-green-300 font-semibold">{formData.name}</span>! Your inquiry to build custom <span className="text-green-300 font-semibold">{formData.projectType}</span> systems has bypassed authentication successfully. Yücel will evaluate synchronization channels shortly.
                </p>
                <div className="pt-6 border-t border-white/5 font-mono text-[10px] text-gray-500 tracking-widest uppercase">
                  SESSION KEY: SECURE_INQUIRY_PASS_200
                </div>
                <button
                  id="reset-form-action"
                  onClick={() => setIsSubmitSuccessful(false)}
                  className="mt-4 font-mono text-xs text-green-400 hover:text-white underline cursor-pointer"
                >
                  Send another pipeline request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={triggerFormSubmit} className="space-y-6">
                
                {/* Form header */}
                <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
                  <span className="font-mono text-[10px] tracking-wider text-green-400 uppercase">INQUIRY INTAKE CHANNEL</span>
                  <span className="flex h-1.5 w-1.5 rounded-full bg-green-400 animate-ping"></span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label id="label-sender-name" className="block font-mono text-[10px] text-gray-500 uppercase">SENDER NAME</label>
                    <input 
                      id="input-sender-name"
                      type="text" 
                      name="name"
                      required
                      placeholder="e.g. Richard Hendricks"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/5 hover:border-white/10 focus:border-green-400 rounded-xl px-4 py-3.5 font-mono text-xs text-white placeholder-gray-600 focus:outline-none transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label id="label-sender-email" className="block font-mono text-[10px] text-gray-500 uppercase">VALID COMMS CHANNEL</label>
                    <input 
                      id="input-sender-email"
                      type="email" 
                      name="email"
                      required
                      placeholder="e.g. richard@piedpiper.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/5 hover:border-white/10 focus:border-green-400 rounded-xl px-4 py-3.5 font-mono text-xs text-white placeholder-gray-600 focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Sender Identity Options Slider */}
                <div className="space-y-3">
                  <label id="label-sender-role" className="block font-mono text-[10px] text-gray-500 uppercase">SENDER STRUCTURAL IDENTITY</label>
                  <div className="flex flex-wrap gap-2">
                    {roles.map((role) => (
                      <button
                        id={`role-btn-${role.replace(/\s+/g, '-').toLowerCase()}`}
                        key={role}
                        type="button"
                        onClick={() => selectRole(role)}
                        className={`font-mono text-[9px] px-3 py-1.5 rounded-lg border uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                          formData.role === role
                            ? 'bg-green-400 text-black border-green-400 font-bold'
                            : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Scope Selection Grid */}
                <div className="space-y-3">
                  <label id="label-project-type" className="block font-mono text-[10px] text-gray-500 uppercase">TARGET WORKFLOW DIRECTIVE</label>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((type) => (
                      <button
                        id={`project-type-btn-${type.replace(/\s+/g, '-').toLowerCase()}`}
                        key={type}
                        type="button"
                        onClick={() => selectProjectType(type)}
                        className={`font-mono text-[9px] px-3 py-1.5 rounded-lg border uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                          formData.projectType === type
                            ? 'bg-red-500 text-white border-red-500'
                            : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Textarea inquiry */}
                <div className="space-y-2">
                  <label id="label-inquiry-message" className="block font-mono text-[10px] text-gray-500 uppercase">INTELLIGENT MESSAGE BRIEFING</label>
                  <textarea 
                    id="input-inquiry-message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Describe the systemic bottlenecks we are scaling, parameters of the pipeline, or active design directives..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/5 hover:border-white/10 focus:border-green-400 rounded-xl px-4 py-3.5 font-sans text-xs text-white placeholder-gray-600 focus:outline-none transition-all duration-300"
                  />
                </div>

                {/* Submit Trigger with animated statuses */}
                <button
                  id="inquiry-submit-trigger"
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2.5 py-4 border font-mono text-xs font-bold tracking-widest uppercase rounded-xl transition-all duration-300 ${
                    isSubmitting 
                      ? 'bg-green-500/10 border-green-400/50 text-green-300 cursor-not-allowed' 
                      : 'bg-white text-black border-white hover:bg-green-400 hover:border-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] cursor-pointer'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      Verifying Encryption Core...
                      <CheckCircle2 className="h-4 w-4 animate-spin text-green-400" />
                    </>
                  ) : (
                    <>
                      DISPATCH SECURE INQUIRY
                      <Send className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>

              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
