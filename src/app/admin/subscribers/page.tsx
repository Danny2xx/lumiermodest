import { prisma } from "@/lib/db";

export const metadata = { title: "Subscribers — Admin" };

export default async function SubscribersPage() {
  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl text-taupe-dark">
          Subscribers ({subscribers.length})
        </h1>
        <a
          href="/admin/subscribers/export"
          className="border border-taupe-dark px-6 py-2.5 font-sans text-xs uppercase tracking-[0.18em] text-taupe-dark transition-all duration-200 hover:scale-[1.02] hover:bg-taupe-dark hover:text-cream"
        >
          Export CSV
        </a>
      </div>

      <div className="mt-8 divide-y divide-taupe/15 border-y border-taupe/15">
        {subscribers.length === 0 && (
          <p className="py-10 text-center font-sans text-sm text-espresso/60">
            No subscribers yet.
          </p>
        )}
        {subscribers.map((s) => (
          <div
            key={s.id}
            className="flex items-center justify-between py-3 font-sans text-sm"
          >
            <span className="text-espresso">{s.email}</span>
            <span className="text-xs uppercase tracking-wide text-espresso/50">
              {s.source} · {s.createdAt.toLocaleDateString("en-GB")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
