import { ArrowUpRight } from "lucide-react";
import { SiHuggingface } from "react-icons/si";
import { useNavigate } from "react-router";
export function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const projects = [
  {
    id: "furnfit",
    name: "FurnFit",
    desc: "A vibe matching clothing recommendation platform.",
    tech: ["350k+ products", "fine-tuning", "RAG", "Hackathon Winner"],
    link: "https://furnfitfrontendprod.vercel.app/",
    github: "https://github.com/after2842/FurnFit_frontend_prod",
    huggingface: "https://huggingface.co/Samuel77/YOLOv8s-seg-fashionpedia",
  },
  {
    id: "bidangil",
    name: "Bidangil",
    desc: "Proxy purchase company where we buy products for U.S shoppers.",
    tech: ["$7,000 Revenue", "Hackathon Winner"],
    link: "#",
    github: "#",
  },
  {
    id: "mafia-game",
    name: "Mafia Game",
    desc: "Made a free chat based online game. Survive from the mafia!",
    tech: ["web-socket", "fun"],
    link: "#",
    github: "#",
  },
  {
    id: "monolith",
    name: "Monolith.sh",
    desc: "Infrastructure as code visualization tool for complex deployments.",
    tech: ["Python", "Terraform", "Vue"],
    link: "#",
    github: "#",
  },
];

export { projects };

export function Projects() {
  const navigate = useNavigate();
  return (
    <section id="projects" className="flex flex-col gap-8 scroll-mt-24">
      <h2 className="text-2xl font-bold tracking-tight uppercase flex items-center gap-4">
        Proud Projects
        <span className="flex-grow h-px bg-black"></span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black border border-black mt-4">
        {projects.map((proj, i) => (
          <div
            key={i}
            className="bg-white p-8 flex flex-col h-full group hover:bg-neutral-50 transition-colors"
          >
            <div className="flex justify-between items-start mb-6">
              <button
                className="cursor-pointer font-bold text-2xl tracking-tight group-hover:underline decoration-2 underline-offset-4"
                onClick={() => navigate(`/project/${proj.id}`)}
              >
                {proj.name}
              </button>
              <div className="flex gap-3">
                <a
                  href={proj.github}
                  className="text-neutral-400 hover:text-black transition-colors"
                  aria-label="GitHub Source"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                {proj.name === "FurnFit" ? (
                  <a
                    href={proj.huggingface}
                    className="text-neutral-400 hover:text-black transition-colors"
                    aria-label="Live Demo"
                  >
                    <SiHuggingface className="w-5 h-5" />
                  </a>
                ) : (
                  <></>
                )}

                <a
                  href={proj.link}
                  className="text-neutral-400 hover:text-black transition-colors"
                  aria-label="Live Demo"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
            </div>
            <p className="text-neutral-600 mb-8 flex-grow leading-relaxed">
              {proj.desc}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {proj.tech.map((t, j) => (
                <span
                  key={j}
                  className="text-xs font-mono border border-black px-2 py-1 uppercase tracking-wider"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
