import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Camera,
  Download,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  X,
} from 'lucide-react';
import './App.css';
import ScrollHero from './components/ScrollHero';
import nightFrameManifest from './generated/night-ezgif-manifest.json';

const whatsappNumber = '919446482881';
const guidePath = '/scoot-brochure.pdf';
const instagramUrl =
  'https://www.instagram.com/scoot_vacations?igsh=MWxsM3oydW1teDZkZQ==';
const brandAssets = {
  navLogo: '/Scoot logo white.png',
  footerLogo: '/Scoot logo white.png',
};

const imagePaths = {
  coastalEscape: '/images/coastal-escape.jpg',
  mountainCircuit: '/images/mountain-circuit.jpg',
  groupTrip: '/images/group-trip.jpg',
  forestRoute: '/images/forest-route.jpg',
  cityBreak: '/images/city-break.jpg',
  tajRoute: '/images/taj-route.jpg',
  kashmirEscape: '/images/kashmir-escape.jpg',
  resortStay: '/images/resort-stay.jpg',
  dayGetaway: '/images/day-getaway.jpg',
};

const navItems = [
  { label: 'Why Scoot', href: '#about' },
  { label: 'Packages', href: '#packages' },
  { label: 'North India', href: '#north-india' },
  { label: 'Contact', href: '#contact' },
];

const serviceLines = [
  'Tour Packages',
  'College Trips',
  'Resort Bookings',
  'Bus Bookings',
  'Custom Travel Planning',
];

const serviceShowcase = [
  {
    title: 'Tour Packages',
    note: 'Short escapes to longer circuits, with clean route planning from the start.',
    image: imagePaths.coastalEscape,
    detail: ['1 Day', '2 Days', '3 Days', '4 Days', 'North India'],
  },
  {
    title: 'College Trips',
    note: 'Group-friendly planning that keeps the energy high and the logistics easier.',
    image: imagePaths.groupTrip,
  },
  {
    title: 'Resort Booking',
    note: 'Stay-led getaways for people who want the weekend to feel calmer and more polished.',
    image: imagePaths.resortStay,
  },
  {
    title: 'Bus Booking',
    note: 'Travel coordination without scattered calls, vendor confusion, or last-minute stress.',
    image: imagePaths.forestRoute,
  },
  {
    title: 'Custom Travel Planning',
    note: 'Destination, timing, stay, and support shaped around the group instead of a fixed template.',
    image: imagePaths.mountainCircuit,
  },
];

const whyScootReasons = [
  {
    title: 'Seamless planning',
    text: 'Route, stay, transport, and coordination are handled like one trip, not separate tasks.',
  },
  {
    title: 'Affordable packages',
    text: 'The trip stays practical on budget without losing the feeling that it was worth taking.',
  },
  {
    title: 'Memorable group experiences',
    text: 'Scoot is strongest when the journey feels shared, smooth, and easy to enjoy together.',
  },
  {
    title: 'Professional trip coverage',
    text: 'A built-in videographer changes the experience because the group can stay present on the road.',
  },
  {
    title: 'Friendly guidance and support',
    text: 'From first enquiry to final stop, the tone stays helpful, clear, and human.',
  },
];

const experienceBlocks = [
  {
    title: 'Group Trips',
    note: 'Built for shared energy and easy movement.',
    image: imagePaths.groupTrip,
  },
  {
    title: 'College Tours',
    note: 'Structured enough to feel smooth, open enough to stay fun.',
    image: imagePaths.forestRoute,
  },
  {
    title: 'Family Trips',
    note: 'Comfort-first routes with less planning stress.',
    image: imagePaths.cityBreak,
  },
  {
    title: 'Couple Getaways',
    note: 'Short escapes with stronger mood and better pace.',
    image: imagePaths.coastalEscape,
  },
  {
    title: 'Resort Escapes',
    note: 'Stay-led breaks for slower weekends and reset trips.',
    image: imagePaths.resortStay,
  },
];

