import { useParams, Link } from "react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { GithubIcon, projects } from "./Projects";
import { SiHuggingface } from "react-icons/si";

interface ProjectDetail {
  name: string;
  tagline: string;
  tech: string[];
  year: string;
  role: string;
  link: string;
  github: string;
  huggingface?: string;
  cover: string;
  coverType: "video" | "image" | "gallery";
  coverImages?: string[];
  sections: { id: string; label: string; content: string | string[] }[];
}

const projectDetails: Record<string, ProjectDetail> = {
  furnfit: {
    name: "FurnFit",
    tagline:
      "AI-powered fashion discovery that learns your style from Instagram and find vibe matching clothings from 350,000+ catalog.",
    tech: [
      "Next.js",
      "NestJS",
      "TypeScript",
      "YOLOv8",
      "OpenCLIP",
      "Amazon Bedrock",
      "OpenSearch",
      "Supabase",
      "Redis",
      "AWS S3",
      "Docker",
    ],
    year: "2026",
    role: "Full-Stack / ML Engineer",
    link: "https://furnfitfrontendprod.vercel.app/",
    github: "https://github.com/after2842/FurnFit_frontend_prod",
    huggingface: "https://huggingface.co/Samuel77/YOLOv8s-seg-fashionpedia",
    cover: "https://www.youtube.com/embed/peZBSAa59TA",
    coverType: "video",
    sections: [
      {
        id: "overview",
        label: "Overview",
        content:
          "FurnFit is a full-stack AI-powered fashion discovery platform that learns a user's personal style from their Instagram feed and delivers hyper-personalized product recommendations. Users connect their Instagram, and the system automatically analyzes their aesthetic, generates a style profile, and surfaces products that match their fashion identity — complete with AI-powered style analysis and virtual try-on for every product.",
      },
      {
        id: "problem",
        label: "Problem",
        content:
          "Online fashion shopping is broken. Users scroll through thousands of irrelevant products, rely on basic keyword search, and have no way to express their personal style beyond manual filtering. Existing recommendation systems treat every user the same — they optimize for clicks and conversions, not for genuine style alignment. The gap between 'what I like' and 'what I can find' remains massive.",
      },
      {
        id: "architecture",
        label: "Architecture",
        content: [
          "The frontend is a Next.js 16 app deployed on Vercel with server-side rendering for product pages and React Query for client state. All API calls are reverse-proxied through Next.js rewrites to keep the backend origin hidden.",
          "The backend runs NestJS 11 on Fly.io inside Docker. Sessions are cookie-based (HttpOnly, SameSite, Secure) stored in Redis with rolling 1-day TTL, enabling horizontal scaling. Supabase PostgreSQL serves as the source of truth for users, profiles, and product metadata.",
          "Search is powered by a self-hosted OpenSearch instance on EC2 running 350k+ products with both full-text fields and KNN vector fields (~760-dim OpenCLIP embeddings). Text search uses multi-match across title (4x boost), search_text (2x), and description (1.5x), then re-ranks using the user's style profile.",
        ],
      },
      {
        id: "ml-pipeline",
        label: "ML Pipeline",
        content: [
          "Fine-tuned YOLOv8 on FashionPedia + DeepFashion2 datasets for apparel detection and segmentation. The model runs on Vast.ai via vLLM and detects, crops, and masks individual garments from lifestyle photos — isolating garments produces far better embeddings than embedding entire scenes.",
          "OpenCLIP generates ~760-dimensional normalized embeddings for both text and images in the same vector space, enabling cross-modal search. A text query can find visually similar products, and an image can surface semantically related items.",
          "Amazon Bedrock Nova Pro handles multimodal analysis: extracting aesthetic archetypes (12 categories), lifestyle occasions (10 categories), and color/pattern affinities (10 categories) from user photos, plus generating per-image style recommendations and personalized product advice.",
          "Virtual try-on uses Amazon Bedrock Nova Canvas to composite products onto the user's photo. The system classifies garments as UPPER_BODY, LOWER_BODY, or FULL_BODY, resizes images to fit within 4-megapixel limits, and generates realistic composites.",
        ],
      },
      {
        id: "instagram-sync",
        label: "Instagram Sync Pipeline",
        content: [
          "When a user connects their Instagram, Apify scrapes up to 10 recent posts. Images are downloaded, uploaded to S3, and stored in Supabase. The sync returns quickly — the heavy analysis runs asynchronously.",
          "In the background, Nova Pro analyzes all photos to build a style profile (aesthetic archetype, lifestyle occasion, color/pattern affinity). Then it generates per-image outputs: a compliment, a specific apparel recommendation, and a short 'why' phrase.",
          "Finally, OpenCLIP encodes each recommendation into a text embedding stored in the database. These pre-computed vectors power the dashboard's recommendation feed — each Instagram image maps to a set of visually and semantically matched products via KNN search across the 350k+ catalog.",
        ],
      },
      {
        id: "solution",
        label: "The Result",
        content:
          "The platform delivers three recommendation paths: text-embedding recs from the sync pipeline (primary dashboard feed), live photo-based recs using real-time YOLO detection + embedding, and personalized text search with profile-based re-ranking. Every product page offers AI-generated style advice and one-click virtual try-on. The entire flow — from Instagram connection to personalized shopping — is seamless and automatic.",
      },
    ],
  },
  bidangil: {
    name: "Bidangil",
    tagline:
      "A Korean e-commerce proxy purchasing service that generated $7,000 in revenue. It bridged the gap for U.S. shoppers locked out of Korean online stores.",
    tech: [
      "Next.js",
      "Django",
      "PostgreSQL",
      "Stripe",
      "Redis",
      "WebSocket",
      "OpenAI",
      "FedEx API",
      "AWS S3",
      "AWS EC2",
    ],
    year: "2025",
    role: "Founder / Full-Stack Engineer",
    link: "https://bidangil.co",
    github: "https://github.com/after2842/bidangil_back",
    cover: "https://www.youtube.com/embed/QdaP3EVkgRw",
    coverType: "video",
    sections: [
      {
        id: "overview",
        label: "Overview",
        content:
          "Bidangil is a proxy purchasing service that enables U.S.-based shoppers to buy products from Korean online stores. Korean e-commerce platforms require Korean bank-issued credit cards and Korean carrier-issued phone numbers to complete purchases — a significant barrier for Korean Americans and overseas buyers. Registered as an LLC in South Korea, the service operated from April to December 2025 and generated ~$7,000 USD in revenue at a 4% commission rate.",
      },
      {
        id: "problem",
        label: "Problem",
        content:
          "Korean e-commerce is walled off from international buyers. Platforms like Coupang, Naver Shopping, and Musinsa require Korean payment methods and Korean phone verification — there's no guest checkout for foreign cards. Korean Americans who want to buy from these stores have no straightforward option. Existing proxy services are expensive, opaque, and lack real-time communication with customers.",
      },
      {
        id: "architecture",
        label: "Architecture",
        content: [
          "The frontend is a Next.js 14 app deployed on Vercel with full bilingual support (Korean and English). State management uses React Context for auth, orders, and community data, with sessionStorage persistence so users don't lose form progress if redirected to login.",
          "The backend runs Django 4.2 with Django REST Framework on AWS EC2, using Daphne as the ASGI server to support both HTTP and WebSocket connections. PostgreSQL handles all persistent data, and Redis serves dual duty as both the Celery task broker and the Django Channels WebSocket layer.",
          "The system integrates 8+ third-party APIs: Stripe for two-stage payments, OpenAI GPT-4o for product name extraction from URLs, DALL-E for AI avatar generation, FedEx API for delivery tracking, Naver Sens for SMS notifications, Google Maps for address validation, and AWS S3 for image storage.",
        ],
      },
      {
        id: "order-lifecycle",
        label: "Order Lifecycle",
        content: [
          "Orders follow a multi-step lifecycle with two-stage Stripe payments. A customer submits product URLs and a U.S. shipping address. GPT-4o automatically extracts product names from the URLs via a Celery background task. The admin then sets item prices in Korean Won, which triggers automatic Stripe checkout session creation with USD conversion.",
          "After the customer pays for items, the admin purchases them from Korean stores, sets a delivery fee, and triggers a second Stripe checkout for shipping. Once paid, the package ships via FedEx, EMS, or DHL. A Celery Beat task polls the FedEx API every 2 hours for tracking updates until delivery is confirmed.",
          "Every state transition — order received, payment confirmed, items purchased, delivery started, delivery completed — triggers both email (Django SMTP) and SMS (Naver Sens API) notifications to both the customer and admin. Django signals handle this event-driven notification pipeline.",
        ],
      },
      {
        id: "community",
        label: "Community Platform",
        content: [
          "To drive engagement beyond transactions, the platform includes a full community section. Users take a 4-question personality quiz that feeds into DALL-E to generate a unique chibi avatar — delivered in real-time via WebSocket notifications through Django Channels.",
          "The community supports star-rated product reviews with up to 9 image uploads, categorized discussion boards (chat, meetup, share, food) with pagination and filtering, threaded comments with nested replies, and a social layer with user/post/comment likes and profile pages. All features are fully bilingual in Korean and English.",
        ],
      },
      {
        id: "lessons",
        label: "Business Lessons",
        content: [
          "The market problem was real — genuine demand existed from Korean Americans locked out of Korean e-commerce. But 4% commission on ~$7,000 in orders couldn't sustain EC2 + PostgreSQL + Redis + third-party API costs. Irregular demand patterns (2+ months of zero orders followed by bursts of 5 in two weeks) made fixed infrastructure costs hard to justify.",
          "The original plan used cryptocurrency for KRW-USD transfers, but Korean financial regulations prohibited this method. Combined with excessive U.S. tariffs under the Trump administration and the founder returning to school, the business shut down in December 2025. The project remains a complete, production-grade full-stack system integrating payments, real-time notifications, AI features, and international logistics.",
        ],
      },
    ],
  },
  "mafia-game": {
    name: "Mafia Game",
    tagline:
      "A real-time multiplayer social deduction game built with WebSockets — create a room, assign roles, and survive the night.",
    tech: [
      "React",
      "Vite",
      "Tailwind CSS",
      "FastAPI",
      "WebSocket",
      "Python",
      "TypeScript",
    ],
    year: "2025-2026",
    role: "Full-Stack Engineer",
    link: "https://mafia-front-hazel.vercel.app/",
    github: "https://github.com/after2842/Mafia-backend",
    cover: "",
    coverType: "gallery",
    coverImages: [
      "/mafia-1.png",
      "/mafia-2.png",
      "/mafia-3.png",
      "/mafia-4.png",
      "/mafia-5.png",
      "/mafia-6.png",
    ],
    sections: [
      {
        id: "overview",
        label: "Overview",
        content:
          "A browser-based multiplayer Mafia/Werewolf game where players join lobbies via a 4-digit room code, get secretly assigned roles (Mafia, Journalist, Citizen), and play through night/day cycles with real-time chat, timed voting, and a quiz-based lifeguard mechanic. The entire game runs over a single WebSocket connection per player — no polling, no REST calls during gameplay.",
      },
      {
        id: "game-flow",
        label: "Game Flow",
        content: [
          "A host creates a room and configures the role distribution (mafia, journalist, citizen counts). Players join via a room code or invite link. Once the game starts, roles are randomly assigned and privately revealed to each player.",
          "During the night phase (35 seconds), each role acts simultaneously: Mafia selects a kill target (visible only to other mafia members), the Journalist picks someone to investigate, and Citizens answer timed quiz questions — correct answers earn a one-time lifeguard shield that can save them from a mafia kill.",
          "The day phase opens with a morning report: who was killed, who was saved by a shield, and the journalist's investigation results. Players discuss in global chat with a 4-minute timer (extendable by the host). Then a majority vote selects a suspect, who gets a last defense speech before a final kill/save vote. The cycle repeats until one side wins — citizens win when all mafia are eliminated, mafia win when they equal or outnumber the remaining players.",
        ],
      },
      {
        id: "frontend",
        label: "Frontend",
        content: [
          "Built with Vite + React 18 and Tailwind CSS. The app manages the full game lifecycle through a custom useWebSocket hook that establishes the connection, routes incoming messages to the correct listeners, and exposes a send method for outbound game actions.",
          "The UI flows from a landing page (create/join room with invite link support), to a lobby (role configuration, player list, shareable room link), to the game itself — with distinct views for day and night phases, chat panels, vote dialogs, role introduction screens, and end-of-game role reveals. In development, Vite proxies /ws and /api to the FastAPI backend on port 8000.",
        ],
      },
      {
        id: "backend",
        label: "Backend",
        content: [
          "A single FastAPI application handles everything through one WebSocket endpoint at /ws/{room_id}. The server processes all game events — room creation, joining, starting, chatting, mafia kills, journalist investigations, quiz answers, votes, final votes, timer extensions, and day skips — entirely over WebSocket messages.",
          "The GameRoom class manages the full state machine: player/role tracking, phase timers with auto-advance on expiry, vote tallying, quiz scoring from a JSON question bank, morning report generation, and lifeguard shield logic. Journalist results are scoped privately, mafia targets are visible only to mafia members, and system announcements broadcast to all.",
          "State is held in-memory (a Python dict of rooms) for simplicity and zero-latency access. In production, the built React frontend is served as static files by FastAPI itself, making the entire game a single deployable process.",
        ],
      },
      {
        id: "design-decisions",
        label: "Design Decisions",
        content: [
          "WebSocket-only gameplay was a deliberate choice — social deduction games need instant feedback. Every kill, vote, and chat message arrives in real-time with no HTTP overhead. The single-endpoint design keeps the protocol simple: one connection per player, message type routing on both sides.",
          "The quiz-based lifeguard mechanic adds a skill element to the citizen role, which is traditionally passive. Instead of random chance, citizens can actively earn protection through quick thinking under time pressure. The question bank is a simple JSON file, making it trivial to extend or theme.",
          "In-memory state was chosen over a database because game rooms are ephemeral by nature — they last minutes, not days. This eliminates all persistence overhead and keeps the server code minimal. The trade-off (server restart clears all rooms) is acceptable for a game with short sessions.",
        ],
      },
    ],
  },
  mover: {
    name: "Mover",
    tagline:
      "Upload a room walkthrough video and get a clustered inventory of every unique furniture item — built around MediaConvert normalization, Rekognition detection, OpenCLIP embeddings, and HDBSCAN clustering.",
    tech: [
      "Next.js",
      "NestJS",
      "FastAPI",
      "AWS MediaConvert",
      "AWS Rekognition",
      "OpenCLIP",
      "HDBSCAN",
      "AWS S3",
      "PostgreSQL",
      "SerpApi",
    ],
    year: "2026",
    role: "Full-Stack / ML Engineer",
    link: "https://mover-draft-frontend.vercel.app/",
    github: "#",
    cover: "https://www.youtube.com/embed/L-M94QtwQnI",
    coverType: "video",
    sections: [
      {
        id: "overview",
        label: "Overview",
        content:
          "Mover turns a single room walkthrough video into a deduplicated inventory of every unique piece of furniture in the space. Instead of treating each Rekognition detection as a separate item, Mover crops every candidate across timestamps, embeds each crop with OpenCLIP, and clusters them per label with HDBSCAN — so two couches stay as two couches, and the same chair seen in thirty frames collapses into one. Only one representative crop per real object is sent downstream for product matching.",
      },
      {
        id: "problem",
        label: "Problem",
        content:
          "The naive version of this pipeline — run Rekognition on a video, keep the top detection per label, and look it up — collapses every chair in the room into one chair and misses duplicates entirely. Real rooms have two nightstands, three stools, a dining chair and an office chair. To build a trustworthy moving/staging inventory you need instance-level deduplication across frames, not label-level. That is the problem Mover V2 is designed to solve.",
      },
      {
        id: "architecture",
        label: "Architecture",
        content: [
          "Frontend — Next.js app for upload, pipeline status polling, and rendering the clustered furniture results with one representative crop per unique item.",
          "Backend — NestJS service that owns the orchestration: S3 uploads, MediaConvert job creation, Rekognition job tracking, persistence of raw detections, FastAPI invocation, and downstream product matching on representatives only.",
          "ML service — a separate FastAPI app that handles the instance-level logic: cropping every detection, generating OpenCLIP embeddings, running HDBSCAN per canonical label, scoring and selecting a representative crop per cluster, and returning a structured cluster result.",
          "Storage — S3 is organized by stage (raw-videos, normalized-videos, raw-detections, crops, clustered, representatives) and PostgreSQL tracks estimates, raw detections, crop candidates, embeddings, clusters, and cluster members.",
        ],
      },
      {
        id: "pipeline",
        label: "Pipeline",
        content: [
          "Step 1 — Normalize every upload with AWS MediaConvert into a single H.264 / AAC MP4 analysis profile. This removes codec variance across devices, makes Rekognition input deterministic, and stabilizes frame extraction and timestamp alignment.",
          "Step 2 — Run Rekognition StartLabelDetection on the normalized video with timestamp-level aggregation. Filter the results to a hardcoded furniture allowlist (couch, chair, desk, table, bed, dresser, shelf, etc.), normalize synonyms (Sofa → Couch), and persist every instance — not just the top one per label.",
          "Step 3 — Hand off to the FastAPI ML service. For each detection, seek to the timestamp, convert the ratio bbox to pixels, expand by a small margin, clamp to the frame, and upload the crop to S3. Reject unusable crops using Laplacian sharpness, bbox area ratio, and edge clipping checks.",
          "Step 4 — Generate OpenCLIP DataComp XL embeddings for every kept crop and build a feature vector combining the embedding with scaled metadata (timestamp, bbox center, bbox area, confidence, sharpness).",
          "Step 5 — Bucket crops by canonical label and run HDBSCAN per label with a same-frame IoU post-check so two distinct couches in the same frame aren't collapsed just because their embeddings look similar. Treat noise points as weak candidates rather than forcing assignment.",
          "Step 6 — Score each member of a cluster (confidence, sharpness, bbox area, center bonus) and pick one representative crop per cluster. Only representative crops get sent to SerpApi / Google Lens for product matching, which cuts duplicate lookups dramatically.",
        ],
      },
      {
        id: "clustering",
        label: "Why HDBSCAN",
        content: [
          "HDBSCAN fits the problem because the number of couches or chairs in a given video is unknown up front, observations per object are uneven, and some detections are noisy or partially clipped. It handles outliers natively instead of forcing every point into a cluster.",
          "Clustering is scoped per canonical label — all couch crops together, all chair crops together — never mixed. The primary feature is the OpenCLIP embedding, augmented with normalized metadata so that two visually similar couches at different positions/timestamps can still be separated when the embedding alone is ambiguous.",
          "The roadmap for tuning: start with embedding + scaled metadata, add an expanded-context crop embedding if similar items merge too aggressively, and fall back to a custom weighted distance matrix fed into HDBSCAN if stability is still an issue.",
        ],
      },
      {
        id: "status",
        label: "Current Status",
        content:
          "V1 (single-video upload, ffmpeg transcode on backend, Rekognition top-label-per-category, SerpApi lookup) is running end-to-end on the live demo. V2 is in active build: MediaConvert normalization and the richer status model are being wired into NestJS, the FastAPI ML service skeleton is being scaffolded for crop extraction and OpenCLIP embeddings, and HDBSCAN clustering + representative selection come next, followed by reconnecting SerpApi against representatives only and updating the frontend to render clustered unique items instead of raw labels.",
      },
    ],
  },
};

