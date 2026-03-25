import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import ScrollHero from './components/ScrollHero';
import nightFrameManifest from './generated/night-ezgif-manifest.json';

const whatsappNumber = '919446482881';
const navLogo = '/Scoot logo white.png';
const instagramUrl =
  'https://www.instagram.com/scoot_vacations?igsh=MWxsM3oydW1teDZkZQ==';
const navLinks = [
  { label: 'Services', target: '#services' },
  { label: 'Why Scoot', target: '#why-scoot' },
  { label: 'Instagram', target: '#instagram' },
  { label: 'Contact', target: '#contact' },
];

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
  { label: 'scootvacations@gmail.com', href: 'mailto:scootvacations@gmail.com' },
  { label: '+91 94464 82881', href: 'tel:+919446482881' },
  { label: '+91 95263 72881', href: 'tel:+919526372881' },
  { label: '+91 95441 21932', href: 'tel:+919544121932' },
  { label: '@scoot_vacations', href: instagramUrl, external: true },
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

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [introProgress, setIntroProgress] = useState(0);
  const [memoryProgress, setMemoryProgress] = useState(0);
  const introSectionRef = useRef(null);
  const memorySectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
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
      const nextMemoryProgress = readSectionProgress(memorySectionRef, 0.88, 0.24);

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

  const scrollToSection = (selector) => {
    document
      .querySelector(selector)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openWhatsApp = (message) => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
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
      <nav className={`navbar${isScrolled ? ' navbar-scrolled' : ''}`}>
        <div className="container nav-shell">
          <button
            type="button"
            className="logo logo-button"
            aria-label="Scoot Vacations home"
            onClick={() => scrollToSection('#home')}
          >
            <img src={navLogo} alt="Scoot Vacations" className="logo-image" />
          </button>

          <div className="nav-links" aria-label="Primary navigation">
            {navLinks.map((item) => (
              <button
                key={item.label}
                type="button"
                className="nav-link"
                onClick={() => scrollToSection(item.target)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="btn btn-primary nav-primary"
            onClick={() =>
              openWhatsApp(
                'Hello Scoot Vacations, I want help planning the right trip for me.'
              )
            }
          >
            Plan a Trip
          </button>
        </div>
      </nav>

      <ScrollHero
        frameUrls={nightFrameManifest}
        onExplorePackages={() => scrollToSection('#services')}
        onOpenWhatsApp={() =>
          openWhatsApp(
            'Hello Scoot Vacations, I want help planning the right trip for me.'
          )
        }
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
            </div>

            <div className="services-list">
              {services.map((service, index) => (
                <article key={service.title} className="service-row">
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
                style={getSectionBodyStyle(memoryProgress, 0.08, 0.24, 0, 18)}
              >
                {memorySequence.kicker}
              </div>
              <div className="memory-title" aria-label="Complimentary Videographer">
                <span
                  className="memory-title-line"
                  style={getSectionLineStyle(memoryProgress, 0.14, 0.34, 156, 34)}
                >
                  {memorySequence.titlePrimary}
                </span>
                <span
                  className="memory-title-line memory-title-line-highlight"
                  style={getSectionLineStyle(memoryProgress, 0.24, 0.44, -136, 34)}
                >
                  {memorySequence.titleSecondary}
                </span>
              </div>
              <span
                className="memory-lead"
                style={getSectionBodyStyle(memoryProgress, 0.36, 0.54, 66, 14)}
              >
                {memorySequence.lead}
              </span>
              <span
                className="memory-body"
                style={getSectionBodyStyle(memoryProgress, 0.44, 0.62, 82, 18)}
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
              <div className="section-kicker">Why Scoot</div>
              <h2>Useful reasons to trust the trip.</h2>
              <p>
                The experience stays simple, supportive, and worth choosing from
                the first enquiry onward.
              </p>
            </div>

            <div className="why-list">
              {reasons.map((reason, index) => (
                <article key={reason.title} className="why-row">
                  <span className="why-row-index">0{index + 1}</span>
                  <h3>{reason.title}</h3>
                  <p>{reason.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="instagram" className="section instagram-section">
          <div className="container instagram-shell">
            <div className="instagram-intro">
              <div className="instagram-copy">
                <div className="section-kicker">Instagram</div>
                <h2>Trip frames worth following.</h2>
                <p>
                  Placeholder travel photos for now. The section is ready for real
                  Scoot trip moments later.
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
                  className={`instagram-card instagram-card-${index + 1}`}
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open Scoot Vacations Instagram: ${photo.label}`}
                >
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
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
                <h2>Start the trip with one clear message.</h2>
                <p>
                  Reach out for routes, dates, group plans, stays, or a custom trip
                  idea. Scoot can take it forward from there.
                </p>

                <div className="contact-actions">
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                  >
                    Chat on WhatsApp
                  </a>
                  <a
                    href="mailto:scootvacations@gmail.com"
                    className="btn btn-outline contact-outline"
                  >
                    Email Scoot
                  </a>
                </div>
              </div>

              <div className="contact-details">
                {contactLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noreferrer' : undefined}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-shell">
          <p>Scoot Vacations</p>
          <div className="footer-links">
            <a href="#services" onClick={(event) => {
              event.preventDefault();
              scrollToSection('#services');
            }}>
              Services
            </a>
            <a href="#contact" onClick={(event) => {
              event.preventDefault();
              scrollToSection('#contact');
            }}>
              Contact
            </a>
            <a href={instagramUrl} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
