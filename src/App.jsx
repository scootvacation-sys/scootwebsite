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

const whatsappNumber = '919544121932';
const brochurePath = '/scoot-brochure.pdf';
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
  { label: 'Packages', href: '#packages' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

const aboutStats = [
  { value: 'Budget-friendly', label: 'Trips planned for value' },
  { value: 'Selected routes', label: 'Free videographer included' },
  { value: 'Fast', label: 'WhatsApp-first inquiry flow' },
];

const reasons = [
  {
    icon: Sparkles,
    title: 'Cleaner package browsing',
    text: 'Routes are grouped by duration so it is easier to compare trips quickly.',
  },
  {
    icon: Users,
    title: 'Better for groups',
    text: 'Families and friend groups can choose shared getaways without overcomplicated planning.',
  },
  {
    icon: ShieldCheck,
    title: 'Direct support',
    text: 'Inquiry goes straight to Scoot instead of sending travelers through a long funnel.',
  },
  {
    icon: Camera,
    title: 'Memories included',
    text: 'Selected departures include a complimentary videographer for the trip.',
  },
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
    src: imagePaths.coastalEscape,
    alt: 'Beachside sunset escape',
    eyebrow: 'Coastal break',
    title: 'Golden-hour departures',
  },
  {
    src: imagePaths.groupTrip,
    alt: 'Group trip in a city lane',
    eyebrow: 'Group trip',
    title: 'Shared departures that feel easy',
  },
  {
    src: imagePaths.resortStay,
    alt: 'Resort boardwalk through tropical water',
    eyebrow: 'Stay experience',
    title: 'Resort-led trips with breathing room',
  },
  {
    src: imagePaths.mountainCircuit,
    alt: 'Mountain route and scenic clouds',
    eyebrow: 'Mountain route',
    title: 'Scenery-first circuits',
  },
  {
    src: imagePaths.cityBreak,
    alt: 'City skyline getaway',
    eyebrow: 'City stop',
    title: 'Multi-stop breaks with better pacing',
  },
  {
    src: imagePaths.tajRoute,
    alt: 'Heritage travel route',
    eyebrow: 'Landmark route',
    title: 'Classic heritage journeys',
  },
];

