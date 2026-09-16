import { MessageCircle, CheckCircle2 } from "lucide-react";

const questions = [
  "How much is this?",
  "Is this available?",
  "Do you have size 40?",
  "What's your account number?",
  "How much is delivery?",
  "Have you received my payment?",
];

const bullets = [
  "Set up a professional online store",
  "Organise products, prices and stock properly",
  "Accept payments systematically",
  "Build a better sales system around WhatsApp & Instagram",
];

export default function Problem() {
  return (
    <section className="relative overflow-hidden bg-ink py-24">
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-jade-deep opacity-30" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-ink-deep" />

      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 sm:px-8 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="text-sm font-semibold uppercase tracking-widest text-gold-bright">
            The problem
          </span>
          <h2 className="mt-4 text-balance font-display text-4xl leading-tight text-paper sm:text-5xl">
            Stop answering the same questions <em className="not-italic text-gold-bright">all day.</em>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-paper/70">
            Your customers shouldn&apos;t have to ask for everything. Every repeated question is
            time you&apos;re not spending growing your business.
          </p>

          <div className="mt-10 rounded-2xl border border-jade/30 bg-jade-deep/30 p-6">
            <p className="text-sm font-medium text-jade-pale">We help Nigerian small businesses</p>
            <ul className="mt-3 space-y-2">
              {bullets.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-paper">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-bright" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          <p className="mb-6 text-sm font-medium text-paper/70">Your WhatsApp inbox right now:</p>
          {questions.map((q) => (
            <div
              key={q}
              className="flex items-center gap-3 rounded-2xl border border-jade/20 bg-white/5 px-5 py-4 backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-bright">
                <MessageCircle className="h-4 w-4" />
              </div>
              <p className="text-sm font-medium text-paper">&ldquo;{q}&rdquo;</p>
              <div className="ml-auto h-2 w-2 animate-pulse rounded-full bg-jade" />
            </div>
          ))}
          <p className="pt-2 text-center text-xs italic text-paper/60">
            These questions should be answered by your store, not you.
          </p>
        </div>
      </div>
    </section>
  );
}
