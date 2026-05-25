import { useMemo, useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import MarqueeSection from "./MarqueeSection";
import Footer from "./Footer";

const DEFAULT_COMPANY_IMAGE = "/images/DefaultCompanyImage.png";

const CATEGORIES = [
  "All",
  "Infrastructure",
  "Tech",
  "Sports",
  "Entertainment",
  "Money",
  "Culture",
];

const CATEGORY_WIDTHS = {
  All: "51px",
  Infrastructure: "135px",
  Tech: "69px",
  Sports: "83px",
  Entertainment: "139px",
  Money: "84px",
  Culture: "87px",
};

// Category key → translation key
const CATEGORY_KEYS = {
  All: "companies.categories.all",
  Infrastructure: "companies.categories.infrastructure",
  Tech: "companies.categories.tech",
  Sports: "companies.categories.sports",
  Entertainment: "companies.categories.entertainment",
  Money: "companies.categories.money",
  Culture: "companies.categories.culture",
};

const COMPANIES = [
  { name: "Prisma XR",              logoKey: "prismaXr",           category: "Infrastructure" },
  { name: "WIA+",                   logoKey: "WIA+",               category: "Infrastructure" },
  { name: "Aethern",                logoKey: "Aethern",            category: "Money" },
  { name: "Trivium",                logoKey: "Trivium",            category: "Infrastructure" },
  { name: "BefootBall",             logoKey: "BeFootBall",         category: "Tech" },
  { name: "VirtualSports",          logoKey: "VirtualSports",      category: "Tech" },
  { name: "BeSportsAcademy",        logoKey: "BeSportsAcademy",    category: "Money" },
  { name: "IMM3RSIVE",              logoKey: "IMM3RSIVE",          category: "Sports" },
  { name: "WX180Productions",       logoKey: "WX180Productions",   category: "Sports" },
  { name: "True’sMusic",            logoKey: "True'sMusic",        category: "Money" },
  { name: "3B3",                    logoKey: "3B3",             category: "Tech" },
  { name: "KeyQuest",               logoKey: "KeyQuest",           category: "Tech" },
  { name: "Seetrex",                logoKey: "Seetrex",            category: "Infrastructure" },
  { name: "Bulfy",                  logoKey: "Bullfy",             logoFile: "Bullfy", category: "Culture" },
  { name: "EasyFi",                 logoKey: "EasyFi",             category: "Money" },
  { name: "eSignus",                logoKey: "Esignus",            logoFile: "Esignus", category: "Infrastructure" },
  { name: "HashWallet",             logoKey: "Hashwallet",         logoFile: "Hashwallet", category: "Money" },
  { name: "ROV",                    logoKey: "ROV",                category: "Entertainment" },
];

const getLogoFileBase = (company) => company.logoFile || company.logoKey;

const getCompanyImageCandidates = (company) => {
  const companyIndex = COMPANIES.findIndex((c) => c.name === company.name);
  const orderedCompanyImage = companyIndex >= 0 ? `/images/Company${companyIndex + 1}.png` : null;

  return [
    ...(orderedCompanyImage ? [orderedCompanyImage] : []),
    DEFAULT_COMPANY_IMAGE,
  ];
};

function gradientButtonStyle(active = false) {
  return active
    ? {
        color: "#fff",
        border: "1px solid transparent",
        backgroundImage: `
          linear-gradient(269.79deg, rgba(242,231,201,0.4) 18.11%, rgba(233,201,214,0.4) 42.04%, rgba(214,207,234,0.4) 71.95%, rgba(191,215,238,0.4) 99.87%),
          linear-gradient(269.79deg, #F2E7C9 18.11%, #E9C9D6 42.04%, #D6CFEA 71.95%, #BFD7EE 99.87%)
        `,
        backgroundOrigin: "padding-box, border-box",
        backgroundClip: "padding-box, border-box",
      }
    : {
        color: "rgba(255,255,255,0.6)",
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.2)",
      };
}

function FilterPill({ cat, label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: CATEGORY_WIDTHS[cat],
        height: "32px",
        borderRadius: "2px",
        padding: "8px 16px",
        fontSize: "13px",
        fontFamily: "Inter, sans-serif",
        fontWeight: 400,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        whiteSpace: "nowrap",
        transition: "all 0.2s",
        flexShrink: 0,
        ...gradientButtonStyle(isActive),
      }}
    >
      {label}
    </button>
  );
}

