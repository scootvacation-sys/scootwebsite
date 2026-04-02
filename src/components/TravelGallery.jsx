import { useEffect, useRef, useState } from 'react';
import galleryItems from '../generated/travel-gallery-manifest.json';
import './TravelGallery.css';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const clampNumber = (value, min, max) => Math.min(max, Math.max(min, value));

const getTrackMetrics = (viewportWidth) => {
  if (viewportWidth <= 520) {
    return {
      cardWidth: clampNumber(viewportWidth * 0.45, 168, 220),
      gap: 12,
      edgeFocus: 0.95,
      curve: 16,
      tilt: 7.5,
      drift: 10,
    };
  }

  if (viewportWidth <= 760) {
    return {
      cardWidth: clampNumber(viewportWidth * 0.35, 202, 258),
      gap: 14,
      edgeFocus: 1.05,
      curve: 18,
      tilt: 8.2,
      drift: 12,
    };
  }

  if (viewportWidth <= 1120) {
    return {
      cardWidth: clampNumber(viewportWidth * 0.255, 246, 316),
      gap: 18,
      edgeFocus: 1.22,
      curve: 21,
      tilt: 9,
      drift: 14,
    };
  }

  return {
    cardWidth: clampNumber(viewportWidth * 0.205, 300, 380),
    gap: 22,
    edgeFocus: 1.45,
    curve: 24,
    tilt: 9.5,
    drift: 16,
  };
};

const getCardStyle = (index, focusFloat, metrics) => {
  const diff = index - focusFloat;
  const absDiff = Math.abs(diff);
  const centerLift = clamp(1 - absDiff / 1.55, 0, 1) * -16;
  const translateY = Math.pow(absDiff, 1.34) * metrics.curve + centerLift;
  const translateZ = -Math.min(absDiff * 44, 168);
  const rotateY = diff * -metrics.tilt;
  const rotateZ = diff * -0.42;
  const scale = 1.04 - Math.min(absDiff * 0.074, 0.24);
  const opacity = clamp(1.03 - absDiff * 0.13, 0.16, 1);
  const blur = Math.max(absDiff - 3.1, 0) * 0.5;
  const brightness = 0.9 + clamp(1 - absDiff / 2.2, 0, 1) * 0.18;
  const saturation = 0.92 + clamp(1 - absDiff / 2.4, 0, 1) * 0.14;

  return {
    opacity: opacity.toFixed(3),
    zIndex: String(Math.round(300 - absDiff * 22)),
    transform: `translate3d(0, ${translateY.toFixed(2)}px, ${translateZ.toFixed(
      0
    )}px) rotateY(${rotateY.toFixed(
      2
    )}deg) rotateZ(${rotateZ.toFixed(2)}deg) scale(${scale.toFixed(3)})`,
    filter: `blur(${blur.toFixed(2)}px) brightness(${brightness.toFixed(
      3
    )}) saturate(${saturation.toFixed(3)})`,
  };
};

function TravelGallery() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window === 'undefined' ? 1440 : window.innerWidth
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    let frameId = 0;

    const syncMetrics = () => {
      frameId = 0;
      setViewportWidth(window.innerWidth);

      if (!sectionRef.current) {
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const travel = Math.max(rect.height - viewportHeight, 1);
      const nextProgress = clamp(
        (viewportHeight * 0.14 - rect.top) / (travel + viewportHeight * 0.18),
        0,
        1
      );

      setProgress((current) =>
        Math.abs(current - nextProgress) > 0.004 ? nextProgress : current
      );
    };

    const requestSync = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(syncMetrics);
      }
    };

    syncMetrics();
    window.addEventListener('scroll', requestSync, { passive: true });
    window.addEventListener('resize', requestSync);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener('scroll', requestSync);
      window.removeEventListener('resize', requestSync);
    };
  }, []);

  const metrics = getTrackMetrics(viewportWidth);
  const step = metrics.cardWidth + metrics.gap;
  const travelSpan = Math.max(
    galleryItems.length - 1 - metrics.edgeFocus * 2,
    0
  );
  const focusFloat = metrics.edgeFocus + progress * travelSpan;
  const activeIndex = Math.round(focusFloat);
  const phase = progress * 2 - 1;
  const sweepOffset = phase * viewportWidth * 0.14;
  const trackTranslateX =
    viewportWidth / 2 -
    (focusFloat * step + metrics.cardWidth / 2) +
    sweepOffset;
  const trackTranslateY = (0.5 - progress) * metrics.drift;
  const trackScale = 0.965 + progress * 0.045;
  const activeItem = galleryItems[activeIndex] ?? galleryItems[0] ?? null;
  const introProgress = clamp(progress / 0.18, 0, 1);

  return (
    <section id="gallery" ref={sectionRef} className="gallery-section">
      <div className="gallery-shell">
        <div className="gallery-sticky">
          {activeItem ? (
            <div className="gallery-backdrop" aria-hidden="true">
              <img
                key={activeItem.id}
                src={activeItem.src}
                alt=""
                className="gallery-backdrop-image"
                style={{
                  transform: `scale(${(1.08 - progress * 0.04).toFixed(
                    3
                  )}) translate3d(${((progress - 0.5) * 6.2).toFixed(2)}vw, ${(
                    (0.5 - progress) *
                    2.2
                  ).toFixed(2)}vh, 0)`,
                }}
              />
            </div>
          ) : null}

          <div className="container gallery-scene">
            <div className="gallery-copy">
              <div className="section-kicker section-kicker-light">
                Travel Gallery
              </div>
              <h2
                style={{
                  opacity: (0.8 + introProgress * 0.2).toFixed(3),
                  transform: `translate3d(0, ${(18 - introProgress * 18).toFixed(
                    2
                  )}px, 0)`,
                }}
              >
                Every journey leaves a{' '}
                <span className="gallery-copy-accent">story.</span>
              </h2>
              <p
                style={{
                  opacity: (0.68 + introProgress * 0.32).toFixed(3),
                  transform: `translate3d(0, ${(12 - introProgress * 12).toFixed(
                    2
                  )}px, 0)`,
                }}
              >
                Explore real moments captured during Scoot Vacations trips
                across beautiful destinations.
              </p>
            </div>
          </div>

          <div className="gallery-stage">
            <div className="gallery-track-wrap">
              <div
                className="gallery-track"
                style={{
                  gap: `${metrics.gap}px`,
                  transform: `translateX(${trackTranslateX.toFixed(
                    2
                  )}px) translateY(calc(-50% + ${trackTranslateY.toFixed(
                    2
                  )}px)) scale(${trackScale.toFixed(3)})`,
                }}
              >
                {galleryItems.map((item, index) => {
                  const absDiff = Math.abs(index - focusFloat);

                  return (
                    <figure
                      key={item.id}
                      className={`gallery-card${
                        index === activeIndex ? ' is-active' : ''
                      }${absDiff > (viewportWidth <= 760 ? 4 : 5.1) ? ' is-distant' : ''}`}
                      style={{
                        width: `${metrics.cardWidth}px`,
                        ...getCardStyle(index, focusFloat, metrics),
                      }}
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading={index < 5 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    </figure>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TravelGallery;