const processSteps = ['Enquire', 'Plan', 'Book', 'Travel', 'Capture Memories'];

const trustSignals = [
  'Planned for groups, families, couples, and special getaways.',
  'Built for affordable travel that still feels well put together.',
  'Made for people who want the trip enjoyed first and remembered properly after.',
];

const durationCollections = [
  {
    key: 'one-day',
    tab: '1 Day',
    title: 'One Day Escapes',
    description: 'Quick scenic escapes that fit neatly into a single full day.',
    focus: 'Best for easy resets, compact group plans, and scenic same-day runs.',
    image: imagePaths.dayGetaway,
    accent: '#14748d',
    wash: 'rgba(20, 116, 141, 0.1)',
    interest: 'One Day Package',
    message: 'I want details for your one day package options.',
    routes: [
      'Kodaikkanal',
      'Munnar',
      'Coorg',
      'Mysore',
      'Chikmagalur',
      'Udupi',
      'Ooty',
      'Wagamon',
      'Ramakkalmedu',
      'Wayanad',
      'Trivandrum',
      'Mookambika',
    ],
  },
  {
    key: 'two-day',
    tab: '2 Days',
    title: 'Weekend Circuits',
    description: 'Balanced weekend departures with travel, stay, and sightseeing.',
    focus: 'Best for couples, friends, and short overnight trips that still feel full.',
    image: imagePaths.coastalEscape,
    accent: '#f2a44b',
    wash: 'rgba(242, 164, 75, 0.12)',
    interest: 'Two Day Package',
    message: 'I want details for your two day package options.',
    routes: [
      'Mysore - Coorg',
      'Mysore - Chikmagalur',
      'Udupi - Chikmagalur',
      'Udupi - Belur - Coorg',
      'Chikmagalur - Belur - Coorg',
      'Dandeli - Gokarna - Murudeshwar',
      'Udupi - Gokarna - Murudeshwar',
      'Munnar - Ramakkalmedu',
      'Munnar - Wagamon',
      'Ooty - Wayanad',
      'Mysore - Ooty',
      'Hogenakkal - Kodaikkanal',
      'Ramakkalmedu - Wagamon',
    ],
  },
  {
    key: 'three-day',
    tab: '3 Days',
    title: 'Long Weekend Routes',
    description: 'Longer circuits with broader coverage and stronger trip flow.',
    focus: 'Best for long weekends where the route needs a stronger sense of journey.',
    image: imagePaths.forestRoute,
    accent: '#6c7f3a',
    wash: 'rgba(108, 127, 58, 0.12)',
    interest: 'Three Day Package',
    message: 'I want details for your three day package options.',
    routes: [
      'Goa by Train or Bus',
      'Goa - Dandeli - Udupi - Gokarna',
      'Dandeli - Chikmagalur - Gokarna - Udupi',
      'Dandeli - Hampi - Gokarna',
      'Mysore - Chikmagalur - Coorg - Bengaluru',
      'Pondicherry - Yercaud',
      'Kodaikkanal - Yercaud - Pondicherry',
      'Munnar - Ramakkalmedu - Wagamon',
      'Kodaikkanal - Madurai - Rameswaram',
      'Trivandrum - Kanyakumari - Varkala',
      'Chennai - Pondicherry - Mahabalipuram',
    ],
  },
  {
    key: 'four-day',
    tab: '4 Days',
    title: 'Extended Escapes',
    description: 'Extended breaks for bigger cities and multi-stop routes.',
    focus: 'Best for wider itineraries with more distance, more stops, and more variety.',
    image: imagePaths.cityBreak,
    accent: '#0f415b',
    wash: 'rgba(15, 65, 91, 0.1)',
    interest: 'Four Day Package',
    message: 'I want details for your four day package options.',
    routes: [
      'Hyderabad',
      'Mumbai',
      'Goa - Dandeli - Udupi - Chikmagalur',
      'Hampi - Dandeli - Goa',
      'Dandeli - Gokarna - Goa',
      'Goa - Gokarna - Hampi',
    ],
  },
];

