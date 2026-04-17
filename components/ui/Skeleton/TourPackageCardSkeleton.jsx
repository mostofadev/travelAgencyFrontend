
export default function TourPackageCardSkeleton() {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }
        .shimmer {
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 600px 100%;
          animation: shimmer 1.4s ease-in-out infinite;
        }
      `}</style>

      <div
        style={{
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
          overflow: "hidden",
          background: "#fff",
          display: "flex",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        {/* Image placeholder */}
        <div
          className="shimmer"
          style={{ width: "190px", minWidth: "190px", minHeight: "160px" }}
        />

        {/* Content placeholder */}
        <div
          style={{
            flex: 1,
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div
            className="shimmer"
            style={{ height: "16px", borderRadius: "4px", width: "60%" }}
          />
          <div
            className="shimmer"
            style={{ height: "12px", borderRadius: "4px", width: "35%" }}
          />
          <div
            className="shimmer"
            style={{ height: "12px", borderRadius: "4px", width: "80%" }}
          />
          <div
            className="shimmer"
            style={{ height: "12px", borderRadius: "4px", width: "55%" }}
          />
          <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
            <div
              className="shimmer"
              style={{ height: "24px", borderRadius: "6px", width: "80px" }}
            />
            <div
              className="shimmer"
              style={{ height: "24px", borderRadius: "6px", width: "80px" }}
            />
            <div
              className="shimmer"
              style={{ height: "24px", borderRadius: "6px", width: "80px" }}
            />
          </div>
        </div>

        {/* Price placeholder */}
        <div
          style={{
            width: "175px",
            minWidth: "175px",
            padding: "16px",
            borderLeft: "1px solid #f0f4f8",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            background: "#f8faff",
          }}
        >
          <div
            className="shimmer"
            style={{ height: "12px", borderRadius: "4px", width: "80px" }}
          />
          <div
            className="shimmer"
            style={{ height: "20px", borderRadius: "4px", width: "100px" }}
          />
          <div
            className="shimmer"
            style={{ height: "32px", borderRadius: "6px", width: "110px" }}
          />
        </div>
      </div>
    </>
  );
}
