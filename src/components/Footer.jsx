import React, { useRef, useEffect, useState } from 'react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Trainers', href: '#' },
    { label: 'Programs', href: '#' },
    { label: 'Nutrition', href: '#' },
    { label: 'Plans', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  const programs = ['Crossfit', 'Weight Loss', 'Strength Training', 'Cardio', 'Zumba', 'Martial Arts', 'Outdoor Training'];

  const socials = [
    { label: 'Instagram', href: '#', short: 'IG' },
    { label: 'Facebook', href: '#', short: 'FB' },
    { label: 'YouTube', href: '#', short: 'YT' },
    { label: 'X / Twitter', href: '#', short: 'X' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');

        .footer-root { font-family: 'DM Sans', sans-serif; }

        @keyframes revealUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .f-r1 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .f-r2 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
        .f-r3 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
        .f-r4 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s both; }
        .f-r5 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s both; }

        .footer-nav-link {
          color: rgba(255,255,255,0.3);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-decoration: none;
          transition: color 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .footer-nav-link::before {
          content: '';
          display: inline-block;
          width: 0px;
          height: 1px;
          background: #F59E0B;
          transition: width 0.3s cubic-bezier(0.16,1,0.3,1);
          vertical-align: middle;
        }
        .footer-nav-link:hover { color: #F59E0B; }
        .footer-nav-link:hover::before { width: 10px; }

        .footer-program-tag {
          display: inline-block;
          border: 1px solid rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.2);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 5px 10px;
          border-radius: 2px;
          transition: all 0.25s ease;
          text-decoration: none;
        }
        .footer-program-tag:hover {
          border-color: rgba(245,158,11,0.35);
          color: #F59E0B;
          background: rgba(245,158,11,0.04);
        }

        .footer-social {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          text-decoration: none;
          transition: all 0.25s ease;
          cursor: pointer;
        }
        .footer-social:first-child { border-top: 1px solid rgba(255,255,255,0.05); }
        .footer-social .fs-label { color: rgba(255,255,255,0.3); font-size: 11px; font-weight: 600; letter-spacing: 0.1em; transition: color 0.25s ease; }
        .footer-social .fs-arrow { color: rgba(255,255,255,0.1); font-size: 12px; transition: all 0.3s ease; }
        .footer-social:hover .fs-label { color: #F59E0B; }
        .footer-social:hover .fs-arrow { color: #F59E0B; transform: translate(3px, -3px); }

        .footer-contact-link {
          color: rgba(255,255,255,0.35);
          font-size: 12px;
          font-weight: 400;
          text-decoration: none;
          transition: color 0.25s ease;
          letter-spacing: 0.01em;
        }
        .footer-contact-link:hover { color: #F59E0B; }

        @keyframes floatPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.15); }
        }
        .live-dot { animation: floatPulse 2.5s ease-in-out infinite; }

        /* Marquee */
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track { animation: marquee 22s linear infinite; display: inline-flex; }
        .marquee-track:hover { animation-play-state: paused; }

        /* Responsive */
        @media (max-width: 768px) {
          .footer-nav-link {
            font-size: 10px;
          }
          .footer-program-tag {
            font-size: 7px;
            padding: 4px 8px;
          }
          .footer-social .fs-label {
            font-size: 10px;
          }
          .footer-contact-link {
            font-size: 11px;
          }
        }

        @media (max-width: 640px) {
          .marquee-track span {
            padding: 0 16px !important;
          }
          .footer-nav-link {
            font-size: 9px;
          }
          .footer-program-tag {
            font-size: 6px;
            padding: 3px 6px;
          }
          .footer-social .fs-label {
            font-size: 9px;
          }
          .footer-contact-link {
            font-size: 10px;
          }
        }

        @media (max-width: 520px) {
          .marquee-track span {
            padding: 0 8px !important;
          }
        }
      `}</style>

      <footer
        ref={footerRef}
        className="footer-root"
        style={{
          background: '#040404',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient glow */}
        <div style={{
          position: 'absolute', top: '-300px', right: '-200px',
          width: '700px', height: '700px',
          background: 'radial-gradient(circle, rgba(245,158,11,0.03) 0%, transparent 65%)',
          borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none',
        }} />

        {/* ── Big CTA Marquee strip ── */}
        <div
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            padding: 'clamp(16px, 4vw, 28px) 0',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}
        >
          <div className="marquee-track">
            {['JOIN NOW', 'TRANSFORM', 'STRENGTH', 'RESULTS', 'VIZIANAGARAM #1', 'FREE TRIAL', 'JOIN NOW', 'TRANSFORM', 'STRENGTH', 'RESULTS', 'VIZIANAGARAM #1', 'FREE TRIAL'].map((t, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 0 }}>
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(10px, 2.5vw, 13px)',
                  letterSpacing: '0.22em',
                  color: i % 3 === 0 ? '#F59E0B' : 'rgba(255,255,255,0.1)',
                  padding: '0 clamp(8px, 3vw, 32px)',
                }}>
                  {t}
                </span>
                <span style={{ color: 'rgba(245,158,11,0.2)', fontSize: '6px' }}>✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Main footer body ── */}
        <div style={{
          padding: 'clamp(40px, 8vw, 72px) clamp(20px, 5vw, 60px) 0',
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          width: '100%',
        }}>

          {/* Top: Brand headline + CTA */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 'clamp(40px, 8vw, 64px)',
              flexWrap: 'wrap',
              gap: 'clamp(20px, 4vw, 32px)',
              ...(isVisible ? {} : { opacity: 0 }),
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s',
            }}
          >
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10B981' }} className="live-dot" />
                <span style={{ fontSize: 'clamp(7px, 1.5vw, 8px)', fontWeight: 700, color: '#10B981', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                  Open Daily · 5AM – 10PM
                </span>
              </div>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(32px, 7vw, 80px)',
                fontWeight: 400,
                color: '#fff',
                lineHeight: 0.92,
                letterSpacing: '-0.01em',
                margin: 0,
              }}>
                ELEVATE YOUR<br />
                <span style={{ color: '#F59E0B' }}>FITNESS JOURNEY.</span>
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px', minWidth: '140px' }}>
              <a
                href="#"
                style={{
                  background: '#F59E0B',
                  color: '#000',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 'clamp(8px, 1.5vw, 9px)',
                  fontWeight: 800,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  padding: 'clamp(12px, 2vw, 14px) clamp(18px, 3vw, 28px)',
                  borderRadius: '2px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { e.target.style.background = '#fff'; }}
                onMouseLeave={e => { e.target.style.background = '#F59E0B'; }}
              >
                Join Now →
              </a>
              <a
                href="#"
                style={{
                  color: 'rgba(255,255,255,0.25)',
                  fontSize: 'clamp(8px, 1.5vw, 9px)',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  paddingBottom: '2px',
                  transition: 'all 0.25s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { e.target.style.color = '#F59E0B'; e.target.style.borderBottomColor = 'rgba(245,158,11,0.4)'; }}
                onMouseLeave={e => { e.target.style.color = 'rgba(255,255,255,0.25)'; e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'; }}
              >
                Start Free Trial
              </a>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: 'clamp(40px, 8vw, 64px)' }} />

          {/* Grid - Responsive */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'clamp(32px, 6vw, 48px)',
              marginBottom: 'clamp(40px, 8vw, 64px)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s',
            }}
          >
            {/* Col 1 — Brand + contact */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <div style={{
                  width: '28px', height: '28px',
                  background: '#F59E0B',
                  borderRadius: '3px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ color: '#000', fontWeight: 900, fontSize: '13px' }}>✦</span>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(10px, 2vw, 11px)', fontWeight: 600, letterSpacing: '0.05em' }}>
                  Intense Fitness Studio
                </span>
              </div>
              <p style={{
                color: 'rgba(255,255,255,0.2)',
                fontSize: 'clamp(11px, 1.5vw, 12px)',
                lineHeight: 1.8,
                fontWeight: 300,
                marginBottom: '28px',
                maxWidth: '240px',
              }}>
                Vizianagaram's #1 rated gym. Certified trainers, diverse programs, and a community built for transformation.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a href="tel:+919876543210" className="footer-contact-link">+91 98765 43210</a>
                <a href="mailto:info@intensefitness.com" className="footer-contact-link">info@intensefitness.com</a>
                <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 'clamp(10px, 1.5vw, 12px)', fontWeight: 300, margin: 0, lineHeight: 1.6 }}>
                  Babametta, Vizianagaram<br />Andhra Pradesh – 535002
                </p>
              </div>
            </div>

            {/* Col 2 — Navigation */}
            <div>
              <h4 style={{
                fontSize: 'clamp(7px, 1.5vw, 8px)', fontWeight: 800, color: 'rgba(255,255,255,0.2)',
                letterSpacing: '0.25em', textTransform: 'uppercase',
                margin: '0 0 24px',
              }}>Navigation</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {navLinks.map(link => (
                  <a key={link.label} href={link.href} className="footer-nav-link">{link.label}</a>
                ))}
              </div>
            </div>

            {/* Col 3 — Programs */}
            <div>
              <h4 style={{
                fontSize: 'clamp(7px, 1.5vw, 8px)', fontWeight: 800, color: 'rgba(255,255,255,0.2)',
                letterSpacing: '0.25em', textTransform: 'uppercase',
                margin: '0 0 24px',
              }}>Programs</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {programs.map(p => (
                  <a key={p} href="#" className="footer-program-tag">{p}</a>
                ))}
              </div>
            </div>

            {/* Col 4 — Social */}
            <div>
              <h4 style={{
                fontSize: 'clamp(7px, 1.5vw, 8px)', fontWeight: 800, color: 'rgba(255,255,255,0.2)',
                letterSpacing: '0.25em', textTransform: 'uppercase',
                margin: '0 0 24px',
              }}>Follow Us</h4>
              <div>
                {socials.map(s => (
                  <a key={s.label} href={s.href} className="footer-social">
                    <span className="fs-label">{s.label}</span>
                    <span className="fs-arrow">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.05)',
              padding: 'clamp(18px, 3vw, 24px) 0 clamp(24px, 4vw, 32px)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.8s ease 0.5s',
            }}
          >
            <p style={{ color: 'rgba(255,255,255,0.1)', fontSize: 'clamp(7px, 1.5vw, 9px)', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0 }}>
              © 2025 Intense Fitness Studio · Vizianagaram · All rights reserved
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {['Privacy Policy', 'Terms of Service'].map(item => (
                <a
                  key={item}
                  href="#"
                  style={{
                    color: 'rgba(255,255,255,0.1)',
                    fontSize: 'clamp(7px, 1.5vw, 9px)',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    transition: 'color 0.25s ease',
                  }}
                  onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.1)'}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;