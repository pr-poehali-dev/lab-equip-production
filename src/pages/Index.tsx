import { useState } from "react";
import NavbarSection from "@/components/lab/NavbarSection";
import HeroAboutSection from "@/components/lab/HeroAboutSection";
import KnowledgeContactsSection from "@/components/lab/KnowledgeContactsSection";

export default function Index() {
  const [active, setActive] = useState("home");
  const [menu,   setMenu]   = useState(false);

  const go = (id: string) => {
    setActive(id); setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'IBM Plex Sans', sans-serif", background:"var(--warm-white)" }}>
      <NavbarSection active={active} menu={menu} setMenu={setMenu} go={go} />
      <HeroAboutSection go={go} />
      <KnowledgeContactsSection />
    </div>
  );
}