const northIndiaPackages = [
  {
    title: 'Delhi - Agra - Jaipur',
    subtitle: 'Golden Triangle',
    image: imagePaths.tajRoute,
    description: 'A landmark-led classic for travelers starting with North India.',
  },
  {
    title: 'Srinagar - Pahalgam - Gulmarg',
    subtitle: 'Kashmir Valley',
    image: imagePaths.kashmirEscape,
    description: 'Scenic stays built around valleys, mountains, and a calmer pace.',
  },
  {
    title: 'Ladakh - Sham Valley - Pangong',
    subtitle: 'Adventure Route',
    image: imagePaths.mountainCircuit,
    description: 'Open roads, dramatic views, and a signature mountain circuit.',
  },
];

const northIndiaRoutes = [
  'Delhi - Mandawa - Jaipur',
  'Delhi - Agra - Jaipur - Jodhpur - Udaipur',
  'Delhi - Varanasi - Agra - Jaipur - Ranakpur',
  'Jammu - Katra - Tirupati - Balaji Temple',
];

const contactNumbers = [
  { label: '+91 94464 82881', href: 'tel:+919446482881' },
  { label: '+91 95441 21932', href: 'tel:+919544121932' },
  { label: '+91 95263 72881', href: 'tel:+919526372881' },
];

