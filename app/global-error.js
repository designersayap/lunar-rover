"use client";
import "./foundation/global.css";

export default function GlobalError({ error, reset }) {
    return (
        <html>
            <body>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", padding: "20px", textAlign: "center", fontFamily: "system-ui, sans-serif" }}>
                    <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Application Error</h2>
                    <p style={{ marginBottom: "2rem", color: "#666" }}>Something went wrong while rendering the application.</p>
                    <pre style={{ background: "#f5f5f5", padding: "10px", borderRadius: "4px", overflow: "auto", maxWidth: "800px", textAlign: "left", marginBottom: "2rem" }}>
                        {error.message}
                        {error.digest && <small style={{ display: "block", marginTop: "10px", color: "#888" }}>Digest: {error.digest}</small>}
                    </pre>
                    <button
                        onClick={() => reset()}
                        style={{
                            padding: "10px 20px",
                            background: "#000",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "1rem"
                        }}
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}
