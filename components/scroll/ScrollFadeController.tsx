"use client";

export function ScrollFadeController() {
  return (
    <div className="viewport-scroll-vignette" aria-hidden="true">
      <div className="viewport-vignette-top" />
      <div className="viewport-vignette-bottom" />
    </div>
  );
}
