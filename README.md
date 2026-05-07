# Trek De Kashmir – Consent Form Generator

React + Vite app. Upload a CSV, get printable consent forms.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173

## CSV Format

Column headers (case-insensitive, flexible):

| Field | Accepted headers |
|---|---|
| Name | `name`, `full name` |
| Parentage | `parentage`, `father name`, `s/o`, `d/o`, `w/o` |
| Contact | `contact`, `phone`, `mobile`, `tel` |
| Address | `address`, `residence` |
| Date of Birth | `dob`, `date of birth`, `birthdate` |
| Emergency Contact Name | `emergency contact name`, `ec name` |
| Relation | `relation`, `relationship` |
| Emergency Contact Address | `emergency contact address`, `ec address` |
| Aadhaar | `aadhaar`, `aadhar`, `aadhaar number` |

Download a sample CSV from within the app.

## Usage

1. Upload your CSV → participants load in sidebar
2. (Optional) Upload logo image → appears on each form
3. Click **Print All** or **Print** next to any name
4. Print dialog opens → save as PDF or send to printer
