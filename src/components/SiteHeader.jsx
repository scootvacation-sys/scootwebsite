import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { buildSectionLinks, buildWhatsAppLink, navLogo } from '../siteConfig';
import { openUrlForCurrentDevice } from '../utils/navigation';

function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navStackRef = useRef(null);
  const navLinks = buildSectionLinks();

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
    const handleResize = () => {
      if (window.innerWidth > 960) {
        setIsNavOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('mobile-nav-open', isNavOpen);

    return () => {
      document.body.classList.remove('mobile-nav-open');
    };
  }, [isNavOpen]);

  useEffect(() => {
    if (!isNavOpen) {
      return undefined;
    }

    const handlePointerDownOutside = (event) => {
      if (!navStackRef.current?.contains(event.target)) {
        setIsNavOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsNavOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDownOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDownOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isNavOpen]);

  return (
    <nav className={`navbar${isScrolled ? ' navbar-scrolled' : ''}`}>
      <div ref={navStackRef} className="nav-stack">
        <div className="nav-shell">
          <a
            href="/#home"
            className="logo logo-button"
            aria-label="Scoot Vacations home"
            onClick={() => setIsNavOpen(false)}
          >
            <img src={navLogo} alt="Scoot Vacations" className="logo-image" />
          </a>

          <div className="nav-links" aria-label="Primary navigation">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary nav-primary"
              onClick={(event) =>
                openUrlForCurrentDevice(event, buildWhatsAppLink())
              }
            >
              Plan a Trip
            </a>

            <button
              type="button"
              className={`nav-menu-toggle${isNavOpen ? ' is-open' : ''}`}
              aria-expanded={isNavOpen}
              aria-controls="site-mobile-nav"
              aria-label={isNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setIsNavOpen((open) => !open)}
            >
              <span className="nav-menu-toggle-glyph" aria-hidden="true">
                <span className="nav-menu-toggle-bar nav-menu-toggle-bar--top" />
                <span className="nav-menu-toggle-bar nav-menu-toggle-bar--middle" />
                <span className="nav-menu-toggle-bar nav-menu-toggle-bar--bottom" />
              </span>
            </button>
          </div>
        </div>

        <div
          id="site-mobile-nav"
          className={`mobile-nav${isNavOpen ? ' is-open' : ''}`}
          aria-hidden={!isNavOpen}
        >
          <div className="mobile-nav-links" aria-label="Mobile navigation">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="mobile-nav-link"
                onClick={() => setIsNavOpen(false)}
              >
                <span>{item.label}</span>
                <ArrowRight size={16} />
              </a>
            ))}
          </div>

          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary mobile-nav-primary"
            onClick={(event) => {
              setIsNavOpen(false);
              openUrlForCurrentDevice(event, buildWhatsAppLink());
            }}
          >
            Plan a Trip
          </a>
        </div>
      </div>
    </nav>
  );
}

export default SiteHeader;
