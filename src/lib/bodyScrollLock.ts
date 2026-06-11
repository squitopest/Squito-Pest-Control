let lockedScrollY = 0;

/** Freeze page scroll and remember position. Safe to call more than once. */
export function lockBodyScroll(): void {
  if (typeof window === "undefined") return;

  lockedScrollY = window.scrollY;
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.top = `-${lockedScrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
}

/** Restore scroll position without the jump/bounce fixed-body unlock often causes. */
export function unlockBodyScroll(): void {
  if (typeof window === "undefined") return;

  const top = document.body.style.top;
  const scrollY = top ? Math.abs(parseInt(top, 10)) || lockedScrollY : lockedScrollY;

  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";
  document.body.style.paddingRight = "";

  window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
}
