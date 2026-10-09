// Contact form with no back end. Shows the demo note on submit.
import { useState, type FormEvent } from "react";
import { contact } from "./content";

type Props = {
  className?: string;
  inputClass: string;
  labelClass: string;
  buttonClass: string;
  noteClass: string;
  buttonLabel?: string;
};

export function DemoForm({ className, inputClass, labelClass, buttonClass, noteClass, buttonLabel = "Send message" }: Props) {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <form className={className} onSubmit={onSubmit} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="pm-name" className={labelClass}>
            Name
          </label>
          <input id="pm-name" name="name" type="text" autoComplete="name" required className={inputClass} placeholder="Your name" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="pm-phone" className={labelClass}>
            Phone
          </label>
          <input id="pm-phone" name="phone" type="tel" autoComplete="tel" className={inputClass} placeholder="(719) 555-0100" />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="pm-email" className={labelClass}>
            Email
          </label>
          <input id="pm-email" name="email" type="email" autoComplete="email" required className={inputClass} placeholder="you@example.com" />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="pm-interest" className={labelClass}>
            I am interested in
          </label>
          <select id="pm-interest" name="interest" className={inputClass} defaultValue={contact.interests[0]}>
            {contact.interests.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="pm-message" className={labelClass}>
            Message
          </label>
          <textarea id="pm-message" name="message" rows={4} className={inputClass} placeholder="Tell us about your property or what you are looking for." />
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        <button type="submit" className={buttonClass} disabled={sent}>
          {sent ? "Message noted" : buttonLabel}
        </button>
        <p className={noteClass} role="status" aria-live="polite">
          {sent ? contact.formNote : "We reply within one business day."}
        </p>
      </div>
    </form>
  );
}
