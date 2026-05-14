import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-pasta.jpg";
import heritageImg from "@/assets/heritage.jpg";
import pTagliatelle from "@/assets/product-tagliatelle.jpg";
import pRigatoni from "@/assets/product-rigatoni.jpg";
import pRavioli from "@/assets/product-ravioli.jpg";
import pSpaghetti from "@/assets/product-spaghetti.jpg";
import pConchiglie from "@/assets/product-conchiglie.jpg";
import pPappardelle from "@/assets/product-pappardelle.jpg";
import { Instagram, Facebook, Youtube, Music2, MapPin, Mail, Phone } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const products = [
  { name: "Tagliatelle all'Uovo", desc: "Egg ribbons, slow-dried 36 hours.", img: pTagliatelle, tag: "Fresh" },
  { name: "Rigatoni Bronzo", desc: "Bronze-cut tubes, ridged for sauce.", img: pRigatoni, tag: "Classico" },
  { name: "Ravioli Ricotta & Spinaci", desc: "Hand-folded, sheep's milk ricotta.", img: pRavioli, tag: "Ripieni" },
  { name: "Spaghetti d'Oro", desc: "Durum semolina, golden and toothsome.", img: pSpaghetti, tag: "Classico" },
  { name: "Conchiglie Rustiche", desc: "Little shells that cradle every drop.", img: pConchiglie, tag: "Corti" },
  { name: "Pappardelle Larghe", desc: "Wide ribbons for game and ragù.", img: pPappardelle, tag: "Fresh" },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { label: "Facebook", href: "https://facebook.com", Icon: Facebook },
  { label: "TikTok", href: "https://tiktok.com", Icon: Music2 },
  { label: "YouTube", href: "https://youtube.com", Icon: Youtube },
];

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-3 group">
      <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-navy)] text-[var(--brand-gold)] font-display text-lg font-bold ring-2 ring-[var(--brand-gold)] ring-offset-2 ring-offset-background transition-transform group-hover:rotate-6">
          B
        <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-[var(--brand-crimson)] ring-2 ring-background" />
      </span>
      <div className="leading-tight">
        <div className="font-display text-lg font-bold text-[var(--brand-navy)]">Bellantonio</div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--brand-crimson)]">Pastificio · 1975</div>
      </div>
    </a>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <a href="#products" className="text-foreground/80 transition-colors hover:text-[var(--brand-crimson)]">Products</a>
          <a href="#story" className="text-foreground/80 transition-colors hover:text-[var(--brand-crimson)]">Our Story</a>
          <a href="#tradition" className="text-foreground/80 transition-colors hover:text-[var(--brand-crimson)]">Tradition</a>
          <a href="#contact" className="text-foreground/80 transition-colors hover:text-[var(--brand-crimson)]">Contact</a>
        </nav>
        <a href="#contact" className="hidden md:inline-flex items-center rounded-full bg-[var(--brand-navy)] px-5 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-card)] transition hover:bg-[var(--brand-crimson)]">
          Visit us
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-16 pb-24 md:grid-cols-12 md:gap-8 md:pt-24 md:pb-32">
        <div className="md:col-span-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--brand-gold)]/60 bg-[var(--brand-cream)] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-[var(--brand-navy)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-crimson)]" /> Cinquant'anni · Since 1975
          </div>
          <h1 className="font-display text-5xl leading-[1.05] tracking-tight text-[var(--brand-navy)] md:text-7xl">
            La pasta che <em className="italic text-[var(--brand-crimson)]">racconta</em> la nostra famiglia.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Three generations, one little factory in the hills, and the same bronze dies our grandfather bought in 1975. Slow-dried, hand-cut, made the only way we know how.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#products" className="inline-flex items-center rounded-full bg-[var(--brand-navy)] px-7 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-warm)] transition hover:-translate-y-0.5 hover:bg-[var(--brand-crimson)]">
              Explore the pasta
            </a>
            <a href="#story" className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--brand-navy)]/15 px-7 py-3 text-sm font-medium text-[var(--brand-navy)] transition hover:border-[var(--brand-gold)] hover:bg-[var(--brand-cream)]">
              Read our story →
            </a>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-8 border-t border-border/60 pt-8">
            <Stat n="50" label="Years of craft" />
            <Stat n="24" label="Pasta shapes" />
            <Stat n="3" label="Generations" />
          </div>
        </div>
        <div className="relative md:col-span-6">
          <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-[var(--brand-gold)] blur-2xl opacity-60" />
          <div className="absolute -right-6 bottom-10 h-40 w-40 rounded-full bg-[var(--brand-crimson)]/30 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] shadow-[var(--shadow-warm)] ring-1 ring-[var(--brand-navy)]/10">
            <img src={heroImg} alt="Hands shaping fresh tagliatelle in our pasta factory" width={1600} height={1200} className="h-full w-full object-cover" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl bg-background/95 px-5 py-3 backdrop-blur">
              <div>
                <div className="font-display text-sm font-bold text-[var(--brand-navy)]">Made by hand, today.</div>
                <div className="text-xs text-muted-foreground">Batch n. 04 · Tagliatelle all'uovo</div>
              </div>
              <span className="rounded-full bg-[var(--brand-gold)] px-3 py-1 text-xs font-semibold text-[var(--brand-navy)]">Fresh</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-display text-4xl font-bold text-[var(--brand-navy)]">{n}</div>
      <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}

