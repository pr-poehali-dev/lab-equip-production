import { useState } from "react";
import Icon from "@/components/ui/icon";

/* ─── DATA ──────────────────────────────────────────────── */

const NAV = [
  { id: "home",        label: "Главная" },
  { id: "about",       label: "О компании" },
  { id: "equipment",   label: "Оборудование" },
  { id: "consumables", label: "Расходные материалы" },
  { id: "knowledge",   label: "База знаний" },
  { id: "contacts",    label: "Контакты" },
];

const CATEGORIES = ["Все", "Центрифуги", "Фильтрация", "Экстракция", "Пробоотборники"];

interface Equipment {
  id: number;
  category: string;
  model: string;
  desc: string;
  specs: Record<string, string>;
}

const EQUIPMENT: Equipment[] = [
  { id:1, category:"Центрифуги",      model:"ЦЛ-2400П",  desc:"Рефрижераторная центрифуга для пробоподготовки биоматериала",                specs:{"Макс. скорость":"24 000 об/мин","Объём ротора":"4 × 250 мл","Температура":"-20°C…+40°C","Шум":"≤ 58 дБ"} },
  { id:2, category:"Центрифуги",      model:"МЦ-14000М", desc:"Микроцентрифуга для молекулярно-биологических исследований",                  specs:{"Макс. скорость":"14 000 об/мин","Объём ротора":"12 × 2 мл","Масса":"4.2 кг","Питание":"220 В / 50 Гц"} },
  { id:3, category:"Фильтрация",      model:"ФВУ-100",   desc:"Вакуумная фильтровальная установка для анализа жидких проб",                   specs:{"Производит.":"до 100 л/ч","Давление":"0.08–0.095 МПа","Фильтр":"47 / 90 мм","Материал":"Боросиликат"} },
  { id:4, category:"Фильтрация",      model:"МФУ-25С",   desc:"Мембранная установка из нержавеющей стали для агрессивных сред",              specs:{"Размер пор":"0.1–10 мкм","Объём воронки":"250 мл","Материал":"AISI 316L","Давление":"до 0.5 МПа"} },
  { id:5, category:"Экстракция",      model:"ЭЛ-6П",     desc:"Параллельный экстрактор на 6 ячеек для ускоренной пробоподготовки",            specs:{"Ячеек":"6","Объём ячейки":"50 мл","Давление":"1–100 атм","Нагрев":"до 200°C"} },
  { id:6, category:"Пробоотборники",  model:"ПА-03М",    desc:"Автоматический пробоотборник с программным управлением и USB-интерфейсом",     specs:{"Объём пробы":"0.5–10 мл","Флаконов":"48","Точность":"±0.5%","Интерфейс":"RS-232 / USB"} },
];

const CONSUMABLES = [
  { name:"Фильтры мембранные",    mat:"PTFE, PVDF, нейлон",  sizes:"0.22; 0.45; 1.0 мкм",  pack:"100 шт." },
  { name:"Пробирки центрифужные", mat:"Полипропилен",         sizes:"1.5; 2; 15; 50 мл",    pack:"500 шт." },
  { name:"Шприцевые фильтры",     mat:"Нейлон / PTFE / ПЭС", sizes:"13; 25; 33 мм",        pack:"100 шт." },
  { name:"Флаконы для проб",      mat:"Стекло / ПЭТ",        sizes:"10–250 мл",            pack:"по запросу" },
];

const ARTICLES = [
  { icon:"BookOpen",  date:"15 марта 2024",    title:"Подготовка биопроб к ПЦР-анализу",                    text:"Пошаговый протокол экстракции нуклеиновых кислот с центрифугированием и колоночной очисткой." },
  { icon:"Droplets",  date:"2 февраля 2024",   title:"Выбор мембранного фильтра для анализа воды",           text:"Сравнительный обзор PTFE, PVDF и нейлоновых мембран для контроля качества воды." },
  { icon:"Settings",  date:"20 января 2024",   title:"ТО лабораторных центрифуг: регламент",                 text:"Периодичность балансировки роторов, замены уплотнений и проверки тахометра." },
  { icon:"BarChart2", date:"10 января 2024",   title:"Методы ускоренной экстракции органики",                text:"Сравнение PLE, MAE и ультразвуковой экстракции по производительности и расходу растворителей." },
];

