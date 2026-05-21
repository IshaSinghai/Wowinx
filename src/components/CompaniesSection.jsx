import { useMemo, useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import MarqueeSection from "./MarqueeSection";
import Footer from "./Footer";

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
    logoKey: "prismaXr",
    category: "Infrastructure",
    description:
      "Estudio de desarrollo XR especializado en llevar el movimiento físico humano a entornos digitales en tiempo real.",
    longDescription: [
      "More than a decade solving one of XR's most complex challenges: turning human physical movement into a precise, fluid, and scalable digital interface. Its expertise in latency, body synchronization, movement logic, and immersive architecture enables it to create environments where the body acts in real time within digital space. In 2026, as XR moves toward mass adoption, PrismaXR operates from a position of advantage built long before the market understood its value.",
    ],
  },
  {
    name: "WIA+",
    logoKey: "WIA+",
    category: "Infrastructure",
    description:
      "Infraestructura de modelos de IA propietarios para entornos regulados y productos inmersivos.",
    longDescription: [
      "wowinX's artificial intelligence factory. WIA designs, trains, and deploys the group's AI infrastructure with sovereign control, bringing traceability, control, and operational autonomy to demanding environments. Its specialization combines deterministic LLMs for regulated sectors with generative LLMs for products where creativity and expression are central. From this foundation, wowinX builds the deepest layer of its AI stack.",
    ],
  },
  {
    name: "Aethern",
    logoKey: "Aethern",
    category: "Money",
    description:
      "Infraestructura blockchain diseñada para banca, mercados de capitales e instituciones financieras.",
    longDescription: [
      "It builds specialized blockchain infrastructure for the financial sector. It designs every layer of the on-chain stack — consensus, execution, settlement, identity, and compliance — to meet the real demands of banks, asset managers, and institutional issuers. Its vertical focus, combined with proven experience developing for major financial clients, places Aethern among the few companies capable of uniting protocol architecture with institutional risk logic..",
    ],
  },
  {
    name: "Trivium",
    logoKey: "Trivium",
    category: "Infrastructure",
    description:
      "Ingeniería full stack transversal que sustenta la arquitectura técnica del ecosistema.",
    longDescription: [
      "It is wowinX's full-stack company and the technical layer underpinning the rest of the group. It builds and maintains the cross-functional infrastructure that allows each company to focus on its product, backed by a robust, interoperable, and scalable foundation. Its work spans backup systems, integrations, bridges between architectures, and technical coherence across different environments. Trivium turns an ecosystem of companies into a solid, connected technological architecture.",
    ],
  },
  {
    name: "BefootBall",
    logoKey: "BeFootBall",
    category: "Tech",
    description:
      "Plataforma de desarrollo de software colaborativo impulsada por inteligencia artificial generativa.",
    longDescription: [
      "It builds, through VR, the immersive layer of the world's most universal sport: an ecosystem where fans, clubs, leagues, federations, and brands turn football into participation, movement, community, and business. Its strength comes from the intersection of major technology companies, global demand for football, and new generations who already consume, socialize, and compete in interactive environments. BeFootball brings official content, sporting legitimacy, and real activation.",
    ],
  },
  {
    name: "VirtualSports",
    logoKey: "VirtualSports",
    category: "Tech",
    description:
      "Sistema operativo espacial para entornos mixtos que conecta dispositivos físicos y digitales.",
    longDescription: [
      "It creates a new sports category in virtual reality, with its own rules, real physical movement, and structured competition. It turns digital experience into physical presence, effort, and shared play. Its scale runs from the home to physical arenas, opening up a new space for leagues, events, and championships for a generation shaped by interactive environment.",
    ],
  },
  {
    name: "BeSportsAcademy",
    logoKey: "BeSportsAcademy",
    category: "Money",
    description:
      "Motor de análisis financiero en tiempo real para fondos de inversión y family offices.",
    longDescription: [
      "It brings elite knowledge to any player through virtual reality. It turns sports training into an immersive, guided, repeatable, and measurable experience, accessible from anywhere. Its focus is on developing sports intelligence: decision-making under pressure, anticipation, tactical reading, body orientation, and spatial perception. BeSports Academy transforms a virtual reality headset into the gateway to a new scale of training.",
    ],
  },
  {
    name: "AldolsX",
    logoKey: "AldolsX",
    category: "Entertainment",
    description:
      "Estudio de contenido inmersivo que produce experiencias narrativas en formatos XR y volumétricos.",
    longDescription: [
      "It turns one of entertainment’s greatest limitations into a product: the distance between an idol and their audience. It builds official digital twins, trained on the idol’s voice, sensibility, image, and narrative universe. In this way, the idol’s identity becomes a conversational, immersive, and value-generating presence capable of generating recurring business and preserving their cultural legacy over the long term. "
],
  },
  {
    name: "Stratos",
    logoKey: "Stratos",
    category: "Infrastructure",
    description:
      "Red de cómputo distribuido de baja latencia orientada a cargas de trabajo de IA en el edge.",
    longDescription: [
      "Stratos opera una red de nodos de cómputo distribuidos para llevar la inferencia de IA al borde de la red.",
    ],
  },
  {
    name: "IMM3RSIVE",
    logoKey: "IMM3RSIVE",
    category: "Sports",
    description:
      "Plataforma de analítica deportiva avanzada que combina visión computacional y biomecánica.",
    longDescription: [
" IMM3RSIVE is wowinX’s XR project and the infrastructure the new immersive industry needs to operate. It builds IMM Units — the standard unit of immersive consumption for measuring, budgeting, and settling XR experiences at scale. Its $IMM token operates as the invisible rail powering that economy, while wowinX validates the standard through real demand from BeFootball and VirtualSports before opening it to the industry. "    ],
  },
  {
    name: "WX180Productions",
    logoKey: "WX180Productions",
    category: "Sports",
    description:
      "Ecosistema digital para ligas y competencias amateur con gestión de torneos y fans.",
    longDescription: [
"It produces immersive experiences for high-value sectors and clients across institutions, sport, luxury, and hospitality. It operates as a boutique studio — few projects per year, maximum quality. It turns communication into experience through a simple idea: presence turns interest into decision. "
    ],
  },
  {
    name: "True'sMusic",
    logoKey: "True'sMusic",
    category: "Money",
    description:
      "Soluciones de pagos transfronterizos instantáneos para pymes en mercados emergentes.",
    longDescription: [
"It is the neutral oracle of music streaming: a certification layer that turns every stream into verifiable, traceable, and auditable proof of value. That certified data brings greater confidence to today’s streaming economy and creates the foundation needed to bring music into Web3, from catalog tokenization to blockchain royalties and artist financing through digital assets. "
    ],
  },
  {
    name: "GROWFY",
    logoKey: "GROWFY",
    category: "Tech",
    description:
      "Plataforma de crecimiento empresarial impulsada por datos e inteligencia artificial.",
    longDescription: [
"It is a platform designed to create, scale, and monetize digital communities around education, knowledge, and digital products. It brings courses, memberships, community, events, and participation tools into a single environment, turning learning into a continuous experience. Its value lies in transforming content and programs into living ecosystems, increasing retention, repeat engagement, and the strength of the relationship between creators and users."    ],
  },
  {
    name: "KeyQuest",
    logoKey: "KeyQuest",
    category: "Tech",
    description:
      "Soluciones de acceso y gestión de credenciales digitales para entornos empresariales seguros.",
    longDescription: [
"It solves the lack of consolidated data in the VR/AR application market. It unifies analytics, keyword and competitor tracking, revenue estimation, category trends, and AI-generated reports in a single dashboard designed for the immersive ecosystem. Its position within wowinX allows it to draw on real data from live applications and reach the market just as VR/AR starts needing sharper intelligence to grow. "    ],
  },
  {
    name: "Ownia",
    logoKey: "Ownia",
    category: "Money",
    description:
      "Plataforma de inversión en activos reales tokenizados para inversores individuales e institucionales.",
    longDescription: [
"It is a private artificial intelligence platform for companies that turns corporate knowledge into a conversation. It accesses each division’s internal documentation, answers with cited sources, and remembers each user’s context across sessions. It writes reports, summarizes documents, compares texts, generates files, transcribes audio, and connects to code repositories through a conversational interface. Its multi-instance SaaS model allows each organization to operate in an isolated environment, with its own knowledge, branding, and control."
    ],
  },
  {
    name: "Seetrex",
    logoKey: "Seetrex",
    category: "Infrastructure",
    description:
      "Sistema de trazabilidad y monitoreo en tiempo real para cadenas de suministro globales.",
    longDescription: [
"It is a deterministic AI system designed for regulated environments, where every decision must be explainable, reproducible, and auditable. It produces the same output for the same input, with full traceability and third-party verification. That capability makes it the bridge between modern artificial intelligence and legacy systems in banking, finance, and regulatory processes — and the layer that validates every critical decision within wowinX’s architecture. "    ],
  },
  {
    name: "Bulfy",
    logoKey: "Bullfy",
    category: "Culture",
    description:
      "Red social orientada a comunidades de creadores con herramientas de monetización directa.",
    longDescription: [
"It is a proprietary trading firm powered by communities, giving talented traders access to real capital through a simple, fast, and transparent experience. Those who pass its evaluation trade with funded accounts, transparent rules, payouts in minutes, and progressive scaling. Bullfy combines the agility of a fintech with a core banking function: putting capital behind judgment."    ],
  },
  {
    name: "EasyFi",
    logoKey: "EasyFi",
    category: "Money",
    description:
      "Infraestructura de finanzas descentralizadas pensada para usuarios no técnicos en mercados emergentes.",
    longDescription: [
"It is a decentralized liquidity provision platform that allows users to deposit assets into optimized pools on AMMs such as Uniswap V3, automatically and without prior technical knowledge. Users maintain full control of their funds at all times, while yield comes exclusively from real market activity. Its architecture serves both individual users and institutions or partners that need to deploy liquidity solutions under their own brand. "    ],
  },
  {
    name: "eSignus",
    logoKey: "Esignus",
    category: "Infrastructure",
    description:
      "Hardware y software de firma digital avanzada para documentos legales y contratos empresariales.",
    longDescription: [
"It is a B2B Hardware Wallet as a Service platform that allows banks, fintechs, and exchanges to launch their own branded self-custody solution. Its infrastructure integrates an EAL6+ certified chip, a white-label app, a decentralized recovery system, and digital inheritance management. Its competitive position is supported by bank-grade security certifications, national cybersecurity awards, and an already active institutional client base. "
    ],
  },
  {
    name: "HashWallet",
    logoKey: "Hashwallet",
    category: "Money",
    description:
      "Cartera de activos digitales con custodia auto-soberana y soporte multi-cadena.",
    longDescription: [
"It solves the contradiction between security and simplicity in cryptoasset self-custody. It is a card-format cold wallet with an EAL6+ chip, contactless signing, support for more than 11,000 cryptocurrencies, and a decentralized recovery system that allows users to recover their assets without exposing their private keys. Its firmware is immutable, and its design enables users to manage multiple seeds, program digital inheritance, and connect to dApps via WalletConnect. "    ],
  },
  {
    name: "ROV",
    logoKey: "ROV",
    category: "Entertainment",
    description:
      "Estudio de videojuegos inmersivos con narrativas interactivas para plataformas XR y móvil.",
    longDescription: [
"ROV is the leading virtual and augmented reality community in the Spanish-speaking world. Founded in 2013, it brings together news, analysis, a forum, podcasts, and a database for an audience that embraced XR long before mass adoption. Within wowinX, it brings the native community of the XR space where the group operates. It is now evolving into an international project, while maintaining its editorial depth, standards, and commitment to XR."    ],
  },
  {
    name: "Tierra de Creadores",
    logoKey: "TierraDeCreadores",
    category: "Culture",
    description:
      "Ecosistema latinoamericano para creadores digitales con formación, comunidad y oportunidades de negocio.",
    longDescription: [
"It is a global experiential event designed for creators. Its model combines content, networking, and business development in a physical format that can be replicated across different territories. It can be deployed in different markets as a strategic platform to connect creators, partners, and opportunities within the creator economy. "    ],
  },
  {
    name: "The Archives of Silence",
    logoKey: "TheArchivesOfSilence",
    category: "Culture",
    description:
      "Archivo digital de patrimonio sonoro e historias orales de comunidades en riesgo de olvido.",
    longDescription: [
"It is an intellectual property born from an existing work and projected by wowinX into new layers of value. Its development spans immersive, audiovisual, and transmedia formats, with the goal of turning a narrative universe into a global platform for content, experience, and commercial development."
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
                      {cat}
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
                onClick={() => setSelected(company)}
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
                    src={`/images/${company.logoKey}Logo.png`}
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
                    {company.description}
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
                  {selected.category}
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
                        onClick={() => setSelected(c)}
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
                    {selected.longDescription[0]}
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
                    Let's Talk
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
                      background: `url(${insideCompanyGrid}) lightgray 50% / cover no-repeat`,
                    }}
                  />
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