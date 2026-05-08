import { useState, useRef, useCallback } from "react";
import Papa from "papaparse";
import ConsentForm from "./ConsentForm.jsx";
import ParticipantList from "./ParticipantList.jsx";
import { mapHeaders, rowToPerson } from "./csvMapper.js";

function buildPages(persons, event) {
    return [
        { type: "list", persons, event },
        ...persons.map((p) => ({ type: "consent", person: p, event })),
    ];
}

function printNode(node) {
    // antipattern: iframe is unnecessary but oh wth
    const iframe = document.createElement("iframe");
    iframe.style.cssText =
        "position:fixed;top:-9999px;left:-9999px;width:210mm;height:297mm;border:0";
    document.body.appendChild(iframe);
    const win = iframe.contentWindow;
    win.document.open();
    win.document.write(`
    <!DOCTYPE html><html><head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap" rel="stylesheet"/>
      <style>
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:#fff;font-family:'DM Mono',monospace;font-size:9pt}
        @page{size:A4;margin:0}
        @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
      </style>
    </head><body>${node.outerHTML}</body></html>`);
    win.document.close();
    win.focus();
    setTimeout(() => {
        win.print();
        setTimeout(() => document.body.removeChild(iframe), 1000);
    }, 400);
}

function SidebarParticipant({ person, index, isActive, onPreview, onPrint }) {
    return (
        <div
            className={`sidebar-participant ${isActive ? "active" : ""}`}
            onClick={onPreview}
        >
            <div className="sp-index">{String(index + 1).padStart(2, "0")}</div>
            <div className="sp-info">
                <div className="sp-name">{person.name || "—"}</div>
                <div className="sp-sub">
                    {person.contact || person.pickupPoint || "No contact"}
                </div>
            </div>
            <button
                className="sp-btn"
                title="Print consent form"
                onClick={(e) => {
                    e.stopPropagation();
                    onPrint();
                }}
            >
                ⎙
            </button>
        </div>
    );
}

