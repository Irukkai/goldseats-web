import { Card, CardBody, CardTitle } from "@/components/ui/card";
import { getApiHealth } from "@/lib/api";

const roadmap = [
  {
    id: "M3",
    title: "Home page",
    body: "Currently playing and upcoming films with filters for name and release date, plus a language selector.",
  },
  {
    id: "M4",
    title: "Film detail",
    body: "An expandable multi-source timeline, nearby showtimes, and a ranking of the best formats to see it in.",
  },
  {
    id: "M5",
    title: "Seat intelligence",
    body: "An interactive seat map highlighting golden seats with scores, ending in a handoff to the theatre's booking page.",
  },
  {
    id: "M6",
    title: "View from this seat",
    body: "A 3D auditorium rendered from the same layout data, with the screen at true relative size.",
  },
];

export default async function HomePage() {
  const health = await getApiHealth();

  return (
    <main className="mx-auto flex min-h-dvh max-w-5xl flex-col justify-center gap-12 px-6 py-20">
      <header>
        <p className="text-gold font-mono text-xs tracking-[0.2em] uppercase">
          GoldSeats
        </p>
        <h1 className="font-display text-cream mt-4 text-4xl font-bold sm:text-5xl">
          Find the best seat in the house.
        </h1>
        <p className="text-cream-muted mt-4 max-w-2xl text-base leading-relaxed">
          GoldSeats scores every available seat in an auditorium and tells you
          exactly where to sit. This is the application shell; the product surfaces
          land milestone by milestone.
        </p>
      </header>

      <section aria-labelledby="status">
        <h2 id="status" className="sr-only">
          Platform status
        </h2>
        <div className="border-line bg-ink-elevated inline-flex items-center gap-3 rounded-full border px-4 py-2">
          <span
            aria-hidden
            className={
              health
                ? "bg-gold shadow-gold size-2 rounded-full"
                : "bg-cream-muted size-2 rounded-full"
            }
          />
          <span className="text-cream-muted text-sm">
            {health
              ? `API reachable · ${health.environment} · v${health.version}`
              : "API unreachable — start goldseats-api on port 8000"}
          </span>
        </div>
      </section>

      <section aria-labelledby="roadmap">
        <h2 id="roadmap" className="font-display text-cream text-xl font-semibold">
          What ships next
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {roadmap.map((milestone) => (
            <Card key={milestone.id}>
              <p className="text-gold-soft font-mono text-xs tracking-widest">
                {milestone.id}
              </p>
              <div className="mt-1">
                <CardTitle>{milestone.title}</CardTitle>
                <CardBody>{milestone.body}</CardBody>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
