"use client";

export function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="aurora-blob absolute -left-1/4 top-0 h-[520px] w-[520px] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(129,140,248,0.35) 0%, transparent 70%)",
        }}
      />
      <div
        className="aurora-blob-delayed absolute -right-1/4 top-1/4 h-[480px] w-[480px] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.2) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, rgba(129,140,248,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(244,244,245,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(244,244,245,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