const TICKER_ITEMS = ["ЦЕНТРИФУГИ", "ФИЛЬТРАЦИЯ", "ЭКСТРАКЦИЯ", "ПРОБООТБОРНИКИ", "РАСХОДНЫЕ МАТЕРИАЛЫ", "МЕТРОЛОГИЧЕСКАЯ ПОВЕРКА", "ПРОИЗВОДСТВО РОССИЯ"];

/* ─── COMPONENT ─────────────────────────────────────────── */

export default function Index() {
  const [active,   setActive]   = useState("home");
  const [cat,      setCat]      = useState("Все");
  const [menu,     setMenu]     = useState(false);
  const [selected, setSelected] = useState<Equipment | null>(null);

  const go = (id: string) => {
    setActive(id); setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const filtered = cat === "Все" ? EQUIPMENT : EQUIPMENT.filter(e => e.category === cat);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'IBM Plex Sans', sans-serif", background:"var(--warm-white)" }}>

      {/* ── NAVBAR ── */}
      <header style={{ background:"var(--ink)" }} className="fixed top-0 inset-x-0 z-50">
        <div className="max-w-screen-xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => go("home")} className="flex items-center gap-2.5">
            <div style={{ background:"var(--cyan)" }} className="w-7 h-7 flex items-center justify-center">
              <Icon name="FlaskConical" size={16} className="text-white" />
            </div>
            <span className="font-oswald text-white tracking-[0.2em] text-base font-medium">ЛАБПРОФ</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0">
            {NAV.map(n => (
              <button key={n.id} onClick={() => go(n.id)}
                style={{ color: active === n.id ? "var(--cyan-bright)" : "#9fb3c8" }}
                className="font-plex text-xs tracking-wider px-4 py-4 hover:text-white transition-colors uppercase">
                {n.label}
              </button>
            ))}
          </nav>

          <button onClick={() => go("contacts")}
            style={{ background:"var(--cyan)", color:"#fff" }}
            className="hidden lg:flex items-center gap-2 font-plex text-xs font-medium tracking-wider uppercase px-5 py-2.5 hover:brightness-110 transition-all">
            Получить КП
          </button>

          <button className="lg:hidden text-white" onClick={() => setMenu(!menu)}>
            <Icon name={menu ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {/* Mobile nav */}
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

      {/* ── KNOWLEDGE ── */}
      <section id="knowledge" className="py-28" style={{ background:"var(--warm-white)" }}>
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background:"var(--cyan)" }} />
            <span className="font-plex text-xs tracking-[0.2em] uppercase" style={{ color:"var(--cyan)" }}>База знаний</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <h2 className="font-oswald font-semibold leading-tight" style={{ fontSize:"clamp(2rem,3.5vw,3rem)", color:"var(--ink)" }}>
              МЕТОДИЧЕСКИЕ<br />МАТЕРИАЛЫ
            </h2>
            <p className="font-plex text-sm max-w-xs" style={{ color:"#6b7f94", fontWeight:300 }}>
              Протоколы и технические статьи для специалистов аналитических лабораторий.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {ARTICLES.map((a,i) => (
              <div key={i} className="group flex gap-6 p-7 cursor-pointer transition-all hover:shadow-lg bg-white"
                style={{ border:"1px solid #e0e6ef" }}>
                <div className="w-11 h-11 shrink-0 flex items-center justify-center transition-colors"
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
            <button className="w-full font-plex text-xs font-semibold uppercase tracking-[0.15em] py-4.5 transition-all hover:brightness-110"
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
    </div>
  );
}
