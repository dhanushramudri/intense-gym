import React, { useState, useEffect, useRef } from 'react';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const reviews = [
    { id: 1, name: 'Rajesh Kumar', role: 'Member since 2022', rating: 5, quote: 'Best gym in Vizianagaram! The trainers are certified and very supportive. I have seen amazing results in just 3 months.', pullQuote: 'Amazing results in 3 months.', tag: 'STRENGTH', stat: '3 months', statLabel: 'To transformation', avatar: 'RK', color: '#F59E0B' },
    { id: 2, name: 'Priya Sharma', role: 'Member since 2023', rating: 5, quote: 'Passionate trainers with state-of-the-art equipment. The female trainers are empowering and make you feel confident.', pullQuote: 'Empowering. Confident. Changed.', tag: 'WELLNESS', stat: '+12kg', statLabel: 'Muscle gained', avatar: 'PS', color: '#EF4444' },
    { id: 3, name: 'Arjun Patel', role: 'Member since 2021', rating: 5, quote: 'Diverse classes and certified nutritionists available. The gym has everything you need for transformation. Worth every penny!', pullQuote: 'Everything I needed to transform.', tag: 'PERFORMANCE', stat: '–18kg', statLabel: 'Weight lost', avatar: 'AP', color: '#10B981' },
    { id: 4, name: 'Sneha Gupta', role: 'Member since 2023', rating: 5, quote: 'Amazing community here. The energy in the gym is incredible and the trainers genuinely care about your progress.', pullQuote: 'The community keeps me going.', tag: 'COMMUNITY', stat: '200+', statLabel: 'Strong members', avatar: 'SG', color: '#8B5CF6' },
  ];

  const marqueeItems = ['STRENGTH', 'POWER', 'TRANSFORM', 'COMMUNITY', 'RESULTS', 'DEDICATION', 'ELITE', 'INTENSITY', '★ 4.8 RATING', '169 REVIEWS'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const active = reviews[activeIndex];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;600;700;800;900&display=swap');

        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes progressBar {
          0%   { width: 0%; }
          100% { width: 100%; }
        }

        .test-root { font-family: 'DM Sans', sans-serif; }

        /* Selector buttons */
        .test-selector-btn {
          background: #0D0D0D; border: none;
          padding: 24px 20px; cursor: pointer; text-align: left;
          border-top: 3px solid transparent;
          transition: all 0.4s ease; position: relative; overflow: hidden;
          width: 100%;
        }
        .test-selector-btn.active { background: #1A1A1A; }

        /* ── RESPONSIVE ── */

        /* Desktop layout */
        .test-main-grid   { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        .test-sel-grid    { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; }
        .test-header-row  { display: flex; justify-content: space-between; align-items: flex-start; }
        .test-rating-block { display: block; text-align: right; }

        /* Mobile overrides */
        @media (max-width: 768px) {
          .test-main-grid   { grid-template-columns: 1fr !important; }
          .test-sel-grid    { grid-template-columns: 1fr 1fr !important; }
          .test-header-row  { flex-direction: column !important; gap: 20px !important; }
          .test-rating-block { text-align: left !important; }
          .test-pad         { padding: 48px 20px !important; }
          .test-header-mb   { margin-bottom: 36px !important; }
          .test-pull-pad    { padding: 40px 28px !important; min-height: auto !important; }
          .test-pull-quote  { font-size: clamp(22px, 6vw, 32px) !important; }
          .test-detail-pad  { padding: 28px 24px !important; }
          .test-stat-pad    { padding: 20px 24px !important; }
          .test-stat-num    { font-size: 40px !important; }
          .test-selector-btn { padding: 18px 16px !important; }
        }

        @media (max-width: 480px) {
          .test-pad       { padding: 40px 16px !important; }
          .test-pull-pad  { padding: 32px 20px !important; }
          .test-detail-pad { padding: 24px 20px !important; }
          .test-stat-pad  { padding: 18px 20px !important; }
          .test-sel-grid  { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <section ref={sectionRef} className="test-root" style={{ background: '#080808', borderTop: '1px solid rgba(245,158,11,0.15)', overflow: 'hidden' }}>

        {/* ── MARQUEE STRIP ── */}
        <div style={{ background: active.color, padding: '10px 0', overflow: 'hidden', whiteSpace: 'nowrap', transition: 'background 0.6s ease' }}>
          <div style={{ display: 'inline-flex', animation: 'marqueeScroll 18s linear infinite' }}>
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} style={{ color: '#000', fontWeight: 800, fontSize: '10px', letterSpacing: '0.15em', padding: '0 28px', borderRight: '1px solid rgba(0,0,0,0.2)' }}>{item}</span>
            ))}
          </div>
        </div>

        <div className="test-pad" style={{ padding: '80px 40px', maxWidth: '1400px', margin: '0 auto' }}>

          {/* ── HEADER ── */}
          <div
            className="test-header-row test-header-mb"
            style={{
              marginBottom: '60px', flexWrap: 'wrap', gap: '20px',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            <div>
              <span style={{ display: 'inline-block', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#F59E0B', fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', padding: '5px 12px', borderRadius: '2px', marginBottom: '16px' }}>
                MEMBER REVIEWS & FEEDBACK
              </span>
              <h2 style={{ fontSize: 'clamp(36px, 6vw, 80px)', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em', margin: 0 }}>
                Real people.<br />
                <span style={{ color: active.color, transition: 'color 0.6s ease' }}>Real results.</span>
              </h2>
            </div>

            <div className="test-rating-block">
              <div style={{ fontSize: 'clamp(48px, 8vw, 64px)', fontWeight: 900, color: '#fff', lineHeight: 1 }}>4.8</div>
              <div style={{ display: 'flex', gap: '4px', margin: '6px 0' }}>
                {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#F59E0B', fontSize: '16px' }}>★</span>)}
              </div>
              <div style={{ color: '#555', fontSize: '11px', letterSpacing: '0.1em', fontWeight: 600 }}>169 GOOGLE REVIEWS</div>
            </div>
          </div>

          {/* ── MAIN CONTENT ── */}
          <div
            style={{
              marginBottom: '2px',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.9s cubic-bezier(0.34,1.56,0.64,1) 0.15s',
            }}
          >
            <div className="test-main-grid">

              {/* LEFT — Pull quote panel */}
              <div
                className="test-pull-pad"
                style={{
                  background: active.color, padding: '64px 56px',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  minHeight: '460px', transition: 'background 0.6s ease',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* Giant quote mark */}
                <div style={{ position: 'absolute', top: '-20px', left: '30px', fontSize: '220px', fontWeight: 900, color: 'rgba(0,0,0,0.08)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>"</div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <span style={{ display: 'inline-block', background: 'rgba(0,0,0,0.15)', color: '#000', fontSize: '9px', fontWeight: 800, letterSpacing: '0.2em', padding: '4px 10px', borderRadius: '2px', marginBottom: '24px' }}>{active.tag}</span>
                  <p className="test-pull-quote" style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 800, color: '#000', lineHeight: 1.15, letterSpacing: '-0.02em', margin: 0 }}>
                    "{active.pullQuote}"
                  </p>
                </div>

                <div style={{ position: 'relative', zIndex: 1, marginTop: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px', color: '#000', flexShrink: 0 }}>{active.avatar}</div>
                    <div>
                      <div style={{ fontWeight: 800, color: '#000', fontSize: '14px' }}>{active.name}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.6)', fontWeight: 600 }}>{active.role}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT — Detail + stat */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {/* Full quote */}
                <div className="test-detail-pad" style={{ background: '#111', padding: '48px', flex: 1, border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '20px' }}>
                    {[...Array(active.rating)].map((_, i) => <span key={i} style={{ color: '#F59E0B', fontSize: '14px' }}>★</span>)}
                  </div>
                  <p style={{ color: '#ccc', fontSize: 'clamp(13px, 2vw, 15px)', lineHeight: 1.8, fontWeight: 400, margin: 0 }}>"{active.quote}"</p>
                  <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '8px', color: active.color, fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', transition: 'color 0.6s ease' }}>
                    <span style={{ display: 'inline-block', width: '20px', height: '1px', background: active.color, transition: 'background 0.6s ease' }} />
                    ✓ VERIFIED GOOGLE REVIEW
                  </div>
                </div>

                {/* Stat box */}
                <div className="test-stat-pad" style={{ background: '#0D0D0D', padding: '28px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid rgba(255,255,255,0.04)', gap: '16px' }}>
                  <div>
                    <div className="test-stat-num" style={{ fontSize: '52px', fontWeight: 900, color: active.color, lineHeight: 1, letterSpacing: '-0.03em', transition: 'color 0.6s ease' }}>{active.stat}</div>
                    <div style={{ color: '#555', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', marginTop: '4px' }}>{active.statLabel.toUpperCase()}</div>
                  </div>
                  <div style={{ color: '#2a2a2a', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', flexShrink: 0 }}>{activeIndex + 1} / {reviews.length}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── SELECTOR ROW ── */}
          <div
            className="test-sel-grid"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.9s cubic-bezier(0.34,1.56,0.64,1) 0.3s',
            }}
          >
            {reviews.map((r, i) => (
              <button
                key={r.id}
                className={`test-selector-btn${i === activeIndex ? ' active' : ''}`}
                onClick={() => setActiveIndex(i)}
                style={{ borderTopColor: i === activeIndex ? r.color : 'transparent' }}
              >
                {/* Progress bar */}
                {i === activeIndex && (
                  <div style={{ position: 'absolute', bottom: 0, left: 0, height: '2px', background: r.color, animation: 'progressBar 4s linear infinite' }} />
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: i === activeIndex ? r.color : '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800, color: i === activeIndex ? '#000' : '#555', transition: 'all 0.4s ease', flexShrink: 0 }}>{r.avatar}</div>
                  <div>
                    <div style={{ color: i === activeIndex ? '#fff' : '#444', fontSize: '11px', fontWeight: 700, transition: 'color 0.4s ease' }}>{r.name}</div>
                    <div style={{ color: '#333', fontSize: '9px', fontWeight: 600, letterSpacing: '0.08em' }}>{r.tag}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;