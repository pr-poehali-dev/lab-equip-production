import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { CONSUMABLES, NAV } from "@/components/lab/data";

export default function Consumables() {
  const navigate = useNavigate();

  const go = (id: string) => {
    if (id === "equipment") { navigate("/catalog"); return; }
    if (id === "consumables") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    navigate(`/#${id}`);
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'IBM Plex Sans', sans-serif", background:"var(--ink)" }}>

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
                style={{ color: n.id === "consumables" ? "var(--cyan-bright)" : "#9fb3c8" }}
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
        </div>
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
            <span className="font-plex text-xs tracking-[0.2em] uppercase" style={{ color:"var(--cyan)" }}>Расходные материалы</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h1 className="font-oswald font-semibold text-white leading-none"
              style={{ fontSize:"clamp(2.5rem,5vw,4.5rem)" }}>
              РАСХОДНЫЕ<br />МАТЕРИАЛЫ
            </h1>
            <p className="font-plex text-sm max-w-sm" style={{ color:"#6b8299", fontWeight:300 }}>
              Совместимые расходники к нашему и стороннему оборудованию. Склад в наличии. Поставка от 1 упаковки.
            </p>
          </div>
        </div>
      </div>

      {/* ── TABLE ── */}
      <div style={{ background:"var(--ink)", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-screen-xl mx-auto px-6 pb-24">

          {/* Header row */}
          <div className="hidden lg:grid grid-cols-4 gap-4 py-4 mb-2"
            style={{ borderBottom:"1px solid rgba(255,255,255,0.12)" }}>
            {["Наименование", "Материал / Состав", "Размеры / Чистота", "Фасовка"].map(h => (
              <span key={h} className="font-plex text-xs uppercase tracking-widest" style={{ color:"rgba(255,255,255,0.3)" }}>{h}</span>
            ))}
          </div>

          {CONSUMABLES.map((c, i) => (
            <div key={i}
              className="grid grid-cols-1 lg:grid-cols-4 gap-4 py-7 group transition-colors hover:bg-white/[0.03]"
              style={{ borderBottom:"1px solid rgba(255,255,255,0.06)" }}>

              {/* Mobile labels visible only on small screens */}
              <div>
                <p className="lg:hidden font-plex text-xs uppercase tracking-wider mb-1" style={{ color:"rgba(255,255,255,0.3)" }}>Наименование</p>
                <p className="font-oswald text-lg font-medium text-white leading-snug">{c.name}</p>
              </div>
              <div>
                <p className="lg:hidden font-plex text-xs uppercase tracking-wider mb-1 mt-2" style={{ color:"rgba(255,255,255,0.3)" }}>Материал</p>
                <p className="font-plex text-sm text-gray-300" style={{ fontWeight:300 }}>{c.mat}</p>
              </div>
              <div>
                <p className="lg:hidden font-plex text-xs uppercase tracking-wider mb-1 mt-2" style={{ color:"rgba(255,255,255,0.3)" }}>Размеры</p>
                <p className="font-plex text-sm text-gray-300" style={{ fontWeight:300 }}>{c.sizes}</p>
              </div>
              <div className="flex items-start justify-between lg:justify-start gap-4">
                <div>
                  <p className="lg:hidden font-plex text-xs uppercase tracking-wider mb-1 mt-2" style={{ color:"rgba(255,255,255,0.3)" }}>Фасовка</p>
                  <p className="font-plex text-sm font-semibold" style={{ color:"var(--cyan)" }}>{c.pack}</p>
                </div>
                <button
                  onClick={() => navigate("/#contacts")}
                  className="lg:hidden flex items-center gap-1.5 font-plex text-xs uppercase tracking-wider px-4 py-2 transition-all"
                  style={{ border:"1px solid rgba(26,158,192,0.4)", color:"var(--cyan)" }}>
                  Заказать
                </button>
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6 p-8"
            style={{ border:"1px solid rgba(26,158,192,0.2)", background:"rgba(26,158,192,0.04)" }}>
            <div className="flex-1">
              <p className="font-oswald text-xl text-white font-medium mb-1">Нет нужной позиции в списке?</p>
              <p className="font-plex text-sm" style={{ color:"#6b8299", fontWeight:300 }}>
                Подберём аналог или поставим под заказ. Среднее время ответа — 4 часа.
              </p>
            </div>
            <button onClick={() => navigate("/#contacts")}
              className="flex items-center gap-2 font-plex text-xs font-semibold uppercase tracking-wider px-8 py-4 transition-all hover:brightness-110 shrink-0"
              style={{ background:"var(--cyan)", color:"#fff" }}>
              Написать запрос
              <Icon name="ArrowRight" size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
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
