function VisaCardSkeleton() {
  return (
    <>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}`}</style>
      <div
        style={{
          display: "flex",
          background: "#fff",
          borderRadius: "14px",
          border: "1px solid #e8eef5",
          overflow: "hidden",
          minHeight: "160px",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      >
        <div style={{ width: "280px", flexShrink: 0, background: "#f1f5f9" }} />
        <div
          style={{
            flex: 1,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div
            style={{
              height: "16px",
              background: "#f1f5f9",
              borderRadius: "6px",
              width: "55%",
            }}
          />
          <div
            style={{
              height: "12px",
              background: "#f1f5f9",
              borderRadius: "6px",
              width: "28%",
            }}
          />
          <div
            style={{
              height: "12px",
              background: "#f1f5f9",
              borderRadius: "6px",
              width: "78%",
            }}
          />
          <div style={{ display: "flex", gap: "6px" }}>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  height: "24px",
                  width: "78px",
                  background: "#f1f5f9",
                  borderRadius: "6px",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default VisaCardSkeleton;