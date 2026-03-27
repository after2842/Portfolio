export function Footer() {
  return (
    <footer className="border-t border-black mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-mono text-sm text-neutral-500">
          © {new Date().getFullYear()} Samuel Choi
        </p>
        <div className="flex gap-6 font-mono text-sm uppercase tracking-wider">
          <a
            href="https://github.com/after2842"
            className="hover:text-black text-neutral-500 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/samuel-choi-86829432a"
            className="hover:text-black text-neutral-500 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="hover:text-black text-neutral-500 transition-colors"
          >
            InstaGram
          </a>
        </div>
      </div>
    </footer>
  );
}