const contactNumbers = [
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
            <a href={brochurePath} download className="btn btn-outline nav-download">
              <Download size={16} />
              Brochure
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
              href={brochurePath}
              download
              className="btn btn-outline mobile-menu-btn"
              onClick={() => setIsMenuOpen(false)}
            >
              <Download size={16} />
              Download Brochure
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

      <section id="about" className="section">
        <div className="container section-heading">
          <span className="eyebrow">Why Scoot</span>
          <h2>Travel planning should feel premium, not confusing.</h2>
          <p>
            Scoot works best when the route choices are easy to read, the value
            is obvious, and the next step feels immediate.
          </p>
        </div>

        <div className="container about-shell">
          <article className="about-stage">
            <div className="about-stage-copy">
              <span className="story-label">Why travelers choose Scoot</span>
              <h3>Everything important is visible in one glance.</h3>
              <p>
                Browse the trip length, understand the travel style, and reach
                the team directly without getting lost in a heavy booking flow.
              </p>

              <div className="about-stats">
                {aboutStats.map((item) => (
                  <div key={item.label} className="about-stat">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-stage-media">
              <img
                src={imagePaths.groupTrip}
                alt="Group travelers enjoying a Scoot trip"
                loading="lazy"
              />
              <div className="about-stage-caption">
                <span>Group-ready travel</span>
                <strong>
                  Affordable departures for friends, families, and shared trips
                </strong>
              </div>
            </div>
          </article>

          <div className="feature-grid feature-grid-rebuilt">
            {reasons.map((item, index) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="feature-card">
                  <div className="feature-card-top">
                    <div className="feature-icon">
                      <Icon size={18} />
                    </div>
                    <span className="feature-index">0{index + 1}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="packages" className="section packages-section">
        <div className="container package-shell">
          <div className="section-heading package-heading">
            <span className="eyebrow">Packages by duration</span>
            <h2>Choose the length first. Everything else gets easier.</h2>
            <p>
              Four clear durations, consistent card design, and route previews
              that stay quick to scan.
            </p>
          </div>

          <div className="package-grid">
            {durationCollections.map((item) => (
              <article
                key={item.key}
                className="package-card"
                style={{
                  '--package-accent': item.accent,
                  '--package-wash': item.wash,
                }}
              >
                <div className="package-card-top">
                  <span className="package-badge">{item.tab}</span>
                  <span className="package-count">{item.routes.length} routes</span>
                </div>

                <div className="package-media">
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>

                <div className="package-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>

                  <div className="package-routes">
                    {item.routes.slice(0, 3).map((route) => (
                      <span key={route}>{route}</span>
                    ))}
                  </div>

                  <div className="package-card-footer">
                    <span className="package-more">
                      +{item.routes.length - 3} more routes
                    </span>
                    <button
                      type="button"
                      className="package-link"
                      onClick={() =>
                        handleInquiryShortcut(
                          item.interest,
                          item.title,
                          item.message
                        )
                      }
                    >
                      Get details
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="north-india" className="section north-section">
        <div className="container north-header">
          <div>
            <span className="eyebrow eyebrow-light">North India</span>
            <h2>Bigger circuits for landmarks, valleys, and mountain roads.</h2>
          </div>
          <p>
            A stronger collection for travelers planning heritage routes,
            Kashmir stays, and landscape-led departures.
          </p>
        </div>

        <div className="container north-grid">
          {northIndiaPackages.map((pkg) => (
            <article key={pkg.title} className="north-card">
              <div className="north-media">
                <img src={pkg.image} alt={pkg.title} loading="lazy" />
              </div>
              <div className="north-body">
                <span>{pkg.subtitle}</span>
                <h3>{pkg.title}</h3>
                <p>{pkg.description}</p>
                <button
                  type="button"
                  className="btn btn-soft north-button"
                  onClick={() =>
                    handleInquiryShortcut(
                      'North India Package',
                      pkg.title,
                      `I want details for ${pkg.title}.`
                    )
                  }
                >
                  Request Details
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="container north-routes">
          {northIndiaRoutes.map((route) => (
            <span key={route}>{route}</span>
          ))}
        </div>
      </section>

      <section id="gallery" className="section">
        <div className="container section-heading section-heading-row">
          <div>
            <span className="eyebrow">Travel moods</span>
            <h2>A cleaner visual rhythm across the entire site.</h2>
          </div>
          <p>
            Coastal breaks, mountain circuits, landmark routes, and resort-led
            stays all shown in one consistent gallery frame.
          </p>
        </div>

        <div className="container gallery-grid">
          {galleryImages.map((image) => (
            <figure key={image.alt} className="gallery-card">
              <img src={image.src} alt={image.alt} loading="lazy" />
              <figcaption>
                <span>{image.eyebrow}</span>
                <strong>{image.title}</strong>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="container contact-shell">
          <article className="contact-panel">
            <span className="eyebrow">Contact</span>
            <h2>Tell Scoot where you want to go.</h2>
            <p>
              Share the route, month, or trip type. The form opens in WhatsApp
              with your details ready to send.
            </p>

            <div className="contact-list">
              <div className="contact-item">
                <div className="contact-icon">
                  <Phone size={18} />
                </div>
                <div>
                  <h3>Call</h3>
                  {contactNumbers.map((item) => (
                    <a key={item.href} href={item.href}>
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Mail size={18} />
                </div>
                <div>
                  <h3>Email</h3>
                  <a href="mailto:scootvacations@gmail.com">scootvacations@gmail.com</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Camera size={18} />
                </div>
                <div>
                  <h3>Instagram</h3>
                  <a href={instagramUrl} target="_blank" rel="noreferrer">
                    @scoot_vacations
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-actions">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
              <a href={brochurePath} download className="btn btn-outline">
                <Download size={18} />
                Download Brochure
              </a>
            </div>
          </article>

          <article className="contact-form-card">
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

      <footer className="footer">
        <div className="container footer-layout">
          <div className="footer-brand">
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
            <p>Affordable routes, faster planning, and better-looking departures.</p>
          </div>

          <div className="footer-links">
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

          <a href={brochurePath} download className="btn btn-outline footer-button">
            <Download size={18} />
            Brochure PDF
          </a>
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
