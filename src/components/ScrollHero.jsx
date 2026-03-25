import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import frameManifest from '../generated/ezgif-manifest.json';
import './ScrollHero.css';

const fallbackFrameUrls = Array.from({ length: 180 }, (_, index) => {
  const frameNumber = String(index + 1).padStart(3, '0');
  return `/images/ezgif-frame-${frameNumber}.png`;
});

const heroFrameUrls = frameManifest.length ? frameManifest : fallbackFrameUrls;

const READY_FRAME_TARGET = 18;
const LOAD_CONCURRENCY = 8;
const MOBILE_FRAME_LIMIT_SMALL = 42;
const MOBILE_FRAME_LIMIT = 56;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const lerp = (start, end, amount) => start + (end - start) * amount;
const easeOutCubic = (value) => 1 - (1 - value) ** 3;
const easeInOutCubic = (value) =>
  value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2;

const sampleFrameUrls = (frameUrls, targetFrameCount) => {
  if (frameUrls.length <= targetFrameCount) {
    return frameUrls;
  }

  const sampledUrls = [];
  const lastIndex = frameUrls.length - 1;

  for (let index = 0; index < targetFrameCount; index += 1) {
    const sampleIndex = Math.round((index * lastIndex) / (targetFrameCount - 1));
    const sampleUrl = frameUrls[sampleIndex];

    if (sampledUrls.at(-1) !== sampleUrl) {
      sampledUrls.push(sampleUrl);
    }
  }

  if (sampledUrls[0] !== frameUrls[0]) {
    sampledUrls.unshift(frameUrls[0]);
  }

  if (sampledUrls.at(-1) !== frameUrls[lastIndex]) {
    sampledUrls.push(frameUrls[lastIndex]);
  }

  return sampledUrls;
};

const buildPrioritizedFrameOrder = (frameCount) => {
  if (frameCount <= 2) {
    return Array.from({ length: frameCount }, (_, index) => index);
  }

  const ordered = [];
  const visited = new Set();

  const pushIndex = (index) => {
    if (index < 0 || index >= frameCount || visited.has(index)) {
      return;
    }

    visited.add(index);
    ordered.push(index);
  };

  const queue = [[0, frameCount - 1]];
  pushIndex(0);
  pushIndex(frameCount - 1);

  while (queue.length > 0) {
    const [start, end] = queue.shift();
    const middle = Math.floor((start + end) / 2);

    pushIndex(middle);

    if (middle - start > 1) {
      queue.push([start, middle]);
    }

    if (end - middle > 1) {
      queue.push([middle, end]);
    }
  }

  return ordered;
};

const heroCopy = {
  eyebrow: 'Scoot Vacations',
  headline: 'Road trips that stay with you.',
  headlineAccent: 'trips',
  supportingLine:
    'Warm escapes, shared laughter, and the kind of road you still talk about later.',
  lateEyebrow: 'When the feeling is right',
  lateHeadline: 'Let the route turn into a plan.',
  lateHeadlineAccent: 'route',
  lateLine:
    'Choose the package, message Scoot, and leave the rest to the journey.',
};

const renderHeadlineWithAccent = (text, accentWord) => {
  if (!accentWord || !text.includes(accentWord)) {
    return text;
  }

  const [before, ...rest] = text.split(accentWord);
  const after = rest.join(accentWord);

  return (
    <>
      {before}
      <span className="scroll-cinema__accent">{accentWord}</span>
      {after}
    </>
  );
};

const getPinDistance = (viewportWidth, frameCount) => {
  if (viewportWidth < 480) {
    return Math.max(frameCount * 8, 420);
  }

  if (viewportWidth < 640) {
    return Math.max(frameCount * 9, 520);
  }

  if (viewportWidth < 1024) {
    return Math.max(frameCount * 10, 1100);
  }

  return Math.max(frameCount * 16, 2200);
};

const findNearestLoadedIndex = (frames, index, totalFrames) => {
  for (let offset = 0; offset < totalFrames; offset += 1) {
    const previousIndex = index - offset;
    if (previousIndex >= 0 && frames[previousIndex]) {
      return previousIndex;
    }

    const nextIndex = index + offset;
    if (nextIndex < totalFrames && frames[nextIndex]) {
      return nextIndex;
    }
  }

  return -1;
};

