import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { CATEGORIES, EQUIPMENT, NAV } from "@/components/lab/data";

export default function Catalog() {
  const [cat,  setCat]  = useState("Все");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  const filtered = cat === "Все" ? EQUIPMENT : EQUIPMENT.filter(e => e.category === cat);

  const go = (id: string) => {
    setMenu(false);
    if (id === "equipment" || id === "consumables") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'IBM Plex Sans', sans-serif", background:"var(--sand)" }}>

      {/* ── NAVBAR ── */}
      <header style={{ background:"var(--ink)" }} className="fixed top-0 inset-x-0 z-50">
        <div className="max-w-screen-xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2.5">
            <div style={{ background:"var(--cyan)" }} className="w-7 h-7 flex items-center justify-center">
              <Icon name="FlaskConical" size={16} className="text-white" />
            </div>
            <span className="font-oswald text-white tracking-[0.2em] text-base font-medium">ЛАБПРОФ</span>
          </button>

          <nav className="hidden lg:flex items-center gap-0">
            {NAV.map(n => (
              <button key={n.id} onClick={() => go(n.id)}
                style={{ color: (n.id === "equipment") ? "var(--cyan-bright)" : "#9fb3c8" }}
                className="font-plex text-xs tracking-wider px-4 py-4 hover:text-white transition-colors uppercase">
                {n.label}
              </button>
            ))}
          </nav>

          <button onClick={() => navigate("/#contacts")}
            style={{ background:"var(--cyan)", color:"#fff" }}
            className="hidden lg:flex items-center gap-2 font-plex text-xs font-medium tracking-wider uppercase px-5 py-2.5 hover:brightness-110 transition-all">
            Получить КП
          </button>

          <button className="lg:hidden text-white" onClick={() => setMenu(!menu)}>
            <Icon name={menu ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menu && (
          <div style={{ background:"var(--ink-mid)", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
            {NAV.map(n => (
              <button key={n.id} onClick={() => go(n.id)}
                className="block w-full text-left px-6 py-3.5 font-plex text-sm text-gray-400 hover:text-white uppercase tracking-wide transition-colors">
                {n.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── PAGE HERO ── */}
      <div className="pt-14" style={{ background:"var(--ink)" }}>
        <div className="max-w-screen-xl mx-auto px-6 py-16">
          <button onClick={() => navigate("/")}
            className="flex items-center gap-2 font-plex text-xs uppercase tracking-wider mb-8 transition-colors"
            style={{ color:"#6b8299" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--cyan)")}
            onMouseLeave={e => (e.currentTarget.style.color = "#6b8299")}>
            <Icon name="ArrowLeft" size={14} />
            На главную
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8" style={{ background:"var(--cyan)" }} />
            <span className="font-plex text-xs tracking-[0.2em] uppercase" style={{ color:"var(--cyan)" }}>Каталог</span>
          </div>
          <h1 className="font-oswald font-semibold text-white leading-none"
            style={{ fontSize:"clamp(2.5rem,5vw,4.5rem)" }}>
            ОБОРУДОВАНИЕ
          </h1>
        </div>
      </div>

      {/* ── CATALOG ── */}
      <section id="equipment" className="py-16" style={{ background:"var(--sand)" }}>
        <div className="max-w-screen-xl mx-auto px-6">
          {/* Filter chips */}
          <div className="flex flex-wrap gap-2 mb-12">
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

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(item => (
              <div key={item.id} onClick={() => navigate(`/catalog/${item.id}`)}
                className="group cursor-pointer bg-white flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                style={{ border:"1px solid #e0e6ef" }}>

                {/* Product image */}
                <div className="relative overflow-hidden" style={{ aspectRatio:"16/9" }}>
                  <img
                    src={item.image}
                    alt={item.model}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background:"linear-gradient(180deg, transparent 40%, rgba(13,21,32,0.55) 100%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 px-5 py-3 flex items-end justify-between">
                    <span className="font-plex text-xs tracking-[0.2em] uppercase" style={{ color:"var(--cyan)" }}>{item.category}</span>
                    <Icon name="ChevronRight" size={14} style={{ color:"rgba(255,255,255,0.5)" }} />
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <p className="font-oswald text-2xl font-medium mb-2" style={{ color:"var(--ink)" }}>{item.model}</p>
                  <p className="font-plex text-xs leading-relaxed mb-6" style={{ color:"#7a8fa6", fontWeight:300 }}>{item.desc}</p>

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
                    Подробнее
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONSUMABLES PROMO ── */}
      <div style={{ background:"var(--ink-mid)", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto px-6 py-14 flex flex-col sm:flex-row items-start sm:items-center gap-8">
          <div className="w-12 h-12 flex items-center justify-center shrink-0"
            style={{ border:"1px solid rgba(26,158,192,0.3)" }}>
            <Icon name="Package" size={22} style={{ color:"var(--cyan)" }} />
          </div>
          <div className="flex-1">
            <p className="font-oswald text-xl text-white font-medium mb-1">Расходные материалы</p>
            <p className="font-plex text-sm" style={{ color:"#6b8299", fontWeight:300 }}>
              Стаканы ВК8, флюсы для сплавления, кольца, борная кислота и антисмачивающие агенты — всё в наличии на складе.
            </p>
          </div>
          <button onClick={() => navigate("/consumables")}
            className="flex items-center gap-2 font-plex text-xs font-semibold uppercase tracking-wider px-7 py-3.5 transition-all hover:brightness-110 shrink-0"
            style={{ background:"var(--cyan)", color:"#fff" }}>
            Перейти в раздел
            <Icon name="ArrowRight" size={14} />
          </button>
        </div>
      </div>

      {/* ── FOOTER MINIMAL ── */}
      <footer style={{ background:"var(--ink)", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-screen-xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between gap-3">
          <span className="font-plex text-xs" style={{ color:"#334d64" }}>© 2024 ЛабПроф. Все права защищены.</span>
          <button onClick={() => navigate("/")}
            className="flex items-center gap-1.5 font-plex text-xs transition-colors"
            style={{ color:"#4a6278" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--cyan)")}
            onMouseLeave={e => (e.currentTarget.style.color = "#4a6278")}>
            <Icon name="ArrowLeft" size={13} />
            На главную
          </button>
        </div>
      </footer>
    </div>
  );
}