export function CompaniesSection() {
  const { t } = useTranslation();
  const [active, setActive] = useState("All");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const filtered = useMemo(
    () =>
      active === "All"
        ? COMPANIES
        : COMPANIES.filter((c) => c.category === active),
    [active]
  );

  const selectedImageCandidates = useMemo(
    () => (selected ? getCompanyImageCandidates(selected) : [DEFAULT_COMPANY_IMAGE]),
    [selected]
  );

  useEffect(() => {
    if (!selected) return;

    const onKey = (e) => e.key === "Escape" && setSelected(null);

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <>
      <section className="relative bg-background pb-32 pt-32 md:pb-40 md:pt-40">
        <div className="mx-auto max-w-[1320px] px-6 md:px-10">

          {/* HEADING */}
          <h2 className="companies-heading">
            <span className="desktop-heading">
              {t('companies.heading').split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </span>

            <span className="mobile-heading">
              {t('companies.heading').split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </span>
          </h2>

          {/* Desktop Filters */}
          <div
            className="sticky z-30 mt-12 hidden justify-center md:flex"
            style={{ top: "94px" }}
          >
            <div
              style={{
                width: "703px",
                height: "35px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              {CATEGORIES.map((cat) => (
                <FilterPill
                  key={cat}
                  cat={cat}
                  label={t(CATEGORY_KEYS[cat])}
                  isActive={active === cat}
                  onClick={() => setActive(cat)}
                />
              ))}
            </div>
          </div>

          {/* Mobile Dropdown */}
          <div className="relative mt-10 flex justify-center md:hidden">
            <div className="relative w-full max-w-[343px]">
              <button
                onClick={() => setMobileOpen((v) => !v)}
                style={{
                  width: "343px",
                  maxWidth: "100%",
                  height: "40px",
                  borderRadius: "2px",
                  padding: "8px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                <span>{t(CATEGORY_KEYS[active])}</span>
                <ChevronDown
                  size={16}
                  className={"transition-transform " + (mobileOpen ? "rotate-180" : "")}
                />
              </button>

              {mobileOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "44px",
                    left: 0,
                    width: "343px",
                    maxWidth: "100%",
                    background: "#0a0a0a",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "2px",
                    zIndex: 50,
                  }}
                >
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActive(cat);
                        setMobileOpen(false);
                      }}
                      style={{
                        width: "100%",
                        padding: "10px 16px",
                        textAlign: "left",
                        color: active === cat ? "#fff" : "rgba(255,255,255,0.55)",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {t(CATEGORY_KEYS[cat])}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Companies Grid — 4 cols desktop, 2 tablet, 1 mobile */}
          <div
            className="mt-14 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {filtered.map((company, idx) => (
              <button
                key={`${company.name}-${idx}`}
                onClick={() => {
                  setSelected(company);
                  setSelectedImageIndex(0);
                }}
                className="group flex flex-col text-left"
                style={{
                  width: "311px",
                  minHeight: "344px",
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                {/* Image holder */}
                <div
                  style={{
                    width: "279px",
                    height: "180px",
                    borderRadius: "4px",
                    padding: "56px",
                    boxSizing: "border-box",
                    background: "#0f0f0f",
                    border: "1px solid rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    transition: "border-color 0.3s",
                  }}
                  className="group-hover:[border-color:rgba(255,255,255,0.9)]"
                >
                  <img
                    src={`/images/${getLogoFileBase(company)}Logo.png`}
                    alt={`${company.name} logo`}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/DefaultLogo.png";
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      transition: "transform 0.7s ease-out",
                    }}
                    className="group-hover:scale-[1.04]"
                  />
                </div>

                {/* Text */}
                <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <h3
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "24px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "32px",
                      color: "#F8F8F8",
                      margin: 0,
                    }}
                  >
                    {company.name}
                  </h3>

                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                      color: "#F8F8F8",
                      margin: 0,
                      opacity: 0.55,
                    }}
                  >
                    {t(`companies.data.${company.logoKey}.description`)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* POPUP */}
        {selected && (
          <div
            onClick={() => setSelected(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            {/* Modal */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "1324px",
                height: "737px",
                maxWidth: "calc(100vw - 32px)",
                maxHeight: "calc(100vh - 32px)",
                borderRadius: "8px",
                background: "rgba(10, 10, 10, 0.72)",
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 8px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
                boxSizing: "border-box",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* ── TOP NAV BAR ── */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  padding: "0 40px",
                  height: "64px",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  flexShrink: 0,
                  boxSizing: "border-box",
                }}
              >
                {/* Category pill */}
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "#1a1a1a",
                    background: "linear-gradient(270deg, #F2E7C9 18.11%, #E9C9D6 42.04%, #D6CFEA 71.95%, #BFD7EE 99.87%)",
                    borderRadius: "2px",
                    padding: "5px 12px",
                    whiteSpace: "nowrap",
                    lineHeight: "20px",
                    flexShrink: 0,
                  }}
                >
                  {t(CATEGORY_KEYS[selected.category])}
                </span>

                {/* Vertical divider */}
                <div style={{ width: "1px", height: "18px", background: "rgba(255,255,255,0.15)", flexShrink: 0 }} />

                {/* Company name tabs */}
                <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
                  {COMPANIES.filter((c) => c.category === selected.category).map((c) => {
                    const isActive = c.name === selected.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => {
                          setSelected(c);
                          setSelectedImageIndex(0);
                        }}
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          fontWeight: 400,
                          lineHeight: "20px",
                          color: isActive ? "#F8F8F8" : "rgba(248,248,248,0.35)",
                          background: "transparent",
                          border: "none",
                          padding: "0 0 3px 0",
                          borderBottom: isActive
                            ? "1.5px solid transparent"
                            : "1.5px solid transparent",
                          backgroundImage: isActive
                            ? "linear-gradient(270deg, #F2E7C9 18.11%, #E9C9D6 42.04%, #D6CFEA 71.95%, #BFD7EE 99.87%)"
                            : "none",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "bottom",
                          backgroundSize: isActive ? "100% 1.5px" : "0 1.5px",
                          cursor: "pointer",
                          transition: "color 0.2s",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {c.name}
                      </button>
                    );
                  })}
                </div>

                {/* Close */}
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    marginLeft: "auto",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                    transition: "color 0.2s",
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* ── BODY ── */}
              <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>

                {/* LEFT TEXT BLOCK */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "592px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    padding: "0 64px",
                    boxSizing: "border-box",
                    gap: "32px",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "40px",
                      fontWeight: 400,
                      lineHeight: "48px",
                      letterSpacing: "-0.01em",
                      color: "#F8F8F8",
                      margin: 0,
                    }}
                  >
                    {selected.name}
                  </h2>

                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                      color: "#F8F8F8",
                      opacity: 0.65,
                      margin: 0,
                      width: "464px",
                    }}
                  >
                    {t(`companies.data.${selected.logoKey}.longDescription`)}
                  </p>

                  <button
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      fontWeight: 400,
                      lineHeight: "20px",
                      color: "#F8F8F8",
                      background: "transparent",
                      border: "1px solid rgba(248,248,248,0.30)",
                      borderRadius: "2px",
                      padding: "9px 18px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "border-color 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(248,248,248,0.8)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(248,248,248,0.30)"; }}
                  >
                    {t('companies.letsTalk')}
                    <span style={{ fontSize: "13px" }}>↗</span>
                  </button>
                </div>

                {/* RIGHT IMAGE */}
                <div
                  style={{
                    position: "absolute",
                    top: "75px",
                    left: "632px",
                    width: "592px",
                    height: "510px",
                    borderRadius: "4px",
                    padding: "1px",
                    background: "linear-gradient(270deg, #F2E7C9 18.11%, #E9C9D6 42.04%, #D6CFEA 71.95%, #BFD7EE 99.87%)",
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "3px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      className="object-cover"
                      src={selectedImageCandidates[selectedImageIndex]}
                      alt={`${selected.name} image`}
                      onError={() => {
                        setSelectedImageIndex((prev) => {
                          if (prev >= selectedImageCandidates.length - 1) return prev;
                          return prev + 1;
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STYLES */}
        <style>{`
          .companies-heading {
            margin: 0 auto;
            text-align: center;
            font-family: 'PP Neue Montreal', Inter, sans-serif;
            font-weight: 500;
            color: #fff;
          }
          .desktop-heading {
            display: block;
            font-size: 48px;
            line-height: 56px;
            letter-spacing: -0.01em;
          }
          .mobile-heading {
            display: none;
          }
          @media (max-width: 639px) {
            .desktop-heading { display: none; }
            .mobile-heading {
              display: block;
              font-size: 28px;
              line-height: 36px;
              letter-spacing: -0.01em;
            }
          }
        `}</style>
      </section>

      <section id="marquee">
        <MarqueeSection />
      </section>

      <section id="contact">
        <Footer />
      </section>
    </>
  );
}