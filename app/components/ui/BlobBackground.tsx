"use client";

/**
 * Drop inside any `relative overflow-hidden` section.
 * Brand-palette lava-lamp blobs float behind content; when a glass
 * panel sits on top the backdrop-filter picks up the colour and the
 * glass gently shifts tint as blobs drift past.
 */
export default function BlobBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Large warm-red blob — top-left drift */}
      <div
        className="blob-a absolute rounded-full"
        style={{
          width: 520,
          height: 520,
          top: "-10%",
          left: "5%",
          background:
            "radial-gradient(circle, rgba(206,26,25,0.055) 0%, transparent 70%)",
        }}
      />
      {/* Medium red blob — bottom-right drift */}
      <div
        className="blob-b absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          bottom: "-8%",
          right: "10%",
          background:
            "radial-gradient(circle, rgba(206,26,25,0.045) 0%, transparent 70%)",
        }}
      />
      {/* Small warm accent — centre-right drift */}
      <div
        className="blob-c absolute rounded-full"
        style={{
          width: 300,
          height: 300,
          top: "35%",
          right: "25%",
          background:
            "radial-gradient(circle, rgba(180,20,20,0.035) 0%, transparent 70%)",
        }}
      />
      {/* Dark navy/slate blob — adds depth and contrast for glass tinting */}
      <div
        className="blob-a absolute rounded-full"
        style={{
          width: 440,
          height: 440,
          top: "15%",
          right: "30%",
          background:
            "radial-gradient(circle, rgba(9,9,30,0.04) 0%, transparent 70%)",
          animationDelay: "-14s",
        }}
      />
    </div>
  );
}