const defaultFormData = {
  fullName: '',
  phone: '',
  interest: 'Package Inquiry',
  destination: '',
  email: '',
  message: '',
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showWhatsAppFloat, setShowWhatsAppFloat] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18);
      setShowWhatsAppFloat(window.scrollY > window.innerHeight * 1.2);
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
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleFieldChange = ({ target: { name, value } }) => {
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const scrollToSection = (selector) => {
    document
      .querySelector(selector)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
  };

  const handleNavClick = (event, selector) => {
    event.preventDefault();
    scrollToSection(selector);
  };

  const handleInquiryShortcut = (interest, destination = '', message = '') => {
    setFormData((current) => ({
      ...current,
      interest,
      destination,
      message: message || current.message,
    }));
    scrollToSection('#contact');
  };

  const openWhatsApp = (message) => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const inquiryLines = [
      'Hello Scoot Vacations,',
      '',
      `Name: ${formData.fullName}`,
      `Phone: ${formData.phone}`,
      `Interested in: ${formData.interest}`,
      formData.destination ? `Destination / Package: ${formData.destination}` : '',
      formData.email ? `Email: ${formData.email}` : '',
      formData.message ? `Message: ${formData.message}` : '',
    ].filter(Boolean);

    openWhatsApp(inquiryLines.join('\n'));
  };

  return (
    <div className="app">
      <nav className={`navbar${isScrolled ? ' navbar-scrolled' : ''}`}>
        <div className="container nav-shell">
          <a
            href="#home"
            className="logo"
            aria-label="Scoot Vacations home"
            onClick={(event) => handleNavClick(event, '#home')}
          >
            <img
              src={brandAssets.navLogo}
              alt="Scoot Vacations"
              className="logo-image"
            />
          </a>

          <div className="nav-links">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <a href={guidePath} download className="btn btn-outline nav-download">
              <Download size={16} />
              Trip Guide
            </a>
            <button
              type="button"
              className="btn btn-primary nav-primary"
              onClick={() =>
                handleInquiryShortcut(
                  'Package Inquiry',
                  '',
                  'I want help choosing the right package for my trip.'
                )
              }
            >
              Plan a Trip
            </button>
            <button
              type="button"
              className="menu-toggle"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <div className={`mobile-menu${isMenuOpen ? ' mobile-menu-open' : ''}`}>
          <div className="mobile-menu-backdrop" onClick={() => setIsMenuOpen(false)}></div>
          <div
            className="mobile-menu-panel"
            onClick={(event) => event.stopPropagation()}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={guidePath}
              download
              className="btn btn-outline mobile-menu-btn"
              onClick={() => setIsMenuOpen(false)}
            >
              <Download size={16} />
              Download Guide
            </a>
            <button
              type="button"
              className="btn btn-primary mobile-menu-btn"
              onClick={() =>
                handleInquiryShortcut(
                  'Package Inquiry',
                  '',
                  'I want help choosing the right package for my trip.'
                )
              }
            >
              Start Planning
            </button>
          </div>
        </div>
      </nav>

      <ScrollHero
        frameUrls={nightFrameManifest}
        onExplorePackages={() => scrollToSection('#packages')}
        onOpenWhatsApp={() =>
          openWhatsApp(
            'Hello Scoot Vacations, I want help planning the right trip for me.'
          )
        }
      />

      <section id="about" className="section editorial-manifest-section">
        <div className="container editorial-manifest-grid">
          <div className="editorial-manifest-copy">
            <span className="editorial-kicker">Scoot Vacations</span>
            <h2>Travel that feels lighter on the road and richer after it.</h2>
          </div>

          <div className="editorial-manifest-note">
            <p>
              Packages, transport, stays, and professional trip coverage shaped into
              one smoother experience.
            </p>
            <div className="editorial-manifest-service-list">
              {serviceLines.map((service) => (
                <span key={service}>{service}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="container editorial-manifest-cinema">
          <img
            src={imagePaths.resortStay}
            alt="Scoot travel experience"
            className="editorial-manifest-cinema-image"
            loading="lazy"
          />

          <div className="editorial-manifest-cinema-copy">
            <span className="editorial-kicker editorial-kicker-light">Memory-first travel</span>
            <p>
              You stay inside the journey. Scoot handles the movement and captures the
              story while it happens.
            </p>
            <div className="editorial-manifest-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  openWhatsApp(
                    'Hello Scoot Vacations, I want help planning my next trip.'
                  )
                }
              >
                <MessageCircle size={18} />
                Start on WhatsApp
              </button>
              <a href={guidePath} download className="btn btn-outline">
                <Download size={18} />
                Get Trip Guide
              </a>
            </div>
          </div>

          <div className="editorial-manifest-cinema-stamp">
            <img src={imagePaths.coastalEscape} alt="Scoot scenic getaway" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section editorial-services-section">
        <div className="container editorial-services-layout">
          <div className="editorial-services-intro">
            <span className="editorial-kicker">What Scoot Handles</span>
            <h2>Five service lines, built to feel like one journey.</h2>
          </div>

          <div className="editorial-services-rail">
            {serviceShowcase.map((service, index) => (
              <article key={service.title} className="editorial-service-row">
                <span className="editorial-service-index">0{index + 1}</span>
                <div className="editorial-service-copy">
                  <h3>{service.title}</h3>
                  <p>{service.note}</p>
                  {service.detail ? (
                    <div className="editorial-service-details">
                      {service.detail.map((item) => (
                        <strong key={item}>{item}</strong>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="editorial-service-visual">
                  <img src={service.image} alt={service.title} loading="lazy" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section editorial-reasons-section">
        <div className="container editorial-reasons-shell">
          <div className="editorial-reasons-statement">
            <span className="editorial-kicker">Why Choose Scoot</span>
            <h2>Designed for people who want the trip to feel easy before it even begins.</h2>
          </div>

          <div className="editorial-reasons-list">
            {whyScootReasons.map((item, index) => (
              <article key={item.title} className="editorial-reason-row">
                <span>0{index + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section editorial-memory-section">
        <div className="container editorial-memory-stage">
          <div className="editorial-memory-copy">
            <span className="editorial-kicker editorial-kicker-light">Signature Detail</span>
            <h2>The trip is not just planned. It is remembered properly.</h2>
            <p>
              Scoot includes a professional videographer on selected trips, so people
              can stay inside the moment while the memory is already being captured.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                handleInquiryShortcut(
                  'Package Inquiry',
                  '',
                  'I want to know more about trips with the complimentary videographer.'
                )
              }
            >
              Ask About the Videographer
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="editorial-memory-film">
            <div className="editorial-memory-frame editorial-memory-frame-main">
              <img src={imagePaths.groupTrip} alt="Scoot group trip coverage" loading="lazy" />
            </div>
            <div className="editorial-memory-frame editorial-memory-frame-top">
              <img src={imagePaths.resortStay} alt="Scoot trip memory" loading="lazy" />
            </div>
            <div className="editorial-memory-frame editorial-memory-frame-bottom">
              <img src={imagePaths.coastalEscape} alt="Scoot scenic route memory" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section id="packages" className="section editorial-journeys-section">
        <div className="container editorial-journeys-head">
          <span className="editorial-kicker">Travel Moods</span>
          <h2>Different kinds of trips, still held together by the same Scoot feel.</h2>
        </div>

        <div className="container editorial-journeys-mosaic">
          {experienceBlocks.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={`editorial-journey-tile editorial-journey-tile-${index + 1}`}
              onClick={() =>
                handleInquiryShortcut(
                  'Package Inquiry',
                  item.title,
                  `I want details for ${item.title.toLowerCase()}.`
                )
              }
            >
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="editorial-journey-overlay">
                <h3>{item.title}</h3>
                <p>{item.note}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="container editorial-package-ribbon">
          {durationCollections.map((item) => (
            <button
              key={item.key}
              type="button"
              className="editorial-package-pill"
              onClick={() =>
                handleInquiryShortcut(item.interest, item.title, item.message)
              }
            >
              {item.tab}
            </button>
          ))}
        </div>

        <div id="north-india" className="container editorial-north-banner">
          <div className="editorial-north-image">
            <img src={imagePaths.kashmirEscape} alt="Scoot North India routes" loading="lazy" />
          </div>
          <div className="editorial-north-copy">
            <span className="editorial-kicker">North India</span>
            <h3>Golden Triangle, Kashmir, Ladakh, and longer landmark-led circuits.</h3>
            <div className="editorial-north-list">
              {northIndiaPackages.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className="editorial-north-chip"
                  onClick={() =>
                    handleInquiryShortcut(
                      'North India Package',
                      item.title,
                      `I want details for ${item.title}.`
                    )
                  }
                >
                  {item.title}
                </button>
              ))}
              {northIndiaRoutes.map((route) => (
                <button
                  key={route}
                  type="button"
                  className="editorial-north-chip editorial-north-chip-muted"
                  onClick={() =>
                    handleInquiryShortcut(
                      'North India Package',
                      route,
                      `I want details for ${route}.`
                    )
                  }
                >
                  {route}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section editorial-flow-section">
        <div className="container editorial-flow-shell">
          <span className="editorial-kicker">How It Works</span>
          <div className="editorial-flow-track">
            {processSteps.map((step, index) => (
              <div key={step} className="editorial-flow-step">
                <span>0{index + 1}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section editorial-proof-section">
        <div className="container editorial-proof-shell">
          <div className="editorial-proof-copy">
            <span className="editorial-kicker">Trust</span>
            <h2>Quiet confidence works better than loud claims.</h2>
          </div>

          <div className="editorial-proof-lines">
            {trustSignals.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section editorial-social-section">
        <div className="container editorial-social-stage">
          <div className="editorial-social-film">
            <div className="editorial-social-frame editorial-social-frame-one">
              <img src={imagePaths.groupTrip} alt="Scoot travel group moment" loading="lazy" />
            </div>
            <div className="editorial-social-frame editorial-social-frame-two">
              <img src={imagePaths.coastalEscape} alt="Scoot travel scenery" loading="lazy" />
            </div>
            <div className="editorial-social-frame editorial-social-frame-three">
              <img src={imagePaths.resortStay} alt="Scoot resort stay" loading="lazy" />
            </div>
          </div>

          <div className="editorial-social-copy">
            <span className="editorial-kicker editorial-kicker-light">Instagram</span>
            <h2>@scoot_vacations</h2>
            <p>
              Follow the mood of the routes, the people on the road, and the memory-first
              side of Scoot while the trip is still moving.
            </p>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline editorial-social-button"
            >
              <Camera size={18} />
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="section editorial-arrival-section">
        <div className="container editorial-arrival-stage">
          <img
            src={imagePaths.dayGetaway}
            alt="Scoot trip planning backdrop"
            className="editorial-arrival-backdrop"
            loading="lazy"
          />
          <div className="editorial-arrival-overlay">
            <span className="editorial-kicker editorial-kicker-light">Plan With Scoot</span>
            <h2>Tell Scoot the trip. The route can take shape from one message.</h2>
            <div className="editorial-arrival-quick">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
              <a href={contactNumbers[0].href} className="btn btn-outline">
                <Phone size={18} />
                Call Scoot
              </a>
            </div>
          </div>
        </div>

        <div className="container editorial-arrival-panel">
          <div className="editorial-arrival-contacts">
            {contactNumbers.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
            <a href="mailto:scootvacations@gmail.com">scootvacations@gmail.com</a>
            <a href={instagramUrl} target="_blank" rel="noreferrer">
              @scoot_vacations
            </a>
          </div>

          <article className="editorial-arrival-form-shell">
            <div className="contact-form-head">
              <span className="editorial-kicker">Quick inquiry</span>
              <h3>Send the basics</h3>
              <p>Keep it short. Scoot can take it forward from here.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Your name"
                    value={formData.fullName}
                    onChange={handleFieldChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleFieldChange}
                    required
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="interest">Package Type</label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleFieldChange}
                  >
                    <option>Package Inquiry</option>
                    <option>One Day Package</option>
                    <option>Two Day Package</option>
                    <option>Three Day Package</option>
                    <option>Four Day Package</option>
                    <option>North India Package</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Optional"
                    value={formData.email}
                    onChange={handleFieldChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="destination">Destination / Trip Idea</label>
                <input
                  id="destination"
                  name="destination"
                  type="text"
                  placeholder="Munnar, Goa, Kashmir..."
                  value={formData.destination}
                  onChange={handleFieldChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Tell us dates, route, or trip style"
                  value={formData.message}
                  onChange={handleFieldChange}
                ></textarea>
              </div>

              <button className="btn btn-primary form-submit" type="submit">
                <MessageCircle size={18} />
                Send Inquiry
              </button>
            </form>
          </article>
        </div>
      </section>

      <footer className="footer editorial-footer">
        <div className="container editorial-footer-shell">
          <div className="editorial-footer-brand">
            <a
              href="#home"
              className="logo footer-logo"
              aria-label="Scoot Vacations home"
              onClick={(event) => handleNavClick(event, '#home')}
            >
              <img
                src={brandAssets.footerLogo}
                alt="Scoot Vacations"
                className="logo-image footer-logo-image"
              />
            </a>
            <p>Affordable trips, cleaner planning, and better memories on the road.</p>
          </div>

          <div className="editorial-footer-links">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="editorial-footer-meta">
            <a href="mailto:scootvacations@gmail.com">scootvacations@gmail.com</a>
            <a href={instagramUrl} target="_blank" rel="noreferrer">
              @scoot_vacations
            </a>
            {contactNumbers.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {showWhatsAppFloat ? (
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          className="whatsapp-float"
          aria-label="Open WhatsApp chat with Scoot Vacations"
        >
          <MessageCircle size={22} />
        </a>
      ) : null}
    </div>
  );
}

export default App;