function ScrollHero({
  id = 'home',
  frameUrls = heroFrameUrls,
  copy = heroCopy,
  onExplorePackages,
  onOpenWhatsApp,
}) {
  const activeFrameUrls = frameUrls.length ? frameUrls : heroFrameUrls;
  const isBrowser = typeof window !== 'undefined';
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const primaryFrameRef = useRef(null);
  const loadedFramesRef = useRef([]);
  const progressFrameRef = useRef(0);
  const targetProgressRef = useRef(0);
  const smoothedProgressRef = useRef(0);
  const uiProgressRef = useRef(0);
  const sequenceReadyRef = useRef(false);
  const primaryFrameIndexRef = useRef(-1);

  const [pinDistance, setPinDistance] = useState(2200);
  const [viewportWidth, setViewportWidth] = useState(
    isBrowser ? window.innerWidth : 1280
  );
  const [uiProgress, setUiProgress] = useState(0);
  const [sequenceReady, setSequenceReady] = useState(false);
  const [loadingState, setLoadingState] = useState({
    loaded: 0,
    total: activeFrameUrls.length,
    ready: false,
    firstFrameReady: false,
  });

  const isCompact = viewportWidth <= 760;
  const compactFrameLimit =
    viewportWidth <= 480 ? MOBILE_FRAME_LIMIT_SMALL : MOBILE_FRAME_LIMIT;
  const sequenceFrameUrls = useMemo(() => {
    if (!isCompact) {
      return activeFrameUrls;
    }

    return sampleFrameUrls(activeFrameUrls, compactFrameLimit);
  }, [activeFrameUrls, compactFrameLimit, isCompact]);
  const loadOrder = useMemo(
    () => buildPrioritizedFrameOrder(sequenceFrameUrls.length),
    [sequenceFrameUrls.length]
  );
  const readyFrameTarget = Math.min(
    isCompact ? 16 : READY_FRAME_TARGET,
    sequenceFrameUrls.length
  );

  const introTravel = isCompact
    ? 0
    : easeInOutCubic(clamp(uiProgress / 0.58, 0, 1));
  const introOpacity = isCompact ? 1 : 1 - introTravel;
  const supportPhase = isCompact
    ? 0
    : easeOutCubic(clamp((uiProgress - 0.5) / 0.28, 0, 1));
  const leftShadeOpacity = isCompact
    ? 0.92
    : lerp(0.88, 0.22, clamp(uiProgress / 0.76, 0, 1));
  const rightShadeOpacity = isCompact ? 0 : lerp(0, 0.62, supportPhase);

  const renderSequence = useCallback(() => {
    const primaryFrame = primaryFrameRef.current;
    if (!primaryFrame) {
      return;
    }

    const nextProgress = lerp(
      smoothedProgressRef.current,
      targetProgressRef.current,
      isCompact ? 0.24 : 0.14
    );
    const settledProgress =
      Math.abs(nextProgress - targetProgressRef.current) < 0.0008
        ? targetProgressRef.current
        : nextProgress;

    smoothedProgressRef.current = settledProgress;

    const totalSequenceFrames = sequenceFrameUrls.length;
    const frameFloat = settledProgress * (totalSequenceFrames - 1);
    const frameIndex = Math.floor(frameFloat);
    const currentLoadedIndex = findNearestLoadedIndex(
      loadedFramesRef.current,
      frameIndex,
      totalSequenceFrames
    );

    if (currentLoadedIndex >= 0 && currentLoadedIndex !== primaryFrameIndexRef.current) {
      primaryFrame.src = sequenceFrameUrls[currentLoadedIndex];
      primaryFrameIndexRef.current = currentLoadedIndex;
    }

    if (currentLoadedIndex >= 0 && !sequenceReadyRef.current) {
      sequenceReadyRef.current = true;
      setSequenceReady(true);
    }

    if (Math.abs(settledProgress - uiProgressRef.current) > 0.004) {
      uiProgressRef.current = settledProgress;
      setUiProgress(settledProgress);
    }
  }, [isCompact, sequenceFrameUrls]);

  useEffect(() => {
    const updateViewportMode = () => {
      setViewportWidth(window.innerWidth);
    };

    updateViewportMode();
    window.addEventListener('resize', updateViewportMode);

    return () => window.removeEventListener('resize', updateViewportMode);
  }, []);

  useEffect(() => {
    const updatePinDistance = () => {
      setPinDistance(getPinDistance(window.innerWidth, sequenceFrameUrls.length));
    };

    updatePinDistance();
    window.addEventListener('resize', updatePinDistance);

    return () => window.removeEventListener('resize', updatePinDistance);
  }, [sequenceFrameUrls.length]);

  useEffect(() => {
    loadedFramesRef.current = [];
    primaryFrameIndexRef.current = -1;
    sequenceReadyRef.current = false;

    if (primaryFrameRef.current) {
      primaryFrameRef.current.src = sequenceFrameUrls[0];
    }
  }, [sequenceFrameUrls]);

  useEffect(() => {
    let cancelled = false;
    let nextIndex = 0;
    let loadedCount = 0;

    const loadFrame = (src) =>
      new Promise((resolve) => {
        const image = new Image();
        image.decoding = 'async';
        image.loading = 'eager';
        image.onload = () => resolve(image);
        image.onerror = () => resolve(null);
        image.src = src;
      });

    const worker = async () => {
      while (!cancelled && nextIndex < loadOrder.length) {
        const index = loadOrder[nextIndex];
        nextIndex += 1;

        const image = await loadFrame(sequenceFrameUrls[index]);
        if (cancelled) {
          return;
        }

        loadedFramesRef.current[index] = image;
        if (image) {
          loadedCount += 1;
        }

        if (index === 0 && image && primaryFrameRef.current) {
          primaryFrameRef.current.src = sequenceFrameUrls[0];
          primaryFrameIndexRef.current = 0;
        }

        const firstFrameReady = Boolean(loadedFramesRef.current[0]);
        const ready = firstFrameReady && loadedCount >= readyFrameTarget;

        if (
          index === 0 ||
          loadedCount <= readyFrameTarget ||
          loadedCount === sequenceFrameUrls.length ||
          loadedCount % 12 === 0
        ) {
          setLoadingState({
            loaded: loadedCount,
            total: sequenceFrameUrls.length,
            ready,
            firstFrameReady,
          });
        }

      }
    };

    const workers = Array.from(
      { length: Math.min(LOAD_CONCURRENCY, sequenceFrameUrls.length) },
      () => worker()
    );

    Promise.all(workers).then(() => {
      if (!cancelled) {
        setLoadingState({
          loaded: loadedCount,
          total: sequenceFrameUrls.length,
          ready: Boolean(loadedFramesRef.current[0]) && loadedCount >= readyFrameTarget,
          firstFrameReady: Boolean(loadedFramesRef.current[0]),
        });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [loadOrder, readyFrameTarget, sequenceFrameUrls]);

  useEffect(() => {
    const syncProgress = () => {
      if (sectionRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const scrollableDistance = Math.max(
          sectionRef.current.offsetHeight - window.innerHeight,
          1
        );

        targetProgressRef.current = clamp(
          -sectionRect.top / scrollableDistance,
          0,
          1
        );
      }

      renderSequence();
      progressFrameRef.current = window.requestAnimationFrame(syncProgress);
    };

    syncProgress();

    return () => {
      if (progressFrameRef.current) {
        window.cancelAnimationFrame(progressFrameRef.current);
      }
    };
  }, [renderSequence]);

  useEffect(() => {
    if (!stickyRef.current || typeof ResizeObserver === 'undefined') {
      return;
    }

    const observer = new ResizeObserver(() => {
      renderSequence();
    });

    observer.observe(stickyRef.current);

    return () => observer.disconnect();
  }, [renderSequence]);

  const loadingPercent = loadingState.total
    ? Math.round((loadingState.loaded / loadingState.total) * 100)
    : 0;

  return (
    <header
      id={id}
      ref={sectionRef}
      className={`scroll-cinema${isCompact ? ' scroll-cinema--compact' : ''}`}
      style={{ minHeight: `calc(100svh + ${pinDistance}px)` }}
    >
      <div
        ref={stickyRef}
        className={`scroll-cinema__sticky${
          isCompact ? ' scroll-cinema__sticky--compact' : ''
        }`}
      >
        {isCompact ? (
          <div className="scroll-cinema__mobile-shell">
            <div className="scroll-cinema__mobile-media">
              <div className="scroll-cinema__mobile-visual" aria-hidden="true">
                <img
                  src={sequenceFrameUrls[0]}
                  alt=""
                  className={`scroll-cinema__poster${
                    sequenceReady ? ' scroll-cinema__poster--hidden' : ''
                  }`}
                />
                <img
                  ref={primaryFrameRef}
                  alt=""
                  className={`scroll-cinema__sequence${
                    sequenceReady ? ' is-ready' : ''
                  }`}
                />
                <div className="scroll-cinema__mobile-veil"></div>
              </div>

              {!loadingState.ready ? (
                <div className="scroll-cinema__mobile-loading">
                  <span>Loading journey</span>
                  <strong>{loadingPercent}%</strong>
                </div>
              ) : null}

              <div className="scroll-cinema__mobile-copy">
                <span className="scroll-cinema__label">{copy.eyebrow}</span>
                <h1>{renderHeadlineWithAccent(copy.headline, copy.headlineAccent)}</h1>
                <p>{copy.supportingLine}</p>
                <div className="scroll-cinema__mobile-actions">
                  <button
                    type="button"
                    className="scroll-cinema__cta scroll-cinema__cta--solid"
                    onClick={onExplorePackages}
                  >
                    Explore Packages
                    <ArrowRight size={18} />
                  </button>
                  <button
                    type="button"
                    className="scroll-cinema__cta scroll-cinema__cta--ghost"
                    onClick={onOpenWhatsApp}
                  >
                    Start on WhatsApp
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="scroll-cinema__visual" aria-hidden="true">
              <img
                src={sequenceFrameUrls[0]}
                alt=""
                className={`scroll-cinema__poster${
                  sequenceReady ? ' scroll-cinema__poster--hidden' : ''
                }`}
              />
              <img
                ref={primaryFrameRef}
                alt=""
                className={`scroll-cinema__sequence${
                  sequenceReady ? ' is-ready' : ''
                }`}
              />
              <div
                className="scroll-cinema__shade scroll-cinema__shade--left"
                style={{ opacity: leftShadeOpacity }}
              ></div>
              <div
                className="scroll-cinema__shade scroll-cinema__shade--right"
                style={{ opacity: rightShadeOpacity }}
              ></div>
              <div className="scroll-cinema__shade scroll-cinema__shade--top"></div>
              <div className="scroll-cinema__shade scroll-cinema__shade--bottom"></div>
            </div>

            <div className="scroll-cinema__content">
              <div
                className="scroll-cinema__intro"
                style={{
                  opacity: introOpacity,
                  pointerEvents: introOpacity > 0.18 ? 'auto' : 'none',
                  transform: `translate3d(${lerp(
                    0,
                    -88,
                    introTravel
                  )}px, ${lerp(0, -16, introTravel)}px, 0) scale(${lerp(
                    1,
                    0.965,
                    introTravel
                  )})`,
                }}
              >
                <span className="scroll-cinema__label">{copy.eyebrow}</span>
                <h1>{renderHeadlineWithAccent(copy.headline, copy.headlineAccent)}</h1>
                <p>{copy.supportingLine}</p>
                <button
                  type="button"
                  className="scroll-cinema__cta scroll-cinema__cta--solid"
                  onClick={onExplorePackages}
                >
                  Explore Packages
                  <ArrowRight size={18} />
                </button>
              </div>

              <div
                className="scroll-cinema__support"
                aria-hidden={supportPhase < 0.05}
                style={{
                  opacity: supportPhase,
                  pointerEvents: supportPhase > 0.18 ? 'auto' : 'none',
                  transform: `translate3d(${lerp(
                    64,
                    0,
                    supportPhase
                  )}px, ${lerp(20, 0, supportPhase)}px, 0)`,
                }}
              >
                <span className="scroll-cinema__label">{copy.lateEyebrow}</span>
                <h2>
                  {renderHeadlineWithAccent(
                    copy.lateHeadline,
                    copy.lateHeadlineAccent
                  )}
                </h2>
                <p>{copy.lateLine}</p>
                <button
                  type="button"
                  className="scroll-cinema__cta scroll-cinema__cta--ghost"
                  onClick={onOpenWhatsApp}
                >
                  Start on WhatsApp
                  <ArrowRight size={18} />
                </button>
              </div>

              {!loadingState.ready ? (
                <div className="scroll-cinema__loading">
                  <span>Loading journey</span>
                  <strong>{loadingPercent}%</strong>
                </div>
              ) : null}
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default ScrollHero;