export function ProjectDetails() {
  const { id } = useParams();

  const project = id ? projectDetails[id] : undefined;

  if (!project) {
    return (
      <main className="max-w-5xl mx-auto px-6 py-24 md:py-32 flex flex-col gap-8 items-center">
        <h1 className="text-4xl font-bold tracking-tighter">
          Project not found
        </h1>
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-sm uppercase hover:underline underline-offset-4 decoration-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </main>
    );
  }

  const projectIds = projects.map((p: any) => p.id);
  const currentIndex = projectIds.indexOf(id!);
  const nextIndex = (currentIndex + 1) % projectIds.length;
  const nextProject = projects[nextIndex];

  return (
    <main className="max-w-5xl mx-auto px-6 py-24 md:py-32 flex flex-col gap-16">
      <div className="flex items-center gap-4 border-b border-black pb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-sm uppercase hover:underline underline-offset-4 decoration-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      <header className="flex flex-col gap-6">
        <div className="flex justify-between items-start flex-col md:flex-row gap-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
            {project.name}
          </h1>
          <div className="flex gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-black px-4 py-2 font-mono text-sm uppercase hover:bg-neutral-100 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              Source
            </a>
            {project.huggingface && (
              <a
                href={project.huggingface}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-black px-4 py-2 font-mono text-sm uppercase hover:bg-neutral-100 transition-colors"
              >
                <SiHuggingface className="w-4 h-4" />
                Model
              </a>
            )}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-black px-4 py-2 font-mono text-sm uppercase bg-black text-white hover:bg-neutral-800 transition-colors"
            >
              <ArrowUpRight className="w-4 h-4" />
              Live Demo
            </a>
          </div>
        </div>
        <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl leading-relaxed">
          {project.tagline}
        </p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black border border-black">
        <div className="bg-white p-6 flex flex-col gap-2">
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
            Role
          </span>
          <span className="font-medium">{project.role}</span>
        </div>
        <div className="bg-white p-6 flex flex-col gap-2">
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
            Year
          </span>
          <span className="font-medium">{project.year}</span>
        </div>
        <div className="bg-white p-6 flex flex-col gap-2 col-span-2 md:col-span-2">
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
            Tech Stack
          </span>
          <div className="flex flex-wrap gap-2 mt-1">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs font-mono border border-black px-2 py-0.5 uppercase tracking-wider"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {project.coverType === "gallery" && project.coverImages ? (
        <div className="border border-black overflow-hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-px bg-black [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {project.coverImages.map((src, i) => (
              <div key={i} className="flex-shrink-0 snap-start bg-white p-4">
                <img
                  src={src}
                  alt={`${project.name} screenshot ${i + 1}`}
                  className="h-[500px] w-auto object-contain"
                />
              </div>
            ))}
          </div>
          <div className="bg-white border-t border-black px-4 py-2">
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
              Scroll to explore
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full aspect-[16/9] border border-black overflow-hidden relative group">
          {project.coverType === "video" ? (
            <iframe
              src={project.cover}
              title={`${project.name} demo`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <img
              src={project.cover}
              alt={`${project.name} cover`}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          )}
        </div>
      )}

      <article className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4 flex flex-col gap-8">
          <div className="sticky top-24">
            <h2 className="text-xl font-bold uppercase tracking-tight mb-4 border-b border-black pb-2">
              Contents
            </h2>
            <ul className="flex flex-col gap-3 font-mono text-sm">
              {project.sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="hover:underline underline-offset-4 decoration-2"
                  >
                    {String(i + 1).padStart(2, "0")}. {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-8 flex flex-col gap-16">
          {project.sections.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              className="flex flex-col gap-4 scroll-mt-24"
            >
              <h3 className="font-mono text-sm text-neutral-500 uppercase tracking-widest">
                {String(i + 1).padStart(2, "0")}. {section.label}
              </h3>
              {Array.isArray(section.content) ? (
                section.content.map((paragraph, j) => (
                  <p
                    key={j}
                    className="text-lg leading-relaxed text-neutral-800"
                  >
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-lg leading-relaxed text-neutral-800">
                  {section.content}
                </p>
              )}
            </section>
          ))}
        </div>
      </article>

      <div className="border-t border-black pt-16 mt-8 flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
            Next Project
          </span>
          <Link
            to={`/project/${nextProject.id}`}
            className="text-2xl font-bold hover:underline decoration-2 underline-offset-4"
          >
            {nextProject.name}
          </Link>
        </div>
        <Link
          to={`/project/${nextProject.id}`}
          className="border border-black p-4 hover:bg-black hover:text-white transition-colors"
        >
          <ArrowUpRight className="w-6 h-6" />
        </Link>
      </div>
    </main>
  );
}
