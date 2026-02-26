import React, { useRef, useEffect, useState } from 'react';

const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const cards = [
    {
      id: 0,
      tag: 'TRAINER', tagColor: '#F59E0B',
      src: 'https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3d08_bb0cbef0-499c-400c-a83b-f39230d2302a.avif',
      title: 'Certified\nTrainers', sub: 'Results Guaranteed',
      stat: '4.8', statSuffix: '★', statLabel: 'GOOGLE RATING',
      desc: 'Train with certified coaches who specialise in Weight Loss, Strength, and Martial Arts. Passionate trainers — empowering both men and women.',
      cta: 'Meet Our Trainers', accentLine: 'Train with champions.', large: true,
    },
    {
      id: 1,
      tag: 'PROGRAMS', tagColor: '#EF4444',
      src: 'https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3cbb_265cca82-58d0-46cf-9738-66a57a4e722a.avif',
      title: 'Weight Loss\n& Strength', sub: 'Diverse Class Lineup',
      stat: '6', statSuffix: '+', statLabel: 'PROGRAMS',
      desc: 'Crossfit, Cardio, Zumba, Martial Arts, Strength Training & Weight Loss — all under one roof.',
      cta: 'Explore Programs', accentLine: 'Every goal. One studio.', large: false,
    },
    {
      id: 2,
      tag: 'NUTRITION', tagColor: '#10B981',
      src: 'https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3cb4_5b80479a-0b3c-4d64-bd4e-20f04fa0ccbc.avif',
      title: 'Certified\nNutritionists', sub: 'State-of-the-Art Equipment',
      stat: '100', statSuffix: '%', statLabel: 'RESULTS DRIVEN',
      desc: 'On-site nutritionists provide personalised meal plans. Advanced equipment, outdoor training, full-body transformation.',
      cta: 'See Facilities', accentLine: 'Fuel. Train. Transform.', large: false,
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');

        .feat-root { font-family: 'DM Sans', sans-serif; }

        /* Card base */
        .feat-card {
          position: relative; overflow: hidden; cursor: pointer; background: #0a0a0a;
        }
        .feat-card img {
          position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.6s ease;
          filter: grayscale(20%) contrast(1.04) brightness(0.9);
        }
        .feat-card:hover img { transform: scale(1.08); filter: grayscale(0%) contrast(1.06) brightness(0.95); }

        .feat-gradient {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0.05) 100%);
          transition: opacity 0.4s ease;
        }

        .feat-accent-line {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          transform-origin: left; transform: scaleX(0);
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); z-index: 4;
        }
        .feat-card:hover .feat-accent-line { transform: scaleX(1); }

        .feat-tag {
          position: absolute; top: 16px; left: 16px;
          font-size: 7px; font-weight: 800; letter-spacing: 0.22em;
          text-transform: uppercase; padding: 4px 10px; border-radius: 2px; color: #000; z-index: 3;
        }

        .feat-stat {
          position: absolute; top: 14px; right: 16px; text-align: right; z-index: 3;
        }
        .feat-stat-num {
          font-family: 'Bebas Neue', sans-serif; font-size: 28px; line-height: 1; letter-spacing: 0.02em;
        }
        .feat-stat-label {
          font-size: 7px; font-weight: 700; color: rgba(255,255,255,0.3);
          letter-spacing: 0.15em; margin-top: 2px;
        }

        .feat-bottom {
          position: absolute; bottom: 0; left: 0; right: 0; padding: 0 20px 20px; z-index: 3;
        }

        .feat-italic {
          font-style: italic; font-size: 11px; font-weight: 400; letter-spacing: 0.02em;
          margin-bottom: 8px; opacity: 0; transform: translateY(8px);
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1) 0.05s;
        }
        .feat-card:hover .feat-italic { opacity: 1; transform: translateY(0); }

        .feat-sub {
          font-size: 7px; font-weight: 700; color: rgba(255,255,255,0.25);
          letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 6px;
        }

        .feat-title {
          font-family: 'Bebas Neue', sans-serif; color: #fff;
          line-height: 0.95; letter-spacing: 0.01em; margin-bottom: 10px; white-space: pre-line;
        }

        .feat-desc {
          color: rgba(255,255,255,0.45); font-size: 11px; line-height: 1.75;
          font-weight: 300; margin-bottom: 16px;
          opacity: 0; transform: translateY(6px);
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1) 0.08s;
        }
        .feat-card:hover .feat-desc { opacity: 1; transform: translateY(0); }

        .feat-cta {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 9px; font-weight: 800; letter-spacing: 0.16em;
          text-transform: uppercase; text-decoration: none;
          transition: gap 0.3s ease, opacity 0.3s ease;
        }
        .feat-cta .cta-arrow { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1); display: inline-block; }
        .feat-card:hover .feat-cta .cta-arrow { transform: translateX(5px); }

        /* ── Desktop: 3-col grid ── */
        .feat-desktop { display: grid; }
        /* ── Mobile: hidden ── */
        .feat-mobile  { display: none; }

        /* Mobile card (horizontal layout) */
        .feat-mobile-card {
          position: relative; overflow: hidden; cursor: pointer;
          background: #0a0a0a; display: flex; flex-direction: column;
        }
        .feat-mobile-card img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.6s ease;
          filter: grayscale(20%) brightness(0.85);
        }
        .feat-mobile-card:hover img { transform: scale(1.05); filter: grayscale(0%) brightness(0.9); }
        .feat-mobile-card .feat-gradient { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.1) 100%); }
        .feat-mobile-card .feat-accent-line { position: absolute; top: 0; left: 0; right: 0; height: 2px; transform-origin: left; transform: scaleX(0); transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); z-index: 4; }
        .feat-mobile-card:hover .feat-accent-line { transform: scaleX(1); }

        @media (max-width: 768px) {
          .feat-desktop { display: none !important; }
          .feat-mobile  { display: flex !important; }

          .feat-header-wrap {
            padding: 48px 20px 36px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 20px !important;
          }
          .feat-header-right { max-width: 100% !important; }
          .feat-grid-wrap { padding: 0 20px !important; }
          .feat-pb { padding-bottom: 56px !important; }
        }

        @media (max-width: 480px) {
          .feat-header-wrap { padding: 40px 16px 28px !important; }
          .feat-grid-wrap   { padding: 0 16px !important; }
        }
      `}</style>

      <section ref={sectionRef} className="feat-root" style={{ background: '#060606', borderTop: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', position: 'relative' }}>

        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: '-100px', left: '-200px', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 65%)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />

        {/* ── HEADER ── */}
        <div
          className="feat-header-wrap"
          style={{
            padding: '96px 60px 64px', maxWidth: '1400px', margin: '0 auto',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '32px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div>
            {/* Profile badge row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <img src="https://cdn.prod.website-files.com/image-generation-assets/65e862a5-c690-48b1-ab89-e24d50d6efa0.avif" alt="Trainer"
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid rgba(245,158,11,0.4)', display: 'block' }} />
                <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '10px', height: '10px', background: '#10B981', borderRadius: '50%', border: '2px solid #060606' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '1px', height: '28px', background: 'rgba(255,255,255,0.06)' }} />
                <div>
                  <div style={{ fontSize: '7px', fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '2px' }}>Featured</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', color: '#F59E0B', fontSize: '8px', fontWeight: 700, letterSpacing: '0.15em', padding: '4px 12px', borderRadius: '2px' }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#F59E0B', display: 'inline-block' }} />
                    CERTIFIED TRAINERS · ELITE PROGRAMS · TOP GEAR
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px' }}>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(46px, 7vw, 96px)', fontWeight: 400, color: '#fff', lineHeight: 0.9, letterSpacing: '-0.01em', margin: 0 }}>
                UNLEASH YOUR<br /><span style={{ color: '#F59E0B' }}>NEXT LEVEL.</span>
              </h2>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.08)', letterSpacing: '0.15em', paddingBottom: '8px', flexShrink: 0 }}>02</span>
            </div>
          </div>

          <div className="feat-header-right" style={{ maxWidth: '280px' }}>
            <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '12px', lineHeight: 1.85, fontWeight: 300, marginBottom: '24px', letterSpacing: '0.01em' }}>
              Dynamic gym with diverse classes, passionate trainers, certified nutritionists & state-of-the-art equipment — Vizianagaram's #1 rated fitness studio.
            </p>
            <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.35)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textDecoration: 'none', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '3px', transition: 'all 0.25s ease' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#F59E0B'; e.currentTarget.style.borderBottomColor = 'rgba(245,158,11,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.1)'; }}>
              View all programs <span>→</span>
            </a>
          </div>
        </div>

        {/* ══ DESKTOP CARDS ══ */}
        <div
          className="feat-grid-wrap"
          style={{
            padding: '0 60px', maxWidth: '1400px', margin: '0 auto',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.18s',
          }}
        >
          <div className="feat-desktop" style={{ gridTemplateColumns: '1.45fr 1fr 1fr', gap: '3px' }}>
            {cards.map((card, idx) => (
              <div key={card.id} className="feat-card" style={{ height: card.large ? '600px' : '490px' }}
                onMouseEnter={() => setHoveredCard(idx)} onMouseLeave={() => setHoveredCard(null)}>
                <img src={card.src} alt={card.title} />
                <div className="feat-gradient" />
                <div className="feat-accent-line" style={{ background: card.tagColor }} />
                <div className="feat-tag" style={{ background: card.tagColor }}>{card.tag}</div>
                <div className="feat-stat">
                  <div className="feat-stat-num" style={{ color: card.tagColor }}>{card.stat}<span style={{ fontSize: '18px' }}>{card.statSuffix}</span></div>
                  <div className="feat-stat-label">{card.statLabel}</div>
                </div>
                <div className="feat-bottom">
                  <p className="feat-italic" style={{ color: card.tagColor }}>{card.accentLine}</p>
                  <p className="feat-sub">{card.sub}</p>
                  <h3 className="feat-title" style={{ fontSize: card.large ? '46px' : '34px' }}>{card.title}</h3>
                  <p className="feat-desc" style={{ maxWidth: card.large ? '320px' : '240px' }}>{card.desc}</p>
                  <a href="#" className="feat-cta" style={{ color: card.tagColor }}>{card.cta}<span className="cta-arrow">→</span></a>
                </div>
                {/* Corner bracket */}
                <div style={{ position: 'absolute', bottom: '18px', right: '18px', width: '20px', height: '20px', borderBottom: `1.5px solid ${hoveredCard === idx ? card.tagColor : 'transparent'}`, borderRight: `1.5px solid ${hoveredCard === idx ? card.tagColor : 'transparent'}`, transition: 'border-color 0.3s ease', zIndex: 3, pointerEvents: 'none' }} />
              </div>
            ))}
          </div>
        </div>

        {/* ══ MOBILE CARDS ══ */}
        <div
          className="feat-grid-wrap feat-mobile"
          style={{
            padding: '0 20px', maxWidth: '1400px', margin: '0 auto',
            flexDirection: 'column', gap: '3px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.18s',
          }}
        >
          {cards.map((card, idx) => (
            <div
              key={card.id}
              className="feat-mobile-card"
              style={{ borderRadius: '2px', overflow: 'hidden' }}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image area */}
              <div style={{ position: 'relative', height: idx === 0 ? '260px' : '200px', flexShrink: 0 }}>
                <img src={card.src} alt={card.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(15%) brightness(0.8)', transition: 'transform 0.8s ease, filter 0.5s ease' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' }} />
                {/* Accent line */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: card.tagColor }} />
                {/* Tag */}
                <div style={{ position: 'absolute', top: '14px', left: '14px', background: card.tagColor, color: '#000', fontSize: '7px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: '2px', zIndex: 2 }}>{card.tag}</div>
                {/* Stat top right */}
                <div style={{ position: 'absolute', top: '12px', right: '14px', textAlign: 'right', zIndex: 2 }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '26px', color: card.tagColor, lineHeight: 1 }}>{card.stat}<span style={{ fontSize: '16px' }}>{card.statSuffix}</span></div>
                  <div style={{ fontSize: '7px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em', marginTop: '2px' }}>{card.statLabel}</div>
                </div>
                {/* Bottom text inside image */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px', zIndex: 2 }}>
                  <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: idx === 0 ? '36px' : '30px', color: '#fff', margin: 0, lineHeight: 0.95, letterSpacing: '0.01em', whiteSpace: 'pre-line' }}>{card.title}</p>
                </div>
              </div>

              {/* Text content below image */}
              <div style={{ background: '#0d0d0d', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <div>
                  <p style={{ fontSize: '7px', fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 5px' }}>{card.sub}</p>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', lineHeight: 1.65, fontWeight: 300, margin: 0 }}>{card.desc}</p>
                </div>
                <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: card.tagColor, fontSize: '8px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', flexShrink: 0, border: `1px solid ${card.tagColor}`, padding: '8px 12px', borderRadius: '2px', transition: 'background 0.25s ease' }}>
                  View →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="feat-pb" style={{ paddingBottom: '96px' }} />
      </section>
    </>
  );
};

export default FeaturesSection;