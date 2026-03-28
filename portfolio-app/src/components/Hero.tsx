export function Hero() {
  return (
    <section className="pt-20 flex flex-col gap-6">
      <div className="font-mono text-sm uppercase tracking-widest border border-black inline-block px-3 py-1 w-fit">
        Samuel Choi
      </div>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        Building Software, <br />
        Driven to Grow
      </h1>
      <p className="text-lg text-neutral-600 max-w-2xl leading-relaxed mt-4">
        Hi, I'm Samuel. The most common feedback I hear from developers during
        coffee chats is about the passion I have. I want to own the process
        end-to-end and influence the world someday.
      </p>
    </section>
  );
}
