import { useState } from "react";
import Icon from "@/components/ui/icon";
import { ARTICLES, VIDEOS } from "./data";

export default function KnowledgeContactsSection() {
  const [kbTab, setKbTab] = useState<"articles"|"videos">("articles");

  return (
    <>
      {/* ── KNOWLEDGE ── */}
      <section id="knowledge" className="py-28" style={{ background:"var(--warm-white)" }}>
        <div className="max-w-screen-xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background:"var(--cyan)" }} />
            <span className="font-plex text-xs tracking-[0.2em] uppercase" style={{ color:"var(--cyan)" }}>База знаний</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <h2 className="font-oswald font-semibold leading-tight" style={{ fontSize:"clamp(2rem,3.5vw,3rem)", color:"var(--ink)" }}>
              МЕТОДИЧЕСКИЕ<br />МАТЕРИАЛЫ
            </h2>
            <p className="font-plex text-sm max-w-xs" style={{ color:"#6b7f94", fontWeight:300 }}>
              Протоколы, статьи и видеоуроки для специалистов аналитических лабораторий.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex mb-10" style={{ borderBottom:"1px solid #e0e6ef" }}>
            {([["articles","Статьи","FileText"],["videos","Видео","PlayCircle"]] as const).map(([id, label, icon]) => (
              <button key={id} onClick={() => setKbTab(id)}
                className="flex items-center gap-2 font-plex text-sm font-medium px-8 py-3.5 transition-all uppercase tracking-wider"
                style={kbTab === id
                  ? { color:"var(--ink)", borderBottom:"2px solid var(--cyan)", marginBottom:"-1px" }
                  : { color:"#9fb3c8", borderBottom:"2px solid transparent", marginBottom:"-1px" }}>
                <Icon name={icon} size={15} fallback="File" />
                {label}
              </button>
            ))}
          </div>

          {/* Articles tab */}
          {kbTab === "articles" && (
            <div className="grid md:grid-cols-2 gap-6">
              {ARTICLES.map((a,i) => (
                <div key={i} className="group flex gap-6 p-7 cursor-pointer transition-all hover:shadow-lg bg-white"
                  style={{ border:"1px solid #e0e6ef" }}>
                  <div className="w-11 h-11 shrink-0 flex items-center justify-center"
                    style={{ border:"1px solid #e0e6ef" }}>
                    <Icon name={a.icon} size={20} fallback="FileText" style={{ color:"var(--cyan)" }} />
                  </div>
                  <div>
                    <p className="font-plex text-xs mb-2" style={{ color:"#9fb3c8" }}>{a.date}</p>
                    <h3 className="font-plex text-sm font-semibold mb-2 leading-snug" style={{ color:"var(--ink)" }}>{a.title}</h3>
                    <p className="font-plex text-xs leading-relaxed mb-4" style={{ color:"#6b7f94", fontWeight:300 }}>{a.text}</p>
                    <div className="flex items-center gap-1.5 font-plex text-xs uppercase tracking-wider transition-all group-hover:gap-2.5"
                      style={{ color:"var(--cyan)" }}>
                      Читать <Icon name="ArrowRight" size={13} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Videos tab */}
          {kbTab === "videos" && (
            <div className="grid md:grid-cols-2 gap-6">
              {VIDEOS.map((v,i) => (
                <div key={i} className="group cursor-pointer transition-all hover:shadow-lg bg-white"
                  style={{ border:"1px solid #e0e6ef" }}>
                  {/* Thumbnail placeholder */}
                  <div className="relative flex items-center justify-center"
                    style={{ background:"var(--ink)", aspectRatio:"16/7" }}>
                    <div className="absolute inset-0 grid-bg opacity-60" />
                    {/* Play button */}
                    <div className="relative z-10 w-14 h-14 flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ border:"2px solid var(--cyan)", borderRadius:"50%" }}>
                      <Icon name="Play" size={22} style={{ color:"var(--cyan)", marginLeft:"3px" }} />
                    </div>
                    {/* Duration badge */}
                    <div className="absolute bottom-3 right-4 font-plex text-xs font-semibold px-2 py-0.5"
                      style={{ background:"rgba(13,21,32,0.85)", color:"var(--cyan)", border:"1px solid rgba(26,158,192,0.3)" }}>
                      {v.duration}
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-6">
                    <p className="font-plex text-xs mb-2" style={{ color:"#9fb3c8" }}>{v.date}</p>
                    <h3 className="font-plex text-sm font-semibold mb-2 leading-snug" style={{ color:"var(--ink)" }}>{v.title}</h3>
                    <p className="font-plex text-xs leading-relaxed mb-4" style={{ color:"#6b7f94", fontWeight:300 }}>{v.text}</p>
                    <div className="flex items-center gap-1.5 font-plex text-xs uppercase tracking-wider transition-all group-hover:gap-2.5"
                      style={{ color:"var(--cyan)" }}>
                      Смотреть <Icon name="ArrowRight" size={13} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section id="contacts" className="py-28" style={{ background:"var(--sand)" }}>
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background:"var(--cyan)" }} />
            <span className="font-plex text-xs tracking-[0.2em] uppercase" style={{ color:"var(--cyan)" }}>Контакты</span>
          </div>
          <h2 className="font-oswald font-semibold mb-14" style={{ fontSize:"clamp(2rem,3.5vw,3rem)", color:"var(--ink)" }}>
            СВЯЗАТЬСЯ С НАМИ
          </h2>

          <div className="grid lg:grid-cols-3 gap-6 mb-14">
            {[
              { icon:"Phone",  t:"Телефон",  v:"+7 (495) 000-00-00", s:"Пн–Пт, 9:00–18:00 МСК" },
              { icon:"Mail",   t:"E-mail",   v:"info@labprof.ru",     s:"Ответ в течение 4 часов" },
              { icon:"MapPin", t:"Адрес",    v:"г. Москва, ул. Лабораторная, 1", s:"Шоу-рум по записи" },
            ].map((c,i) => (
              <div key={i} className="p-8 bg-white" style={{ border:"1px solid #dde4ed", borderTop:"3px solid var(--cyan)" }}>
                <div className="w-10 h-10 flex items-center justify-center mb-6"
                  style={{ background:"var(--ink)" }}>
                  <Icon name={c.icon} size={17} style={{ color:"var(--cyan)" }} fallback="Info" />
                </div>
                <p className="font-plex text-xs uppercase tracking-wider mb-1" style={{ color:"#9fb3c8" }}>{c.t}</p>
                <p className="font-plex text-base font-semibold mb-1" style={{ color:"var(--ink)" }}>{c.v}</p>
                <p className="font-plex text-xs" style={{ color:"#7a8fa6", fontWeight:300 }}>{c.s}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="bg-white p-10 max-w-2xl" style={{ border:"1px solid #dde4ed" }}>
            <h3 className="font-oswald text-xl font-semibold mb-8" style={{ color:"var(--ink)", letterSpacing:"0.05em" }}>
              ЗАПРОС КОММЕРЧЕСКОГО ПРЕДЛОЖЕНИЯ
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              {[
                { l:"Организация",     p:"ООО «Название»",       t:"text" },
                { l:"Контактное лицо", p:"Иванов Иван Иванович", t:"text" },
                { l:"Телефон",         p:"+7 (___) ___-__-__",   t:"tel"  },
                { l:"E-mail",          p:"mail@company.ru",       t:"email"},
              ].map((f,i) => (
                <div key={i}>
                  <label className="font-plex text-xs uppercase tracking-wider mb-2 block" style={{ color:"#8096ad" }}>{f.l}</label>
                  <input type={f.t} placeholder={f.p}
                    className="w-full outline-none font-plex text-sm px-4 py-3.5 transition-colors"
                    style={{ border:"1px solid #dde4ed", color:"var(--ink)" }}
                    onFocus={e => (e.currentTarget.style.borderColor = "var(--cyan)")}
                    onBlur={e  => (e.currentTarget.style.borderColor = "#dde4ed")} />
                </div>
              ))}
            </div>
            <div className="mb-7">
              <label className="font-plex text-xs uppercase tracking-wider mb-2 block" style={{ color:"#8096ad" }}>Вопрос / оборудование</label>
              <textarea rows={4} placeholder="Опишите, что вас интересует…"
                className="w-full outline-none font-plex text-sm px-4 py-3.5 resize-none transition-colors"
                style={{ border:"1px solid #dde4ed", color:"var(--ink)" }}
                onFocus={e => (e.currentTarget.style.borderColor = "var(--cyan)")}
                onBlur={e  => (e.currentTarget.style.borderColor = "#dde4ed")} />
            </div>
            <button className="w-full font-plex text-xs font-semibold uppercase tracking-[0.15em] transition-all hover:brightness-110"
              style={{ background:"var(--ink)", color:"#fff", padding:"1.1rem" }}>
              ОТПРАВИТЬ ЗАПРОС
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:"var(--ink)", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-screen-xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-10 pb-12" style={{ borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div style={{ background:"var(--cyan)" }} className="w-7 h-7 flex items-center justify-center">
                  <Icon name="FlaskConical" size={15} className="text-white" />
                </div>
                <span className="font-oswald text-white tracking-[0.2em] text-base">ЛАБПРОФ</span>
              </div>
              <p className="font-plex text-xs leading-relaxed" style={{ color:"#4a6278", fontWeight:300 }}>
                Производство лабораторного оборудования для пробоподготовки с 2008 года.
              </p>
            </div>
            {[
              { title:"Продукция",  links:["Центрифуги","Фильтровальные установки","Системы экстракции","Пробоотборники","Расходные материалы"] },
              { title:"Сервис",     links:["Гарантийный ремонт","Метрологическая поверка","Обучение персонала","Шеф-монтаж"] },
              { title:"Компания",   links:["О компании","Сертификаты","База знаний","Контакты"] },
            ].map((col,i) => (
              <div key={i}>
                <h4 className="font-oswald text-white text-xs tracking-[0.2em] uppercase mb-5">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map(l => (
                    <li key={l}><a href="#" className="font-plex text-xs transition-colors" style={{ color:"#4a6278" }}
                      onMouseEnter={e => (e.currentTarget.style.color="var(--cyan)")}
                      onMouseLeave={e => (e.currentTarget.style.color="#4a6278")}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 flex flex-col sm:flex-row justify-between gap-3">
            <span className="font-plex text-xs" style={{ color:"#334d64" }}>© 2024 ЛабПроф. Все права защищены.</span>
            <span className="font-plex text-xs" style={{ color:"#334d64" }}>ИНН 7700000000 · ОГРН 1080000000000</span>
          </div>
        </div>
      </footer>
    </>
  );
}
