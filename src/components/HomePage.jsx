import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Star } from 'lucide-react';

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
      <section className="bg-black px-4 sm:px-8 lg:px-16 py-24 border-t border-yellow-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <img 
              src="https://cdn.prod.website-files.com/image-generation-assets/65e862a5-c690-48b1-ab89-e24d50d6efa0.avif" 
              alt="Profile"
              className="w-20 h-20 rounded-full mx-auto mb-6"
            />
            <h2 
              id="features-title"
              data-animate="true"
              className={`text-6xl md:text-7xl font-bold mb-6 text-white transition-all duration-700 ${
                visibleSections['features-title'] ? 'animate-slide-up' : 'opacity-0 translate-y-8'
              }`}
              style={{ fontWeight: 700 }}
            >
              Unleash your next level
            </h2>
            <p 
              id="features-text"
              data-animate="true"
              className={`text-gray-400 max-w-2xl mx-auto text-sm font-normal leading-relaxed transition-all duration-700 delay-200 ${
                visibleSections['features-text'] ? 'animate-slide-up-delay-1' : 'opacity-0 translate-y-8'
              }`}
            >
              Experience elite coaching, signature programs, and advanced equipment—engineered for your transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Trainer Card */}
            <div 
              id="card-1"
              data-animate="true"
              className={`bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition border border-yellow-500/30 ${
                visibleSections['card-1'] ? 'animate-slide-up' : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: '0.1s' }}
            >
              <img 
                src="https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3d08_bb0cbef0-499c-400c-a83b-f39230d2302a.avif"
                alt="Jordan Ellis"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <p className="text-yellow-400 text-xs font-bold mb-3 tracking-wide">TRAINER</p>
                <h3 className="text-xl font-bold mb-3 text-white">Jordan Ellis</h3>
                <p className="text-gray-400 mb-4 text-xs leading-relaxed font-normal">
                  Strength expert with 8 years' experience. Specializes in muscle building and performance for all levels.
                </p>
                <a href="#" className="text-yellow-400 font-semibold text-xs hover:text-yellow-300 transition">View →</a>
              </div>
            </div>

            {/* Program Card */}
            <div 
              id="card-2"
              data-animate="true"
              className={`bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition border border-yellow-500/30 ${
                visibleSections['card-2'] ? 'animate-slide-up' : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: '0.2s' }}
            >
              <img 
                src="https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3cbb_265cca82-58d0-46cf-9738-66a57a4e722a.avif"
                alt="Muscle Gain Program"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <p className="text-yellow-400 text-xs font-bold mb-3 tracking-wide">PROGRAM</p>
                <h3 className="text-xl font-bold mb-3 text-white">Muscle Gain</h3>
                <p className="text-gray-400 mb-4 text-xs leading-relaxed font-normal">
                  Targeted routines and custom plans to build lean muscle, increase strength, and deliver real results.
                </p>
                <a href="#" className="text-yellow-400 font-semibold text-xs hover:text-yellow-300 transition">Explore →</a>
              </div>
            </div>

            {/* Equipment Card */}
            <div 
              id="card-3"
              data-animate="true"
              className={`bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition border border-yellow-500/30 ${
                visibleSections['card-3'] ? 'animate-slide-up' : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: '0.3s' }}
            >
              <img 
                src="https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3cb4_5b80479a-0b3c-4d64-bd4e-20f04fa0ccbc.avif"
                alt="3D Power Rack"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <p className="text-yellow-400 text-xs font-bold mb-3 tracking-wide">EQUIPMENT</p>
                <h3 className="text-xl font-bold mb-3 text-white">3D Power Rack</h3>
                <p className="text-gray-400 mb-4 text-xs leading-relaxed font-normal">
                  Multi-functional rack for safe, dynamic training. Built for heavy lifts and versatile workouts.
                </p>
                <a href="#" className="text-yellow-400 font-semibold text-xs hover:text-yellow-300 transition">See more →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-black px-4 sm:px-8 lg:px-16 py-24 border-t border-yellow-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 
              id="gallery-title"
              data-animate="true"
              className={`text-6xl md:text-7xl font-bold text-center mb-6 text-white transition-all duration-700 ${
                visibleSections['gallery-title'] ? 'animate-slide-up' : 'opacity-0 translate-y-8'
              }`}
              style={{ fontWeight: 700 }}
            >
              Unleash your power gallery
            </h2>
            <p 
              id="gallery-text"
              data-animate="true"
              className={`text-center text-gray-400 text-sm font-normal transition-all duration-700 delay-200 ${
                visibleSections['gallery-text'] ? 'animate-slide-up-delay-1' : 'opacity-0 translate-y-8'
              }`}
            >
              See our space, gear, and real results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { id: 'gallery-1', src: 'https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3cd9_d6396a06-2c67-4413-ada6-7519c5ec89f6.avif' },
              { id: 'gallery-2', src: 'https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3cbb_265cca82-58d0-46cf-9738-66a57a4e722a.avif' },
              { id: 'gallery-3', src: 'https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3ce9_4c32c137-318f-4f14-a635-3fd906c2536d.avif' },
              { id: 'gallery-4', src: 'https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3cc6_51a6e544-7817-4aa2-ab99-b6bc730ecaf2.avif' },
              { id: 'gallery-5', src: 'https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3ce0_e547fb3a-375a-45d1-afb2-5b5f37d12f6c.avif' },
              { id: 'gallery-6', src: 'https://cdn.prod.website-files.com/699954413dc91a755e1ce480/699963b96284b220672f3cf0_2ad85973-85f5-4544-9212-e559c6b93524.avif' }
            ].map((img, idx) => (
              <img 
                key={img.id}
                id={img.id}
                data-animate="true"
                src={img.src}
                alt={`Gallery ${idx + 1}`}
                className={`rounded-lg w-full h-64 object-cover hover:opacity-80 transition ${
                  visibleSections[img.id] ? 'animate-slide-up' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-black px-4 sm:px-8 lg:px-16 py-24 border-t border-yellow-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p 
              id="reviews-label"
              data-animate="true"
              className={`text-gray-500 font-semibold mb-6 text-xs tracking-wide transition-all duration-700 ${
                visibleSections['reviews-label'] ? 'animate-slide-up' : 'opacity-0 translate-y-8'
              }`}
            >
              MEMBER REVIEWS & FEEDBACK
            </p>
            <h2 
              id="reviews-title"
              data-animate="true"
              className={`text-6xl md:text-7xl font-bold mb-4 text-white transition-all duration-700 delay-200 ${
                visibleSections['reviews-title'] ? 'animate-slide-up-delay-1' : 'opacity-0 translate-y-8'
              }`}
              style={{ fontWeight: 700 }}
            >
              Strength. Support. Real transformation.
            </h2>
            <p className="text-gray-400 text-sm mt-4">4.8★ Rating • 169 Google Reviews</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {reviews.map((review) => (
              <div 
                key={review.id}
                id={review.id}
                data-animate="true"
                className={`bg-gray-900 p-8 rounded-lg border border-yellow-500/30 transition-all duration-700 ${
                  visibleSections[review.id] ? 'animate-slide-up' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-300 mb-6 leading-relaxed font-normal">"{review.quote}"</p>
                <div>
                  <p className="font-semibold text-white text-sm">{review.name}</p>
                  {review.verified && (
                    <p className="text-xs text-yellow-400">✓ Verified Review</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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