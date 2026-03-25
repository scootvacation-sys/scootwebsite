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
    detail: ['1 Day', '2 Days', '3 Days', '4 Days', 'North India'],
    featured: true,
  },
  {
    title: 'College Trips',
    note: 'Group-friendly planning that keeps the energy high and the logistics easier.',
  },
  {
    title: 'Resort Booking',
    note: 'Stay-led getaways for people who want the weekend to feel calmer and more polished.',
  },
  {
    title: 'Bus Booking',
    note: 'Travel coordination without scattered calls, vendor confusion, or last-minute stress.',
  },
  {
    title: 'Custom Travel Planning',
    note: 'Destination, timing, stay, and support shaped around the group instead of a fixed template.',
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

      <section id="about" className="section scoot-intro-section">
        <div className="container scoot-intro-shell">
          <div className="scoot-intro-copy">
            <span className="eyebrow">Scoot Vacations</span>
            <h2>Seamless trips with a memory-first edge.</h2>
            <p>
              Affordable travel planning, group-friendly routes, and a professional
              videographer built into the experience.
            </p>
          </div>

          <div className="scoot-intro-side">
            <p>
              Scoot handles the planning, the bookings, and the movement, so the trip
              feels lighter from the first message.
            </p>
            <div className="scoot-intro-actions">
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
        </div>

        <div className="container scoot-intro-strip">
          {serviceLines.map((service) => (
            <span key={service}>{service}</span>
          ))}
        </div>
      </section>

      <section className="section scoot-services-section">
        <div className="container scoot-section-head">
          <div>
            <span className="eyebrow">Services</span>
            <h2>What Scoot takes care of.</h2>
          </div>
        </div>

        <div className="container scoot-services-grid">
          {serviceShowcase.map((service, index) => (
            <article
              key={service.title}
              className={`scoot-service-panel${index === 0 ? ' scoot-service-panel-featured' : ''}`}
            >
              <span>{service.title}</span>
              <p>{service.note}</p>

              {index === 0 ? (
                <div className="scoot-service-tags">
                  {durationCollections.map((item) => (
                    <strong key={item.key}>{item.tab}</strong>
                  ))}
                  <strong>North India</strong>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="section scoot-choose-section">
        <div className="container scoot-choose-shell">
          <div className="scoot-choose-copy">
            <span className="eyebrow">Why Choose Scoot</span>
            <h2>Useful reasons, not travel-industry noise.</h2>
            <p>
              Scoot works best when the trip needs to feel organized, affordable,
              social, and genuinely worth remembering after it ends.
            </p>
          </div>

          <div className="scoot-choose-list">
            {whyScootReasons.map((item, index) => (
              <article key={item.title} className="scoot-choose-row">
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

      <section className="section scoot-memory-section">
        <div className="container scoot-memory-shell">
          <div className="scoot-memory-media">
            <img src={imagePaths.groupTrip} alt="Scoot group trip memory" loading="lazy" />
          </div>

          <div className="scoot-memory-copy">
            <span className="eyebrow">Signature Difference</span>
            <h2>Some trips are planned. Scoot trips are also preserved.</h2>
            <p>
              The built-in videographer is not a small add-on. It changes how the trip
              feels because people can stay present while the memory is being captured.
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
        </div>
      </section>

      <section id="packages" className="section scoot-journeys-section">
        <div className="container scoot-section-head scoot-section-head-split">
          <div>
            <span className="eyebrow">Journey Types</span>
            <h2>Different moods. Different group energy. Same Scoot approach.</h2>
          </div>
          <p>
            The trip style can change. The ease, support, and memory-first thinking
            should not.
          </p>
        </div>

        <div className="container scoot-journeys-grid">
          {experienceBlocks.map((item, index) => (
            <article
              key={item.title}
              className={`scoot-journey-card${index === 0 ? ' scoot-journey-card-large' : ''}`}
            >
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="scoot-journey-overlay">
                <h3>{item.title}</h3>
                <p>{item.note}</p>
              </div>
            </article>
          ))}
        </div>

        <div id="north-india" className="container scoot-north-band">
          <div className="scoot-north-band-copy">
            <span className="story-label">North India Collection</span>
            <h3>Golden Triangle, Kashmir, Ladakh, and longer landmark-led circuits.</h3>
          </div>

          <div className="scoot-north-band-list">
            {northIndiaPackages.map((item) => (
              <button
                key={item.title}
                type="button"
                className="scoot-north-chip"
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
                className="scoot-north-chip scoot-north-chip-muted"
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
      </section>

      <section className="section scoot-process-section">
        <div className="container scoot-process-shell">
          <span className="eyebrow">How It Works</span>
          <div className="scoot-process-line">
            {processSteps.map((step, index) => (
              <div key={step} className="scoot-process-step">
                <span>0{index + 1}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section scoot-trust-section">
        <div className="container scoot-section-head scoot-section-head-split">
          <div>
            <span className="eyebrow">Trust</span>
            <h2>Designed for real travel decisions.</h2>
          </div>
          <p>
            No fake numbers. No exaggerated claims. Just the kinds of trips people
            actually ask Scoot to plan.
          </p>
        </div>

        <div className="container scoot-trust-grid">
          {trustSignals.map((item) => (
            <article key={item} className="scoot-trust-card">
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section scoot-social-section">
        <div className="container scoot-social-shell">
          <div className="scoot-social-copy">
            <span className="eyebrow eyebrow-light">Instagram</span>
            <h2>Follow the road while it is still moving.</h2>
            <p>
              Scoot is a visual travel brand. Instagram is where the mood, people,
              and memory-first side of the trips come alive.
            </p>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline scoot-social-button"
            >
              <Camera size={18} />
              Follow @scoot_vacations
            </a>
          </div>

          <div className="scoot-social-film">
            <div className="scoot-social-frame scoot-social-frame-one">
              <img src={imagePaths.groupTrip} alt="Scoot travel group moment" loading="lazy" />
            </div>
            <div className="scoot-social-frame scoot-social-frame-two">
              <img src={imagePaths.coastalEscape} alt="Scoot travel scenery" loading="lazy" />
            </div>
            <div className="scoot-social-frame scoot-social-frame-three">
              <img src={imagePaths.resortStay} alt="Scoot resort stay" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section scoot-cta-section">
        <div className="container scoot-cta-shell">
          <article className="scoot-cta-copy">
            <span className="eyebrow">Plan With Scoot</span>
            <h2>Tell Scoot the idea. The next trip can start from there.</h2>
            <p>
              For a quick start, use WhatsApp or call directly. For a cleaner brief,
              send the short form and Scoot will take it forward.
            </p>

            <div className="scoot-cta-actions">
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

            <div className="scoot-cta-contact-list">
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
          </article>

          <article className="scoot-cta-form">
            <div className="contact-form-head">
              <span className="eyebrow">Quick inquiry</span>
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

      <footer className="footer scoot-footer">
        <div className="container scoot-footer-shell">
          <div className="scoot-footer-brand">
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

          <div className="scoot-footer-links">
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

          <div className="scoot-footer-meta">
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
