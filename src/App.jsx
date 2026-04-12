import {
  ArrowRight,
  Mail,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import ChatbotWidget from './components/ChatbotWidget';
import LegalPage from './components/LegalPage';
import SiteFooter from './components/SiteFooter';
import SiteHeader from './components/SiteHeader';
import ScrollHero from './components/ScrollHero';
import TravelGallery from './components/TravelGallery';
import nightFrameManifest from './generated/night-ezgif-manifest.json';
import { legalPages } from './legalContent';
import { buildWhatsAppLink, defaultPlanMessage, instagramUrl } from './siteConfig';

const services = [
  {
    title: 'Tour Packages',
    description: 'Short escapes, longer routes, and easy planning from the first message.',
    image: '/images/tour-packages.webp',
    imagePosition: 'center center',
  },
  {
    title: 'College Trips',
    description: 'Group departures shaped to feel organized, fun, and easy to move through.',
    image: '/images/college-trip.webp',
    imagePosition: 'center center',
  },
  {
    title: 'Resort Bookings',
    description: 'Stay-led getaways with calmer planning and cleaner choices.',
    image: '/images/resort.webp',
    imagePosition: 'center center',
  },
  {
    title: 'Bus Bookings',
    description: 'Transport handled clearly so the trip does not turn messy before it starts.',
    image: '/images/bus-booking.webp',
    imagePosition: 'center center',
  },
  {
    title: 'Custom Travel Planning',
    description: 'Routes, stays, and timing arranged around the people taking the trip.',
    image: '/images/custom-travel-planning.webp',
    imagePosition: 'center center',
  },
];

const reasons = [
  {
    title: 'Seamless planning',
    description: 'Stay, route, and movement are handled as one trip instead of separate tasks.',
  },
  {
    title: 'Affordable packages',
    description: 'The plan stays practical without losing the feeling that it is worth taking.',
  },
  {
    title: 'Memorable group experiences',
    description: 'Scoot works best when the journey feels shared, easy, and well paced.',
  },
  {
    title: 'Professional trip coverage',
    description: 'Selected trips include a complimentary videographer to keep the memory properly.',
  },
  {
    title: 'Friendly guidance and support',
    description: 'The process stays helpful and human from enquiry to return.',
  },
];

const contactLinks = [
  {
    label: 'scootvacations@gmail.com',
    href: 'mailto:scootvacations@gmail.com',
    icon: Mail,
  },
  {
    label: '+91 94464 82881',
    href: 'tel:+919446482881',
    icon: Phone,
    iconClassName: 'contact-icon-ringing',
  },
  { label: '+91 95263 72881', href: 'tel:+919526372881', icon: Phone },
  { label: '+91 95441 21932', href: 'tel:+919544121932', icon: Phone },
];

const memorySequence = {
  kicker: 'Included on selected trips',
  titlePrimary: 'Complimentary',
  titleSecondary: 'Videographer',
  lead: 'Stay inside the trip.',
  body:
    'Scoot keeps the memory moving quietly in the background so the journey still feels like yours while it is being captured.',
};

const instagramPhotos = [
  {
    src: '/images/instagram-routes.webp',
    label: 'Routes',
    alt: 'Scoot Vacations trip route',
  },
  {
    src: '/images/instagram-resorts.webp',
    label: 'Resorts',
    alt: 'Scoot Vacations resort stay',
  },
  {
    src: '/images/instagram-escapes.webp',
    label: 'Escapes',
    alt: 'Scoot Vacations getaway',
  },
  {
    src: '/images/instagram-views.webp',
    label: 'Views',
    alt: 'Scoot Vacations scenic view',
  },
];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const normalizePath = (pathname) => {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.replace(/\/+$/, '') || '/';
};

function HomePage() {
  const [cursorEnabled, setCursorEnabled] = useState(false);
  const [activeServiceIndex, setActiveServiceIndex] = useState(-1);
  const [activeWhyIndex, setActiveWhyIndex] = useState(-1);
  const [introProgress, setIntroProgress] = useState(0);
  const [memoryProgress, setMemoryProgress] = useState(0);
  const introSectionRef = useRef(null);
  const memorySectionRef = useRef(null);
  const serviceRowRefs = useRef([]);
  const whyRowRefs = useRef([]);
  const instagramCardRefs = useRef([]);
  const cursorRingRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    let animationFrame = 0;
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let ringX = currentX;
    let ringY = currentY;

    const setCursorClass = (className, shouldAdd) => {
      cursorRingRef.current?.classList.toggle(className, shouldAdd);
    };

    const animateCursor = () => {
      ringX += (currentX - ringX) * 0.16;
      ringY += (currentY - ringY) * 0.16;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      animationFrame = window.requestAnimationFrame(animateCursor);
    };

    const syncInteractiveState = (target) => {
      const isInteractive = Boolean(
        target?.closest?.(
          'a, button, [role="button"], .btn, input, textarea, select, summary, label'
        )
      );
      setCursorClass('is-active', isInteractive);
    };

    const handlePointerMove = (event) => {
      currentX = event.clientX;
      currentY = event.clientY;
      setCursorClass('is-visible', true);
      const hoveredElement =
        document.elementFromPoint(event.clientX, event.clientY) || event.target;
      syncInteractiveState(hoveredElement);
    };

    const handlePointerLeave = () => {
      setCursorClass('is-visible', false);
      setCursorClass('is-active', false);
      setCursorClass('is-pressed', false);
    };

    const handlePointerDown = () => setCursorClass('is-pressed', true);
    const handlePointerUp = () => setCursorClass('is-pressed', false);

    const enableCursor = () => {
      setCursorEnabled(true);
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(animateCursor);
      }
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      window.addEventListener('pointerdown', handlePointerDown, { passive: true });
      window.addEventListener('pointerup', handlePointerUp, { passive: true });
      window.addEventListener('pointerleave', handlePointerLeave);
      document.addEventListener('mouseleave', handlePointerLeave);
    };

    const disableCursor = () => {
      setCursorEnabled(false);
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('mouseleave', handlePointerLeave);
    };

    const handleMediaChange = (event) => {
      if (event.matches) {
        enableCursor();
      } else {
        disableCursor();
      }
    };

    if (mediaQuery.matches) {
      enableCursor();
    } else {
      disableCursor();
    }

    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      disableCursor();
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    let frameId = 0;

    const syncActiveServiceIndex = () => {
      const rows = serviceRowRefs.current.filter(Boolean);
      if (!rows.length) {
        return;
      }

      const triggerLine = (window.innerHeight || 1) * 0.56;
      let nextIndex = -1;

      rows.forEach((row, index) => {
        const rect = row.getBoundingClientRect();

        if (rect.top <= triggerLine) {
          nextIndex = index;
        }
      });

      setActiveServiceIndex((current) =>
        current !== nextIndex ? nextIndex : current
      );
    };

    const syncActiveWhyIndex = () => {
      const rows = whyRowRefs.current.filter(Boolean);
      if (!rows.length) {
        return;
      }

      const viewportHeight = window.innerHeight || 1;
      const triggerLine =
        viewportHeight * (window.innerWidth <= 760 ? 0.78 : 0.56);
      let nextIndex = -1;

      rows.forEach((row, index) => {
        const rect = row.getBoundingClientRect();

        if (rect.top <= triggerLine) {
          nextIndex = index;
        }
      });

      setActiveWhyIndex((current) => (current !== nextIndex ? nextIndex : current));
    };

    const requestSync = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(() => {
          frameId = 0;
          syncActiveServiceIndex();
          syncActiveWhyIndex();
        });
      }
    };

    syncActiveServiceIndex();
    syncActiveWhyIndex();
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

  useEffect(() => {
    let frameId = 0;

    const readSectionProgress = (ref, startFactor, endRatio) => {
      if (!ref.current) {
        return null;
      }

      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const start = viewportHeight * startFactor;
      const end = -rect.height * endRatio;

      return clamp((start - rect.top) / (start - end), 0, 1);
    };

    const syncSectionProgress = () => {
      frameId = 0;

      const nextIntroProgress = readSectionProgress(introSectionRef, 0.86, 0.28);
      const nextMemoryProgress = readSectionProgress(memorySectionRef, 0.74, 0.2);

      if (nextIntroProgress !== null) {
        setIntroProgress((current) =>
          Math.abs(current - nextIntroProgress) > 0.008 ? nextIntroProgress : current
        );
      }

      if (nextMemoryProgress !== null) {
        setMemoryProgress((current) =>
          Math.abs(current - nextMemoryProgress) > 0.008
            ? nextMemoryProgress
            : current
        );
      }
    };

    const requestSync = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(syncSectionProgress);
      }
    };

    syncSectionProgress();
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

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    let frameId = 0;

    const syncInstagramCardOffsets = () => {
      frameId = 0;

      const cards = instagramCardRefs.current.filter(Boolean);
      if (!cards.length) {
        return;
      }

      if (window.innerWidth > 760) {
        cards.forEach((card) => {
          card.style.setProperty('--instagram-shift-x', '0px');
        });
        return;
      }

      const viewportHeight = window.innerHeight || 1;
      const maxOffset = window.innerWidth <= 520 ? 20 : 26;
      const start = viewportHeight * 0.96;
      const end = viewportHeight * 0.58;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const progress = clamp((start - rect.top) / (start - end), 0, 1);
        const eased = progress * (2 - progress);
        const direction = index % 2 === 0 ? -1 : 1;
        const offset = ((1 - eased) * maxOffset * direction).toFixed(2);
        card.style.setProperty('--instagram-shift-x', `${offset}px`);
      });
    };

    const requestSync = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(syncInstagramCardOffsets);
      }
    };

    syncInstagramCardOffsets();
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

  const scrollToSection = (selector) => {
    document
      .querySelector(selector)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openWhatsApp = (message) => {
    window.open(buildWhatsAppLink(message), '_blank');
  };

  const getSectionRevealProgress = (sectionProgress, start, end) => {
    const progress = clamp((sectionProgress - start) / (end - start), 0, 1);
    return 1 - (1 - progress) ** 3;
  };

  const getSectionLineStyle = (
    sectionProgress,
    start,
    end,
    offsetX,
    offsetY
  ) => {
    const eased = getSectionRevealProgress(sectionProgress, start, end);

    return {
      transform: `translate3d(${(1 - eased) * offsetX}px, ${(1 - eased) * offsetY}px, 0) scale(${
        0.985 + eased * 0.015
      })`,
      letterSpacing: `${0.01 - eased * 0.01}em`,
    };
  };

  const getSectionBodyStyle = (
    sectionProgress,
    start,
    end,
    offsetX,
    offsetY
  ) => {
    const eased = getSectionRevealProgress(sectionProgress, start, end);

    return {
      transform: `translate3d(${(1 - eased) * offsetX}px, ${(1 - eased) * offsetY}px, 0)`,
    };
  };

  return (
    <div className="app">
      <SiteHeader />

      <ScrollHero
        frameUrls={nightFrameManifest}
        onExplorePackages={() => scrollToSection('#services')}
        onOpenWhatsApp={() => openWhatsApp(defaultPlanMessage)}
      />

      <main>
        <section ref={introSectionRef} className="intro-section">
          <div className="intro-sticky">
            <div className="container intro-shell">
              <div className="section-kicker section-kicker-light intro-kicker">
                Scoot Vacations
              </div>
              <div
                className="intro-title"
                aria-label="Trips made easier to plan and better to remember."
              >
                <span
                  className="intro-title-line"
                  style={getSectionLineStyle(introProgress, 0.12, 0.32, 168, 36)}
                >
                  Trips made easier
                </span>
                <span
                  className="intro-title-line"
                  style={getSectionLineStyle(introProgress, 0.2, 0.4, -152, 36)}
                >
                  to plan and better
                </span>
                <span
                  className="intro-title-line intro-title-line-soft"
                  style={getSectionLineStyle(introProgress, 0.28, 0.48, 124, 36)}
                >
                  to remember.
                </span>
              </div>
              <div className="intro-body-shell">
                <button
                  type="button"
                  className="intro-rail-cta"
                  onClick={() => scrollToSection('#services')}
                >
                  Explore services
                  <ArrowRight className="intro-inline-cta-arrow" size={14} />
                </button>
                <p
                  className="intro-body"
                  style={getSectionBodyStyle(introProgress, 0.42, 0.62, 88, 18)}
                >
                  Tour packages, group departures, stays, and travel support
                  arranged with more clarity and less noise.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section services-section">
          <div className="container services-shell">
            <div className="services-intro">
              <div className="section-kicker">What Scoot Handles</div>
              <h2>Five service lines, kept clear and travel-first.</h2>
              <p>
                Packages, group departures, stays, transport, and custom planning
                arranged with less clutter and more control.
              </p>
              <a
                href="/scoot-brochure.pdf"
                target="_blank"
                rel="noreferrer"
                className="services-brochure-link"
              >
                Download brochure
                <ArrowRight size={15} />
              </a>
            </div>

            <div className="services-list">
              {services.map((service, index) => (
                <article
                  key={service.title}
                  ref={(node) => {
                    serviceRowRefs.current[index] = node;
                  }}
                  className={`service-row${
                    index <= activeServiceIndex ? ' is-active' : ''
                  }`}
                >
                  <span className="service-index">0{index + 1}</span>
                  <div className="service-visual">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      style={{ objectPosition: service.imagePosition }}
                    />
                  </div>
                  <div className="service-copy">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section ref={memorySectionRef} className="section memory-section">
          <div className="container memory-shell">
            <div className="memory-copy">
              <div
                className="section-kicker memory-kicker"
                style={getSectionBodyStyle(memoryProgress, 0.16, 0.32, 0, 10)}
              >
                {memorySequence.kicker}
              </div>
              <div className="memory-title" aria-label="Complimentary Videographer">
                <span
                  className="memory-title-line"
                  style={getSectionLineStyle(memoryProgress, 0.22, 0.42, 62, 16)}
                >
                  {memorySequence.titlePrimary}
                </span>
                <span
                  className="memory-title-line memory-title-line-highlight"
                  style={getSectionLineStyle(memoryProgress, 0.3, 0.5, -56, 16)}
                >
                  {memorySequence.titleSecondary}
                </span>
              </div>
              <span
                className="memory-lead"
                style={getSectionBodyStyle(memoryProgress, 0.42, 0.58, 28, 8)}
              >
                {memorySequence.lead}
              </span>
              <span
                className="memory-body"
                style={getSectionBodyStyle(memoryProgress, 0.5, 0.68, 34, 10)}
              >
                {memorySequence.body}
              </span>
            </div>

            <div className="memory-visual">
              <img
                src="/images/videographer-2.webp"
                alt="Scoot Vacations trip memory capture"
              />
            </div>
          </div>
        </section>

        <section id="why-scoot" className="section why-section">
          <div className="container why-shell">
            <div className="why-intro">
              <div className="section-kicker why-kicker" aria-label="Why Scoot">
                <span>Why</span>
                <svg
                  aria-hidden="true"
                  className={`why-kicker-logo${
                    activeWhyIndex >= 0 ? ' is-accented' : ''
                  }`}
                  viewBox="0 110 346 140"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M24.72,179.3c-10.46-9.93,6.71-16.37,20.79-12.88,0,0,0-.13-2.68-18.51-19.86,2.01-43.87,3.76-42.79,28.71,1.07,27.1,46.42,15.56,41.05,40.11-6.31,10.87-21.6,7.92-31.12,7.11l1.88,18.65c23.61.54,50.98-3.76,49.91-27.1-1.34-29.65-20.39-23.75-37.03-36.09"
                  />
                  <path
                    fill="currentColor"
                    d="M102.82,213.37c-13.42,0-16.77-17.71-12.74-26.83,8.18-18.51,26.56-10.73,34.75-6.04l-.4-20.79c-14.49-7.65-32.87-10.6-45.88.94-8.99,7.78-12.88,22.94-12.88,34.07,0,36.89,35.95,50.85,67.35,28.84l-9.12-19.32c-5.23,3.09-13.42,9.12-21.06,9.12"
                  />
                  <path
                    fill="currentColor"
                    d="M170.7,147.91c-29.38,0-39.71,21.47-39.44,48.97.27,25.49,18.65,37.16,37.03,36.22,18.65-1.07,37.16-15.16,37.43-41.32.13-21.73-9.79-43.87-35.01-43.87M168.56,211.63c-9.66,0-16.37-7.38-16.37-18.65.27-13.28,6.57-23.61,17.04-23.61,22.4,2.82,21.2,42.26-.67,42.26"
                  />
                  <path
                    fill="currentColor"
                    d="M248.44,156.33c-26.48,0-35.79,19.34-35.54,44.13.24,22.97,16.8,33.49,33.37,32.64,16.81-.97,33.49-13.66,33.73-37.24.12-19.59-8.83-39.53-31.55-39.53M246.5,213.76c-8.7,0-14.75-6.65-14.75-16.81.24-11.97,5.92-21.28,15.35-21.28,20.19,2.54,19.1,38.08-.6,38.08"
                  />
                  <polygon
                    fill="currentColor"
                    points="340.57 151.93 322.36 151.1 322.6 130.28 305.01 125.41 302.58 150.2 281.81 149.25 280.73 170.44 299.52 170.85 298.71 232.96 322.46 232.29 322.05 172.46 338.96 173.4 340.57 151.93"
                  />
                  <path
                    fill="currentColor"
                    d="M252.14,148.1l-10.74-5.42-5.92,2.24.1.02c-.06,0-.11.01-.17.02l3.12-2.73c-12.78-13.67-24.81-35.05-24.81-35.05-1.01,20.5,9.15,38.27,11.13,41.52-5.81,3.95-12.74,11.15-13.6,25.29,0,0,5.53-28.05,40.93-25.87,0,0-.01,0-.03-.01"
                  />
                  <path
                    fill="currentColor"
                    d="M234.06,113.62s-4.23,6.52-5.29,12.1l8.97,12.54s-3.4-8.84-3.68-24.64"
                  />
                </svg>
              </div>
              <h2>
                Useful reasons to trust the trip
                <span className="why-title-dot">.</span>
              </h2>
              <p>
                The experience stays simple, supportive, and worth choosing from
                the first enquiry onward.
              </p>
            </div>

            <div className="why-list">
              {reasons.map((reason, index) => (
                <article
                  key={reason.title}
                  ref={(node) => {
                    whyRowRefs.current[index] = node;
                  }}
                  className={`why-row${index <= activeWhyIndex ? ' is-active' : ''}`}
                >
                  <span className="why-row-index">0{index + 1}</span>
                  <h3>{reason.title}</h3>
                  <p>{reason.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <TravelGallery />

        <section id="instagram" className="section instagram-section">
          <div className="container instagram-shell">
            <div className="instagram-intro">
              <div className="instagram-copy">
                <div className="section-kicker">Instagram</div>
                <h2>
                  Trip <span className="instagram-accent">frames</span> worth
                  following.
                </h2>
                <p>
                  Follow Scoot for route drops, quick trip updates, and lighter
                  moments that keep the next escape in sight.
                </p>
              </div>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="instagram-handle"
              >
                @scoot_vacations
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="instagram-grid">
              {instagramPhotos.map((photo, index) => (
                <a
                  key={photo.src}
                  ref={(node) => {
                    instagramCardRefs.current[index] = node;
                  }}
                  className={`instagram-card instagram-card-${index + 1}`}
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open Scoot Vacations Instagram: ${photo.label}`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="eager"
                    decoding="async"
                  />
                  <span className="instagram-card-label">{photo.label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container">
            <div className="contact-shell">
              <img
                src="/images/city-break.jpg"
                alt="Scoot Vacations destination view"
                className="contact-backdrop"
              />

              <div className="contact-copy">
                <div className="section-kicker section-kicker-light">
                  Plan With Scoot
                </div>
                <h2>
                  Start the trip with one clear{' '}
                  <span className="contact-title-accent">message.</span>
                </h2>
                <p>
                  Reach out for routes, dates, group plans, stays, or a custom trip
                  idea. Scoot can take it forward from there.
                </p>

                <div className="contact-actions">
                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                  >
                    <MessageCircle size={18} strokeWidth={2.1} />
                    Chat on WhatsApp
                  </a>
                  <a
                    href="mailto:scootvacations@gmail.com"
                    className="btn btn-outline contact-outline"
                  >
                    <Mail size={18} strokeWidth={2.1} />
                    Email Scoot
                  </a>
                </div>
              </div>

              <div className="contact-details">
                {contactLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noreferrer' : undefined}
                    >
                      <Icon
                        size={18}
                        strokeWidth={2.1}
                        aria-hidden="true"
                        className={item.iconClassName}
                      />
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      {cursorEnabled ? (
        <div ref={cursorRingRef} className="custom-cursor" aria-hidden="true" />
      ) : null}

      <ChatbotWidget />
    </div>
  );
}

function App() {
  const pathname =
    typeof window === 'undefined'
      ? '/'
      : normalizePath(window.location.pathname);

  if (legalPages[pathname]) {
    return <LegalPage pathname={pathname} />;
  }

  return <HomePage />;
}

export default App;
