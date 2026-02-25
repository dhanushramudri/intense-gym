import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Star } from 'lucide-react';
import TestimonialsSection from './TestimonialsSection';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const reviews = [
    {
      id: 'review-1',
      name: 'Rajesh Kumar',
      rating: 5,
      quote: 'Best gym in Vizianagaram! The trainers are certified and very supportive. I have seen amazing results in just 3 months. Highly recommended!',
      verified: true
    },
    {
      id: 'review-2',
      name: 'Priya Sharma',
      rating: 5,
      quote: 'Passionate trainers with state-of-the-art equipment. The female trainers are empowering and make you feel confident. Love this gym!',
      verified: true
    },
    {
      id: 'review-3',
      name: 'Arjun Patel',
      rating: 5,
      quote: 'Diverse classes and certified nutritionists available. The gym has everything you need for transformation. Worth every penny!',
      verified: true
    },
    {
      id: 'review-4',
      name: 'Sneha Gupta',
      rating: 5,
      quote: 'Amazing community here. The energy in the gym is incredible and the trainers genuinely care about your progress.',
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Navigation */}
      <nav className="bg-black sticky top-0 z-50 border-b border-yellow-500/20">
        <div className="max-w-full px-4 sm:px-8 lg:px-16">
          <div className="flex justify-between items-center h-20">
            {/* Logo + Brand */}
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-yellow-400 rounded flex items-center justify-center flex-shrink-0">
                <div className="text-black font-bold text-sm">✦</div>
              </div>
              <a href="#" className="text-white font-semibold text-xs hidden sm:block tracking-tight">
                Intense Fitness Studio Gym
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="relative">
                <button 
                  onClick={() => setOpenDropdown(openDropdown === 'programs' ? null : 'programs')}
                  className="flex items-center space-x-1 text-gray-300 hover:text-yellow-400 transition text-xs font-medium cursor-pointer"
                >
                  Programs
                  <ChevronDown size={14} className={`transition-transform duration-300 ${openDropdown === 'programs' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'programs' && (
                  <div className="absolute left-0 mt-2 w-72 bg-black rounded shadow-2xl py-6 z-50 border border-yellow-500/30">
                    <div className="px-6 py-2">
                      <p className="text-xs font-semibold text-yellow-400 mb-3 tracking-wide">TRAINING</p>
                      <a href="#" className="block text-xs py-2.5 text-gray-300 hover:text-yellow-400 transition">Weight Loss</a>
                      <a href="#" className="block text-xs py-2.5 text-gray-300 hover:text-yellow-400 transition">Muscle Gain</a>
                      <a href="#" className="block text-xs py-2.5 text-gray-300 hover:text-yellow-400 transition">Strength</a>
                    </div>
                    <div className="px-6 py-2 border-t border-yellow-500/20">
                      <p className="text-xs font-semibold text-yellow-400 mb-3 tracking-wide">COACHING</p>
                      <a href="#" className="block text-xs py-2.5 text-gray-300 hover:text-yellow-400 transition">Personal Training</a>
                      <a href="#" className="block text-xs py-2.5 text-gray-300 hover:text-yellow-400 transition">Body Transformation</a>
                      <a href="#" className="block text-xs py-2.5 text-gray-300 hover:text-yellow-400 transition">Nutrition</a>
                    </div>
                    <div className="px-6 py-2 border-t border-yellow-500/20">
                      <p className="text-xs font-semibold text-yellow-400 mb-3 tracking-wide">FACILITIES</p>
                      <a href="#" className="block text-xs py-2.5 text-gray-300 hover:text-yellow-400 transition">Equipment</a>
                      <a href="#" className="block text-xs py-2.5 text-gray-300 hover:text-yellow-400 transition">Studio</a>
                      <a href="#" className="block text-xs py-2.5 text-gray-300 hover:text-yellow-400 transition">Community</a>
                    </div>
                  </div>
                )}
              </div>
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition text-xs font-medium">About</a>
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition text-xs font-medium">Blog</a>
              <div className="relative">
                <button 
                  onClick={() => setOpenDropdown(openDropdown === 'support' ? null : 'support')}
                  className="flex items-center space-x-1 text-gray-300 hover:text-yellow-400 transition text-xs font-medium cursor-pointer"
                >
                  Support
                  <ChevronDown size={14} className={`transition-transform duration-300 ${openDropdown === 'support' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'support' && (
                  <div className="absolute left-0 mt-2 w-44 bg-black rounded shadow-2xl py-3 z-50 border border-yellow-500/30">
                    <a href="#" className="block px-6 py-2.5 text-xs text-gray-300 hover:text-yellow-400 transition">Help Center</a>
                    <a href="#" className="block px-6 py-2.5 text-xs text-gray-300 hover:text-yellow-400 transition">Contact</a>
                  </div>
                )}
              </div>
            </div>

            {/* Join Button */}
            <div className="flex items-center gap-4">
              <button className="hidden sm:block bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded text-xs font-semibold transition text-black">
                Join now
              </button>
              
              {/* Mobile Menu Button */}
              <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-6 border-t border-yellow-500/20 bg-black">
              <div className="py-3">
                <button onClick={() => toggleDropdown('programs')} className="w-full text-left px-4 py-2.5 text-white text-xs font-medium">
                  Programs {openDropdown === 'programs' ? '▼' : '▶'}
                </button>
                {openDropdown === 'programs' && (
                  <div className="bg-gray-900 px-4 py-2 ml-4 mt-2 rounded">
                    <p className="text-xs font-semibold text-yellow-400 mb-2">TRAINING</p>
                    <a href="#" className="block text-xs py-2 text-gray-300 hover:text-yellow-400">Weight Loss</a>
                    <a href="#" className="block text-xs py-2 text-gray-300 hover:text-yellow-400">Muscle Gain</a>
                    <a href="#" className="block text-xs py-2 text-gray-300 hover:text-yellow-400">Strength</a>
                  </div>
                )}
              </div>
              <a href="#" className="block px-4 py-2.5 text-gray-300 hover:text-yellow-400 text-xs font-medium">About</a>
              <a href="#" className="block px-4 py-2.5 text-gray-300 hover:text-yellow-400 text-xs font-medium">Blog</a>
              <a href="#" className="block px-4 py-2.5 text-gray-300 hover:text-yellow-400 text-xs font-medium">Support</a>
              <button className="w-full mt-4 mx-4 bg-yellow-400 hover:bg-yellow-500 px-6 py-2.5 rounded text-xs font-semibold transition text-black">
                Join now
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-black px-4 sm:px-8 lg:px-16 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h1 
                id="hero-title"
                data-animate="true"
                className={`text-7xl md:text-8xl font-bold mb-8 leading-tight text-white transition-all duration-700 ${
                  visibleSections['hero-title'] ? 'animate-slide-up' : 'opacity-0 translate-y-8'
                }`}
                style={{ fontWeight: 700, letterSpacing: '-0.03em' }}
              >
                Unleash your ultimate strength
              </h1>
              <p 
                id="hero-text"
                data-animate="true"
                className={`text-sm text-gray-400 mb-10 leading-relaxed font-normal max-w-md transition-all duration-700 delay-200 ${
                  visibleSections['hero-text'] ? 'animate-slide-up-delay-1' : 'opacity-0 translate-y-8'
                }`}
              >
                Experience next-level training in a high-energy, modern space. Discover advanced equipment, expert coaching, and a community built for transformation.
              </p>
              <div 
                id="hero-buttons"
                data-animate="true"
                className={`flex gap-4 flex-wrap transition-all duration-700 delay-300 ${
                  visibleSections['hero-buttons'] ? 'animate-slide-up-delay-2' : 'opacity-0 translate-y-8'
                }`}
              >
                <button className="bg-yellow-400 hover:bg-yellow-500 px-7 py-3 rounded text-xs font-bold transition text-black tracking-wide">
                  Join now
                </button>
                <button className="border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-7 py-3 rounded text-xs font-bold transition tracking-wide">
                  Free trial
                </button>
              </div>
            </div>
            <div 
              id="hero-image"
              data-animate="true"
              className={`transition-all duration-700 delay-500 ${
                visibleSections['hero-image'] ? 'animate-slide-up-delay-3' : 'opacity-0 translate-y-8'
              }`}
            >
              <img 
                src="https://cdn.prod.website-files.com/image-generation-assets/34574341-f99a-4c15-9f10-0e1ff56f7fe6.avif" 
                alt="Fitness class"
                className="rounded-lg w-full shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

{/* Features Section */}
<section className="bg-black border-t border-yellow-500/20 overflow-hidden" style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}>
  {/* Header */}
  <div className="px-4 sm:px-8 lg:px-16 pt-24 pb-16 max-w-7xl mx-auto">
    <div className="flex justify-between items-end flex-wrap gap-6">
      <div>
        <div className="flex items-center gap-4 mb-5">
          <img
            src="https://cdn.prod.website-files.com/image-generation-assets/65e862a5-c690-48b1-ab89-e24d50d6efa0.avif"
            alt="Profile"
            className="w-11 h-11 rounded-full object-cover"
            style={{ border: '2px solid rgba(245,158,11,0.4)' }}
          />
          <span
            id="features-title"
            data-animate="true"
            className={`text-xs font-bold tracking-widest transition-all duration-700 ${visibleSections['features-title'] ? 'animate-slide-up' : 'opacity-0 translate-y-8'}`}
            style={{ color: '#F59E0B', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', padding: '5px 14px', borderRadius: '2px' }}
          >
            CERTIFIED TRAINERS · ELITE PROGRAMS · TOP GEAR
          </span>
        </div>
        <h2
          className="font-black text-white"
          style={{ fontSize: 'clamp(40px,6vw,76px)', lineHeight: 1, letterSpacing: '-0.03em' }}
        >
          Unleash your<br />
          <span style={{ color: '#F59E0B' }}>next level.</span>
        </h2>
      </div>
      <p
        id="features-text"
        data-animate="true"
        className={`text-sm leading-relaxed max-w-xs transition-all duration-700 delay-200 ${visibleSections['features-text'] ? 'animate-slide-up-delay-1' : 'opacity-0 translate-y-8'}`}
        style={{ color: '#444' }}
      >
        Dynamic gym with diverse classes, passionate trainers, certified nutritionists & state-of-the-art equipment — Vizianagaram's #1 rated fitness studio.
      </p>
    </div>
  </div>

  {/* Cards — asymmetric editorial grid */}
  <div className="px-4 sm:px-8 lg:px-16 pb-0 max-w-7xl mx-auto">
    <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr 1fr', gap: '3px' }}>
      {[
        {
          id: 'card-1', delay: '0.05s',
          tag: 'TRAINER', tagColor: '#F59E0B',
          src: 'https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3d08_bb0cbef0-499c-400c-a83b-f39230d2302a.avif',
          title: 'Certified Trainers',
          sub: 'Results Guaranteed',
          stat: '4.8★', statLabel: 'GOOGLE RATING',
          desc: 'Train with certified coaches who specialise in Weight Loss, Strength, and Martial Arts. Passionate trainers — empowering both men and women.',
          cta: 'Meet Our Trainers →',
          accentLine: 'Train with champions.',
          height: '580px',
          titleSize: '30px',
        },
        {
          id: 'card-2', delay: '0.15s',
          tag: 'PROGRAMS', tagColor: '#EF4444',
          src: 'https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3cbb_265cca82-58d0-46cf-9738-66a57a4e722a.avif',
          title: 'Weight Loss & Strength',
          sub: 'Diverse Class Lineup',
          stat: '6+', statLabel: 'PROGRAMS',
          desc: 'Crossfit, Cardio, Zumba, Martial Arts, Strength Training & Weight Loss — all under one roof at Babametta, Vizianagaram.',
          cta: 'Explore Programs →',
          accentLine: 'Every goal. One studio.',
          height: '480px',
          titleSize: '22px',
        },
        {
          id: 'card-3', delay: '0.25s',
          tag: 'NUTRITION', tagColor: '#10B981',
          src: 'https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3cb4_5b80479a-0b3c-4d64-bd4e-20f04fa0ccbc.avif',
          title: 'Certified Nutritionists',
          sub: 'State-of-the-Art Equipment',
          stat: '100%', statLabel: 'RESULTS GUARANTEED',
          desc: 'On-site certified nutritionists provide personalised meal plans. Advanced equipment, outdoor training, and full-body transformation support.',
          cta: 'See Facilities →',
          accentLine: 'Fuel. Train. Transform.',
          height: '480px',
          titleSize: '22px',
        },
      ].map((card) => (
        <div
          key={card.id}
          id={card.id}
          data-animate="true"
          className={`transition-all duration-700 ${visibleSections[card.id] ? 'animate-slide-up' : 'opacity-0 translate-y-8'}`}
          style={{ animationDelay: card.delay, position: 'relative', overflow: 'hidden', height: card.height, cursor: 'pointer' }}
        >
          {/* BG image */}
          <img
            src={card.src}
            alt={card.title}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }}
          />
          {/* Gradient */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.05) 100%)' }} />
          {/* Top accent sweep */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: card.tagColor, transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.4s ease' }}
            className="top-accent" />
          {/* Tag */}
          <div style={{ position: 'absolute', top: '22px', left: '22px', background: card.tagColor, color: '#000', fontSize: '9px', fontWeight: 800, letterSpacing: '0.18em', padding: '4px 11px', borderRadius: '2px' }}>
            {card.tag}
          </div>
          {/* Stat top-right */}
          <div style={{ position: 'absolute', top: '18px', right: '22px', textAlign: 'right' }}>
            <div style={{ fontSize: '26px', fontWeight: 900, color: card.tagColor, lineHeight: 1, letterSpacing: '-0.03em' }}>{card.stat}</div>
            <div style={{ fontSize: '8px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em', marginTop: '3px' }}>{card.statLabel}</div>
          </div>
          {/* Bottom content */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 26px' }}>
            <p style={{ fontStyle: 'italic', color: card.tagColor, fontSize: '11px', fontWeight: 600, marginBottom: '8px', opacity: 0, transition: 'all 0.35s ease' }} className="card-italic">
              {card.accentLine}
            </p>
            <p style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', marginBottom: '5px' }}>{card.sub}</p>
            <h3 style={{ fontWeight: 900, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '10px', fontSize: card.titleSize }}>{card.title}</h3>
            <p style={{ color: '#999', fontSize: '12px', lineHeight: 1.7, marginBottom: '18px', maxWidth: '300px' }}>{card.desc}</p>
            <div style={{ display: 'inline-flex', color: card.tagColor, fontSize: '11px', fontWeight: 800, letterSpacing: '0.06em', borderBottom: `1px solid ${card.tagColor}`, paddingBottom: '2px', transition: 'transform 0.3s ease' }} className="card-cta">
              {card.cta}
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Stats bar — real data */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3px', marginTop: '3px' }}>
      {[
        { num: '4.8★', label: 'JUSTDIAL RATING', color: '#F59E0B' },
        { num: '169', label: 'VERIFIED REVIEWS', color: '#EF4444' },
        { num: 'UNISEX', label: 'MEN & WOMEN WELCOME', color: '#10B981' },
        { num: '10PM', label: 'OPEN TILL DAILY', color: '#8B5CF6' },
      ].map((s, i) => (
        <div key={i} style={{ background: '#0D0D0D', padding: '22px 28px', borderTop: `2px solid ${s.color}` }}>
          <div style={{ fontSize: s.num === 'UNISEX' ? '18px' : '26px', fontWeight: 900, color: s.color, lineHeight: 1, letterSpacing: '-0.02em' }}>{s.num}</div>
          <div style={{ fontSize: '9px', fontWeight: 700, color: '#3a3a3a', letterSpacing: '0.15em', marginTop: '5px' }}>{s.label}</div>
        </div>
      ))}
    </div>
  </div>

  {/* Hover effects via style tag */}
  <style>{`
    [data-animate]:hover .top-accent { transform: scaleX(1) !important; }
    [data-animate]:hover .card-italic { opacity: 1 !important; transform: translateY(0) !important; }
    [data-animate]:hover .card-cta { transform: translateX(4px); }
    [data-animate]:hover img { transform: scale(1.07) !important; }
  `}</style>
</section>

{/* Gallery Section */}
<section className="bg-black border-t border-yellow-500/20 overflow-hidden" style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}>
  {/* Header */}
  <div className="px-4 sm:px-8 lg:px-16 pt-24 pb-12 max-w-7xl mx-auto">
    <div className="flex justify-between items-end flex-wrap gap-4">
      <div>
        <span
          className="text-xs font-bold tracking-widest block mb-4"
          style={{ color: '#F59E0B', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', padding: '5px 14px', borderRadius: '2px', display: 'inline-block' }}
        >
          GYM · STUDIO · REAL RESULTS
        </span>
        <h2
          id="gallery-title"
          data-animate="true"
          className={`font-black text-white transition-all duration-700 ${visibleSections['gallery-title'] ? 'animate-slide-up' : 'opacity-0 translate-y-8'}`}
          style={{ fontSize: 'clamp(40px,6vw,76px)', lineHeight: 1, letterSpacing: '-0.03em' }}
        >
          Inside the<br />
          <span style={{ color: '#F59E0B' }}>studio.</span>
        </h2>
      </div>
      <p
        id="gallery-text"
        data-animate="true"
        className={`text-xs font-medium tracking-wider transition-all duration-700 delay-200 ${visibleSections['gallery-text'] ? 'animate-slide-up-delay-1' : 'opacity-0 translate-y-8'}`}
        style={{ color: '#3a3a3a', letterSpacing: '0.08em' }}
      >
        CONVECTION, BABAMETTA, VIZIANAGARAM – 535002 · OPEN DAILY TILL 10PM
      </p>
    </div>
  </div>

  {/* Bento Gallery Grid */}
  <div className="px-4 sm:px-8 lg:px-16 pb-0 max-w-7xl mx-auto">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '280px 280px', gap: '3px' }}>
      {[
        { id: 'gallery-1', src: 'https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3cd9_d6396a06-2c67-4413-ada6-7519c5ec89f6.avif', label: 'CROSSFIT', num: '01', span: true },
        { id: 'gallery-2', src: 'https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3cbb_265cca82-58d0-46cf-9738-66a57a4e722a.avif', label: 'STRENGTH TRAINING', num: '02' },
        { id: 'gallery-3', src: 'https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3ce9_4c32c137-318f-4f14-a635-3fd906c2536d.avif', label: 'CARDIO', num: '03' },
        { id: 'gallery-4', src: 'https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3cc6_51a6e544-7817-4aa2-ab99-b6bc730ecaf2.avif', label: 'ZUMBA', num: '04' },
        { id: 'gallery-5', src: 'https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3ce0_e547fb3a-375a-45d1-afb2-5b5f37d12f6c.avif', label: 'MARTIAL ARTS', num: '05' },
        { id: 'gallery-6', src: 'https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3cf0_2ad85973-85f5-4544-9212-e559c6b93524.avif', label: 'WEIGHT LOSS', num: '06' },
      ].map((img, idx) => (
        <div
          key={img.id}
          id={img.id}
          data-animate="true"
          className={`gal-item transition-all duration-700 ${visibleSections[img.id] ? 'animate-slide-up' : 'opacity-0 translate-y-8'}`}
          style={{
            position: 'relative', overflow: 'hidden', cursor: 'crosshair',
            gridRow: img.span ? 'span 2' : undefined,
            animationDelay: `${idx * 0.07}s`,
          }}
        >
          <img
            src={img.src}
            alt={img.label}
            className="gal-img"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.7s ease' }}
          />
          <div className="gal-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.38)', transition: 'background 0.4s ease' }} />
          <div className="gal-border" style={{ position: 'absolute', inset: 0, border: '2px solid transparent', transition: 'border-color 0.3s ease', pointerEvents: 'none' }} />
          <div className="gal-label" style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(0,0,0,0.65)', color: '#fff', fontSize: '8px', fontWeight: 800, letterSpacing: '0.2em', padding: '5px 10px', borderRadius: '2px', transition: 'all 0.3s ease', backdropFilter: 'blur(4px)' }}>
            {img.label}
          </div>
          <div style={{ position: 'absolute', top: '14px', right: '14px', color: 'rgba(255,255,255,0.2)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em' }}>
            {img.num}
          </div>
        </div>
      ))}
    </div>

    {/* CTA Strip — real programs from Justdial */}
    <div style={{ background: '#F59E0B', padding: '18px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginTop: '3px' }}>
      <span style={{ fontWeight: 900, fontSize: '12px', color: '#000', letterSpacing: '-0.01em' }}>
        Crossfit · Cardio · Zumba · Martial Arts · Strength · Weight Loss · Outdoor Training — All at Babametta, Vizianagaram.
      </span>
      <button
        className="bg-black text-yellow-400 font-black text-xs tracking-widest px-6 py-2.5 transition hover:bg-gray-900"
        style={{ borderRadius: '2px', fontFamily: 'inherit' }}
      >
        JOIN NOW →
      </button>
    </div>
  </div>

  <div style={{ paddingBottom: '80px' }} />

  <style>{`
    .gal-item:hover .gal-img { transform: scale(1.06) !important; }
    .gal-item:hover .gal-overlay { background: rgba(0,0,0,0.15) !important; }
    .gal-item:hover .gal-border { border-color: rgba(245,158,11,0.65) !important; }
    .gal-item:hover .gal-label { background: #F59E0B !important; color: #000 !important; }
  `}</style>
</section>

      {/* Reviews Section */}
            <TestimonialsSection/>

      {/* Contact Section */}
      <section className="bg-black px-4 sm:px-8 lg:px-16 py-24 border-t border-yellow-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div 
              id="contact-form"
              data-animate="true"
              className={`transition-all duration-700 ${
                visibleSections['contact-form'] ? 'animate-slide-up' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="text-6xl md:text-7xl font-bold mb-10 text-white" style={{ fontWeight: 700 }}>Get started</h2>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full bg-gray-900 border border-yellow-500/30 rounded-lg px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 text-sm font-normal"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full bg-gray-900 border border-yellow-500/30 rounded-lg px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 text-sm font-normal"
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  rows="4"
                  value={formData.message}
                  onChange={handleFormChange}
                  className="w-full bg-gray-900 border border-yellow-500/30 rounded-lg px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 text-sm font-normal"
                ></textarea>
                <label className="flex items-center text-xs text-gray-400 font-normal">
                  <input type="checkbox" className="mr-3 rounded" />
                  I agree to the privacy policy.
                </label>
                <button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 px-8 py-3 rounded-lg font-bold transition text-black text-xs tracking-wide"
                >
                  Submit
                </button>
                {formSubmitted && (
                  <p className="text-green-500 text-center text-xs font-normal">Thanks! We'll contact you soon.</p>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div 
              id="contact-info"
              data-animate="true"
              className={`transition-all duration-700 delay-200 ${
                visibleSections['contact-info'] ? 'animate-slide-up-delay-1' : 'opacity-0 translate-y-8'
              }`}
            >
              <img 
                src="https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3cf4_d8249140-734e-4f47-bf18-11eba3211ddd.avif"
                alt="Contact"
                className="rounded-lg w-full mb-10 shadow-2xl"
              />
              <h3 className="text-3xl font-bold mb-6 text-white" style={{ fontWeight: 600 }}>Contact our team today</h3>
              <p className="text-gray-400 mb-8 font-normal text-sm leading-relaxed">Fill out the form or reach us directly.</p>
              <div className="space-y-5">
                <p>
                  <a href="mailto:contact@intensefitnessstudio.com" className="text-yellow-400 hover:text-yellow-300 transition text-sm font-normal">
                    contact@intensefitnessstudio.com
                  </a>
                </p>
                <p>
                  <a href="tel:+919876543210" className="text-yellow-400 hover:text-yellow-300 transition text-sm font-normal">
                    +91 98765 43210
                  </a>
                </p>
                <p className="text-gray-400 text-sm font-normal leading-relaxed">
                  Babametta, Vizianagaram<br />
                  Andhra Pradesh, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-yellow-500/20 py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div 
              id="footer-1"
              data-animate="true"
              className={`transition-all duration-700 ${
                visibleSections['footer-1'] ? 'animate-slide-up' : 'opacity-0 translate-y-8'
              }`}
            >
              <h3 className="text-2xl font-bold text-yellow-400 mb-6" style={{ fontWeight: 600 }}>Elevate your fitness journey</h3>
              <div className="space-y-4">
                <p>
                  <a href="#" className="text-yellow-400 hover:text-yellow-300 transition font-normal text-xs">Contact us</a>
                </p>
                <p>
                  <a href="tel:+919876543210" className="text-gray-400 hover:text-yellow-400 transition font-normal text-xs">+91 98765 43210</a>
                </p>
                <p>
                  <a href="mailto:info@intensefitness.com" className="text-gray-400 hover:text-yellow-400 transition font-normal text-xs">info@intensefitness.com</a>
                </p>
              </div>
            </div>

            {/* Links */}
            <div 
              id="footer-2"
              data-animate="true"
              className={`transition-all duration-700 delay-200 ${
                visibleSections['footer-2'] ? 'animate-slide-up-delay-1' : 'opacity-0 translate-y-8'
              }`}
            >
              <h4 className="font-semibold mb-6 text-white text-xs tracking-wide">QUICK LINKS</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-yellow-400 transition font-normal text-xs">Home</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition font-normal text-xs">About</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition font-normal text-xs">Trainers</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition font-normal text-xs">Programs</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition font-normal text-xs">Plans</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition font-normal text-xs">Contact</a></li>
              </ul>
            </div>

            {/* Social Media */}
            <div 
              id="footer-3"
              data-animate="true"
              className={`transition-all duration-700 delay-400 ${
                visibleSections['footer-3'] ? 'animate-slide-up-delay-2' : 'opacity-0 translate-y-8'
              }`}
            >
              <h4 className="font-semibold mb-6 text-white text-xs tracking-wide">LOCATION & SOCIAL</h4>
              <p className="text-gray-400 mb-6 font-normal text-xs">
                <a href="#" className="hover:text-yellow-400 transition">Vizianagaram</a>
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition text-xs font-normal">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition text-xs font-normal">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition text-xs font-normal">X</a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition text-xs font-normal">LinkedIn</a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition text-xs font-normal">YouTube</a>
              </div>
            </div>
          </div>

          <div className="border-t border-yellow-500/20 pt-8 text-center text-gray-700 font-normal text-xs">
            <p>Made by Intense Fitness Studio Gym • Vizianagaram</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;