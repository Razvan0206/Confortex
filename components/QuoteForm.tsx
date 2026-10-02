import { useId } from "react";
import { quoteForm, quoteMailto, site } from "@/content/site";
import { Icon } from "./Icon";

// ponytail: visual-only form, ceiling: sends nothing (submit disabled, visible notice, tel/mailto fallback),
// upgrade: Server Action + Resend + Turnstile once the client names the receiving e-mail (11-capability-catalog.md).
export function QuoteForm() {
  const id = useId();
  const f = (n: string) => `${id}-${n}`;
  return (
    <form className="grid gap-5" aria-describedby={f("notice")} noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="field">
          <label htmlFor={f("kind")}>Tipul cererii</label>
          <select id={f("kind")} name="kind" defaultValue="">
            <option value="" disabled>
              Alegeți
            </option>
            {quoteForm.kinds.map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor={f("domain")}>Domeniul dumneavoastră</label>
          <select id={f("domain")} name="domain" defaultValue="">
            <option value="" disabled>
              Alegeți
            </option>
            {quoteForm.domains.map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor={f("place")}>Localitatea lucrării</label>
          <input id={f("place")} name="place" autoComplete="address-level2" />
        </div>
        <div className="field">
          <label htmlFor={f("size")}>Dimensiune sau capacitate</label>
          <input id={f("size")} name="size" autoComplete="off" />
          <small>De exemplu: cameră de 200 m³, 0 °C; chiller de 150 kW.</small>
        </div>
      </div>
      <div className="field">
        <label htmlFor={f("msg")}>Descrierea cererii</label>
        <textarea id={f("msg")} name="msg" />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="field">
          <label htmlFor={f("name")}>Nume și prenume</label>
          <input id={f("name")} name="name" autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor={f("company")}>Firma</label>
          <input id={f("company")} name="company" autoComplete="organization" />
        </div>
        <div className="field">
          <label htmlFor={f("phone")}>Telefon</label>
          <input id={f("phone")} name="phone" type="tel" autoComplete="tel" />
        </div>
        <div className="field">
          <label htmlFor={f("email")}>E-mail</label>
          <input id={f("email")} name="email" type="email" autoComplete="email" spellCheck={false} />
        </div>
      </div>
      <label className="flex items-start gap-3 text-[0.95rem]">
        <input type="checkbox" name="consent" className="mt-1 size-5 shrink-0" />
        <span>
          Sunt de acord cu prelucrarea datelor din formular pentru a primi o ofertă, conform <a href="/confidentialitate" className="link">politicii de confidențialitate</a>. <em className="not-italic text-steel">(Text de validat juridic.)</em>
        </span>
      </label>
      <div id={f("notice")} role="note" className="note p-4 text-ink">
        <div>
          <p className="font-semibold">{quoteForm.notice}</p>
          <p className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
            <a href={site.phoneHref} className="link num inline-flex min-h-11 items-center gap-2">
              <Icon name="phone" className="size-4" /> {site.phone}
            </a>
            <a href={quoteMailto} className="link inline-flex min-h-11 items-center gap-2">
              <Icon name="mail" className="size-4" /> Scrieți-ne pe e-mail cu datele cererii
            </a>
          </p>
        </div>
      </div>
      <div>
        <button type="submit" className="btn btn-red" disabled>
          Trimite cererea
        </button>
      </div>
    </form>
  );
}
