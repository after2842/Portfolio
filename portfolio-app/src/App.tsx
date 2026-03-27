import { Routes, Route } from "react-router";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Experience } from "./components/Experience";
import { Projects } from "./components/projects";
import { Footer } from "./components/Footer";
import { ProjectDetails } from "./components/ProjDetail";

function Home() {
  return (
    <>
      <Nav />
      <main className="max-w-5xl mx-auto px-6 py-24 md:py-32 flex flex-col gap-32">
        <Hero />
        <Experience />
        <Projects />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </div>
  );
}
