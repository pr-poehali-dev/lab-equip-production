import { useState } from "react";
import { Equipment } from "@/components/lab/data";
import NavbarSection from "@/components/lab/NavbarSection";
import HeroAboutSection from "@/components/lab/HeroAboutSection";
import CatalogSection from "@/components/lab/CatalogSection";
import KnowledgeContactsSection from "@/components/lab/KnowledgeContactsSection";

export default function Index() {
  const [active,   setActive]   = useState("home");
  const [cat,      setCat]      = useState("Все");
  const [menu,     setMenu]     = useState(false);
  const [selected, setSelected] = useState<Equipment | null>(null);

  const go = (id: string) => {
    setActive(id); setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'IBM Plex Sans', sans-serif", background:"var(--warm-white)" }}>
      <NavbarSection active={active} menu={menu} setMenu={setMenu} go={go} />
      <HeroAboutSection go={go} />
      <CatalogSection cat={cat} setCat={setCat} selected={selected} setSelected={setSelected} />
      <KnowledgeContactsSection />
    </div>
  );
}
