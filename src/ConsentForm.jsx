import React from "react";

const CLAUSES = [
    `I am participating in the event (program) organized by Trek De Kashmir on my own risk and responsibility. I shall not hold Trek De Kashmir or Government of Jammu & Kashmir or any Government or Private Department responsible for any mishap, leading to injury or death during the event, expedition or program.`,
    `My participation in the adventure activities being conducted by Trek De Kashmir is voluntary.`,
    `I declare that I am physically and mentally fit to participate in adventure activities and represent that I am not suffering from any disease which might remotely either put myself or the other participants to any risk or danger.`,
    `I accept that the mountain terrain conditions and weather are unpredictable. The team leader (nominated by Trek De Kashmir for an event) has the authority to modify the original itinerary/route, in order to secure the safety of the individual or group.`,
    `I am participating in the Trek/Expedition/Program on my own accord and with due permission of my Parents/Guardian.`,
    `I am major (above the age of 18) and fully fit for mountain travel/hiking and I will carry all the necessary gear required by me in the outdoors for survival.`,
    `I willingly agree to discontinue my participation in the activity if my gear is not found proper or suitable by the trek leader for the activity.`,
    `I am well aware of COVID-19. I certify that I am Negative for COVID-19, and I will follow all the SoP's strictly.`,
    `If my behaviour during the activity is likely to cause distress or break the norms of the activity by displaying misbehaviour through harming the environment/disturbing the flora & fauna/etc., the member of staff or Trek Leader reserves the right to terminate my participation at any time and I will have to make my own arrangements. Club will not be liable for any expenses incurred as a result and I will be blacklisted from joining any future activity with the club.`,
    `In case of any injury suffered during the course of travel or hike/trek that may result in temporary/permanent incapacitation, death I shall not hold Trek De Kashmir or its members responsible for the same.`,
];

const styles = {
    page: {
        width: "210mm",
        margin: "0 auto",
        background: "#fff",
        padding: "4mm 8mm",
        fontFamily: "DM Mono",
        fontSize: "9pt",
        color: "#111",
        position: "relative",
    },
    header: {
        display: "flex",
        alignItems: "center",
        gap: "14px",
        marginBottom: "8px",
    },
    logo: {
        width: "45px",
        height: "45px",
        objectFit: "contain",
        flexShrink: 0,
    },
    logoPlaceholder: {
        width: "64px",
        height: "64px",
        border: "2px solid black",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "8pt",
        color: "#4285F4",
        textAlign: "center",
        flexShrink: 0,
    },
    orgBlock: {
        flex: 1,
    },
    orgName: {
        fontSize: "16pt",
        fontWeight: "bold",
        color: "black",
        letterSpacing: "0.5px",
    },
    orgSub: {
        fontSize: "9pt",
        color: "#555",
        marginTop: "2px",
    },
    docTitle: {
        textAlign: "center",
        fontSize: "10pt",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "1px",
        margin: "24px 0",
        color: "black",
        textDecoration: "underline",
    },
    sectionTitle: {
        fontWeight: "bold",
        fontSize: "10pt",
        borderBottom: "1px solid #ccc",
        marginBottom: "8px",
        marginTop: "12px",
        letterSpacing: "0.5px",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        fontSize: "8pt",
        marginBottom: "4px",
    },
    td: {
        padding: "4px 6px",
        verticalAlign: "top",
    },
    tdLabel: {
        padding: "4px 6px 0",
        verticalAlign: "top",
        width: "38%",
        fontWeight: "500",
        fontSize: "8pt",
    },
    tdValue: {
        padding: "4px 6px 0",
        fontSize: "11px",
        textDecoration: "underline",
        minWidth: "60%",
    },
    declarationHeader: {
        margin: "5px",
        fontSize: "8pt",
        fontWeight: "bold",
    },
    clause: {
        display: "flex",
        gap: "8px",
        marginBottom: "7px",
        fontSize: "8pt",
        lineHeight: "1.5",
    },
    clauseNum: {
        fontWeight: "bold",
        color: "black",
        minWidth: "20px",
    },
    signatureSection: {
        paddingTop: "8px",
    },
    signatureGrid: {
        display: "flex",
        justifyContent: "space-between",
        gap: "35px",
        marginTop: "8px",
    },
    sigBox: {
        marginLeft: "auto",
        width: "200px",
        textAlign: "center",
    },
    sigLine: {
        borderBottom: "1px solid #333",
        height: "30px",
        marginBottom: "5px",
    },
    sigLabel: {
        fontSize: "8pt",
    },
    footer: {
        marginTop: "16px",
        textAlign: "center",
        fontSize: "8    pt",
        color: "#666",
    },
};

function Field({ label, value }) {
    return (
        <tr>
            <td style={styles.tdLabel}>{label}</td>
            <td style={styles.tdValue}>{value || "—"}</td>
        </tr>
    );
}

export default function ConsentForm({ person, event }) {
    return (
        <div style={styles.page}>
            {/* Header */}
            <div style={styles.header}>
                <img
                    src="/brand.png"
                    alt="Trek De Kashmir logo"
                    style={styles.logo}
                />

                <div style={styles.orgBlock}>
                    <div style={styles.orgName}>Trek De Kashmir</div>
                </div>
            </div>

            <div style={styles.docTitle}>
                <p>Registration & Consent Form</p>
                <p>{event}</p>
            </div>

            {/* Personal Details */}
            <div style={styles.sectionTitle}>Participant Details</div>
            <table style={styles.table}>
                <tbody>
                    <Field label="Full Name" value={person.name} />
                    <Field
                        label="Parentage (S/O, D/O, W/O)"
                        value={person.parentage}
                    />
                    <Field label="Date of Birth" value={person.dob} />
                    <Field label="Contact Number" value={person.contact} />
                    <Field label="Aadhaar Number" value={person.aadhaar} />
                    <Field label="Residential Address" value={person.address} />
                </tbody>
            </table>

            {/* Emergency Contact */}
            <table style={styles.table}>
                <tbody>
                    <Field
                        label="Emergency Contact Name"
                        value={person.emergencyContactName}
                    />
                    <Field
                        label="Relationship with Emergency Contact"
                        value={person.emergencyRelation}
                    />
                    <Field
                        label="Emergency Contact Phone"
                        value={person.emergencyContactNumber}
                    />
                    <Field
                        label="Emergency Contact Address"
                        value={person.emergencyContactAddress}
                    />
                </tbody>
            </table>

            {/* Declaration */}
            <div style={styles.sectionTitle}>Self-Declaration & Consent</div>
            <p style={styles.declarationHeader}>
                {`I, ${person.name}, declare:`}
            </p>

            {CLAUSES.map((text, i) => (
                <div key={i} style={styles.clause}>
                    <span style={styles.clauseNum}>
                        {String(i + 1).padStart(2, "0")}.
                    </span>
                    <span>That {text}</span>
                </div>
            ))}

            <p
                style={{
                    margin: "5px",
                    fontSize: "8pt",
                    fontWeight: "bold",
                }}
            >
                and affix my signature in acceptance.
            </p>

            {/* Signature */}
            <div style={styles.signatureSection}>
                <div style={styles.signatureGrid}>
                    <div style={styles.sigBox}>
                        <div style={styles.sigLine}></div>
                        <div style={styles.sigLabel}>Participant Signature</div>
                    </div>
                </div>
            </div>

            <div style={styles.footer}>
                This document constitutes a legally binding consent agreement.
            </div>
        </div>
    );
}
