import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Props {
  productName?: string;
}

type Status = "idle" | "sending" | "success" | "error";

export default function QuoteForm({ productName }: Props) {
  const [form, setForm] = useState({
    org: "", name: "", phone: "", email: "", message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || (!form.phone.trim() && !form.email.trim())) {
      setStatus("error");
      setErrorMsg("Укажите имя и телефон или email");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, product: productName || "" }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("success");
        setForm({ org: "", name: "", phone: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Ошибка при отправке");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Нет соединения с сервером. Попробуйте позже.");
    }
  };

  if (status === "success") {
    return (
      <div className="p-10 flex flex-col items-start gap-5" style={{ border:"1px solid #dde4ed", background:"white" }}>
        <div className="w-12 h-12 flex items-center justify-center" style={{ background:"var(--sand)", border:"1px solid #c8e8c0" }}>
          <Icon name="CheckCircle" size={24} style={{ color:"#3aaa6a" }} />
        </div>
        <div>
          <p className="font-oswald text-2xl font-semibold mb-2" style={{ color:"var(--ink)" }}>Запрос отправлен!</p>
          <p className="font-plex text-sm leading-relaxed" style={{ color:"#6b7f94", fontWeight:300 }}>
            Мы получили ваше обращение и ответим в течение 4 рабочих часов.
            {productName && <> Тема: <b>{productName}</b>.</>}
          </p>
        </div>
        <button
          onClick={() => setStatus("idle")}
          className="font-plex text-xs uppercase tracking-wider px-6 py-2.5 transition-all"
          style={{ border:"1px solid #dde4ed", color:"#6b7f94" }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--ink)")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "#dde4ed")}>
          Отправить ещё
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-white p-10" style={{ border:"1px solid #dde4ed" }}>
      <h3 className="font-oswald text-xl font-semibold mb-2" style={{ color:"var(--ink)", letterSpacing:"0.05em" }}>
        ЗАПРОС КОММЕРЧЕСКОГО ПРЕДЛОЖЕНИЯ
      </h3>
      {productName && (
        <div className="flex items-center gap-2 mb-6 px-4 py-2.5" style={{ background:"var(--sand)", border:"1px solid #dde4ed" }}>
          <Icon name="Tag" size={14} style={{ color:"var(--cyan)" }} />
          <span className="font-plex text-xs" style={{ color:"#4a5568" }}>
            Продукт: <b>{productName}</b>
          </span>
        </div>
      )}
      {!productName && <div className="mb-8" />}

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        {([
          { k:"org",   l:"Организация",     p:"ООО «Название»",       t:"text"  },
          { k:"name",  l:"Контактное лицо", p:"Иванов Иван Иванович", t:"text"  },
          { k:"phone", l:"Телефон",         p:"+7 (___) ___-__-__",   t:"tel"   },
          { k:"email", l:"E-mail",          p:"mail@company.ru",       t:"email" },
        ] as const).map(f => (
          <div key={f.k}>
            <label className="font-plex text-xs uppercase tracking-wider mb-2 block" style={{ color:"#8096ad" }}>
              {f.l}{(f.k === "name") ? " *" : ""}
            </label>
            <input
              type={f.t}
              placeholder={f.p}
              value={form[f.k]}
              onChange={set(f.k)}
              className="w-full outline-none font-plex text-sm px-4 py-3.5 transition-colors"
              style={{ border:"1px solid #dde4ed", color:"var(--ink)" }}
              onFocus={e => (e.currentTarget.style.borderColor = "var(--cyan)")}
              onBlur={e  => (e.currentTarget.style.borderColor = "#dde4ed")}
            />
          </div>
        ))}
      </div>

      <div className="mb-6">
        <label className="font-plex text-xs uppercase tracking-wider mb-2 block" style={{ color:"#8096ad" }}>
          Вопрос / оборудование
        </label>
        <textarea
          rows={4}
          placeholder="Опишите, что вас интересует…"
          value={form.message}
          onChange={set("message")}
          className="w-full outline-none font-plex text-sm px-4 py-3.5 resize-none transition-colors"
          style={{ border:"1px solid #dde4ed", color:"var(--ink)" }}
          onFocus={e => (e.currentTarget.style.borderColor = "var(--cyan)")}
          onBlur={e  => (e.currentTarget.style.borderColor = "#dde4ed")}
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 mb-4 px-4 py-3" style={{ background:"#fff5f5", border:"1px solid #fca5a5" }}>
          <Icon name="AlertCircle" size={15} style={{ color:"#dc2626" }} />
          <span className="font-plex text-xs" style={{ color:"#dc2626" }}>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full font-plex text-xs font-semibold uppercase tracking-[0.15em] transition-all hover:brightness-110 flex items-center justify-center gap-2"
        style={{
          background: status === "sending" ? "#6b8299" : "var(--ink)",
          color: "#fff",
          padding: "1.1rem",
          cursor: status === "sending" ? "not-allowed" : "pointer",
        }}>
        {status === "sending" ? (
          <>
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
              <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Отправка…
          </>
        ) : "ОТПРАВИТЬ ЗАПРОС"}
      </button>

      <p className="font-plex text-xs mt-4 text-center" style={{ color:"#b0bec8" }}>
        * — обязательное поле. Ответим в течение 4 рабочих часов.
      </p>
    </form>
  );
}