function Products() {
  return (
    <section id="products" className="bg-[var(--brand-cream)] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--brand-crimson)]">I nostri prodotti</div>
            <h2 className="mt-3 font-display text-4xl text-[var(--brand-navy)] md:text-5xl">Every shape has a story</h2>
          </div>
          <p className="max-w-md text-muted-foreground">From silky ribbons to ridged bronze-cut tubes — each pasta is dried slowly to keep its bite and soul.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <article key={p.name} className="group relative overflow-hidden rounded-3xl bg-background shadow-[var(--shadow-card)] ring-1 ring-border/60 transition hover:-translate-y-1 hover:shadow-[var(--shadow-warm)]">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={p.img} alt={p.name} loading="lazy" width={900} height={1100} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full bg-[var(--brand-navy)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--brand-gold)]">{p.tag}</span>
              </div>
              <div className="flex items-start justify-between gap-4 p-6">
                <div>
                  <h3 className="font-display text-xl font-bold text-[var(--brand-navy)]">{p.name}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{p.desc}</p>
                </div>
                <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--brand-navy)]/20 text-[var(--brand-navy)] transition group-hover:bg-[var(--brand-crimson)] group-hover:text-primary-foreground group-hover:border-transparent">→</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 md:grid-cols-12">
        <div className="md:col-span-6">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-[var(--brand-gold)]/40 -rotate-2" />
            <img src={heritageImg} alt="Our family at the original pasta machine, 1978" width={1200} height={1400} loading="lazy" className="relative w-full rounded-3xl object-cover shadow-[var(--shadow-warm)]" />
          </div>
        </div>
        <div className="md:col-span-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--brand-crimson)]">La nostra storia</div>
          <h2 className="mt-3 font-display text-4xl text-[var(--brand-navy)] md:text-5xl">From a single bronze die, in 1975.</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Nonno Giuseppe opened the doors of the pastificio with one extruder, two trays of semolina, and a stubborn idea: that pasta should taste like the wheat it came from.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Half a century later, his grandchildren still work the same machines — slower than they need to, exactly as he taught them.
          </p>

          <div id="tradition" className="mt-10 space-y-5">
            <Milestone year="1975" text="Giuseppe opens the workshop on Via dei Mulini." />
            <Milestone year="1992" text="The second generation introduces fresh ravioli." />
            <Milestone year="2010" text="We move to a larger mill — the bronze dies come with us." />
            <Milestone year="2025" text="50 years. Same family. Same recipe." />
          </div>
        </div>
      </div>
    </section>
  );
}

function Milestone({ year, text }: { year: string; text: string }) {
  return (
    <div className="flex items-start gap-5">
      <div className="font-display text-2xl font-bold text-[var(--brand-crimson)] tabular-nums">{year}</div>
      <div className="mt-1 h-px flex-1 translate-y-3 bg-border" />
      <div className="flex-[2] text-foreground/80">{text}</div>
    </div>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[var(--brand-navy)] py-24 text-primary-foreground">
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--brand-gold)]">Vieni a trovarci</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Come and say <em className="italic text-[var(--brand-gold)]">ciao</em>.</h2>
            <p className="mt-5 max-w-lg text-lg text-white/75">The shop is open Tuesday to Saturday. Walk in, smell the flour, take some pasta home.</p>

            <div className="mt-10 space-y-4 text-sm">
              <Info Icon={MapPin} primary="Via dei Mulini 12, 84010 Tramonti (SA), Italia" />
              <Info Icon={Phone} primary="+39 089 000 1975" />
              <Info Icon={Mail} primary="ciao@pastificiobellantonio.it" />
            </div>
          </div>

          <div className="md:col-span-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--brand-gold)]">Seguici</div>
              <h3 className="mt-3 font-display text-2xl">Behind the flour, every day.</h3>
              <p className="mt-3 text-white/70">Watch us work, learn the recipes, see what's coming out of the oven this week.</p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {socials.map(({ label, href, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition hover:border-[var(--brand-gold)] hover:bg-white/[0.08]">
                    <span className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-[var(--brand-gold)]" />
                      <span className="font-medium">{label}</span>
                    </span>
                    <span className="text-white/40 transition group-hover:translate-x-1 group-hover:text-[var(--brand-gold)]">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row">
          <div>© {new Date().getFullYear()} Pastificio Bellantonio · P.IVA 00000000000</div>
          <div className="font-display italic">Fatto con farina, acqua e tempo.</div>
        </div>
      </div>
    </section>
  );
}

function Info({ Icon, primary }: { Icon: typeof MapPin; primary: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand-gold)] text-[var(--brand-navy)]">
        <Icon className="h-4 w-4" />
      </span>
      <div className="pt-1.5 text-white/85">{primary}</div>
    </div>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Products />
      <Story />
      <Contact />
    </main>
  );
}
