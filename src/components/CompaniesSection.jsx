import { useMemo, useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import MarqueeSection from "./MarqueeSection";
import Footer from "./Footer";

const companiesGrid = "/images/companiesGrid.png";
const insideCompanyGrid = "/images/InsideCompanyGrid.jpg";

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

const COMPANIES = [
  {
    name: "Prisma XR",
    category: "Infrastructure",
    description:
      "Estudio de desarrollo XR especializado en llevar el movimiento físico humano a entornos digitales en tiempo real.",
    longDescription: [
      "En 2013, cuando la realidad virtual era un experimento de laboratorio, PrismaXR ya estaba resolviendo el problema más difícil del espacio inmersivo.",
    ],
  },
  {
    name: "WIA",
    category: "Infrastructure",
    description:
      "Infraestructura de modelos de IA propietarios para entornos regulados y productos inmersivos.",
    longDescription: [
      "WIA construye la infraestructura de modelos de IA propietarios.",
    ],
  },
  {
    name: "Aethern",
    category: "Money",
    description:
      "Infraestructura blockchain diseñada para banca, mercados de capitales e instituciones financieras.",
    longDescription: [
      "Aethern desarrolla infraestructura blockchain diseñada específicamente para banca.",
    ],
  },
  {
    name: "Trivium",
    category: "Infrastructure",
    description:
      "Ingeniería full stack transversal que sustenta la arquitectura técnica del ecosistema.",
    longDescription: [
      "Trivium es la ingeniería full stack transversal del ecosistema.",
    ],
  },
];

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

function FilterPill({ cat, isActive, onClick }) {
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
      {cat}
    </button>
  );
}

export function CompaniesSection() {
  const [active, setActive] = useState("All");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(
    () =>
      active === "All"
        ? COMPANIES
        : COMPANIES.filter((c) => c.category === active),
    [active]
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
              Discover the ecosystem behind wownix.
              <br />
              From infrastructure to culture.
            </span>

            <span className="mobile-heading">
              Discover the ecosystem behind wownix.
              <br />
              From infrastructure to culture.
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
                <span>{active}</span>

                <ChevronDown
                  size={16}
                  className={
                    "transition-transform " +
                    (mobileOpen ? "rotate-180" : "")
                  }
                />
              </button>
            </div>
          </div>

          {/* Companies Grid */}
          <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((company, idx) => (
              <button
                key={`${company.name}-${idx}`}
                onClick={() => setSelected(company)}
                className="group flex w-full max-w-[311px] flex-col text-left"
                style={{ minHeight: 344 }}
              >
                <div
                  className="relative w-full overflow-hidden rounded-md bg-[#0a0a0a] ring-1 ring-white/[0.06] transition-all duration-300 group-hover:ring-white"
                  style={{ height: 180 }}
                >
                  <img
                    src={companiesGrid}
                    alt={`${company.name} logo`}
                    loading="lazy"
                    style={{
                      position: "absolute",
                      width: 90,
                      height: 74,
                      top: 53,
                      left: 95,
                    }}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.01em] text-white">
                  {company.name}
                </h3>

                <p className="mt-2.5 text-[13.5px] leading-[1.6] text-white/55">
                  {company.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* POPUP */}
        {selected && (
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 backdrop-blur-md"
            onClick={() => setSelected(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-[90%] max-w-[1000px] rounded-lg border border-white/10 bg-[#0a0a0a] p-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-semibold text-white">
                  {selected.name}
                </h2>

                <button
                  onClick={() => setSelected(null)}
                  className="text-white/60 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="mt-6 text-white/70 leading-7">
                {selected.longDescription[0]}
              </p>

              <div className="mt-8 overflow-hidden rounded-md">
                <img
                  src={insideCompanyGrid}
                  alt={selected.name}
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* HEADING STYLES */}
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
            .desktop-heading {
              display: none;
            }

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