import React, { useState, useEffect, useRef } from 'react';
import EditableImage from './EditableImage';

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouse = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouse);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        .hero-root {
          font-family: 'DM Sans', sans-serif;
        }

        /* Animated gradient orb */
        .hero-orb {
          border-radius: 50%;
          filter: blur(90px);
          transition: transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          pointer-events: none;
        }

        /* Stagger reveal animations */
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes revealRight {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes lineExpand {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes counterUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatDot {
          0%, 100% { transform: translateY(0px); opacity: 0.4; }
          50%       { transform: translateY(-8px); opacity: 0.8; }
        }

        .reveal-1 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
        .reveal-2 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.22s both; }
        .reveal-3 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.34s both; }
        .reveal-4 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.46s both; }
        .reveal-5 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.58s both; }
        .reveal-right { animation: revealRight 1.1s cubic-bezier(0.16,1,0.3,1) 0.3s both; }
        .reveal-fade  { animation: fadeIn 1.4s ease 0.8s both; }
        .line-expand  { animation: lineExpand 1s cubic-bezier(0.16,1,0.3,1) 0.5s both; transform-origin: left; }
        .stat-reveal-1 { animation: counterUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.9s both; }
        .stat-reveal-2 { animation: counterUp 0.7s cubic-bezier(0.16,1,0.3,1) 1.0s both; }
        .stat-reveal-3 { animation: counterUp 0.7s cubic-bezier(0.16,1,0.3,1) 1.1s both; }
        .float-dot    { animation: floatDot 3.5s ease-in-out infinite; }

        /* Pill badge */
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(245, 158, 11, 0.06);
          border: 1px solid rgba(245, 158, 11, 0.22);
          color: #F59E0B;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.2em;
          padding: 5px 13px;
          border-radius: 2px;
          text-transform: uppercase;
        }
        .badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #F59E0B;
          animation: floatDot 2s ease-in-out infinite;
        }

        /* CTA Buttons */
        .btn-primary {
          background: #F59E0B;
          color: #000;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 14px 32px;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.12);
          transform: translateX(-101%);
          transition: transform 0.3s ease;
        }
        .btn-primary:hover::after { transform: translateX(0); }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(245,158,11,0.35); }
        .btn-primary:active { transform: translateY(0); }

        .btn-ghost {
          background: transparent;
          color: rgba(255,255,255,0.65);
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 14px 24px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .btn-ghost:hover {
          color: #fff;
          border-color: rgba(255,255,255,0.35);
          background: rgba(255,255,255,0.04);
        }
        .btn-arrow {
          display: inline-block;
          transition: transform 0.3s ease;
        }
        .btn-ghost:hover .btn-arrow { transform: translateX(4px); }

        /* Stats */
        .stat-divider {
          width: 1px;
          height: 32px;
          background: rgba(255,255,255,0.08);
        }

        /* Image container */
        .img-wrapper {
          position: relative;
        }
        .img-wrapper::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(135deg, rgba(245,158,11,0.3) 0%, transparent 50%, rgba(245,158,11,0.1) 100%);
          border-radius: 4px;
          z-index: 1;
          pointer-events: none;
        }
        .img-wrapper img {
          border-radius: 3px;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Floating tag */
        .floating-tag {
          position: absolute;
          background: rgba(8, 8, 8, 0.92);
          border: 1px solid rgba(245,158,11,0.25);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 3px;
          padding: 14px 18px;
          animation: revealUp 0.8s cubic-bezier(0.16,1,0.3,1) 1.1s both;
        }

        /* Vertical label */
        .vert-label {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.25em;
          color: rgba(255,255,255,0.18);
          text-transform: uppercase;
          user-select: none;
        }

        /* Scroll indicator */
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50%       { transform: translateY(6px); opacity: 0.9; }
        }
        .scroll-indicator { animation: scrollBounce 2s ease-in-out infinite; }

        /* Grain overlay */
        .grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 150px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-title { font-size: clamp(56px, 14vw, 80px) !important; }
          .hero-right { display: none !important; }
          .hero-stats { flex-wrap: wrap; gap: 16px !important; }
        }
      `}</style>

      <section
        ref={heroRef}
        className="hero-root"
        style={{
          background: '#060606',
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Grain overlay */}
        <div className="grain" />

        {/* Ambient light — follows mouse */}
        <div
          className="hero-orb"
          style={{
            position: 'absolute',
            width: '700px',
            height: '700px',
            background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)',
            left: `${mousePos.x - 25}%`,
            top: `${mousePos.y - 25}%`,
            zIndex: 0,
          }}
        />

        {/* Fixed top-right ambient glow */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-100px',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 65%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />

        {/* Horizontal rule lines — editorial grid feel */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.04)' }} />

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '80px 60px 60px',
            maxWidth: '1400px',
            margin: '0 auto',
            width: '100%',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div
            className="hero-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 420px',
              gap: '80px',
              alignItems: 'center',
            }}
          >
            {/* LEFT — Typography */}
            <div>
              {/* Badge */}
              <div className="reveal-1" style={{ marginBottom: '36px' }}>
                <span className="badge">
                  <span className="badge-dot" />
                  Vizianagaram's #1 Rated Fitness Studio
                  <span style={{ color: 'rgba(245,158,11,0.4)', marginLeft: '4px' }}>★ 4.8</span>
                </span>
              </div>

              {/* Main headline */}
              <div style={{ position: 'relative', marginBottom: '32px' }}>
                <h1
                  className="reveal-2 hero-title"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(72px, 9vw, 128px)',
                    fontWeight: 400,
                    color: '#fff',
                    lineHeight: 0.92,
                    letterSpacing: '-0.01em',
                    margin: 0,
                  }}
                >
                  UNLEASH
                </h1>
                <h1
                  className="reveal-3 hero-title"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(72px, 9vw, 128px)',
                    fontWeight: 400,
                    color: 'transparent',
                    lineHeight: 0.92,
                    letterSpacing: '-0.01em',
                    margin: 0,
                    WebkitTextStroke: '1.5px rgba(255,255,255,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                  }}
                >
                  YOUR
                  {/* Accent line through the outlined word */}
                  <span
                    className="line-expand"
                    style={{
                      flex: 1,
                      height: '2px',
                      background: 'linear-gradient(90deg, rgba(245,158,11,0.8), transparent)',
                      display: 'inline-block',
                      verticalAlign: 'middle',
                    }}
                  />
                </h1>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <h1
                    className="reveal-4 hero-title"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 'clamp(72px, 9vw, 128px)',
                      fontWeight: 400,
                      color: '#F59E0B',
                      lineHeight: 0.92,
                      letterSpacing: '-0.01em',
                      margin: 0,
                    }}
                  >
                    STRENGTH
                  </h1>
                  {/* Underline bar */}
                  <div
                    className="line-expand"
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: '#F59E0B',
                    }}
                  />
                </div>
              </div>

              {/* Description */}
              <div
                className="reveal-5"
                style={{
                  display: 'flex',
                  gap: '24px',
                  alignItems: 'flex-start',
                  marginBottom: '48px',
                  maxWidth: '520px',
                }}
              >
                <div
                  style={{
                    width: '2px',
                    height: '56px',
                    background: 'linear-gradient(to bottom, #F59E0B, transparent)',
                    flexShrink: 0,
                    marginTop: '4px',
                  }}
                />
                <p
                  style={{
                    color: 'rgba(255,255,255,0.42)',
                    fontSize: '13px',
                    lineHeight: 1.85,
                    fontWeight: 300,
                    margin: 0,
                    letterSpacing: '0.02em',
                  }}
                >
                  Next-level training in a high-energy, modern space. Advanced equipment, expert coaching, certified nutritionists — a community built for transformation.
                </p>
              </div>

              {/* CTAs */}
              <div
                className="reveal-5"
                style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}
              >
                <button className="btn-primary">
                  Start Training →
                </button>
                <button className="btn-ghost">
                  Free Trial
                  <span className="btn-arrow">↗</span>
                </button>
              </div>

              {/* Stats row */}
              <div
                className="hero-stats"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '28px',
                  marginTop: '52px',
                  paddingTop: '28px',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {[
                  { num: '4.8', label: 'Google Rating', suffix: '★' },
                  { num: '169', label: 'Verified Reviews', suffix: '+' },
                  { num: '10', label: 'Open Till', suffix: 'PM' },
                ].map((stat, i) => (
                  <React.Fragment key={stat.label}>
                    <div className={`stat-reveal-${i + 1}`}>
                      <div
                        style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: '30px',
                          color: '#fff',
                          lineHeight: 1,
                          letterSpacing: '0.02em',
                        }}
                      >
                        {stat.num}
                        <span style={{ color: '#F59E0B', fontSize: '18px' }}>{stat.suffix}</span>
                      </div>
                      <div
                        style={{
                          fontSize: '9px',
                          fontWeight: 600,
                          color: 'rgba(255,255,255,0.25)',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          marginTop: '4px',
                        }}
                      >
                        {stat.label}
                      </div>
                    </div>
                    {i < 2 && <div className="stat-divider" />}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* RIGHT — Image composition */}
            <div
              className="hero-right reveal-fade"
              style={{ position: 'relative' }}
            >
              {/* Vertical label beside image */}
              <div
                style={{
                  position: 'absolute',
                  left: '-28px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 3,
                }}
              >
                <span className="vert-label">Intense Fitness Studio</span>
              </div>

              {/* Main image */}
              <div
                className="img-wrapper"
                style={{ height: '520px' }}
              >
  <EditableImage
    imageId="hero-main"
    fallback="https://cdn.prod.website-files.com/image-generation-assets/34574341-f99a-4c15-9f10-0e1ff56f7fe6.avif"
    alt="Fitness training"
    style={{ borderRadius: '3px', display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
  />
                {/* Inner gradient overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(6,6,6,0.7) 0%, transparent 45%)',
                    borderRadius: '3px',
                    zIndex: 2,
                    pointerEvents: 'none',   // ← ADD THIS LINE
                  }}
                />
              </div>

              {/* Floating stat tag — bottom left */}
              <div
                className="floating-tag"
                style={{ bottom: '28px', left: '-24px', zIndex: 4 }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '28px',
                    color: '#F59E0B',
                    lineHeight: 1,
                    letterSpacing: '0.04em',
                  }}
                >
                  UNISEX GYM
                </div>
                <div
                  style={{
                    fontSize: '9px',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.35)',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    marginTop: '4px',
                  }}
                >
                  Men & Women Welcome
                </div>
              </div>

              {/* Floating badge — top right */}
              <div
                className="floating-tag"
                style={{ top: '24px', right: '-20px', zIndex: 4 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#10B981',
                      animation: 'floatDot 2s ease-in-out infinite',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: 700,
                      color: 'rgba(255,255,255,0.6)',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Open Daily
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '20px',
                    color: '#fff',
                    lineHeight: 1,
                    marginTop: '4px',
                    letterSpacing: '0.04em',
                  }}
                >
                  5AM – 10PM
                </div>
              </div>

              {/* Corner accent dots */}
              {['top-right', 'bottom-right'].map((pos) => (
                <div
                  key={pos}
                  className="float-dot"
                  style={{
                    position: 'absolute',
                    [pos.includes('top') ? 'top' : 'bottom']: '12px',
                    right: pos.includes('right') ? '12px' : 'auto',
                    left: pos.includes('left') ? '12px' : 'auto',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: '#F59E0B',
                    zIndex: 5,
                    animationDelay: pos.includes('bottom') ? '0.8s' : '0s',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom strip — programs ticker */}
        <div
          className="reveal-fade"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            padding: '16px 60px',
            display: 'flex',
            alignItems: 'center',
            gap: '40px',
            position: 'relative',
            zIndex: 2,
            overflowX: 'auto',
          }}
        >
          <span
            style={{
              fontSize: '8px',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.18)',
              letterSpacing: '0.2em',
              flexShrink: 0,
            }}
          >
            PROGRAMS
          </span>
          <div
            style={{
              width: '1px',
              height: '16px',
              background: 'rgba(255,255,255,0.08)',
              flexShrink: 0,
            }}
          />
          {['Crossfit', 'Weight Loss', 'Strength Training', 'Cardio', 'Zumba', 'Martial Arts', 'Outdoor Training', 'Nutrition Coaching'].map((item, i) => (
            <React.Fragment key={item}>
              <span
                style={{
                  fontSize: '9px',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => e.target.style.color = '#F59E0B'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.3)'}
              >
                {item}
              </span>
              {i < 7 && (
                <span style={{ color: 'rgba(245,158,11,0.2)', fontSize: '8px', flexShrink: 0 }}>✦</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Scroll indicator */}
        <div
          className="reveal-fade"
          style={{
            position: 'absolute',
            bottom: '72px',
            left: '60px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            zIndex: 3,
            opacity: scrollY > 50 ? 0 : 1,
            transition: 'opacity 0.4s ease',
          }}
        >
          <span
            style={{
              fontSize: '8px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
            }}
          >
            Scroll
          </span>
          <div
            className="scroll-indicator"
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, rgba(245,158,11,0.6), transparent)',
            }}
          />
        </div>
      </section>
    </>
  );
};

export default HeroSection;