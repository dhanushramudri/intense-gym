import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Star } from 'lucide-react';
import TestimonialsSection from './TestimonialsSection';
import HeroSection from './HeroSection';
import ContactSection from './Contactsection';
import Footer from './Footer';
import GallerySection from './GallerySection';
import FeaturesSection from './FeaturesSection';
import Navbar from './Navbar';

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
      <Navbar/>

      {/* Hero Section */}
      <HeroSection />


{/* Features Section */}
<FeaturesSection/>

{/* Gallery Section */}
  <GallerySection/>

      {/* Reviews Section */}
            <TestimonialsSection/>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;