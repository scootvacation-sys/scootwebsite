export const defaultPlanMessage =
  'Hello Scoot Vacations, I want help planning the right trip for me.';

export const whatsappNumber = '919446482881';
export const navLogo = '/Scoot logo white.png';
export const footerLogo = '/Scoot logo Blue.png';
export const instagramUrl =
  'https://www.instagram.com/scoot_vacations?igsh=MWxsM3oydW1teDZkZQ==';

export const siteNavSections = [
  { label: 'Services', target: '#services' },
  { label: 'Why Scoot', target: '#why-scoot' },
  { label: 'Gallery', target: '#gallery' },
  { label: 'Instagram', target: '#instagram' },
  { label: 'Contact', target: '#contact' },
];

export const buildSectionLinks = () =>
  siteNavSections.map((item) => ({
    label: item.label,
    href: `/${item.target}`,
  }));

export const buildWhatsAppLink = (message = defaultPlanMessage) =>
  `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
