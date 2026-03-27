const jobs = [
  {
    company: "UC Irvine",
    role: "Student Assistant",
    period: "2026 — present",
    desc: "Migrating the old Software Research website to new framework.",
  },
  {
    company: "Bidangil",
    role: "Founder",
    period: "2025 - 2025 (8mo)",
    desc: "Made a better pipeline for Korean E-commerce proxy purchase and helped the U.S. shoppsers.",
  },
  {
    company: "AtoZ service, INC",
    role: "Software Developer Intern",
    period: "2024 — 2025",
    desc: "Built a middleware server that synchronizes the clinet's ERP and Shopify admin.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="flex flex-col gap-8 scroll-mt-24">
      <h2 className="text-2xl font-bold tracking-tight uppercase flex items-center gap-4">
        Experience
        <span className="flex-grow h-px bg-black"></span>
      </h2>
      <div className="flex flex-col border-t border-black/20 mt-4">
        {jobs.map((job, i) => (
          <div
            key={i}
            className="group flex flex-col md:flex-row md:items-baseline justify-between py-8 border-b border-black hover:bg-neutral-50 transition-colors px-4 -mx-4"
          >
            <div className="flex flex-col gap-1 md:w-1/3">
              <span className="font-bold text-lg">{job.company}</span>
              <span className="font-mono text-sm text-neutral-500">
                {job.period}
              </span>
            </div>
            <div className="flex flex-col gap-2 md:w-2/3 mt-4 md:mt-0">
              <span className="font-medium">{job.role}</span>
              <p className="text-neutral-600 leading-relaxed">{job.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
