import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const paragraphs = [
  `Siempre ha habido personas que deciden construir su vida en lugar de dejar que ocurra. Que eligen el camino antes de que exista. Que apuestan por lo que todavía no tiene nombre — y siguen cuando el mundo todavía no entiende por qué.`,

  `wowinX nació de esa decisión. De la convicción de que el mundo digital iba a transformarse por completo — y de que quien llegara antes, con criterio y con las personas correctas, definiría las reglas.`,

  `Desde 2004, construimos con esa fuerza. Aprendiendo los códigos del sistema antes de que el sistema tuviera forma. Detectando patrones antes de que fueran evidentes.`,

  `No venimos de una industria. Venimos de una manera de mirar el mundo. Una forma de entender hacia dónde se mueve la atención, el comportamiento y la cultura antes de que se conviertan en tendencia.`,

  `Hoy seguimos creando compañías, productos y experiencias que existen para el futuro, no para el presente.`,
];

export default function StoryScreen() {
  const sectionRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const center = window.innerHeight / 2;

      sectionRefs.current.forEach((section, index) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();

        if (
          rect.top <= center &&
          rect.bottom >= center
        ) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () =>
      window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* HERO IMAGE */}
      <section className="relative w-full h-screen">
        <img
          src="/images/StoryImage.png"
          alt="story hero"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute bottom-16 left-6 md:left-16 max-w-3xl">
          <h1 className="text-4xl md:text-7xl font-light leading-[1.05] tracking-tight">
            Construimos lo que viene.
            Con 
            <br />
            personas.En digital.
          </h1>
        </div>
      </section>

      {/* STORY CONTENT */}
      <section className="relative">
        {paragraphs.map((text, index) => {
          const distance = Math.abs(
            activeIndex - index
          );

          return (
            <div
              key={index}
              ref={(el) =>
                (sectionRefs.current[index] = el)
              }
              className="
                min-h-screen
                flex
                items-center
                px-6
                md:px-20
              "
            >
              <motion.p
                animate={{
                  opacity:
                    distance === 0
                      ? 1
                      : distance === 1
                      ? 0.35
                      : 0.12,

                  filter:
                    distance === 0
                      ? 'blur(0px)'
                      : distance === 1
                      ? 'blur(3px)'
                      : 'blur(8px)',

                  scale:
                    distance === 0 ? 1 : 0.97,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="
                  max-w-5xl
                  text-[34px]
                  md:text-[68px]
                  leading-[1.05]
                  tracking-[-0.03em]
                  font-light
                  text-white
                "
              >
                {text}
              </motion.p>
            </div>
          );
        })}
      </section>

      {/* FOOTER IMAGE SECTION */}
      <section className="relative w-full h-[700px] bg-[#dfe4ee] overflow-hidden flex items-center justify-center">
        <img
          src="/images/MarqueUpdated.png"
          alt="glass object"
          className="w-[300px] md:w-[500px] object-contain"
        />
      </section>
    </div>
  );
}