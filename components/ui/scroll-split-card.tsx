"use client";

// Adapted from Componentry's Scroll Split Card (MIT). See docs/componentry-LICENSE.txt.
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

export type ScrollSplitCardItem = {
  title: string;
  description: string;
  icon: ReactNode;
};

export function ScrollSplitCard({ imageSrc, cards }: {
  imageSrc: string;
  cards: readonly [ScrollSplitCardItem, ScrollSplitCardItem, ScrollSplitCardItem];
}) {
  const target = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end end"] });
  const leftX = useTransform(scrollYProgress, [0, .4, .8], ["0%", "-12%", "-6%"]);
  const rightX = useTransform(leftX, (value) => value === "0%" ? value : value.slice(1));
  const scale = useTransform(scrollYProgress, [0, .4], [1, .9]);
  const rotateY = useTransform(scrollYProgress, [.4, .8], [0, 180]);
  const leftTilt = useTransform(scrollYProgress, [.4, .8], [0, 6]);
  const rightTilt = useTransform(leftTilt, (value) => -value);
  const cardsY = useTransform(scrollYProgress, [.8, 1], [0, -44]);
  const introOpacity = useTransform(scrollYProgress, [0, .13], [1, 0]);
  const outroOpacity = useTransform(scrollYProgress, [.8, 1], [0, 1]);
  const outroY = useTransform(scrollYProgress, [.8, 1], [28, 0]);
  const leftRadius = useTransform(scrollYProgress, [0, .2], ["16px 0px 0px 16px", "16px 16px 16px 16px"]);
  const centerRadius = useTransform(scrollYProgress, [0, .2], ["0px 0px 0px 0px", "16px 16px 16px 16px"]);
  const rightRadius = useTransform(scrollYProgress, [0, .2], ["0px 16px 16px 0px", "16px 16px 16px 16px"]);

  return <div ref={target} className="split-card-runway">
    <div className="split-card-sticky">
      <motion.p className="split-card-cue" style={{ opacity: introOpacity }} aria-hidden="true">Desplázate para ver el proceso</motion.p>
      <motion.ol className="split-card-grid" style={{ y: cardsY, scale }}>
        {cards.map((card, index) => <motion.li key={card.title} className="split-card-panel"
          style={{ x: index === 0 ? leftX : index === 2 ? rightX : 0, rotateY,
            rotateZ: index === 0 ? leftTilt : index === 2 ? rightTilt : 0 }}>
          <motion.div className={`split-card-front split-card-front-${index}`} aria-hidden="true"
            style={{ borderRadius: [leftRadius, centerRadius, rightRadius][index] }}>
            <div style={{ backgroundImage: `url(${imageSrc})`, left: `${-100 * index}%` }} />
          </motion.div>
          <div className="process-back split-card-back">
            {card.icon}<h3>{card.title}</h3><p>{card.description}</p>
          </div>
        </motion.li>)}
      </motion.ol>
      <motion.p className="split-card-outro" style={{ opacity: outroOpacity, y: outroY }} aria-hidden="true">
        Los indicadores parten de datos que puedes verificar.
      </motion.p>
    </div>
  </div>;
}
