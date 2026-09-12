const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[calc(100svh-44px)] flex-col items-center overflow-hidden bg-background px-5 pb-16 pt-32 text-center md:px-10 md:pb-24 md:pt-40"
    >
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center">
        <p className="mb-7 text-[10px] font-medium uppercase tracking-[0.28em] text-primary md:text-xs">
          Vilanova i la Geltrú · Desde primera hora
        </p>
        <h1 className="max-w-5xl font-display text-6xl leading-[0.95] text-foreground sm:text-7xl md:text-8xl lg:text-[8.5rem]">
          La esencia de lo <em className="font-normal text-primary">auténtico</em> en cada bocado
        </h1>
        <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Desayunos, comidas, meriendas y cenas en el corazón de Vilanova.
        </p>
        <a href="#reservas" className="btn-primary mt-9">Reservar mesa</a>
      </div>

      <div className="relative mt-14 w-full max-w-6xl overflow-hidden md:mt-20">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="aspect-[16/9] w-full object-cover md:aspect-[2/1]"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/10" />
      </div>
    </section>
  );
};

export default Hero;