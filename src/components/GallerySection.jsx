import React, { useRef, useEffect, useState } from 'react';

const GallerySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const images = [
    {
      id: 1,
      src: 'https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3cd9_d6396a06-2c67-4413-ada6-7519c5ec89f6.avif',
      label: 'Crossfit',
      tag: 'CROSSFIT',
      num: '01',
      category: 'TRAINING',
      span: 'row', // spans 2 rows
    },
    {
      id: 2,
      src: 'https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3cbb_265cca82-58d0-46cf-9738-66a57a4e722a.avif',
      label: 'Strength Training',
      tag: 'STRENGTH',
      num: '02',
      category: 'TRAINING',
    },
    {
      id: 3,
      src: 'https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3ce9_4c32c137-318f-4f14-a635-3fd906c2536d.avif',
      label: 'Cardio',
      tag: 'CARDIO',
      num: '03',
      category: 'FITNESS',
    },
    {
      id: 4,
      src: 'https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3cc6_51a6e544-7817-4aa2-ab99-b6bc730ecaf2.avif',
      label: 'Zumba',
      tag: 'ZUMBA',
      num: '04',
      category: 'FITNESS',
    },
    {
      id: 5,
      src: 'https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3ce0_e547fb3a-375a-45d1-afb2-5b5f37d12f6c.avif',
      label: 'Martial Arts',
      tag: 'MARTIAL ARTS',
      num: '05',
      category: 'COMBAT',
    },
    {
      id: 6,
      src: 'https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3cf0_2ad85973-85f5-4544-9212-e559c6b93524.avif',
      label: 'Weight Loss',
      tag: 'WEIGHT LOSS',
      num: '06',
      category: 'TRAINING',
      span: 'col', // spans 2 cols
    },
  ];

  const filters = ['ALL', 'TRAINING', 'FITNESS', 'COMBAT'];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');

        .gallery-root { font-family: 'DM Sans', sans-serif; }

        @keyframes revealUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes revealLeft {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }

        /* Filter buttons */
        .gal-filter {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.25);
          font-family: 'DM Sans', sans-serif;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 7px 16px;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .gal-filter:hover, .gal-filter.active {
          border-color: #F59E0B;
          color: #F59E0B;
          background: rgba(245,158,11,0.05);
        }

        /* Grid items */
        .gal-cell {
          position: relative;
          overflow: hidden;
          cursor: crosshair;
        }
        .gal-cell img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s ease;
          filter: grayscale(15%) contrast(1.05);
        }
        .gal-cell:hover img {
          transform: scale(1.07);
          filter: grayscale(0%) contrast(1.08);
        }
        .gal-cell .gal-dark {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.42);
          transition: background 0.4s ease;
        }
        .gal-cell:hover .gal-dark {
          background: rgba(0,0,0,0.1);
        }
        /* Amber border sweep on hover */
        .gal-cell::after {
          content: '';
          position: absolute;
          inset: 0;
          border: 1.5px solid transparent;
          transition: border-color 0.3s ease;
          pointer-events: none;
          z-index: 3;
        }
        .gal-cell:hover::after {
          border-color: rgba(245,158,11,0.55);
        }
        /* Number */
        .gal-num {
          position: absolute;
          top: 14px;
          right: 16px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.15);
          letter-spacing: 0.1em;
          z-index: 2;
          transition: color 0.3s ease;
        }
        .gal-cell:hover .gal-num { color: rgba(245,158,11,0.5); }
        /* Bottom info */
        .gal-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 40px 18px 18px;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%);
          z-index: 2;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          transform: translateY(6px);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .gal-cell:hover .gal-info { transform: translateY(0); }
        .gal-tag {
          display: inline-block;
          background: #F59E0B;
          color: #000;
          font-size: 7px;
          font-weight: 800;
          letter-spacing: 0.2em;
          padding: 4px 9px;
          border-radius: 1px;
          transform: translateY(4px);
          opacity: 0;
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .gal-cell:hover .gal-tag {
          opacity: 1;
          transform: translateY(0);
        }
        .gal-label-text {
          color: rgba(255,255,255,0.7);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: color 0.3s ease;
        }
        .gal-cell:hover .gal-label-text { color: #fff; }

        /* CTA strip */
        .gal-cta-strip {
          background: #F59E0B;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 28px;
          gap: 16px;
          flex-wrap: wrap;
          margin-top: 3px;
        }
        .gal-cta-btn {
          background: #000;
          color: #F59E0B;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 12px 24px;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .gal-cta-btn:hover {
          background: #fff;
          color: #000;
          transform: translateY(-1px);
        }

        /* Vertical text */
        .gal-vert {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-size: 7px;
          font-weight: 700;
          letter-spacing: 0.25em;
          color: rgba(255,255,255,0.1);
          text-transform: uppercase;
          user-select: none;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="gallery-root"
        style={{
          background: '#060606',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Ambient glow */}
        <div style={{
          position: 'absolute', top: '10%', right: '-150px',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 65%)',
          borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none',
        }} />

        {/* ── Header ── */}
        <div
          style={{
            padding: '96px 60px 56px',
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '32px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div>
            {/* Section number + label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '11px', color: 'rgba(255,255,255,0.12)', letterSpacing: '0.15em',
              }}>03</span>
              <div style={{ width: '28px', height: '1px', background: 'rgba(245,158,11,0.35)' }} />
              <span style={{
                fontSize: '8px', fontWeight: 700, letterSpacing: '0.22em',
                color: '#F59E0B', textTransform: 'uppercase',
              }}>Studio Gallery</span>
            </div>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(52px, 7vw, 96px)',
              fontWeight: 400,
              color: '#fff',
              lineHeight: 0.9,
              letterSpacing: '-0.01em',
              margin: 0,
            }}>
              INSIDE THE<br />
              <span style={{ color: '#F59E0B' }}>STUDIO.</span>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '20px' }}>
            <p style={{
              color: 'rgba(255,255,255,0.18)',
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.08em',
              textAlign: 'right',
              lineHeight: 1.7,
              margin: 0,
              maxWidth: '260px',
            }}>
              Convection, Babametta<br />
              Vizianagaram – 535002<br />
              <span style={{ color: 'rgba(245,158,11,0.5)' }}>Open Daily Till 10PM</span>
            </p>
            {/* Filter pills */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {filters.map(f => (
                <button
                  key={f}
                  className={`gal-filter${activeFilter === f ? ' active' : ''}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Gallery grid ── */}
        <div
          style={{
            padding: '0 60px',
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            gap: '16px',
            alignItems: 'stretch',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s',
          }}
        >
          {/* Left side vertical label */}
          <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '3px' }}>
            <span className="gal-vert">Intense Fitness Studio · Vizianagaram</span>
          </div>

          {/* Grid */}
          <div style={{ flex: 1 }}>
            {/* Row 1: 3 cols asymmetric */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '3px', marginBottom: '3px' }}>
              {/* Large item — spans 2 rows */}
              <div
                className="gal-cell"
                style={{ gridRow: 'span 2', height: '563px' }}
                onMouseEnter={() => setHoveredIdx(0)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <img src={images[0].src} alt={images[0].label} />
                <div className="gal-dark" />
                <div className="gal-num">{images[0].num}</div>
                <div className="gal-info">
                  <span className="gal-label-text">{images[0].label}</span>
                  <span className="gal-tag">{images[0].tag}</span>
                </div>
                {/* Category badge top-left */}
                <div style={{
                  position: 'absolute', top: '14px', left: '14px',
                  background: 'rgba(6,6,6,0.7)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '7px', fontWeight: 700, letterSpacing: '0.2em',
                  padding: '4px 9px', borderRadius: '1px', zIndex: 2,
                }}>
                  {images[0].category}
                </div>
              </div>

              {/* Top-right 2 items */}
              {[images[1], images[2]].map((img, i) => (
                <div
                  key={img.id}
                  className="gal-cell"
                  style={{ height: '280px' }}
                  onMouseEnter={() => setHoveredIdx(i + 1)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <img src={img.src} alt={img.label} />
                  <div className="gal-dark" />
                  <div className="gal-num">{img.num}</div>
                  <div className="gal-info">
                    <span className="gal-label-text">{img.label}</span>
                    <span className="gal-tag">{img.tag}</span>
                  </div>
                  <div style={{
                    position: 'absolute', top: '14px', left: '14px',
                    background: 'rgba(6,6,6,0.7)', backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: '7px', fontWeight: 700, letterSpacing: '0.2em',
                    padding: '4px 9px', borderRadius: '1px', zIndex: 2,
                  }}>
                    {img.category}
                  </div>
                </div>
              ))}

              {/* Bottom-right 2 items (sit below top-right due to row span of first) */}
              {[images[3], images[4]].map((img, i) => (
                <div
                  key={img.id}
                  className="gal-cell"
                  style={{ height: '280px' }}
                  onMouseEnter={() => setHoveredIdx(i + 3)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <img src={img.src} alt={img.label} />
                  <div className="gal-dark" />
                  <div className="gal-num">{img.num}</div>
                  <div className="gal-info">
                    <span className="gal-label-text">{img.label}</span>
                    <span className="gal-tag">{img.tag}</span>
                  </div>
                  <div style={{
                    position: 'absolute', top: '14px', left: '14px',
                    background: 'rgba(6,6,6,0.7)', backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: '7px', fontWeight: 700, letterSpacing: '0.2em',
                    padding: '4px 9px', borderRadius: '1px', zIndex: 2,
                  }}>
                    {img.category}
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2: Full-width panoramic */}
            <div
              className="gal-cell"
              style={{ height: '200px', width: '100%' }}
              onMouseEnter={() => setHoveredIdx(5)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <img src={images[5].src} alt={images[5].label} style={{ objectPosition: 'center 40%' }} />
              <div className="gal-dark" />
              <div className="gal-num">{images[5].num}</div>
              {/* Wide label layout */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 2,
                display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
                padding: '32px 24px 20px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)',
              }}>
                <span className="gal-label-text" style={{ fontSize: '13px', letterSpacing: '0.12em' }}>
                  {images[5].label}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px', letterSpacing: '0.1em', fontWeight: 600 }}>
                    OUTDOOR TRAINING ALSO AVAILABLE
                  </span>
                  <span className="gal-tag" style={{ opacity: hoveredIdx === 5 ? 1 : 0, transform: hoveredIdx === 5 ? 'translateY(0)' : 'translateY(4px)' }}>
                    {images[5].tag}
                  </span>
                </div>
              </div>
              <div style={{
                position: 'absolute', top: '16px', left: '16px',
                background: 'rgba(6,6,6,0.7)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.4)',
                fontSize: '7px', fontWeight: 700, letterSpacing: '0.2em',
                padding: '4px 9px', borderRadius: '1px', zIndex: 2,
              }}>
                {images[5].category}
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA Strip ── */}
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 60px',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.4s',
          }}
        >
          <div className="gal-cta-strip">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '18px', color: '#000', letterSpacing: '0.04em',
              }}>
                6 PROGRAMS. ONE STUDIO.
              </span>
              <span style={{ width: '1px', height: '16px', background: 'rgba(0,0,0,0.2)' }} />
              <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(0,0,0,0.55)', letterSpacing: '0.04em' }}>
                Crossfit · Cardio · Zumba · Martial Arts · Strength · Weight Loss
              </span>
            </div>
            <button className="gal-cta-btn">Join Now →</button>
          </div>
        </div>

        <div style={{ paddingBottom: '96px' }} />
      </section>
    </>
  );
};

export default GallerySection;