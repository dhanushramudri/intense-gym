import React, { useState, useRef, useEffect } from 'react';

const ContactSection = ({ visibleSections = {}, handleFormSubmit: externalSubmit, handleFormChange: externalChange, formData: externalFormData, formSubmitted: externalSubmitted }) => {
  const [formData, setFormData] = useState(externalFormData || { name: '', email: '', phone: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (externalChange) externalChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (externalSubmit) { externalSubmit(e); return; }
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setAgreed(false);
    }, 4000);
  };

  const contactItems = [
    { label: 'EMAIL', value: 'contact@intensefitnessstudio.com', href: 'mailto:contact@intensefitnessstudio.com', icon: '↗' },
    { label: 'PHONE', value: '+91 98765 43210', href: 'tel:+919876543210', icon: '↗' },
    { label: 'LOCATION', value: 'Babametta, Vizianagaram\nAndhra Pradesh – 535002', href: null, icon: '◎' },
    { label: 'HOURS', value: 'Daily 5:00 AM – 10:00 PM', href: null, icon: '◷' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&display=swap');

        .contact-root { font-family: 'DM Sans', sans-serif; }

        /* Field styles */
        .cf-field {
          position: relative;
          width: 100%;
        }
        .cf-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.01em;
          padding: 18px 0 12px;
          outline: none;
          transition: border-color 0.3s ease;
          box-sizing: border-box;
          -webkit-autofill: off;
          resize: none;
        }
        .cf-input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px #060606 inset !important;
          -webkit-text-fill-color: #fff !important;
        }
        .cf-input::placeholder { color: transparent; }
        .cf-input:focus { border-color: rgba(245,158,11,0.6); }
        .cf-input.has-value ~ .cf-label,
        .cf-input:focus ~ .cf-label {
          transform: translateY(-22px);
          font-size: 8px;
          letter-spacing: 0.2em;
          color: rgba(245,158,11,0.7);
        }
        .cf-label {
          position: absolute;
          left: 0;
          top: 18px;
          font-size: 11px;
          font-weight: 500;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          pointer-events: none;
          transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
        }
        .cf-line {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 1px;
          width: 0%;
          background: #F59E0B;
          transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .cf-input:focus ~ .cf-line { width: 100%; }

        /* Submit button */
        .cf-submit {
          width: 100%;
          background: #F59E0B;
          color: #000;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 17px 32px;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.35s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .cf-submit::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #000;
          transform: translateX(-100%);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .cf-submit:hover::before { transform: translateX(0); }
        .cf-submit:hover { color: #F59E0B; }
        .cf-submit:hover .cf-arrow { transform: translateX(6px); }
        .cf-submit span, .cf-arrow { position: relative; z-index: 1; }
        .cf-arrow { transition: transform 0.3s ease; display: inline-block; }

        /* Success state */
        @keyframes successPop {
          0%   { transform: scale(0.8); opacity: 0; }
          60%  { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        .cf-success { animation: successPop 0.5s cubic-bezier(0.16,1,0.3,1) both; }

        /* Contact info cards */
        .ci-card {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 20px 0;
          transition: all 0.3s ease;
          cursor: default;
        }
        .ci-card:hover .ci-icon { color: #F59E0B; transform: translateX(2px); }
        .ci-card:hover .ci-value { color: rgba(255,255,255,0.8); }
        .ci-icon { transition: all 0.3s ease; }
        .ci-value { transition: color 0.3s ease; }

        /* Image treatment */
        .ci-image-wrap {
          position: relative;
          overflow: hidden;
          border-radius: 3px;
        }
        .ci-image-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(245,158,11,0.15) 0%, transparent 60%);
          pointer-events: none;
        }
        .ci-image-wrap img {
          width: 100%;
          height: 280px;
          object-fit: cover;
          display: block;
          filter: grayscale(20%) contrast(1.05);
          transition: transform 0.7s ease, filter 0.5s ease;
        }
        .ci-image-wrap:hover img { transform: scale(1.03); filter: grayscale(0%) contrast(1.05); }

        /* Checkbox */
        .cf-checkbox-wrap {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          cursor: pointer;
        }
        .cf-checkbox-custom {
          width: 16px;
          height: 16px;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 2px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
          background: transparent;
          margin-top: 2px;
        }
        .cf-checkbox-custom.checked {
          background: #F59E0B;
          border-color: #F59E0B;
        }
        .cf-checkmark {
          color: #000;
          font-size: 9px;
          font-weight: 900;
          opacity: 0;
          transform: scale(0);
          transition: all 0.2s cubic-bezier(0.16,1,0.3,1);
        }
        .cf-checkbox-custom.checked .cf-checkmark { opacity: 1; transform: scale(1); }

        /* Section reveal */
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .contact-reveal-1 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .contact-reveal-2 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both; }

        /* Decorative number */
        .section-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.12);
          letter-spacing: 0.15em;
        }

        /* Mobile responsive styles */
        @media (max-width: 768px) {
          .cf-input {
            font-size: 12px;
            padding: 16px 0 10px;
          }
          .cf-label {
            font-size: 10px;
          }
          .cf-input.has-value ~ .cf-label,
          .cf-input:focus ~ .cf-label {
            transform: translateY(-20px);
            font-size: 7px;
          }
          .cf-submit {
            font-size: 9px;
            padding: 15px 24px;
          }
          .ci-image-wrap img {
            height: 220px;
          }
        }

        @media (max-width: 640px) {
          .section-num {
            font-size: 10px;
          }
          .cf-input {
            font-size: 11px;
            padding: 14px 0 8px;
          }
          .cf-label {
            font-size: 9px;
            top: 14px;
          }
          .cf-input.has-value ~ .cf-label,
          .cf-input:focus ~ .cf-label {
            transform: translateY(-18px);
            font-size: 6px;
          }
          .cf-submit {
            font-size: 8px;
            padding: 13px 20px;
            gap: 6px;
          }
          .cf-submit span {
            display: none;
          }
          .cf-submit .cf-arrow {
            display: inline-block;
          }
          .ci-image-wrap img {
            height: 180px;
          }
          .cf-checkbox-wrap {
            gap: 10px;
          }
          .cf-checkbox-custom {
            width: 14px;
            height: 14px;
            min-width: 14px;
            min-height: 14px;
          }
        }

        @media (max-width: 520px) {
          .ci-card {
            padding: 16px 0;
          }
          .ci-image-wrap img {
            height: 160px;
          }
          .cf-input {
            font-size: 10px;
            padding: 12px 0 6px;
          }
          .cf-label {
            font-size: 8px;
            top: 12px;
          }
          .cf-input.has-value ~ .cf-label,
          .cf-input:focus ~ .cf-label {
            transform: translateY(-16px);
            font-size: 5px;
          }
          .cf-submit {
            padding: 12px 16px;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="contact-root"
        style={{
          background: '#060606',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: 'clamp(40px, 8vw, 100px) clamp(20px, 5vw, 60px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background accent */}
        <div style={{
          position: 'absolute',
          bottom: '-200px',
          left: '-100px',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 65%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          width: '100%',
          padding: '0 clamp(0px, 2vw, 20px)',
        }}>

          {/* Header */}
          <div
            style={{
              marginBottom: 'clamp(40px, 8vw, 72px)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <span className="section-num">04</span>
              <div style={{ width: '32px', height: '1px', background: 'rgba(245,158,11,0.4)' }} />
              <span style={{
                fontSize: 'clamp(7px, 2vw, 9px)', fontWeight: 700, letterSpacing: '0.22em',
                color: '#F59E0B', textTransform: 'uppercase',
              }}>Get In Touch</span>
            </div>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(32px, 8vw, 96px)',
                fontWeight: 400,
                color: '#fff',
                lineHeight: 0.92,
                letterSpacing: '-0.01em',
                margin: 0,
              }}
            >
              START YOUR
              <br />
              <span style={{ color: '#F59E0B' }}>JOURNEY.</span>
            </h2>
          </div>

          {/* Grid - Responsive */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(40px, 8vw, 80px)',
              alignItems: 'start',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
              transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s',
            }}
          >

            {/* LEFT — Form */}
            <div>
              {formSubmitted ? (
                <div
                  className="cf-success"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    minHeight: 'clamp(300px, 60vh, 480px)',
                    gap: '20px',
                  }}
                >
                  <div style={{
                    width: '56px', height: '56px',
                    border: '1px solid #F59E0B',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '20px', color: '#F59E0B',
                  }}>✓</div>
                  <h3 style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(32px, 6vw, 48px)', color: '#fff', margin: 0, lineHeight: 1,
                  }}>MESSAGE SENT</h3>
                  <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 'clamp(11px, 2vw, 13px)', lineHeight: 1.7, margin: 0, maxWidth: '320px' }}>
                    Thanks for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10B981', animation: 'floatDot 2s ease-in-out infinite' }} />
                    <span style={{ fontSize: 'clamp(8px, 1.5vw, 9px)', fontWeight: 700, color: '#10B981', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                      We're open daily till 10PM
                    </span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

                  {/* Name */}
                  <div className="cf-field" style={{ marginBottom: '16px' }}>
                    <input
                      className={`cf-input${formData.name ? ' has-value' : ''}`}
                      type="text" name="name" required
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                    />
                    <label className="cf-label">Full Name</label>
                    <div className="cf-line" />
                  </div>

                  {/* Email + Phone row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '24px', marginBottom: '16px' }}>
                    <div className="cf-field">
                      <input
                        className={`cf-input${formData.email ? ' has-value' : ''}`}
                        type="email" name="email" required
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                      />
                      <label className="cf-label">Email Address</label>
                      <div className="cf-line" />
                    </div>
                    <div className="cf-field">
                      <input
                        className={`cf-input${formData.phone ? ' has-value' : ''}`}
                        type="tel" name="phone"
                        value={formData.phone || ''}
                        onChange={handleChange}
                        onFocus={() => setFocused('phone')}
                        onBlur={() => setFocused(null)}
                      />
                      <label className="cf-label">Phone (optional)</label>
                      <div className="cf-line" />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="cf-field" style={{ marginBottom: '32px' }}>
                    <textarea
                      className={`cf-input${formData.message ? ' has-value' : ''}`}
                      name="message" rows="4" required
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      style={{ paddingTop: '22px' }}
                    />
                    <label className="cf-label">Your Message</label>
                    <div className="cf-line" />
                  </div>

                  {/* Checkbox */}
                  <div style={{ marginBottom: '32px' }}>
                    <label className="cf-checkbox-wrap" onClick={() => setAgreed(!agreed)}>
                      <div className={`cf-checkbox-custom${agreed ? ' checked' : ''}`}>
                        <span className="cf-checkmark">✓</span>
                      </div>
                      <span style={{ fontSize: 'clamp(9px, 2vw, 11px)', color: 'rgba(255,255,255,0.3)', fontWeight: 400, letterSpacing: '0.03em', lineHeight: 1.4 }}>
                        I agree to the privacy policy and consent to being contacted.
                      </span>
                    </label>
                  </div>

                  {/* Submit */}
                  <button className="cf-submit" type="submit">
                    <span>Send Message</span>
                    <span className="cf-arrow">→</span>
                  </button>

                  {/* Helper text */}
                  <p style={{ marginTop: '14px', fontSize: 'clamp(8px, 1.5vw, 10px)', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.04em', textAlign: 'center' }}>
                    Usually responds within a few hours
                  </p>
                </form>
              )}
            </div>

            {/* RIGHT — Info */}
            <div>
              {/* Image */}
              <div className="ci-image-wrap" style={{ marginBottom: '40px' }}>
                <img
                  src="https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3cf4_d8249140-734e-4f47-bf18-11eba3211ddd.avif"
                  alt="Intense Fitness Studio"
                />
                {/* Overlay label */}
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  background: 'rgba(6,6,6,0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(245,158,11,0.2)',
                  borderRadius: '2px',
                  padding: '8px 14px',
                  zIndex: 2,
                }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(12px, 4vw, 16px)', color: '#F59E0B', letterSpacing: '0.06em', lineHeight: 1 }}>
                    INTENSE FITNESS STUDIO
                  </div>
                  <div style={{ fontSize: 'clamp(7px, 1.5vw, 8px)', fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', marginTop: '3px' }}>
                    BABAMETTA · VIZIANAGARAM
                  </div>
                </div>
              </div>

              {/* Contact items */}
              <div>
                {contactItems.map((item, i) => (
                  <div key={item.label} className="ci-card" style={{ borderBottom: i === contactItems.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ fontSize: '8px', fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '6px' }}>
                          {item.label}
                        </div>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="ci-value"
                            style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(11px, 2vw, 13px)', fontWeight: 400, lineHeight: 1.5, display: 'block', textDecoration: 'none' }}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p
                            className="ci-value"
                            style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(11px, 2vw, 13px)', fontWeight: 400, lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}
                          >
                            {item.value}
                          </p>
                        )}
                      </div>
                      <span
                        className="ci-icon"
                        style={{ fontSize: '14px', color: 'rgba(255,255,255,0.15)', marginLeft: '16px', marginTop: '20px', flexShrink: 0 }}
                      >
                        {item.icon}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div style={{ marginTop: '32px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {['Instagram', 'Facebook', 'YouTube'].map((s) => (
                  <a
                    key={s}
                    href="#"
                    style={{
                      fontSize: 'clamp(8px, 1.5vw, 9px)',
                      fontWeight: 700,
                      color: 'rgba(255,255,255,0.2)',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      transition: 'color 0.25s ease',
                      borderBottom: '1px solid rgba(255,255,255,0.08)',
                      paddingBottom: '2px',
                    }}
                    onMouseEnter={(e) => { e.target.style.color = '#F59E0B'; e.target.style.borderBottomColor = 'rgba(245,158,11,0.4)'; }}
                    onMouseLeave={(e) => { e.target.style.color = 'rgba(255,255,255,0.2)'; e.target.style.borderBottomColor = 'rgba(255,255,255,0.08)'; }}
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;