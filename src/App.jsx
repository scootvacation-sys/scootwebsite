import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Camera,
  Download,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
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

const aboutStats = [
  { value: 'Affordable', label: 'Budget-aware packages without cutting the experience' },
  { value: 'Included', label: 'Complimentary videographer on selected departures' },
  { value: 'Guided', label: 'Friendly support that keeps the trip comfortable' },
];

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Affordable packages',
    text: 'Well-planned routes that stay practical on budget while keeping the trip quality intact.',
  },
  {
    icon: Users,
    title: 'Happy customers, every time',
    text: 'Scoot is built around comfortable departures, repeat smiles, and easier group travel.',
  },
  {
    icon: Camera,
    title: 'Complimentary videographer',
    text: 'Selected trips include a videographer so your best moments are captured without extra cost.',
  },
  {
    icon: Sparkles,
    title: 'Friendly travel guides',
    text: 'From the first message to the last stop, the trip is designed to feel supported and easy.',
  },
];

const serviceLines = [
  'Tour Packages',
  'College IV',
  'Resort Bookings',
  'Bus Bookings',
];

const durationCollections = [
  {
    key: 'one-day',
    tab: '1 Day',
    title: 'One Day Escapes',
    description: 'Quick scenic escapes that fit neatly into a single full day.',
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

const galleryImages = [
  {
    src: imagePaths.groupTrip,
    alt: 'Scoot travelers enjoying a group trip',
    eyebrow: 'Happy customers',
    title: 'Shared departures that feel warm from the start',
    text: 'Friends, families, and small groups can step into routes that are easy to understand and easy to enjoy.',
  },
  {
    src: imagePaths.resortStay,
    alt: 'Travel memory with scenic stay',
    eyebrow: 'Memories included',
    title: 'A trip should leave you with more than photos',
    text: 'Comfort, joy, and the small moments on the road should stay with you long after the trip ends.',
  },
  {
    src: imagePaths.mountainCircuit,
    alt: 'Scenic mountain route for longer travel',
    eyebrow: 'Guided and safe',
    title: 'Longer routes still feel smooth when the planning is right',
    text: 'Scoot positions every journey as comfortable, safe, and cared for instead of stressful or overcomplicated.',
  },
];

const contactNumbers = [
  { label: '+91 94464 82881', href: 'tel:+919446482881' },
  { label: '+91 95441 21932', href: 'tel:+919544121932' },
  { label: '+91 95263 72881', href: 'tel:+919526372881' },
];

const defaultFormData = {
  fullName: '',
  email: '',
  phone: '',
  interest: 'Package Inquiry',
  destination: '',
  travelMonth: '',
  travelers: '2',
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
      formData.email ? `Email: ${formData.email}` : '',
      `Interested in: ${formData.interest}`,
      formData.destination ? `Destination / Package: ${formData.destination}` : '',
      formData.travelMonth ? `Travel month: ${formData.travelMonth}` : '',
      `Travelers: ${formData.travelers}`,
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

      <section id="about" className="section story-section">
        <div className="container story-layout">
          <article className="story-copy">
            <span className="eyebrow">Why Scoot</span>
            <h2>Scoot makes trip planning feel lighter before the journey even starts.</h2>
            <p>
              Scoot Vacations is built to make memorable journeys accessible,
              seamless, and affordable. From curated tour packages to resort stays,
              transport arrangements, and complete trip planning, everything is set
              up to feel smooth from the first message.
            </p>

            <div className="story-highlights">
              {aboutStats.map((item) => (
                <div key={item.label} className="story-highlight">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            <div className="story-copy-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  openWhatsApp(
                    'Hello Scoot Vacations, I want help choosing the right package for my trip.'
                  )
                }
              >
                <MessageCircle size={18} />
                Start on WhatsApp
              </button>
              <a href={guidePath} download className="btn btn-outline">
                <Download size={18} />
                Open Trip Guide
              </a>
            </div>

            <div className="story-service-strip">
              {serviceLines.map((service) => (
                <span key={service} className="story-service-pill">
                  {service}
                </span>
              ))}
            </div>
          </article>

          <aside className="story-rail">
            <div className="story-rail-head">
              <span className="story-label">Travel flow</span>
              <h3>Routes, direct contact, and a clear next step in one place.</h3>
            </div>

            <div className="story-contacts">
              {contactNumbers.map((item) => (
                <a key={item.label} href={item.href} className="story-contact-chip">
                  <Phone size={16} />
                  {item.label}
                </a>
              ))}
              <a href="mailto:scootvacations@gmail.com" className="story-contact-chip">
                <Mail size={16} />
                scootvacations@gmail.com
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="story-contact-chip"
              >
                <Camera size={16} />
                @scoot_vacations
              </a>
            </div>

            <div className="story-values-grid">
              {reasons.map((item, index) => {
                const Icon = item.icon;

                return (
                  <article key={item.title} className="story-value-card">
                    <div className="story-value-top">
                      <div className="story-value-icon">
                        <Icon size={18} />
                      </div>
                      <span>0{index + 1}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                );
              })}
            </div>

            <div className="story-duration-strip">
              {durationCollections.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className="story-duration-pill"
                  onClick={() => handleInquiryShortcut(item.interest, item.title, item.message)}
                >
                  <strong>{item.tab}</strong>
                  <span>{item.routes.length} route options</span>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="packages" className="section journey-section">
        <div className="container journey-head">
          <div>
            <span className="eyebrow">Packages by duration</span>
            <h2>Pick the time you have first. The right route becomes obvious after that.</h2>
          </div>
          <p>
            Each duration is arranged like a decision card: what it is best for,
            how many route options are available, and the places people usually ask
            about first.
          </p>
        </div>

        <div className="container journey-grid">
          {durationCollections.map((item) => (
            <article
              key={item.key}
              className="package-card"
              style={{
                '--package-accent': item.accent,
                '--package-wash': item.wash,
              }}
            >
              <div className="package-media">
                <img src={item.image} alt={item.title} loading="lazy" />
              </div>

              <div className="package-body">
                <div className="package-meta">
                  <span className="package-tag">{item.tab}</span>
                  <span className="package-count">{item.routes.length} routes</span>
                </div>

                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <ul className="package-preview">
                  {item.routes.slice(0, 6).map((route) => (
                    <li key={route}>{route}</li>
                  ))}
                </ul>

                {item.routes.length > 6 ? (
                  <span className="package-more">+{item.routes.length - 6} more route options</span>
                ) : null}

                <div className="package-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      handleInquiryShortcut(item.interest, item.title, item.message)
                    }
                  >
                    Get Details
                    <ArrowRight size={16} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => scrollToSection('#contact')}
                  >
                    Ask Scoot
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="container routes-board">
          <div className="routes-board-head">
            <span className="eyebrow">Route finder</span>
            <h3>All route options, grouped for fast scanning.</h3>
          </div>

          <div className="routes-board-grid">
            {durationCollections.map((item) => (
              <article key={item.key} className="route-column">
                <div className="route-column-head">
                  <strong>{item.tab}</strong>
                  <span>{item.title}</span>
                </div>

                <div className="route-chip-list">
                  {item.routes.map((route) => (
                    <button
                      key={route}
                      type="button"
                      className="route-chip"
                      onClick={() =>
                        handleInquiryShortcut(item.interest, route, `I want details for ${route}.`)
                      }
                    >
                      {route}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="north-india" className="section expanse-section">
        <div className="container expanse-shell">
          <div className="expanse-copy">
            <span className="eyebrow eyebrow-light">North India packages</span>
            <h2>For North India, the routes deserve a stronger spotlight.</h2>
            <p>
              These trips carry a different mood: landmark cities, colder valleys,
              long road stretches, and a wider sense of scale. Scoot keeps them in
              a dedicated collection instead of hiding them inside shorter getaways.
            </p>

            <div className="expanse-route-band">
              {northIndiaRoutes.map((route) => (
                <span key={route}>{route}</span>
              ))}
            </div>
          </div>

          <div className="expanse-grid">
            {northIndiaPackages.map((pkg) => (
              <article key={pkg.title} className="expanse-card">
                <div className="expanse-card-media">
                  <img src={pkg.image} alt={pkg.title} loading="lazy" />
                </div>
                <div className="expanse-card-body">
                  <span>{pkg.subtitle}</span>
                  <h3>{pkg.title}</h3>
                  <p>{pkg.description}</p>
                  <button
                    type="button"
                    className="btn btn-soft"
                    onClick={() =>
                      handleInquiryShortcut(
                        'North India Package',
                        pkg.title,
                        `I want details for ${pkg.title}.`
                      )
                    }
                  >
                    Request Details
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section travel-feel-section">
        <div className="container travel-feel-head">
          <div>
            <span className="eyebrow">Travel feel</span>
            <h2>Good trips are not only about the route. They are about how the day feels.</h2>
          </div>
          <p>
            Every Scoot trip is planned around comfort, convenience, and moments
            worth keeping. Selected packages also include a professional videographer,
            so the memory is captured while the group stays focused on enjoying the road.
          </p>
        </div>

        <div className="container travel-feel-grid">
          <article className="travel-feel-quote">
            <span className="story-label">Scoot standard</span>
            <h3>Affordable routes, reliable arrangements, and memories that are actually captured.</h3>
            <p>
              What sets Scoot apart is not just where the route goes. It is the mix
              of planning, support, and creativity that makes the trip feel complete.
            </p>
          </article>

          {galleryImages.map((image) => (
            <article key={image.alt} className="travel-feel-card">
              <div className="travel-feel-media">
                <img src={image.src} alt={image.alt} loading="lazy" />
              </div>
              <div className="travel-feel-body">
                <span>{image.eyebrow}</span>
                <h3>{image.title}</h3>
                <p>{image.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="section inquiry-section">
        <div className="container inquiry-shell">
          <article className="inquiry-panel">
            <span className="eyebrow">Contact</span>
            <h2>Tell Scoot the route, the month, or just the kind of trip you want.</h2>
            <p>
              Call, email, or send a short brief through the form. The details go
              straight into WhatsApp so the next reply can focus on the trip itself.
            </p>

            <div className="inquiry-card-grid">
              {contactNumbers.map((item, index) => (
                <a key={item.label} href={item.href} className="inquiry-card">
                  <Phone size={18} />
                  <div>
                    <strong>{item.label}</strong>
                    <span>{index === 0 ? 'Primary contact number' : 'Direct contact line'}</span>
                  </div>
                </a>
              ))}
              <a
                href="mailto:scootvacations@gmail.com"
                className="inquiry-card"
              >
                <Mail size={18} />
                <div>
                  <strong>scootvacations@gmail.com</strong>
                  <span>Email for trip briefs</span>
                </div>
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inquiry-card"
              >
                <Camera size={18} />
                <div>
                  <strong>@scoot_vacations</strong>
                  <span>Instagram updates and trip moments</span>
                </div>
              </a>
            </div>

            <div className="inquiry-actions-row">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
              <a href={guidePath} download className="btn btn-outline">
                <Download size={18} />
                Get Trip Guide
              </a>
            </div>

            <div className="inquiry-notes">
              <div className="inquiry-note">
                <strong>Fastest start</strong>
                <span>Send a route or destination name and Scoot can reply from there.</span>
              </div>
              <div className="inquiry-note">
                <strong>Best for groups</strong>
                <span>Use the form when you already know the month or traveler count.</span>
              </div>
            </div>
          </article>

          <article className="inquiry-form-card">
            <div className="contact-form-head">
              <span className="eyebrow">Quick inquiry</span>
              <h3>Start with the basics</h3>
              <p>Fill this once and Scoot gets the trip brief immediately.</p>
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
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="destination">Destination / Package</label>
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
                  <label htmlFor="travelMonth">Travel Month</label>
                  <input
                    id="travelMonth"
                    name="travelMonth"
                    type="month"
                    value={formData.travelMonth}
                    onChange={handleFieldChange}
                  />
                </div>
              </div>

              <div className="form-grid form-grid-last">
                <div className="form-group">
                  <label htmlFor="travelers">Travelers</label>
                  <select
                    id="travelers"
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleFieldChange}
                  >
                    <option value="1">1 traveler</option>
                    <option value="2">2 travelers</option>
                    <option value="3-5">3 to 5 travelers</option>
                    <option value="6+">6+ travelers</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Tell us dates, route, or trip style"
                    value={formData.message}
                    onChange={handleFieldChange}
                  ></textarea>
                </div>
              </div>

              <button className="btn btn-primary form-submit" type="submit">
                <MessageCircle size={18} />
                Send Inquiry
              </button>
            </form>
          </article>
        </div>
      </section>

      <footer className="footer site-footer">
        <div className="container site-footer-shell">
          <div className="site-footer-brand">
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
            <p>
              Affordable routes, friendlier planning, and a clearer path from first
              scroll to first message.
            </p>
          </div>

          <div className="site-footer-links">
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

          <div className="site-footer-cta">
            <a href={guidePath} download className="btn btn-outline footer-button">
              <Download size={18} />
              Trip Guide PDF
            </a>
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
