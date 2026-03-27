import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export function Nav() {
  const [chaos, setChaos] = useState(false);

  useEffect(() => {
    if (!chaos) return;

    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return window.clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Fire confetti from both left and right edges
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => window.clearInterval(interval);
  }, [chaos]);

  return (
    <>
      {chaos && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
          body {
            animation: rainbow-bg 2s linear infinite, tilt-shake 0.3s infinite !important;
            font-family: "Comic Sans MS", "Chalkboard SE", "Comic Neue", cursive !important;
            overflow-x: hidden;
            background-color: #ff00ff !important;
          }
          * {
            border-radius: 50px !important;
            border-color: #00ff00 !important;
            border-width: 4px !important;
            border-style: dashed !important;
            transition: border-radius 0.5s ease-in-out, transform 0.2s !important;
          }
          nav {
            background: transparent !important;
            backdrop-filter: none !important;
          }
          img {
            animation: spin-wobble 2s infinite linear !important;
            filter: saturate(10) hue-rotate(90deg) !important;
          }
          p, h1, h2, h3, h4, h5, h6, a, span, div {
            animation: color-cycle 0.5s infinite !important;
          }
          
          @keyframes rainbow-bg {
            0% { filter: hue-rotate(0deg) invert(0); }
            50% { filter: hue-rotate(180deg) invert(1); }
            100% { filter: hue-rotate(360deg) invert(0); }
          }
          @keyframes tilt-shake {
            0% { transform: rotate(0deg) scale(1); }
            25% { transform: rotate(3deg) scale(1.02) translate(5px, 5px); }
            50% { transform: rotate(0deg) scale(1); }
            75% { transform: rotate(-3deg) scale(0.98) translate(-5px, -5px); }
            100% { transform: rotate(0deg) scale(1); }
          }
          @keyframes spin-wobble {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(0.3); border-radius: 0% !important; }
            100% { transform: rotate(360deg) scale(1); }
          }
          @keyframes color-cycle {
            0% { color: #00ff00; text-shadow: 3px 3px 0px #ff00ff; }
            33% { color: #ff00ff; text-shadow: -3px 3px 0px #00ffff; }
            66% { color: #00ffff; text-shadow: 3px -3px 0px #00ff00; }
            100% { color: #00ff00; text-shadow: 3px 3px 0px #ff00ff; }
          }
        `,
          }}
        />
      )}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-black transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            onClick={(e) => {
              // Toggle the chaos when clicking the logo!
              setChaos((c) => !c);
            }}
            className="font-bold tracking-tight text-lg uppercase cursor-pointer hover:scale-105 active:scale-95 transition-transform hover:text-red-500"
          >
            Don't
          </Link>
          <div className="flex gap-6 text-sm font-medium">
            <a
              href="/#experience"
              className="hover:underline underline-offset-4 decoration-2 hidden md:block"
            >
              Experience
            </a>
            <a
              href="/#projects"
              className="hover:underline underline-offset-4 decoration-2 hidden md:block"
            >
              Projects
            </a>
            <a
              href="mailto:hello@example.com"
              className="flex items-center gap-1 hover:underline underline-offset-4 decoration-2"
            >
              Contact <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
