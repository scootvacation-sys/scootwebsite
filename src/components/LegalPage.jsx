import {
  ArrowLeft,
  Mail,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { useEffect } from 'react';
import './LegalPage.css';
import { legalContact, legalLinks, legalPages } from '../legalContent';
import SiteFooter from './SiteFooter';
import SiteHeader from './SiteHeader';
import { openUrlForCurrentDevice } from '../utils/navigation';

function LegalPage({ pathname }) {
  const page = legalPages[pathname];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.remove('mobile-nav-open');
  }, [pathname]);

  useEffect(() => {
    if (!page) {
      return undefined;
    }

    const previousTitle = document.title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    const previousDescription = descriptionTag?.getAttribute('content') || '';

    document.title = `${page.title} | Scoot Vacations`;
    descriptionTag?.setAttribute('content', page.description);

    return () => {
      document.title = previousTitle;
      if (descriptionTag && previousDescription) {
        descriptionTag.setAttribute('content', previousDescription);
      }
    };
  }, [page]);

  if (!page) {
    return null;
  }

  const allPhones = [legalContact.primaryPhone, ...legalContact.secondaryPhones];

  return (
    <div className="legal-page-shell">
      <SiteHeader />

      <header className="legal-hero">
        <div className="container legal-hero-inner">
          <a href="/" className="legal-back-link">
            <ArrowLeft size={16} />
            Back to Home
          </a>

          <div className="section-kicker legal-kicker">Scoot Vacations Legal</div>
          <h1>{page.title}</h1>
          <p className="legal-intro">{page.intro}</p>

          <div className="legal-meta">
            <span>Effective Date: {legalContact.effectiveDate}</span>
            <a href={`mailto:${legalContact.email}`}>{legalContact.email}</a>
            <a href={`tel:${legalContact.primaryPhone.replace(/\s+/g, '')}`}>
              {legalContact.primaryPhone}
            </a>
          </div>
        </div>
      </header>

      <main className="legal-main">
        <div className="container legal-layout">
          <aside className="legal-sidebar">
            <div className="legal-sidebar-card">
              <div className="legal-sidebar-title">Legal Pages</div>
              <div className="legal-page-links">
                {legalLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`legal-page-link${
                      link.href === pathname ? ' is-active' : ''
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="legal-sidebar-card legal-help-card">
              <div className="legal-sidebar-title">{page.helpTitle}</div>
              <p>{page.helpText}</p>

              <div className="legal-help-actions">
                <a
                  href={legalContact.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary legal-help-action"
                  onClick={(event) =>
                    openUrlForCurrentDevice(event, legalContact.whatsappHref)
                  }
                >
                  <MessageCircle size={17} strokeWidth={2.1} />
                  WhatsApp
                </a>
                <a
                  href={`mailto:${legalContact.email}`}
                  className="btn btn-outline legal-help-action legal-help-action-outline"
                >
                  <Mail size={17} strokeWidth={2.1} />
                  Email
                </a>
              </div>
            </div>
          </aside>

          <article className="legal-article">
            {page.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="legal-article-section"
              >
                <h2>{section.title}</h2>

                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                {section.groups?.map((group) => (
                  <div key={group.title} className="legal-group">
                    <h3>{group.title}</h3>
                    <ul className="legal-list">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}

                {section.items?.length ? (
                  <ul className="legal-list">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <section className="legal-contact-section">
              <div className="legal-contact-copy">
                <div className="section-kicker">Contact and Help</div>
                <h2>Need help or clarification?</h2>
                <p>
                  If you need help understanding any of these terms or want booking
                  support, contact Scoot Vacations directly.
                </p>
              </div>

              <div className="legal-contact-cards">
                <a href={`mailto:${legalContact.email}`} className="legal-contact-card">
                  <Mail size={18} strokeWidth={2.1} />
                  <span>{legalContact.email}</span>
                </a>

                {allPhones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="legal-contact-card"
                  >
                    <Phone size={18} strokeWidth={2.1} />
                    <span>{phone}</span>
                  </a>
                ))}

                <div className="legal-contact-card legal-contact-address">
                  <span className="legal-contact-label">Registered Address</span>
                  <span>{legalContact.registeredAddress}</span>
                </div>
              </div>
            </section>
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export default LegalPage;
