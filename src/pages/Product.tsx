import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { EQUIPMENT, NAV, CATEGORY_INFO } from "@/components/lab/data";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = EQUIPMENT.find(e => e.id === Number(id));
  const [activeImg, setActiveImg] = useState(0);
  const [openFaq,   setOpenFaq]   = useState<number | null>(null);

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

  const gallery = item.gallery && item.gallery.length > 0 ? item.gallery : [item.image];
  const related = EQUIPMENT.filter(e => e.category === item.category && e.id !== item.id).slice(0, 3);

  const prev = () => setActiveImg(i => (i - 1 + gallery.length) % gallery.length);
  const next = () => setActiveImg(i => (i + 1) % gallery.length);

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
              <button key={n.id}
                onClick={() => n.id === "equipment" ? navigate("/catalog") : n.id === "consumables" ? navigate("/consumables") : navigate(`/#${n.id}`)}
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

      {/* ── MAIN CONTENT ── */}
      <div className="pt-14">
        <div className="max-w-screen-xl mx-auto px-6 py-10">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <button onClick={() => navigate("/")} className="font-plex text-xs transition-colors"
              style={{ color:"#9fb3c8" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--cyan)")}
              onMouseLeave={e => (e.currentTarget.style.color = "#9fb3c8")}>
              Главная
            </button>
            <Icon name="ChevronRight" size={12} style={{ color:"#c8d4de" }} />
            <button onClick={() => navigate("/catalog")} className="font-plex text-xs transition-colors"
              style={{ color:"#9fb3c8" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--cyan)")}
              onMouseLeave={e => (e.currentTarget.style.color = "#9fb3c8")}>
              Каталог
            </button>
            <Icon name="ChevronRight" size={12} style={{ color:"#c8d4de" }} />
            <span className="font-plex text-xs" style={{ color:"var(--ink)" }}>{item.model}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-10">

            {/* ── LEFT: GALLERY ── */}
            <div className="lg:col-span-7">

              {/* Main image */}
              <div className="relative overflow-hidden group" style={{ background:"var(--ink)", aspectRatio:"4/3" }}>
                <img
                  key={activeImg}
                  src={gallery[activeImg]}
                  alt={item.model}
                  className="w-full h-full object-cover"
                  style={{ animation:"galleryFade 0.35s ease" }}
                />
                {/* strong gradient overlay bottom */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background:"linear-gradient(180deg, rgba(13,21,32,0.1) 0%, rgba(13,21,32,0.0) 40%, rgba(13,21,32,0.55) 100%)" }} />

                {/* Category + model name over image */}
                <div className="absolute bottom-0 left-0 right-0 px-7 pb-7">
                  <span className="font-plex text-xs tracking-[0.2em] uppercase block mb-1" style={{ color:"var(--cyan)" }}>
                    {item.category}
                  </span>
                  <h1 className="font-oswald text-white font-semibold leading-none"
                    style={{ fontSize:"clamp(2rem,4vw,3rem)" }}>
                    {item.model}
                  </h1>
                </div>

                {/* Nav arrows — only if gallery > 1 */}
                {gallery.length > 1 && (
                  <>
                    <button onClick={prev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                      style={{ background:"rgba(13,21,32,0.7)", border:"1px solid rgba(255,255,255,0.15)" }}>
                      <Icon name="ChevronLeft" size={18} className="text-white" />
                    </button>
                    <button onClick={next}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                      style={{ background:"rgba(13,21,32,0.7)", border:"1px solid rgba(255,255,255,0.15)" }}>
                      <Icon name="ChevronRight" size={18} className="text-white" />
                    </button>
                    {/* Dots */}
                    <div className="absolute bottom-4 right-6 flex gap-1.5">
                      {gallery.map((_, i) => (
                        <button key={i} onClick={() => setActiveImg(i)}
                          className="w-1.5 h-1.5 transition-all"
                          style={{
                            background: i === activeImg ? "var(--cyan)" : "rgba(255,255,255,0.4)",
                            borderRadius: "50%",
                            transform: i === activeImg ? "scale(1.3)" : "scale(1)",
                          }} />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div className="flex gap-3 mt-3">
                  {gallery.map((src, i) => (
                    <button key={i} onClick={() => setActiveImg(i)}
                      className="relative overflow-hidden flex-shrink-0 transition-all"
                      style={{
                        width:"80px", height:"60px",
                        border: i === activeImg ? "2px solid var(--cyan)" : "2px solid transparent",
                        opacity: i === activeImg ? 1 : 0.55,
                      }}
                      onMouseEnter={e => { if (i !== activeImg) (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
                      onMouseLeave={e => { if (i !== activeImg) (e.currentTarget as HTMLElement).style.opacity = "0.55"; }}>
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Description */}
              <p className="font-plex text-base leading-relaxed mt-8 mb-10" style={{ color:"#4a5568", fontWeight:300 }}>
                {item.desc}
              </p>

              {/* Specs table */}
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background:"var(--cyan)" }} />
                <span className="font-oswald text-sm tracking-[0.15em] uppercase" style={{ color:"var(--ink)" }}>
                  Технические характеристики
                </span>
              </div>
              <div style={{ border:"1px solid #e0e6ef" }}>
                {Object.entries(item.specs).map(([k, v], i, arr) => (
                  <div key={k} className="flex"
                    style={{ borderBottom: i < arr.length - 1 ? "1px solid #e0e6ef" : "none" }}>
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

            {/* ── RIGHT: CTA ── */}
            <div className="lg:col-span-5">
              <div className="sticky top-20">
                <div style={{ border:"1px solid #e0e6ef", borderTop:"3px solid var(--cyan)" }}>
                  <div className="p-7 bg-white">
                    <p className="font-oswald text-xl font-semibold mb-1" style={{ color:"var(--ink)" }}>
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
                    {[
                      { icon:"ShieldCheck", text:"Гарантия 12 месяцев" },
                      { icon:"Wrench",      text:"Сервис производителя" },
                      { icon:"Truck",       text:"Доставка по всей России" },
                      { icon:"GraduationCap", text:"Обучение персонала" },
                    ].map((b, i) => (
                      <div key={i} className={`flex items-center gap-3 ${i < 3 ? "mb-3" : ""}`}>
                        <Icon name={b.icon} size={15} style={{ color:"var(--cyan)" }} fallback="Check" />
                        <span className="font-plex text-xs" style={{ color:"#4a5568" }}>{b.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── CATEGORY INFO: Benefits / Applications / FAQ ── */}
          {CATEGORY_INFO[item.category] && (() => {
            const info = CATEGORY_INFO[item.category];
            return (
              <div className="mt-20 space-y-16">

                {/* Benefits */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-px w-8" style={{ background:"var(--cyan)" }} />
                    <span className="font-oswald text-sm tracking-[0.15em] uppercase" style={{ color:"var(--ink)" }}>
                      Преимущества
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {info.benefits.map((b, i) => (
                      <div key={i} className="p-6 bg-white" style={{ border:"1px solid #e0e6ef", borderTop:"3px solid var(--cyan)" }}>
                        <div className="w-10 h-10 flex items-center justify-center mb-4"
                          style={{ background:"var(--sand)" }}>
                          <Icon name={b.icon} size={20} style={{ color:"var(--cyan)" }} fallback="Check" />
                        </div>
                        <p className="font-oswald text-base font-medium mb-2" style={{ color:"var(--ink)" }}>{b.title}</p>
                        <p className="font-plex text-xs leading-relaxed" style={{ color:"#6b7f94", fontWeight:300 }}>{b.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Applications */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-px w-8" style={{ background:"var(--cyan)" }} />
                    <span className="font-oswald text-sm tracking-[0.15em] uppercase" style={{ color:"var(--ink)" }}>
                      Область применения
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {info.applications.map((a, i) => (
                      <div key={i} className="flex gap-4 p-5 bg-white"
                        style={{ border:"1px solid #e0e6ef", borderLeft:"3px solid var(--cyan)" }}>
                        <div>
                          <p className="font-plex text-sm font-semibold mb-1" style={{ color:"var(--ink)" }}>{a.label}</p>
                          <p className="font-plex text-xs leading-relaxed" style={{ color:"#6b7f94", fontWeight:300 }}>{a.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQ */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-px w-8" style={{ background:"var(--cyan)" }} />
                    <span className="font-oswald text-sm tracking-[0.15em] uppercase" style={{ color:"var(--ink)" }}>
                      Вопросы и ответы
                    </span>
                  </div>
                  <div className="space-y-2">
                    {info.faq.map((f, i) => (
                      <div key={i} style={{ border:"1px solid #e0e6ef", background:"white" }}>
                        <button
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="w-full flex items-center justify-between px-7 py-5 text-left transition-colors"
                          style={{ background: openFaq === i ? "var(--sand)" : "white" }}>
                          <span className="font-plex text-sm font-semibold pr-8" style={{ color:"var(--ink)" }}>{f.q}</span>
                          <div className="shrink-0 w-7 h-7 flex items-center justify-center transition-transform"
                            style={{
                              border:"1px solid #dde4ed",
                              transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                            }}>
                            <Icon name="Plus" size={14} style={{ color:"var(--cyan)" }} />
                          </div>
                        </button>
                        {openFaq === i && (
                          <div className="px-7 pb-6" style={{ borderTop:"1px solid #e0e6ef", background:"var(--sand)" }}>
                            <p className="font-plex text-sm leading-relaxed pt-4" style={{ color:"#4a5568", fontWeight:300 }}>
                              {f.a}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })()}

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
                  <div key={r.id} onClick={() => { navigate(`/catalog/${r.id}`); setActiveImg(0); }}
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

      <style>{`
        @keyframes galleryFade {
          from { opacity: 0; transform: scale(1.02); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}