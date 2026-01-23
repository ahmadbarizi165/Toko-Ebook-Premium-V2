<div
  style={{
    background: "linear-gradient(180deg, #0f172a, #020617)",
    borderRadius: 16,
    padding: 16,
    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
    transition: "transform 0.3s",
  }}
>
  <div style={{ overflow: "hidden", borderRadius: 12 }}>
    <img
      src={book.cover || "/cover-default.jpg"}
      alt={book.title}
      style={{
        width: "100%",
        height: 260,
        objectFit: "cover",
        userSelect: "none",
        pointerEvents: "none",
      }}
    />
  </div>

  <h3 style={{ color: "#facc15", marginTop: 12 }}>
    {book.title}
  </h3>

  <p style={{ color: "#cbd5f5", fontSize: 14 }}>
    {book.description}
  </p>

  <p style={{ color: "#22c55e", fontWeight: "bold", fontSize: 18 }}>
    Rp {book.price.toLocaleString("id-ID")}
  </p>

  <button
    style={{
      width: "100%",
      marginTop: 12,
      padding: 12,
      borderRadius: 12,
      background: "linear-gradient(90deg,#facc15,#eab308)",
      color: "#020617",
      fontWeight: "bold",
      border: "none",
      cursor: "pointer",
    }}
  >
    BELI SEKARANG
  </button>
</div>
