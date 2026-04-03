import Icon from "@/components/ui/icon";
import { TICKER_ITEMS } from "./data";

interface Props {
  go: (id: string) => void;
}

export default function HeroAboutSection({ go }: Props) {
  return (
    <>
      {/* ── HERO ── */}
      <section id="home" className="relative overflow-hidden" style={{ background:"var(--ink)", minHeight:"100svh" }}>
        {/* Grid */}
        <div className="absolute inset-0 grid-bg opacity-100" />
        {/* Photo */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
          <img
            src="https://cdn.poehali.dev/projects/f93cee9a-1f9f-4b49-8a11-3f50d717fcc9/files/d21fac95-4cf8-42ad-bf99-d04416e2fff1.jpg"
            alt="" className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0" style={{ background:"linear-gradient(90deg, var(--ink) 0%, transparent 60%)" }} />
        </div>

        {/* Cyan vertical accent */}
        <div className="absolute left-0 top-14 bottom-0 w-0.5" style={{ background:"var(--cyan)" }} />

        <div className="relative max-w-screen-xl mx-auto px-6 pt-36 pb-24 flex flex-col justify-center" style={{ minHeight:"100svh" }}>
          {/* Tag */}
          <div className="reveal d1 flex items-center gap-3 mb-8">
            <div className="h-px w-10" style={{ background:"var(--cyan)" }} />
            <span className="font-plex text-xs tracking-[0.25em] uppercase" style={{ color:"var(--cyan)" }}>
              Производитель · Россия · с 2008
            </span>
          </div>

          {/* Headline */}
          <h1 className="reveal d2 font-oswald font-light text-white leading-none mb-2"
            style={{ fontSize:"clamp(3rem,7vw,6.5rem)" }}>
            ОБОРУДОВАНИЕ
          </h1>
          <h1 className="reveal d3 font-oswald font-semibold leading-none mb-10"
            style={{ fontSize:"clamp(3rem,7vw,6.5rem)", color:"var(--cyan)" }}>
            ПРОБОПОДГОТОВКИ
          </h1>

          <p className="reveal d4 font-plex text-gray-300 max-w-md text-base leading-relaxed mb-12" style={{ fontWeight:300 }}>
            Центрифуги, фильтровальные установки и экстракторы собственного производства.
            Поставки в 40+ регионов. Гарантия 12 месяцев.
          </p>

          <div className="reveal d5 flex flex-wrap gap-4">
            <button onClick={() => go("equipment")}
              className="flex items-center gap-2.5 font-plex text-sm font-medium uppercase tracking-wider px-8 py-4 transition-all hover:brightness-110"
              style={{ background:"var(--cyan)", color:"#fff" }}>
              <Icon name="Grid3X3" size={16} />
              Каталог оборудования
            </button>
            <button onClick={() => go("contacts")}
              className="flex items-center gap-2.5 font-plex text-sm font-medium uppercase tracking-wider px-8 py-4 transition-all"
              style={{ border:"1px solid rgba(255,255,255,0.2)", color:"#d0dce8" }}>
              Запросить КП
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>

          {/* Stats row */}
          <div className="reveal d6 grid grid-cols-2 sm:grid-cols-4 gap-px mt-20"
            style={{ borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:"1px" }}>
            {[
              { n:"16", u:"лет",  l:"на рынке" },
              { n:"120+", u:"",   l:"моделей оборудования" },
              { n:"40+", u:"",    l:"регионов поставок" },
              { n:"12", u:"мес.", l:"гарантия" },
            ].map((s,i) => (
              <div key={i} className="pt-8 pr-8">
                <div className="font-oswald text-white font-semibold" style={{ fontSize:"2.2rem", lineHeight:1 }}>
                  {s.n}<span style={{ color:"var(--cyan)", fontSize:"1.2rem" }}>{s.u && " " + s.u}</span>
                </div>
                <div className="font-plex text-xs mt-1.5" style={{ color:"#6b8299", letterSpacing:"0.05em" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker-wrap py-3 overflow-hidden" style={{ background:"var(--cyan)", color:"#fff" }}>
        <div className="ticker">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
            <span key={i} className="font-oswald text-xs font-medium tracking-[0.25em] uppercase whitespace-nowrap mx-10">
              {t} <span className="opacity-50 mx-2">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28" style={{ background:"var(--warm-white)" }}>
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Left: image */}
            <div className="relative order-2 lg:order-1">
              <img
                src="https://cdn.poehali.dev/projects/f93cee9a-1f9f-4b49-8a11-3f50d717fcc9/files/0ab2b92e-0eb8-4d3c-b643-83f3548eb189.jpg"
                alt="Лаборатория" className="w-full object-cover"
                style={{ aspectRatio:"4/3" }}
              />
              {/* Accent card */}
              <div className="absolute -bottom-6 -right-6 p-7 shadow-xl"
                style={{ background:"var(--ink)", minWidth:"180px" }}>
                <div className="font-oswald text-white font-semibold" style={{ fontSize:"2.4rem", lineHeight:1 }}>500+</div>
                <div className="font-plex text-xs mt-1" style={{ color:"var(--cyan)" }}>объектов оснащено</div>
              </div>
              {/* Cyan border accent */}
              <div className="absolute top-0 left-0 w-10 h-10" style={{ borderTop:"3px solid var(--cyan)", borderLeft:"3px solid var(--cyan)" }} />
              <div className="absolute bottom-0 right-0 w-10 h-10" style={{ borderBottom:"3px solid var(--cyan)", borderRight:"3px solid var(--cyan)" }} />
            </div>

            {/* Right: text */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background:"var(--cyan)" }} />
                <span className="font-plex text-xs tracking-[0.2em] uppercase" style={{ color:"var(--cyan)" }}>О компании</span>
              </div>
              <h2 className="font-oswald font-semibold leading-tight mb-6" style={{ fontSize:"clamp(2rem,3.5vw,3rem)", color:"var(--ink)" }}>
                РОССИЙСКИЙ<br />
                <span style={{ color:"var(--cyan)" }}>ПРОИЗВОДИТЕЛЬ</span><br />
                ЛАБОБОРУДОВАНИЯ
              </h2>
              <p className="font-plex text-sm leading-relaxed mb-5" style={{ color:"#4a5568", fontWeight:300 }}>
                С 2008 года разрабатываем и производим оборудование для пробоподготовки в аналитических, медицинских и промышленных лабораториях. Полный цикл — от проектирования до пуско-наладки.
              </p>
              <p className="font-plex text-sm leading-relaxed mb-10" style={{ color:"#4a5568", fontWeight:300 }}>
                Собственный сервисный центр, метрологическая поверка, обучение персонала — сопровождаем клиента на всём жизненном цикле оборудования.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon:"Award",         t:"ISO 9001:2015" },
                  { icon:"ShieldCheck",   t:"Росстандарт" },
                  { icon:"Wrench",        t:"Сервисный центр" },
                  { icon:"GraduationCap", t:"Обучение персонала" },
                ].map((b,i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3.5"
                    style={{ border:"1px solid #e2e8f0", borderLeft:"3px solid var(--cyan)" }}>
                    <Icon name={b.icon} size={17} className="text-cyan shrink-0" fallback="Check" />
                    <span className="font-plex text-sm font-medium" style={{ color:"var(--ink)" }}>{b.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
