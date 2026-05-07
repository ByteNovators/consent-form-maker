import React, { useState, useRef, useCallback } from "react";
import Papa from "papaparse";
import ConsentForm from "./ConsentForm.jsx";
import { mapHeaders, rowToPerson } from "./csvMapper.js";

const SAMPLE_CSV = `name,parentage,contact,address,DOB,emergency contact name,relation with emergency contact,emergency contact address,aadhaar number
Ali Hassan,Mohammad Hassan,9876543210,"House 12 Lal Chowk Srinagar",1998-05-14,Fatima Hassan,Mother,"House 12 Lal Chowk Srinagar",1234 5678 9012
Sara Khan,Abdul Khan,9123456780,"Lane 3 Sopore",2000-11-22,Rashid Khan,Father,"Lane 3 Sopore",9876 5432 1098`;

export default function App() {
    const [persons, setPersons] = useState([]);
    const [event, setEvent] = useState("");
    const [logoSrc, setLogoSrc] = useState(null);
    const [error, setError] = useState("");
    const [activePerson, setActive] = useState(null); // null = show all
    const [parseInfo, setParseInfo] = useState("");
    const printRef = useRef();

    const handleCSV = useCallback((file) => {
        setError("");
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: ({ data, meta }) => {
                if (!data.length) {
                    setError("CSV is empty.");
                    return;
                }
                const mapping = mapHeaders(meta.fields);
                const missingRequired = ["name"].filter((k) => !mapping[k]);
                if (missingRequired.length) {
                    setError(
                        `Could not find required column(s): ${missingRequired.join(", ")}. Check column headers.`,
                    );
                    return;
                }
                const parsed = data.map((row) => rowToPerson(row, mapping));
                setPersons(parsed);
                setActive(null);
                setParseInfo(
                    `${parsed.length} participant${parsed.length !== 1 ? "s" : ""} loaded from "${file.name}"`,
                );
            },
            error: (err) => setError(`Parse error: ${err.message}`),
        });
    }, []);

    const handleFileChange = (e) => {
        const f = e.target.files[0];
        if (f) handleCSV(f);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const f = e.dataTransfer.files[0];
        if (f && f.name.endsWith(".csv")) handleCSV(f);
    };

    const handleLogo = (e) => {
        const f = e.target.files[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onload = (ev) => setLogoSrc(ev.target.result);
        reader.readAsDataURL(f);
    };

    const printAll = () => {
        setActive(null);
        setTimeout(() => window.print(), 150);
    };

    const printOne = (idx) => {
        setActive(idx);
        setTimeout(() => window.print(), 150);
    };

    const handleEventNameChange = (e) => {
        setEvent(e.target.value);
    };

    const displayedPersons =
        activePerson === null ? persons : [persons[activePerson]];

    return (
        <div
            style={{
                display: "flex",
            }}
        >
            {/* ── Control Panel ── */}
            <div className="no-print" style={panelStyle}>
                <div style={{ maxWidth: 860, margin: "0 auto" }}>
                    <h1 style={h1Style}>
                        Trek De Kashmir · Consent Form Generator
                    </h1>
                    <div style={rowStyle}>
                        {/* CSV Upload */}
                        <div
                            style={dropzoneStyle}
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            <label style={labelStyle}>
                                📄 Upload CSV
                                <input
                                    type="file"
                                    accept=".csv"
                                    onChange={handleFileChange}
                                    style={{ display: "none" }}
                                />
                            </label>
                            <span style={{ fontSize: "12px", color: "#666" }}>
                                or drag & drop
                            </span>
                        </div>
                        {/* Logo Upload */}
                        {/* <div style={dropzoneStyle}>
                            <label style={labelStyle}>
                                🖼 Upload Logo
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogo}
                                    style={{ display: "none" }}
                                />
                            </label>
                            {logoSrc && (
                                <span
                                    style={{
                                        fontSize: "12px",
                                        color: "#174EA6",
                                    }}
                                >
                                    ✓ Logo loaded
                                </span>
                            )}
                        </div> */}
                    </div>
                    {error && <div style={errorStyle}>{error}</div>}
                    {parseInfo && !error && (
                        <div style={infoStyle}>{parseInfo}</div>
                    )}

                    <input
                        style={eventStyle}
                        type="text"
                        placeholder="Event Name and Date"
                        onChange={handleEventNameChange}
                    />
                    {/* Sample CSV hint */}
                    <details style={{ marginTop: 10 }}>
                        <summary
                            style={{
                                cursor: "pointer",
                                fontSize: "12px",
                                color: "#555",
                            }}
                        >
                            Show expected CSV column headers
                        </summary>
                        <pre
                            style={preStyle}
                        >{`name, parentage, contact, address, DOB,\nemergency contact name, relation with emergency contact,\nemergency contact address, aadhaar number`}</pre>
                        <button
                            style={btnSecondary}
                            onClick={() => {
                                const blob = new Blob([SAMPLE_CSV], {
                                    type: "text/csv",
                                });
                                const a = document.createElement("a");
                                a.href = URL.createObjectURL(blob);
                                a.download = "sample_participants.csv";
                                a.click();
                            }}
                        >
                            Download sample CSV
                        </button>
                    </details>
                    {/* Person list + print controls */}
                    {persons.length > 0 && (
                        <div style={{ marginTop: 18 }}>
                            <div style={listHeaderStyle}>
                                <span style={{ fontWeight: 600 }}>
                                    Participants ({persons.length})
                                </span>
                                <button style={btnPrimary} onClick={printAll}>
                                    🖨 Print All
                                </button>
                            </div>
                            <div style={listStyle}>
                                {persons.map((p, i) => (
                                    <div key={i} style={listItemStyle}>
                                        <span style={{ flex: 1 }}>
                                            <strong>
                                                {p.name || "(no name)"}
                                            </strong>
                                            {p.contact && (
                                                <span
                                                    style={{
                                                        color: "#666",
                                                        marginLeft: 10,
                                                    }}
                                                >
                                                    {p.contact}
                                                </span>
                                            )}
                                        </span>
                                        <button
                                            style={btnSmall}
                                            onClick={() => printOne(i)}
                                        >
                                            Print
                                        </button>
                                        <button
                                            style={btnSmallSecondary}
                                            onClick={() => {
                                                setActive(i);
                                                setTimeout(
                                                    () =>
                                                        document
                                                            .getElementById(
                                                                "preview-anchor",
                                                            )
                                                            .scrollIntoView({
                                                                behavior:
                                                                    "smooth",
                                                            }),
                                                    50,
                                                );
                                            }}
                                        >
                                            Preview
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div
                style={{
                    height: "100vh",
                    overflow: "auto",
                }}
            >
                {/* ── Print/Preview Area ── */}
                {persons.length > 0 && (
                    <div
                        ref={printRef}
                        id="preview-anchor"
                        style={{ paddingTop: 20 }}
                    >
                        {displayedPersons.map((person, i) => (
                            <div
                                key={i}
                                className={
                                    i < displayedPersons.length - 1
                                        ? "page-break"
                                        : ""
                                }
                            >
                                <ConsentForm person={person} event={event} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

/* ── Styles ── */
const panelStyle = {
    background: "#fff",
    borderBottom: "1px solid #ddd",
    padding: "20px 24px",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};
const h1Style = {
    fontSize: "16px",
    fontWeight: 700,
    color: "#174EA6",
    marginBottom: 16,
};
const rowStyle = { display: "flex", gap: 16, flexWrap: "wrap" };
const dropzoneStyle = {
    border: "2px dashed #bbb",
    borderRadius: 8,
    padding: "12px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    cursor: "pointer",
    minWidth: 160,
};
const labelStyle = {
    cursor: "pointer",
    color: "#174EA6",
    fontWeight: 600,
    fontSize: "14px",
};

const eventStyle = {
    color: "#174EA6",
    border: "2px dashed #bbb",
    borderRadius: 8,
    padding: "10px",
    marginTop: "10px",
};
const errorStyle = {
    marginTop: 10,
    background: "#fff0f0",
    border: "1px solid #f00",
    borderRadius: 6,
    padding: "8px 12px",
    color: "#c00",
    fontSize: "13px",
};
const infoStyle = {
    marginTop: 10,
    background: "#efffef",
    border: "1px solid #174EA6",
    borderRadius: 6,
    padding: "8px 12px",
    color: "#174EA6",
    fontSize: "13px",
};
const preStyle = {
    background: "#f5f5f5",
    padding: "8px 12px",
    borderRadius: 4,
    fontSize: "12px",
    marginTop: 6,
    overflowX: "auto",
};
const listHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
};
const listStyle = {
    border: "1px solid #ddd",
    borderRadius: 8,
    overflow: "hidden",
    maxHeight: 260,
    overflowY: "auto",
};
const listItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 12px",
    borderBottom: "1px solid #eee",
    fontSize: "13px",
};
const btnPrimary = {
    background: "#174EA6",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "7px 18px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "13px",
};
const btnSecondary = {
    background: "#f0f0f0",
    color: "#333",
    border: "1px solid #ccc",
    borderRadius: 6,
    padding: "5px 14px",
    cursor: "pointer",
    fontSize: "12px",
    marginTop: 6,
};
const btnSmall = {
    background: "#174EA6",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    padding: "4px 10px",
    cursor: "pointer",
    fontSize: "12px",
};
const btnSmallSecondary = {
    background: "#f0f0f0",
    color: "#333",
    border: "1px solid #ccc",
    borderRadius: 4,
    padding: "4px 10px",
    cursor: "pointer",
    fontSize: "12px",
};
