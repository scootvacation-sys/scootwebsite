export const normalizePath = (pathname) => {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.replace(/\/+$/, '') || '/';
};

export const isHomePath = (pathname) => normalizePath(pathname) === '/';

export const scrollToHashTarget = (hash, offset = 0) => {
  if (typeof window === 'undefined' || !hash?.startsWith('#')) {
    return false;
  }

  const target = document.querySelector(hash);
  if (!target) {
    window.location.hash = hash;
    return false;
  }

  window.history.replaceState(null, '', hash);
  target.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });

  return true;
};

export const openUrlForCurrentDevice = (event, href) => {
  if (typeof window === 'undefined' || !href) {
    return;
  }

  if (window.matchMedia('(max-width: 960px)').matches) {
    event?.preventDefault();
    window.location.href = href;
  }
};
