import { ArrowRight } from 'lucide-react';
import { legalContact, legalLinks } from '../legalContent';
import { buildSectionLinks, footerLogo, instagramUrl } from '../siteConfig';

function SiteFooter() {
  const navLinks = buildSectionLinks();
  const handleSectionNavigation = (href) => (event) => {
    if (!href.startsWith('#')) {
      return;
    }

    event.preventDefault();

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    window.location.hash = href;
  };

  return (
    <footer className="footer">
      <div className="container footer-shell">
        <div className="footer-head">
          <a href="#home" aria-label="Scoot Vacations home" onClick={handleSectionNavigation('#home')}>
            <img
              src={footerLogo}
              alt="Scoot Vacations"
              className="footer-logo-image"
            />
          </a>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="footer-head-link"
          >
            @scoot_vacations
            <ArrowRight size={15} />
          </a>
        </div>

        <div className="footer-main">
          <div className="footer-copy-block">
            <div className="section-kicker section-kicker-light">Scoot Vacations</div>
            <p className="footer-copy">
              Tour packages, group departures, stays, and support arranged with a
              clearer hand from the first message onward.
            </p>
          </div>

          <div className="footer-contact-block">
            <a href={`mailto:${legalContact.email}`} className="footer-contact-email">
              {legalContact.email}
            </a>

            <div className="footer-phone-list">
              <a href={`tel:${legalContact.primaryPhone.replace(/\s+/g, '')}`}>
                {legalContact.primaryPhone}
              </a>
              {legalContact.secondaryPhones.map((phone) => (
                <a key={phone} href={`tel:${phone.replace(/\s+/g, '')}`}>
                  {phone}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-nav-row">
          <div className="footer-nav-links">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} onClick={handleSectionNavigation(item.href)}>
                {item.label}
              </a>
            ))}
          </div>

          <span className="footer-note">All routes begin with one message.</span>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal-links">
            {legalLinks.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>

          <div className="footer-credit">
            <span>Website by </span>
            <a href="https://hisanali.com/" target="_blank" rel="noreferrer">
              Hisan Ali
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
