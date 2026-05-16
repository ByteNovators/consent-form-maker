// Maps flexible CSV column names to internal Person fields
const FIELD_MAP = {
    name: ["name", "full name", "fullname"],
    parentage: [
        "parentage",
        "parent",
        "father",
        "father name",
        "father's name",
        "s/o",
        "d/o",
        "w/o"
    ],
    contact: [
        "contact",
        "phone",
        "mobile",
        "tel",
        "telephone",
        "contact number",
        "phone number",
        "whatsapp number
    ],
    address: ["address", "addr", "residence", "home address"],
    dob: ["dob", "date of birth", "birth date", "birthdate", "dateofbirth"],
    emergencyContactName: [
        "emergency contact name",
        "emergency name",
        "ec name",
        "emergency contact"
    ],
    emergencyRelation: [
        "relation",
        "relationship",
        "relation with emergency contact",
        "emergency relation",
        "emergency contact relation"
    ],
    emergencyContactNumber: [
        "emergency contact number",
        "emergency contact phone",
        "ec number",
        "emergency phone",
        "emergency mobile"
    ],
    emergencyContactAddress: [
        "emergency contact address",
        "ec address",
        "emergency address"
    ],
    aadhaar: ["aadhaar", "aadhar", "aadhaar number", "aadhaar card" "aadhar number", "uid"],
    pickupPoint: ["pickup point", "pickup", "pick up", "pick up point"]
};

function normalise(str) {
    return str
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9 '\/]/g, "");
}

export function mapHeaders(headers) {
    // returns { internalKey: csvColumnName }
    const result = {};
    for (const [key, aliases] of Object.entries(FIELD_MAP)) {
        for (const h of headers) {
            if (aliases.includes(normalise(h))) {
                result[key] = h;
                break;
            }
        }
    }
    return result;
}

export function rowToPerson(row, mapping) {
    const get = (key) => (mapping[key] ? (row[mapping[key]] || "").trim() : "");
    return {
        name: get("name"),
        parentage: get("parentage"),
        contact: get("contact"),
        address: get("address"),
        dob: get("dob"),
        emergencyContactName: get("emergencyContactName"),
        emergencyRelation: get("emergencyRelation"),
        emergencyContactAddress: get("emergencyContactAddress"),
        emergencyContactNumber: get("emergencyContactNumber"),
        aadhaar: get("aadhaar"),
        pickupPoint: get("pickupPoint"),
    };
}
