function LockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <rect x="5" y="11" width="14" height="9" rx="1.5" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <rect x="2" y="7" width="12" height="10" rx="1" />
      <path d="M14 10h4l3 3v4h-7z" />
      <circle cx="7" cy="19" r="1.6" />
      <circle cx="17.5" cy="19" r="1.6" />
    </svg>
  );
}

function ReturnIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M4 9h11a5 5 0 0 1 0 10H10" />
      <path d="M8 5 4 9l4 4" />
    </svg>
  );
}

const badges = [
  { icon: LockIcon, title: "Secure Checkout", subtitle: "Encrypted payment processing" },
  { icon: TruckIcon, title: "UK Shipping", subtitle: "Free on orders over £75" },
  { icon: ReturnIcon, title: "Easy Returns", subtitle: "14-day return window" },
];

export default function TrustBadges() {
  return (
    <section className="border-t border-taupe/15 bg-blush/40">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-10 text-center sm:grid-cols-3">
        {badges.map(({ icon: Icon, title, subtitle }) => (
          <div key={title} className="flex flex-col items-center gap-2">
            <div className="text-taupe-dark">
              <Icon />
            </div>
            <p className="font-sans text-xs uppercase tracking-[0.14em] text-espresso">
              {title}
            </p>
            <p className="font-sans text-xs text-espresso/60">{subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
