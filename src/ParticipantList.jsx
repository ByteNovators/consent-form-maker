export default function ParticipantList({ persons, event }) {
    return (
        <div
            style={{
                width: "210mm",
                margin: "0 auto",
                padding: "10mm",
                fontFamily: "DM Mono",
                fontSize: "9pt",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    marginBottom: "8px",
                }}
            >
                <img
                    src="src/brand.png"
                    alt="Trek De Kashmir logo"
                    style={{
                        width: "45px",
                        height: "45px",
                        objectFit: "contain",
                        flexShrink: 0,
                    }}
                />

                <div
                    style={{
                        flex: 1,
                    }}
                >
                    <div
                        style={{
                            fontSize: "16pt",
                            fontWeight: "bold",
                            color: "#4285F4",
                            letterSpacing: "0.5px",
                        }}
                    >
                        Trek De Kashmir
                    </div>
                </div>
            </div>

            <h2 style={{ textAlign: "center" }}>Participant List</h2>
            {event && <p style={{ textAlign: "center" }}>{event}</p>}
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "10px",
                }}
            >
                <thead>
                    <tr>
                        {[
                            "#",
                            "Name",
                            "Phone",
                            "Parentage",
                            "Address",
                            "Pickup Point",
                        ].map((h) => (
                            <th
                                key={h}
                                style={{
                                    border: "1px solid #ccc",
                                    padding: "4px 6px",
                                    textAlign: "left",
                                    fontSize: "8pt",
                                }}
                            >
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {persons.map((p, i) => (
                        <tr key={i}>
                            {[
                                i + 1,
                                p.name,
                                p.contact,
                                p.parentage,
                                p.address,
                                p.pickupPoint,
                            ].map((val, j) => (
                                <td
                                    key={j}
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "4px 6px",
                                        fontSize: "8pt",
                                    }}
                                >
                                    {val || "—"}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
