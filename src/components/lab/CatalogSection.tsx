import Icon from "@/components/ui/icon";
import { CATEGORIES, CONSUMABLES, EQUIPMENT, Equipment } from "./data";

interface Props {
  cat: string;
  setCat: (v: string) => void;
  selected: Equipment | null;
  setSelected: (v: Equipment | null) => void;
}

export default function CatalogSection({ cat, setCat, selected, setSelected }: Props) {
  const filtered = cat === "Все" ? EQUIPMENT : EQUIPMENT.filter(e => e.category === cat);

  return (
    <>
      {/* ── CATALOG ── */}
      <section id="equipment" className="py-28" style={{ background:"var(--sand)" }}>
        <div className="max-w-screen-xl mx-auto px-6">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background:"var(--cyan)" }} />
                <span className="font-plex text-xs tracking-[0.2em] uppercase" style={{ color:"var(--cyan)" }}>Каталог</span>
              </div>
              <h2 className="font-oswald font-semibold leading-none" style={{ fontSize:"clamp(2.2rem,4vw,3.5rem)", color:"var(--ink)" }}>
                ОБОРУДОВАНИЕ
              </h2>
            </div>
            {/* Filter chips */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setCat(c)}
                  style={cat === c
                    ? { background:"var(--ink)", color:"#fff", border:"1px solid var(--ink)" }
                    : { background:"transparent", color:"var(--ink)", border:"1px solid #c8d0db" }}
                  className="font-plex text-xs uppercase tracking-wider px-5 py-2.5 transition-all hover:border-[var(--ink)]">
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(item => (
              <div key={item.id} onClick={() => setSelected(item)}
                className="group cursor-pointer bg-white flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                style={{ border:"1px solid #e0e6ef" }}>

                {/* Card header bar */}
                <div className="px-6 py-4 flex items-center justify-between"
                  style={{ background:"var(--ink)", borderBottom:"2px solid var(--cyan)" }}>
                  <span className="font-plex text-xs tracking-[0.2em] uppercase" style={{ color:"var(--cyan)" }}>{item.category}</span>
                  <Icon name="ChevronRight" size={15} style={{ color:"rgba(255,255,255,0.3)" }} />
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  <p className="font-oswald text-2xl font-medium mb-2" style={{ color:"var(--ink)" }}>{item.model}</p>
                  <p className="font-plex text-xs leading-relaxed mb-6" style={{ color:"#7a8fa6", fontWeight:300 }}>{item.desc}</p>

                  {/* 2 top specs */}
                  <div className="space-y-0 mt-auto">
                    {Object.entries(item.specs).slice(0,2).map(([k,v]) => (
                      <div key={k} className="flex justify-between py-2.5"
                        style={{ borderBottom:"1px dashed #dde4ed" }}>
                        <span className="font-plex text-xs" style={{ color:"#8fa0b4" }}>{k}</span>
                        <span className="font-plex text-xs font-semibold" style={{ color:"var(--ink)" }}>{v}</span>
                      </div>
                    ))}
                  </div>

                  <button className="mt-5 w-full font-plex text-xs uppercase tracking-widest py-3 transition-all"
                    style={{ border:"1px solid var(--cyan)", color:"var(--cyan)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="var(--cyan)"; (e.currentTarget as HTMLElement).style.color="#fff"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="transparent"; (e.currentTarget as HTMLElement).style.color="var(--cyan)"; }}>
                    Все характеристики
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODAL ── */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background:"rgba(13,21,32,0.8)", backdropFilter:"blur(4px)" }}
          onClick={() => setSelected(null)}>
          <div className="bg-white w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="px-8 py-6 flex items-start justify-between"
              style={{ background:"var(--ink)", borderBottom:"2px solid var(--cyan)" }}>
              <div>
                <p className="font-plex text-xs tracking-[0.2em] uppercase mb-1" style={{ color:"var(--cyan)" }}>{selected.category}</p>
                <h3 className="font-oswald text-3xl font-medium text-white">{selected.model}</h3>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white mt-1 transition-colors">
                <Icon name="X" size={20} />
              </button>
            </div>
            {/* Body */}
            <div className="p-8">
              <p className="font-plex text-sm mb-8" style={{ color:"#5a6e82", lineHeight:1.7, fontWeight:300 }}>{selected.desc}</p>
              <p className="font-oswald text-sm tracking-[0.15em] uppercase mb-5" style={{ color:"var(--ink)" }}>Технические характеристики</p>
              <div>
                {Object.entries(selected.specs).map(([k,v]) => (
                  <div key={k} className="flex justify-between py-3.5" style={{ borderBottom:"1px solid #edf0f5" }}>
                    <span className="font-plex text-sm" style={{ color:"#8096ad" }}>{k}</span>
                    <span className="font-plex text-sm font-semibold" style={{ color:"var(--ink)" }}>{v}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => { setSelected(null); document.getElementById("contacts")?.scrollIntoView({ behavior:"smooth" }); }}
                  className="flex-1 font-plex text-xs font-semibold uppercase tracking-wider py-4 transition-all hover:brightness-110"
                  style={{ background:"var(--cyan)", color:"#fff" }}>
                  Запросить цену
                </button>
                <button onClick={() => setSelected(null)}
                  className="flex-1 font-plex text-xs font-medium uppercase tracking-wider py-4 transition-all"
                  style={{ border:"1px solid #c8d0db", color:"#5a6e82" }}>
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CONSUMABLES ── */}
      <section id="consumables" className="py-28" style={{ background:"var(--ink)" }}>
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Label col */}
            <div className="lg:w-80 shrink-0">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background:"var(--cyan)" }} />
                <span className="font-plex text-xs tracking-[0.2em] uppercase" style={{ color:"var(--cyan)" }}>Расходники</span>
              </div>
              <h2 className="font-oswald font-semibold text-white leading-tight mb-6"
                style={{ fontSize:"clamp(2rem,3vw,2.8rem)" }}>
                РАСХОДНЫЕ<br />МАТЕРИАЛЫ
              </h2>
              <p className="font-plex text-sm leading-relaxed" style={{ color:"#6b8299", fontWeight:300 }}>
                Совместимые расходники к нашему и стороннему оборудованию. Склад. Поставка от 1 упаковки.
              </p>
              <button onClick={() => document.getElementById("contacts")?.scrollIntoView({ behavior:"smooth" })}
                className="mt-8 flex items-center gap-2 font-plex text-xs uppercase tracking-wider py-3.5 px-7 transition-all"
                style={{ border:"1px solid rgba(26,158,192,0.5)", color:"var(--cyan)" }}>
                Уточнить наличие
                <Icon name="ArrowRight" size={14} />
              </button>
            </div>

            {/* Table */}
            <div className="flex-1" style={{ borderTop:"1px solid rgba(255,255,255,0.07)" }}>
              {CONSUMABLES.map((c,i) => (
                <div key={i} className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-6 group transition-colors"
                  style={{ borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
                  <div>
                    <p className="font-plex text-xs uppercase tracking-wider mb-1.5" style={{ color:"rgba(255,255,255,0.3)" }}>Наименование</p>
                    <p className="font-oswald text-base font-medium text-white">{c.name}</p>
                  </div>
                  <div>
                    <p className="font-plex text-xs uppercase tracking-wider mb-1.5" style={{ color:"rgba(255,255,255,0.3)" }}>Материал</p>
                    <p className="font-plex text-sm text-gray-300" style={{ fontWeight:300 }}>{c.mat}</p>
                  </div>
                  <div>
                    <p className="font-plex text-xs uppercase tracking-wider mb-1.5" style={{ color:"rgba(255,255,255,0.3)" }}>Размеры</p>
                    <p className="font-plex text-sm text-gray-300" style={{ fontWeight:300 }}>{c.sizes}</p>
                  </div>
                  <div>
                    <p className="font-plex text-xs uppercase tracking-wider mb-1.5" style={{ color:"rgba(255,255,255,0.3)" }}>Фасовка</p>
                    <p className="font-plex text-sm font-semibold" style={{ color:"var(--cyan)" }}>{c.pack}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
