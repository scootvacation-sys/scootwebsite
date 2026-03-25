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
  const [activePackageKey, setActivePackageKey] = useState('two-day');

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

  const activePackage =
    durationCollections.find((item) => item.key === activePackageKey) ??
    durationCollections[0];

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

      <section id="about" className="section brand-section">
        <div className="container brand-shell">
          <article className="brand-copy">
            <span className="eyebrow">Scoot Vacations</span>
            <h2>Trips that stay easy, affordable, and worth remembering.</h2>
            <p>
              Scoot handles curated packages, college IV plans, resort bookings,
              bus bookings, and full trip coordination without making the experience
              feel heavy. The point is simple: better travel, less friction.
            </p>

            <div className="brand-stats">
              {aboutStats.map((item) => (
                <div key={item.label} className="brand-stat">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            <div className="brand-actions">
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
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => scrollToSection('#packages')}
              >
                Explore Packages
              </button>
            </div>

            <div className="brand-services">
              {serviceLines.map((service) => (
                <span key={service} className="brand-service-pill">
                  {service}
                </span>
              ))}
            </div>
          </article>

          <aside
            className="brand-feature-card"
            style={{ '--brand-image': `url(${imagePaths.resortStay})` }}
          >
            <div className="brand-feature-surface">
              <span className="story-label">Included on selected trips</span>
              <h3>Complimentary videographer</h3>
              <p>
                The road feels better when the memories are captured without extra planning
                from your side.
              </p>
            </div>
          </aside>
        </div>

        <div className="container brand-benefits">
          {reasons.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="brand-benefit-card">
                <div className="brand-benefit-icon">
                  <Icon size={18} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>

        <div className="container brand-contact-band">
          {contactNumbers.map((item) => (
            <a key={item.label} href={item.href} className="brand-contact-chip">
              <Phone size={16} />
              {item.label}
            </a>
          ))}
          <a href="mailto:scootvacations@gmail.com" className="brand-contact-chip">
            <Mail size={16} />
            scootvacations@gmail.com
          </a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="brand-contact-chip"
          >
            <Camera size={16} />
            @scoot_vacations
          </a>
        </div>
      </section>

      <section id="packages" className="section explorer-section">
        <div className="container explorer-head">
          <div>
            <span className="eyebrow">Packages</span>
            <h2>Choose the time first. Scoot shapes the route around it.</h2>
          </div>
          <p>
            Instead of a wall of package cards, use the duration to narrow the trip
            quickly and move straight into the routes that fit.
          </p>
        </div>

        <div className="container explorer-shell">
          <div className="explorer-tabs" role="tablist" aria-label="Package durations">
            {durationCollections.map((item) => (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={activePackage.key === item.key}
                className={`explorer-tab${activePackage.key === item.key ? ' explorer-tab-active' : ''}`}
                onClick={() => setActivePackageKey(item.key)}
              >
                <strong>{item.tab}</strong>
                <span>{item.title}</span>
              </button>
            ))}
          </div>

          <article
            className="explorer-panel"
            style={{
              '--package-accent': activePackage.accent,
              '--package-wash': activePackage.wash,
            }}
          >
            <div className="explorer-copy">
              <span className="explorer-badge">{activePackage.tab}</span>
              <h3>{activePackage.title}</h3>
              <p>{activePackage.description}</p>

              <div className="explorer-meta">
                <div className="explorer-meta-item">
                  <strong>{activePackage.routes.length}</strong>
                  <span>route options</span>
                </div>
                <div className="explorer-meta-item">
                  <strong>Best for</strong>
                  <span>{activePackage.focus}</span>
                </div>
              </div>

              <div className="explorer-route-cloud">
                {activePackage.routes.slice(0, 10).map((route) => (
                  <button
                    key={route}
                    type="button"
                    className="explorer-route-chip"
                    onClick={() =>
                      handleInquiryShortcut(
                        activePackage.interest,
                        route,
                        `I want details for ${route}.`
                      )
                    }
                  >
                    {route}
                  </button>
                ))}
                {activePackage.routes.length > 10 ? (
                  <span className="explorer-route-more">
                    +{activePackage.routes.length - 10} more in the guide
                  </span>
                ) : null}
              </div>

              <div className="explorer-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    handleInquiryShortcut(
                      activePackage.interest,
                      activePackage.title,
                      activePackage.message
                    )
                  }
                >
                  Get Details
                  <ArrowRight size={16} />
                </button>
                <a href={guidePath} download className="btn btn-outline">
                  <Download size={18} />
                  Trip Guide PDF
                </a>
              </div>
            </div>

            <div className="explorer-media">
              <img src={activePackage.image} alt={activePackage.title} loading="lazy" />
            </div>
          </article>
        </div>
      </section>

      <section id="north-india" className="section north-collection-section">
        <div className="container north-collection-shell">
          <article
            className="north-collection-feature"
            style={{ '--north-image': `url(${imagePaths.kashmirEscape})` }}
          >
            <div className="north-collection-overlay">
              <span className="eyebrow eyebrow-light">North India</span>
              <h2>Landmarks, valleys, and longer road moods.</h2>
              <p>
                Delhi circuits, Kashmir stays, and Ladakh-led roads sit in their own
                lane for travelers who want a larger trip feeling from the start.
              </p>
              <button
                type="button"
                className="btn btn-soft"
                onClick={() =>
                  handleInquiryShortcut(
                    'North India Package',
                    '',
                    'I want help choosing the right North India package.'
                  )
                }
              >
                Plan North India
                <ArrowRight size={16} />
              </button>
            </div>
          </article>

          <div className="north-collection-list">
            {northIndiaPackages.map((pkg) => (
              <article key={pkg.title} className="north-collection-card">
                <div className="north-collection-card-copy">
                  <span>{pkg.subtitle}</span>
                  <h3>{pkg.title}</h3>
                  <p>{pkg.description}</p>
                </div>
                <button
                  type="button"
                  className="north-collection-link"
                  onClick={() =>
                    handleInquiryShortcut(
                      'North India Package',
                      pkg.title,
                      `I want details for ${pkg.title}.`
                    )
                  }
                >
                  Ask for this route
                  <ArrowRight size={16} />
                </button>
              </article>
            ))}

            <div className="north-collection-routes">
              {northIndiaRoutes.map((route) => (
                <button
                  key={route}
                  type="button"
                  className="north-collection-route-chip"
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

      <section id="contact" className="section connect-section">
        <div className="container connect-shell">
          <article className="connect-panel">
            <span className="eyebrow">Contact</span>
            <h2>Tell Scoot what kind of trip you want. The rest can get simpler from there.</h2>
            <p>
              Use the direct numbers for a quick start, or send a short brief through
              the form and continue on WhatsApp.
            </p>

            <div className="connect-direct-list">
              {contactNumbers.map((item) => (
                <a key={item.label} href={item.href} className="connect-direct-item">
                  <Phone size={18} />
                  <strong>{item.label}</strong>
                </a>
              ))}
              <a href="mailto:scootvacations@gmail.com" className="connect-direct-item">
                <Mail size={18} />
                <strong>scootvacations@gmail.com</strong>
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="connect-direct-item"
              >
                <Camera size={18} />
                <strong>@scoot_vacations</strong>
              </a>
            </div>

            <div className="connect-actions">
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
                Download Guide
              </a>
            </div>
          </article>

          <article className="connect-form-card">
            <div className="contact-form-head">
              <span className="eyebrow">Quick inquiry</span>
              <h3>Send the basics</h3>
              <p>Keep it short. Scoot can take the conversation forward from there.</p>
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

      <footer className="footer minimal-footer">
        <div className="container minimal-footer-shell">
          <div className="minimal-footer-brand">
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
            <p>Affordable trips. Clear planning. Better memories on the road.</p>
          </div>

          <div className="minimal-footer-links">
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

          <div className="minimal-footer-cta">
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