export default function App() {
    const [persons, setPersons] = useState([]);
    const [event, setEvent] = useState("");
    const [search, setSearch] = useState("");
    const [pageIndex, setPageIndex] = useState(0);
    const [fileName, setFileName] = useState(null);
    const fileInputRef = useRef();
    const previewRef = useRef();

    const pages = buildPages(persons, event);
    const totalPages = pages.length;

    const filteredPersons = persons.filter((p) => {
        const q = search.toLowerCase();
        return (
            p.name?.toLowerCase().includes(q) ||
            p.contact?.toLowerCase().includes(q) ||
            p.pickupPoint?.toLowerCase().includes(q)
        );
    });

    const handleCSV = (file) => {
        if (!file) return;
        setFileName(file.name);
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: ({ data, meta }) => {
                const mapping = mapHeaders(meta.fields || []);
                setPersons(data.map((r) => rowToPerson(r, mapping)));
                setPageIndex(0);
            },
        });
    };

    const goTo = (i) => setPageIndex(Math.max(0, Math.min(i, totalPages - 1)));

    const printCurrent = () => {
        const node = previewRef.current?.querySelector(".printable-page");
        if (node) printNode(node);
    };

    const printAll = () => {
        const iframe = document.createElement("iframe");
        iframe.style.cssText =
            "position:fixed;top:-9999px;left:-9999px;width:210mm;height:297mm;border:0";
        document.body.appendChild(iframe);
        const win = iframe.contentWindow;

        const pagesHtml = pages
            .map((pg) => {
                const wrapper = document.createElement("div");
                wrapper.style.cssText =
                    "page-break-after:always;break-after:page;";
                const inner = document.createElement("div");
                inner.className = "printable-page";
                // create node as per page in list
                const node = document.querySelector(
                    `.page-snapshot[data-idx="${pages.indexOf(pg)}"]`,
                );
                return node ? node.outerHTML : "";
            })
            .join("");

        win.document.open();
        win.document.write(`
      <!DOCTYPE html><html><head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap" rel="stylesheet"/>
        <style>
          *{box-sizing:border-box;margin:0;padding:0}
          body{background:#fff;font-family:'DM Mono',monospace}
          @page{size:A4;margin:0}
          .page-snapshot{page-break-after:always;break-after:page}
          @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
        </style>
      </head><body>${pagesHtml}</body></html>`);
        win.document.close();
        win.focus();
        setTimeout(() => {
            win.print();
            setTimeout(() => document.body.removeChild(iframe), 1000);
        }, 600);
    };

    const currentPage = pages[pageIndex];

    return (
        <div className="app-shell">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="brand-mark">TDK</div>
                    <div className="brand-text">
                        <span className="brand-name">Trek De Kashmir</span>
                        <span className="brand-sub">Document Generator</span>
                    </div>
                </div>

                <div className="sidebar-section">
                    <label className="field-label">Event Name</label>
                    <input
                        className="field-input"
                        value={event}
                        onChange={(e) => setEvent(e.target.value)}
                        placeholder="e.g. Tarsar Marsar 2025"
                    />
                </div>

                <div className="sidebar-section">
                    <label className="field-label">Participants CSV</label>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv"
                        style={{ display: "none" }}
                        onChange={(e) => handleCSV(e.target.files[0])}
                    />
                    <button
                        className="btn btn-upload"
                        onClick={() => fileInputRef.current.click()}
                    >
                        <span className="btn-icon">↑</span>
                        {fileName ? fileName : "Upload CSV"}
                    </button>
                </div>

                {persons.length > 0 && (
                    <>
                        <div className="sidebar-section">
                            <div className="action-row">
                                <button
                                    className="btn btn-action"
                                    onClick={() => {
                                        setPageIndex(0);
                                    }}
                                >
                                    ☰ View List
                                </button>
                                <button
                                    className="btn btn-action"
                                    onClick={printAll}
                                >
                                    ⎙ Print All
                                </button>
                            </div>
                        </div>

                        <div className="sidebar-section sidebar-search">
                            <input
                                className="field-input search-input"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search participants…"
                            />
                            <div className="participant-count">
                                {filteredPersons.length} / {persons.length}{" "}
                                participants
                            </div>
                        </div>

                        <div className="participant-list-scroll">
                            {filteredPersons.map((p, i) => {
                                const realIndex = persons.indexOf(p);
                                const consentPageIndex = realIndex + 1;
                                return (
                                    <SidebarParticipant
                                        key={i}
                                        person={p}
                                        index={realIndex}
                                        isActive={
                                            pageIndex === consentPageIndex
                                        }
                                        onPreview={() =>
                                            setPageIndex(consentPageIndex)
                                        }
                                        onPrint={() => {
                                            setPageIndex(consentPageIndex);
                                            setTimeout(() => {
                                                const node =
                                                    previewRef.current?.querySelector(
                                                        ".printable-page",
                                                    );
                                                if (node) printNode(node);
                                            }, 100);
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </>
                )}

                {persons.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-icon">⛰</div>
                        <p>Upload a CSV to get started</p>
                    </div>
                )}
            </aside>

            <main className="main-view">
                {persons.length === 0 ? (
                    <div className="main-empty">
                        <div className="main-empty-icon">⛰</div>
                        <h2>No documents yet</h2>
                        <p>Upload a participant CSV from the sidebar</p>
                    </div>
                ) : (
                    <>
                        {/* page navigation btns */}
                        <div className="page-nav no-print">
                            <button
                                className="nav-btn"
                                onClick={() => goTo(pageIndex - 1)}
                                disabled={pageIndex === 0}
                            >
                                ‹ Prev
                            </button>
                            <span className="page-indicator">
                                {pageIndex === 0
                                    ? "Participant List"
                                    : `Consent — ${currentPage.person?.name || pageIndex}`}{" "}
                                <span className="page-fraction">
                                    ({pageIndex + 1} / {totalPages})
                                </span>
                            </span>
                            <button
                                className="nav-btn"
                                onClick={() => goTo(pageIndex + 1)}
                                disabled={pageIndex === totalPages - 1}
                            >
                                Next ›
                            </button>
                            <button
                                className="nav-btn nav-print"
                                onClick={printCurrent}
                            >
                                ⎙ Print
                            </button>
                        </div>

                        {/* a4 page preview */}
                        <div className="page-stage" ref={previewRef}>
                            <div className="a4-shadow">
                                <div className="printable-page a4-page">
                                    {currentPage.type === "list" ? (
                                        <ParticipantList
                                            persons={currentPage.persons}
                                            event={currentPage.event}
                                        />
                                    ) : (
                                        <ConsentForm
                                            person={currentPage.person}
                                            event={currentPage.event}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* hide node for bulk print */}
                        <div style={{ display: "none" }}>
                            {pages.map((pg, idx) => (
                                <div
                                    key={idx}
                                    className="page-snapshot"
                                    data-idx={idx}
                                >
                                    {pg.type === "list" ? (
                                        <ParticipantList
                                            persons={pg.persons}
                                            event={pg.event}
                                        />
                                    ) : (
                                        <ConsentForm
                                            person={pg.person}
                                            event={pg.event}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
