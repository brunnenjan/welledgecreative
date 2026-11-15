import { TRAP_FIELD } from "@/lib/contact-guard";

/** A field people never see and bots fill in (src/lib/contact-guard.ts). */
export default function ContactTrap() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
      <label>
        Leave this empty
        <input type="text" name={TRAP_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}
