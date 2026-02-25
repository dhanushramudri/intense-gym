import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthButton from './AuthButton';

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
  ];

  const dropdowns = {
    programs: {
      label: 'Programs',
      sections: [
        {
          heading: 'TRAINING',
          links: ['Weight Loss', 'Muscle Gain', 'Strength Training', 'Crossfit'],
        },
        {
          heading: 'COACHING',
          links: ['Personal Training', 'Body Transformation', 'Nutrition Plans'],
        },
        {
          heading: 'FACILITIES',
          links: ['Equipment', 'Studio Tours', 'Community'],
        },
      ],
    },
    support: {
      label: 'Support',
      sections: [
        {
          heading: 'HELP',
          links: ['Help Center', 'Contact Us', 'FAQ'],
        },
      ],
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');

        .nav-root {
          font-family: 'DM Sans', sans-serif;
          position: sticky;
          top: 0;
          z-index: 100;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-root.scrolled {
          background: rgba(4,4,4,0.96) !important;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        /* Logo mark */
        .nav-logo-mark {
          width: 30px;
          height: 30px;
          background: #F59E0B;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }
        .nav-logo-mark:hover {
          background: #fff;
          transform: rotate(90deg) scale(1.05);
        }

        /* Nav links */
        .nav-link {
          color: rgba(255,255,255,0.45);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-decoration: none;
          transition: color 0.25s ease;
          position: relative;
          padding: 4px 0;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: #F59E0B;
          transition: width 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-link:hover { color: #fff; }
        .nav-link:hover::after { width: 100%; }

        /* Dropdown trigger */
        .nav-trigger {
          background: none;
          border: none;
          color: rgba(255,255,255,0.45);
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 4px 0;
          position: relative;
          transition: color 0.25s ease;
        }
        .nav-trigger::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: #F59E0B;
          transition: width 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-trigger:hover, .nav-trigger.open { color: #fff; }
        .nav-trigger.open::after, .nav-trigger:hover::after { width: 100%; }
        .nav-trigger .chevron {
          display: inline-block;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
          font-size: 8px;
          opacity: 0.5;
        }
        .nav-trigger.open .chevron { transform: rotate(180deg); opacity: 1; }

        /* Dropdown panel */
        .nav-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          left: 0;
          background: rgba(8,8,8,0.98);
          border: 1px solid rgba(255,255,255,0.06);
          border-top: 2px solid #F59E0B;
          border-radius: 3px;
          padding: 28px;
          z-index: 200;
          min-width: 340px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 32px 64px rgba(0,0,0,0.6);
          animation: dropIn 0.3s cubic-bezier(0.16,1,0.3,1) both;
        }
        .nav-dropdown-sm {
          min-width: 180px;
          padding: 20px 24px;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nav-dropdown-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0 24px;
        }
        .nav-dropdown-section { padding: 0; }
        .nav-dropdown-heading {
          font-size: 7px;
          font-weight: 800;
          color: rgba(245,158,11,0.6);
          letter-spacing: 0.25em;
          text-transform: uppercase;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .nav-dropdown-link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: rgba(255,255,255,0.35);
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.02em;
          text-decoration: none;
          padding: 6px 0;
          transition: all 0.2s ease;
          border-bottom: 1px solid transparent;
        }
        .nav-dropdown-link::before {
          content: '';
          width: 0px;
          height: 1px;
          background: #F59E0B;
          transition: width 0.25s ease;
          flex-shrink: 0;
          display: inline-block;
        }
        .nav-dropdown-link:hover {
          color: #fff;
          padding-left: 2px;
        }
        .nav-dropdown-link:hover::before { width: 8px; }

        /* Single-col dropdown */
        .nav-dropdown-link-solo {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: rgba(255,255,255,0.35);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-decoration: none;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: all 0.2s ease;
        }
        .nav-dropdown-link-solo:last-child { border-bottom: none; }
        .nav-dropdown-link-solo:hover { color: #F59E0B; }
        .nav-dropdown-link-solo .link-arrow {
          font-size: 10px;
          opacity: 0;
          transform: translateX(-4px);
          transition: all 0.2s ease;
        }
        .nav-dropdown-link-solo:hover .link-arrow { opacity: 1; transform: translateX(0); }

        /* Join button */
        .nav-join {
          background: #F59E0B;
          color: #000;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 10px 20px;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .nav-join::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #000;
          transform: translateX(-101%);
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-join:hover::after { transform: translateX(0); }
        .nav-join:hover { color: #F59E0B; }
        .nav-join span { position: relative; z-index: 1; }

        /* Divider */
        .nav-divider {
          width: 1px;
          height: 16px;
          background: rgba(255,255,255,0.08);
        }

        /* Hamburger */
        .nav-hamburger {
          background: none;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 2px;
          width: 36px;
          height: 36px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          cursor: pointer;
          transition: all 0.25s ease;
          padding: 0;
        }
        .nav-hamburger:hover { border-color: rgba(245,158,11,0.4); }
        .nav-bar {
          width: 16px;
          height: 1.5px;
          background: rgba(255,255,255,0.6);
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          display: block;
        }
        .nav-hamburger.open .nav-bar:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
        }
        .nav-hamburger.open .nav-bar:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .nav-hamburger.open .nav-bar:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
        }

        /* Mobile panel */
        .mobile-panel {
          background: #040404;
          border-top: 1px solid rgba(255,255,255,0.05);
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .mobile-panel.open { max-height: 600px; }

        .mobile-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 24px;
          color: rgba(255,255,255,0.4);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: color 0.2s ease;
          cursor: pointer;
          background: none;
          border-left: none;
          border-right: none;
          border-top: none;
          width: 100%;
          text-align: left;
          font-family: 'DM Sans', sans-serif;
        }
        .mobile-link:hover { color: #F59E0B; }
        .mobile-link.active { color: #F59E0B; border-bottom-color: rgba(245,158,11,0.15); }

        .mobile-sub-panel {
          background: rgba(245,158,11,0.03);
          border-bottom: 1px solid rgba(255,255,255,0.04);
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .mobile-sub-panel.open { max-height: 400px; }

        .mobile-sub-link {
          display: block;
          padding: 9px 24px 9px 36px;
          color: rgba(255,255,255,0.25);
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.06em;
          text-decoration: none;
          transition: color 0.2s ease;
          border-bottom: 1px solid rgba(255,255,255,0.03);
        }
        .mobile-sub-link:last-child { border-bottom: none; }
        .mobile-sub-link:hover { color: #F59E0B; }
        .mobile-sub-heading {
          padding: 10px 24px 4px 36px;
          font-size: 7px;
          font-weight: 800;
          color: rgba(245,158,11,0.4);
          letter-spacing: 0.25em;
          text-transform: uppercase;
        }
      `}</style>

      <nav
        ref={navRef}
        className={`nav-root${scrolled ? ' scrolled' : ''}`}
        style={{ background: scrolled ? undefined : '#040404', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        {/* Main bar */}
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>

            {/* Logo */}
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', flexShrink: 0 }}>
              <div className="nav-logo-mark">
                <span style={{ color: '#000', fontWeight: 900, fontSize: '14px', lineHeight: 1 }}>✦</span>
              </div>
              <div>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '16px',
                  color: '#fff',
                  letterSpacing: '0.08em',
                  lineHeight: 1,
                }}>
                  INTENSE FITNESS
                </div>
                <div style={{ fontSize: '7px', fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '1px' }}>
                  Studio · Vizianagaram
                </div>
              </div>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>

              {/* Programs dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  className={`nav-trigger${openDropdown === 'programs' ? ' open' : ''}`}
                  onClick={() => setOpenDropdown(openDropdown === 'programs' ? null : 'programs')}
                >
                  Programs
                  <span className="chevron">▾</span>
                </button>
                {openDropdown === 'programs' && (
                  <div className="nav-dropdown">
                    <div className="nav-dropdown-grid">
                      {dropdowns.programs.sections.map(sec => (
                        <div key={sec.heading} className="nav-dropdown-section">
                          <div className="nav-dropdown-heading">{sec.heading}</div>
                          {sec.links.map(link => (
                            <a key={link} href="#" className="nav-dropdown-link">{link}</a>
                          ))}
                        </div>
                      ))}
                    </div>
                    {/* Footer strip inside dropdown */}
                    <div style={{
                      marginTop: '20px',
                      paddingTop: '16px',
                      borderTop: '1px solid rgba(255,255,255,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                      <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.12em', fontWeight: 600 }}>
                        BABAMETTA, VIZIANAGARAM
                      </span>
                      <a href="#" style={{
                        fontSize: '9px', fontWeight: 700, color: '#F59E0B',
                        letterSpacing: '0.15em', textDecoration: 'none', textTransform: 'uppercase',
                        display: 'flex', alignItems: 'center', gap: '5px',
                      }}>
                        All Programs →
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {navLinks.map(link => (
                <a key={link.label} href={link.href} className="nav-link">{link.label}</a>
              ))}

              {/* Support dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  className={`nav-trigger${openDropdown === 'support' ? ' open' : ''}`}
                  onClick={() => setOpenDropdown(openDropdown === 'support' ? null : 'support')}
                >
                  Support
                  <span className="chevron">▾</span>
                </button>
                {openDropdown === 'support' && (
                  <div className="nav-dropdown nav-dropdown-sm">
                    {dropdowns.support.sections[0].links.map(link => (
                      <a key={link} href="#" className="nav-dropdown-link-solo">
                        {link}
                        <span className="link-arrow">→</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: divider + rating + CTA + hamburger */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {/* Rating pill — desktop only */}
              <div
                className="hidden sm:flex"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(245,158,11,0.06)',
                  border: '1px solid rgba(245,158,11,0.15)',
                  borderRadius: '2px',
                  padding: '5px 10px',
                }}
              >
                <span style={{ color: '#F59E0B', fontSize: '10px' }}>★</span>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em' }}>4.8</span>
                <div className="nav-divider" />
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '8px', fontWeight: 600, letterSpacing: '0.1em' }}>169</span>
              </div>

              <div className="nav-divider" />

              <button className="nav-join">
                <span>Join Now</span>
              </button>

      <AuthButton />

              {/* Hamburger — mobile */}
              <button
                className={`nav-hamburger${isMenuOpen ? ' open' : ''}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{ display: 'none' }}
                aria-label="Toggle menu"
              >
                <span className="nav-bar" />
                <span className="nav-bar" />
                <span className="nav-bar" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile panel */}
        <div className={`mobile-panel${isMenuOpen ? ' open' : ''}`}>
          <div style={{ padding: '8px 0 16px' }}>

            {/* Programs accordion */}
            <button
              className={`mobile-link${mobileExpanded === 'programs' ? ' active' : ''}`}
              onClick={() => setMobileExpanded(mobileExpanded === 'programs' ? null : 'programs')}
            >
              <span>Programs</span>
              <span style={{
                fontSize: '9px',
                color: 'rgba(255,255,255,0.25)',
                transition: 'transform 0.3s ease',
                transform: mobileExpanded === 'programs' ? 'rotate(180deg)' : 'none',
                display: 'inline-block',
              }}>▾</span>
            </button>
            <div className={`mobile-sub-panel${mobileExpanded === 'programs' ? ' open' : ''}`}>
              {dropdowns.programs.sections.map(sec => (
                <div key={sec.heading}>
                  <div className="mobile-sub-heading">{sec.heading}</div>
                  {sec.links.map(link => (
                    <a key={link} href="#" className="mobile-sub-link">{link}</a>
                  ))}
                </div>
              ))}
            </div>

            <a href="#" className="mobile-link">
              <span>About</span>
              <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.15)' }}>→</span>
            </a>
            <a href="#" className="mobile-link">
              <span>Blog</span>
              <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.15)' }}>→</span>
            </a>

            {/* Support accordion */}
            <button
              className={`mobile-link${mobileExpanded === 'support' ? ' active' : ''}`}
              onClick={() => setMobileExpanded(mobileExpanded === 'support' ? null : 'support')}
            >
              <span>Support</span>
              <span style={{
                fontSize: '9px', color: 'rgba(255,255,255,0.25)',
                transition: 'transform 0.3s ease',
                transform: mobileExpanded === 'support' ? 'rotate(180deg)' : 'none',
                display: 'inline-block',
              }}>▾</span>
            </button>
            <div className={`mobile-sub-panel${mobileExpanded === 'support' ? ' open' : ''}`}>
              {dropdowns.support.sections[0].links.map(link => (
                <a key={link} href="#" className="mobile-sub-link">{link}</a>
              ))}
            </div>

            {/* Mobile CTA */}
            <div style={{ padding: '16px 24px 8px' }}>
              <button style={{
                width: '100%',
                background: '#F59E0B',
                color: '#000',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '10px',
                fontWeight: 800,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '14px',
                border: 'none',
                borderRadius: '2px',
                cursor: 'pointer',
              }}>
                Join Now →
              </button>
            </div>
            <div style={{ padding: '8px 24px 16px' }}>
              <AuthButton />
            </div>
          </div>
        </div>

        {/* Responsive overrides */}
        <style>{`
          @media (max-width: 768px) {
            .nav-hamburger { display: flex !important; }
            .hidden { display: none !important; }
            nav > div > div { padding: 0 24px !important; }
          }
        `}</style>
      </nav>
    </>
  );
};

export default Navbar;