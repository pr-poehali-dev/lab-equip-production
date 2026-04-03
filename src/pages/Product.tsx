import { useParams, useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { EQUIPMENT, NAV } from "@/components/lab/data";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = EQUIPMENT.find(e => e.id === Number(id));

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background:"var(--ink)" }}>
        <div className="text-center">
          <p className="font-oswald text-white text-2xl mb-4">Продукт не найден</p>
          <button onClick={() => navigate("/catalog")} style={{ color:"var(--cyan)" }} className="font-plex text-sm">
            ← Вернуться в каталог
          </button>
        </div>
      </div>
    );
  }

  const related = EQUIPMENT.filter(e => e.category === item.category && e.id !== item.id).slice(0, 3);

  return (
    <div className="min-h-screen" style={{ fontFamily:"'IBM Plex Sans', sans-serif", background:"var(--warm-white)" }}>

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
              <button key={n.id} onClick={() => n.id === "equipment" ? navigate("/catalog") : navigate(`/#${n.id}`)}
                style={{ color: n.id === "equipment" ? "var(--cyan-bright)" : "#9fb3c8" }}
                className="font-plex text-xs tracking-wider px-4 py-4 hover:text-white transition-colors uppercase">
                {n.label}
              </button>
            ))}
          </nav>
          <button onClick={() => navigate("/#contacts")}
            style={{ background:"var(--cyan)", color:"#fff" }}
            className="hidden lg:flex font-plex text-xs font-medium tracking-wider uppercase px-5 py-2.5 hover:brightness-110 transition-all">
            Получить КП
          </button>
        </div>
      </header>

      {/* ── HERO IMAGE ── */}
      <div className="pt-14 relative overflow-hidden" style={{ background:"var(--ink)" }}>
        {/* breadcrumb */}
        <div className="absolute top-[3.5rem] left-0 right-0 z-10 max-w-screen-xl mx-auto px-6 py-4 flex items-center gap-2">
          <button onClick={() => navigate("/")} className="font-plex text-xs transition-colors"
            style={{ color:"#4a6278" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--cyan)")}
            onMouseLeave={e => (e.currentTarget.style.color = "#4a6278")}>
            Главная
          </button>
          <Icon name="ChevronRight" size={12} style={{ color:"#334d64" }} />
          <button onClick={() => navigate("/catalog")} className="font-plex text-xs transition-colors"
            style={{ color:"#4a6278" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--cyan)")}
            onMouseLeave={e => (e.currentTarget.style.color = "#4a6278")}>
            Каталог
          </button>
          <Icon name="ChevronRight" size={12} style={{ color:"#334d64" }} />
          <span className="font-plex text-xs" style={{ color:"var(--cyan)" }}>{item.model}</span>
        </div>

        <div className="relative" style={{ aspectRatio:"21/9", maxHeight:"520px" }}>
          <img src={item.image} alt={item.model} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0" style={{ background:"linear-gradient(90deg, var(--ink) 0%, rgba(13,21,32,0.6) 50%, transparent 100%)" }} />
          <div className="absolute inset-0 grid-bg opacity-30" />
        </div>

        {/* Title overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-screen-xl mx-auto px-6 pb-12 w-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8" style={{ background:"var(--cyan)" }} />
              <span className="font-plex text-xs tracking-[0.2em] uppercase" style={{ color:"var(--cyan)" }}>{item.category}</span>
            </div>
            <h1 className="font-oswald font-semibold text-white" style={{ fontSize:"clamp(2.5rem,6vw,5rem)", lineHeight:1 }}>
              {item.model}
            </h1>
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-screen-xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Left: description + specs */}
          <div className="lg:col-span-2">
            <p className="font-plex text-base leading-relaxed mb-12" style={{ color:"#4a5568", fontWeight:300 }}>
              {item.desc}
            </p>

            {/* Specs table */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ background:"var(--cyan)" }} />
              <span className="font-oswald text-sm tracking-[0.15em] uppercase" style={{ color:"var(--ink)" }}>
                Технические характеристики
              </span>
            </div>
            <div style={{ border:"1px solid #e0e6ef" }}>
              {Object.entries(item.specs).map(([k, v], i) => (
                <div key={k} className="flex"
                  style={{ borderBottom: i < Object.entries(item.specs).length - 1 ? "1px solid #e0e6ef" : "none" }}>
                  <div className="w-1/2 px-6 py-4" style={{ background:"var(--sand)", borderRight:"1px solid #e0e6ef" }}>
                    <span className="font-plex text-sm" style={{ color:"#6b7f94" }}>{k}</span>
                  </div>
                  <div className="w-1/2 px-6 py-4">
                    <span className="font-plex text-sm font-semibold" style={{ color:"var(--ink)" }}>{v}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: CTA card */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div style={{ border:"1px solid #e0e6ef", borderTop:"3px solid var(--cyan)" }}>
                <div className="p-7" style={{ background:"white" }}>
                  <p className="font-oswald text-lg font-semibold mb-1" style={{ color:"var(--ink)" }}>
                    Запросить коммерческое предложение
                  </p>
                  <p className="font-plex text-xs mb-6" style={{ color:"#8096ad", fontWeight:300 }}>
                    Ответим в течение 4 рабочих часов. Укажем актуальную цену и сроки поставки.
                  </p>
                  <button onClick={() => navigate("/#contacts")}
                    className="w-full font-plex text-xs font-semibold uppercase tracking-wider py-4 mb-3 transition-all hover:brightness-110"
                    style={{ background:"var(--cyan)", color:"#fff" }}>
                    Запросить КП
                  </button>
                  <button onClick={() => navigate("/catalog")}
                    className="w-full font-plex text-xs font-medium uppercase tracking-wider py-4 transition-all"
                    style={{ border:"1px solid #dde4ed", color:"#6b7f94" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--ink)")}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = "#dde4ed")}>
                    ← Назад в каталог
                  </button>
                </div>
                <div className="px-7 py-5" style={{ background:"var(--sand)", borderTop:"1px solid #e0e6ef" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <Icon name="ShieldCheck" size={15} style={{ color:"var(--cyan)" }} />
                    <span className="font-plex text-xs" style={{ color:"#4a5568" }}>Гарантия 12 месяцев</span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <Icon name="Wrench" size={15} style={{ color:"var(--cyan)" }} />
                    <span className="font-plex text-xs" style={{ color:"#4a5568" }}>Сервис производителя</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Truck" size={15} style={{ color:"var(--cyan)" }} />
                    <span className="font-plex text-xs" style={{ color:"#4a5568" }}>Доставка по всей России</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RELATED ── */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8" style={{ background:"var(--cyan)" }} />
              <span className="font-oswald text-sm tracking-[0.15em] uppercase" style={{ color:"var(--ink)" }}>
                Другие модели в категории
              </span>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map(r => (
                <div key={r.id} onClick={() => navigate(`/catalog/${r.id}`)}
                  className="group cursor-pointer bg-white transition-all hover:-translate-y-1 hover:shadow-lg"
                  style={{ border:"1px solid #e0e6ef" }}>
                  <div className="relative overflow-hidden" style={{ aspectRatio:"16/9" }}>
                    <img src={r.image} alt={r.model} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background:"rgba(13,21,32,0.3)" }} />
                  </div>
                  <div className="p-5">
                    <p className="font-oswald text-xl font-medium mb-1" style={{ color:"var(--ink)" }}>{r.model}</p>
                    <p className="font-plex text-xs" style={{ color:"#8096ad", fontWeight:300 }}>{r.desc.slice(0, 70)}…</p>
                    <div className="mt-3 flex items-center gap-1 font-plex text-xs uppercase tracking-wider transition-all group-hover:gap-2"
                      style={{ color:"var(--cyan)" }}>
                      Подробнее <Icon name="ArrowRight" size={12} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background:"var(--ink)", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-screen-xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between gap-3">
          <span className="font-plex text-xs" style={{ color:"#334d64" }}>© 2024 ЛабПроф. Все права защищены.</span>
          <button onClick={() => navigate("/catalog")}
            className="flex items-center gap-1.5 font-plex text-xs transition-colors"
            style={{ color:"#4a6278" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--cyan)")}
            onMouseLeave={e => (e.currentTarget.style.color = "#4a6278")}>
            <Icon name="ArrowLeft" size={13} />
            В каталог
          </button>
        </div>
      </footer>
    </div>
  );
}
