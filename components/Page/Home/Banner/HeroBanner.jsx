"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Plane } from "lucide-react";

import BannerSlide from "./BannerSlide";
import SliderDots from "./SliderDots";
import SliderArrows from "./SliderArrows";
import ProgressBar from "./ProgressBar";
import { bannerSlides } from "./bannerSlides";
import FilterBox from "../../../ui/filter/FilterBox";

const SLIDE_DURATION = 5000;

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // swipe refs
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const totalSlides = bannerSlides.length;
  const activeSlide = bannerSlides[current];

  const goTo = useCallback(
    (index) => {
      setContentVisible(false);
      setTimeout(() => {
        setCurrent((index + totalSlides) % totalSlides);
        setContentVisible(true);
      }, 320);
    },
    [totalSlides],
  );

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-play
  useEffect(() => {
    if (paused) return;
    const id = setInterval(goNext, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [paused, goNext]);

  // Keyboard
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [goNext, goPrev]);

  // Touch
  const onTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const onTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 48) diff > 0 ? goNext() : goPrev();
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ position: "relative" }}>
        <section
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(480px, 68vw, 640px)",
            overflow: "hidden",
            userSelect: "none",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {bannerSlides.map((slide, i) => (
            <BannerSlide
              key={slide.id}
              slide={slide}
              isActive={i === current}
              visible={i === current && contentVisible}
            />
          ))}

          {/* Counter */}
          <div
            style={{
              position: "absolute",
              top: "25px",
              right: isMobile ? "20px" : "52px",
              zIndex: 10,
              fontFamily: "monospace",
              fontSize: isMobile ? "11px" : "12px",
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.50)",
            }}
          >
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(totalSlides).padStart(2, "0")}
          </div>

          {/* Bottom Controls */}
          <div
            style={{
              position: "absolute",
              bottom: isMobile ? "40px" : "clamp(78px, 4vw, 48px)",
              left: 0,
              right: 0,
              padding: isMobile
                ? "0 16px"
                : "0 clamp(16px, 5vw, 56px)",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <SliderDots
              total={totalSlides}
              current={current}
              onChange={goTo}
              accentHex={activeSlide.accentHex}
            />

            <div
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                gap: "6px",
                maxWidth: "260px",
                width: isMobile ? "100%" : "auto",
              }}
            >
              {bannerSlides.map((_, i) => (
                <ProgressBar
                  key={i}
                  isActive={i === current && !paused}
                  duration={SLIDE_DURATION}
                  accentHex={activeSlide.accentHex}
                />
              ))}
            </div>

            <SliderArrows onPrev={goPrev} onNext={goNext} />
          </div>
        </section>

        {/*  Responsive FilterBox */}
        <div
          style={{
            position: "absolute",
            bottom: -10,
            left: 0,
            right: 0,
            zIndex: 30,
            padding: isMobile
              ? "0 12px"
              : "0 clamp(40px, 5vw, 150px)",
            transform: isMobile
              ? "translateY(65%)"
              : "translateY(50%)",
            pointerEvents: "none",
          }}
        >
          <div style={{ pointerEvents: "auto" }}>
            <FilterBox />
          </div>
        </div>
      </div>
    </div>
  );
}