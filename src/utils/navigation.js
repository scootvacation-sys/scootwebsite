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

  const targetTop =
    window.scrollY + target.getBoundingClientRect().top - Math.max(offset, 0);

  window.history.replaceState(null, '', hash);
  window.scrollTo({
    top: Math.max(targetTop, 0),
    behavior: 'smooth',
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
