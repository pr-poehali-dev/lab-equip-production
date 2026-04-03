import Icon from "@/components/ui/icon";
import { NAV } from "./data";

interface Props {
  active: string;
  menu: boolean;
  setMenu: (v: boolean) => void;
  go: (id: string) => void;
}

export default function NavbarSection({ active, menu, setMenu, go }: Props) {
  return (
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
  );
}
