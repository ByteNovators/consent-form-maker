export default function ParticipantList({ persons, event, team }) {
    return (
        <div
            style={{
                width: "210mm",
                margin: "0 auto",
                padding: "6mm",
                fontFamily: "DM Mono",
                fontSize: "9pt",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "14px",
                    margin: "8px",
                }}
            >
                <img
                    src="/brand.png"
                    alt="Trek De Kashmir logo"
                    style={{
                        width: "45px",
                        height: "45px",
                        objectFit: "contain",
                        flexShrink: 0,
                    }}
                />

                <div>
                    <div
                        style={{
                            fontSize: "16pt",
                            fontWeight: "bold",
                            color: "black",
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
                            "Emergency Contact",
                            "Address",
                            "Pickup Point",
                        ].map((h) => (
                            <th
                                key={h}
                                style={{
                                    border: "1px solid #ccc",
                                    padding: "4px 6px",
                                    width:
                                        h == "Address"
                                            ? "200px"
                                            : h != "#"
                                              ? "120px"
                                              : "0",
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
                                p.emergencyContactNumber,
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
                                    {val || " "}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Signatures */}
            <div
                style={{
                    marginTop: "50px",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",
                }}
            >
                {team.map((p) => (
                    <div
                        key={p.role}
                        style={{
                            textAlign: "center",
                            flex: 1,
                        }}
                    >
                        <div
                            style={{
                                borderTop: "1px solid #000",
                                marginBottom: "6px",
                                width: "100%",
                            }}
                        />
                        <div
                            style={{
                                fontSize: "8pt",
                            }}
                        >
                            <p style={{ fontWeight: "bold" }}>{p.name}</p>
                            <p>{p.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
