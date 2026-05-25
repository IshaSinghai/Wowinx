import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import MarqueeSection from './MarqueeSection';
import Footer from './Footer';

// ─── Data ─────────────────────────────────────────────────────────────────────
const VENTURES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  imageSrc: `/images/ventures/venture${i + 1}.png`,
  imageAlt: `venture ${i + 1} logo`,
}));

// ─── Card ─────────────────────────────────────────────────────────────────────
function VentureCard({ isSelected, onClick, imageSrc, imageAlt }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: '100%',
        height: 123.15,
        borderRadius: 4,
        padding: isSelected ? 1 : 0,
        background: isSelected
          ? 'linear-gradient(269.79deg, #F2E7C9 18.11%, #E9C9D6 42.04%, #D6CFEA 71.95%, #BFD7EE 99.87%)'
          : 'transparent',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: isSelected ? 3 : 4,
          background: '#000',
          border: isSelected
            ? 'none'
            : '1px solid rgba(255,255,255,0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.25s ease',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
        className="px-4 py-2"
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function VentureScreen({
  currentPage,
  setCurrentPage,
}) {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#111110',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
      }}
    >
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <section
        style={{
          flex: 1,
          paddingTop: 160,
          paddingBottom: 80,
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 1320,
            margin: '0 auto',
            paddingLeft: 24,
            paddingRight: 24,
            boxSizing: 'border-box',
          }}
        >
          {/* Heading */}
          <h2 className="venture-heading">
            <span className="desktop-heading">
              {t('venture.heading').split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </span>

            <span className="mobile-heading">
              {t('venture.heading_mobile')}
            </span>
          </h2>

          {/* Grid */}
          <div className="ventures-grid">
            {VENTURES.map((v) => (
              <div
                key={v.id}
                className="ventures-grid-cell"
              >
                <VentureCard
                  isSelected={selectedId === v.id}
                  imageSrc={v.imageSrc}
                  imageAlt={v.imageAlt}
                  onClick={() =>
                    setSelectedId((prev) =>
                      prev === v.id ? null : v.id
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <MarqueeSection />
      <Footer />

      <style>{`
        /* ─────────────────────────────────────────
           Heading
        ───────────────────────────────────────── */
        .venture-heading {
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

        /* ─────────────────────────────────────────
           Desktop Grid
        ───────────────────────────────────────── */
        .ventures-grid {
          width: 100%;
          margin: 64px auto 0;
          display: grid;
          gap: 10px;
          box-sizing: border-box;
          grid-template-columns: repeat(5, 1fr);
        }

        .ventures-grid-cell {
          width: 100%;
          box-sizing: border-box;
        }

        /* ─────────────────────────────────────────
           Tablet
        ───────────────────────────────────────── */
        @media (max-width: 1023px) {
          .ventures-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .desktop-heading {
            display: block;
          }

          .mobile-heading {
            display: none;
          }
        }

        /* ─────────────────────────────────────────
           Mobile
        ───────────────────────────────────────── */
        @media (max-width: 639px) {
          .venture-heading {
            width: 100%;
            max-width: 343px;
          }

          .desktop-heading {
            display: none;
          }

          .mobile-heading {
            display: block;
            font-size: 18px;
            line-height: 28px;
            letter-spacing: -0.01em;
            font-weight: 500;
          }

          .ventures-grid {
            width: 100%;
            max-width: 343px;
            margin: 40px auto 0;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .ventures-grid-cell {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}