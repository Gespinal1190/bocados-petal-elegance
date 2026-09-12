import heroImage from "@/assets/hero-restaurant.jpg";
import { useScrollProgress } from "@/hooks/use-scroll-animation";

const Hero = () => {
  const { ref, progress } = useScrollProgress();
  const mediaScale = 0.76 + progress * 0.24;
  const mediaOffset = (1 - progress) * 70;
  const reveal = 100 - progress * 100;

  return (
    <section id="inicio" ref={ref} className="relative h-[220svh] bg-background">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 text-primary/10">
          <span className="absolute left-[8%] top-[18%] font-display text-4xl">B</span>
          <span className="absolute right-[12%] top-[25%] font-display text-2xl">B</span>
          <span className="absolute bottom-[20%] left-[18%] font-display text-3xl">B</span>
          <span className="absolute bottom-[14%] right-[18%] font-display text-4xl">B</span>
        </div>
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
          <div>
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">Vilanova i la Geltrú</p>
            <h1 className="max-w-4xl font-body text-6xl font-black uppercase leading-[0.88] text-foreground sm:text-7xl md:text-8xl lg:text-[8rem]">
              Bocados<br />como<br />ritual.
            </h1>
          </div>
        </div>
        <div
          className="absolute inset-0 z-20 origin-center overflow-hidden will-change-transform"
          style={{ transform: `translate3d(0, ${mediaOffset}vh, 0) scale(${mediaScale})` }}
        >
          <video autoPlay muted loop playsInline poster={heroImage} className="h-full w-full object-cover">
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-foreground/20" />
        </div>
        <div
          aria-hidden="true"
          className="hero-outline pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-6 text-center"
          style={{ clipPath: `inset(${reveal}% 0 0 0)` }}
        >
          <div className="max-w-4xl font-body text-6xl font-black uppercase leading-[0.88] sm:text-7xl md:text-8xl lg:text-[8rem]">
            Bocados<br />como<br />ritual.
          </div>
        </div>
        <a href="#menu" className="absolute bottom-7 left-1/2 z-40 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground">
          Descubre Bocados ↓
        </a>
      </div>
    </section>
  );
};

export default Hero;