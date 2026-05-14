import React, { useState, useEffect, useRef } from 'react'
import './App.css'

const slides = [
  {
    id: 1,
    label: "Mentorship",
    image: "/img-1.jpg",
    headline: "Guiding the Next Generation",
    descriptor: "Retired Education Leader / Academic Mentor",
    supportingText: "“Experience becomes most valuable when it is shared. CREX connects retired professionals with opportunities to mentor and shape future leaders.”",
    cta: "Join the CREX Network →"
  },
  {
    id: 2,
    label: "Advisory & Consultancy",
    image: "/img-2.jpg",
    headline: "Expertise That Still Drives Progress",
    descriptor: "Former Executive / Governance & Advisory Expert",
    supportingText: "“CREX deploys experienced professionals to support organisations, institutions, and development initiatives across Africa.”",
    cta: "Request an Expert →"
  },
  {
    id: 3,
    label: "Community Impact",
    image: "/img-3.jpg",
    headline: "Retirement Is A New Phase of Service",
    descriptor: "Community Development & Capacity Building",
    supportingText: "“From mentorship and training to policy advocacy and consultancy, CREX empowers retirees to continue creating meaningful impact.”",
    cta: "Partner With CREX →"
  }
]

const experts = [
  {
    id: 1,
    name: "Prof. Kwabena Mensah",
    role: "Former Director, Ministry of Education",
    expertise: "Governance & Policy Expert",
    quote: "“Experience becomes most valuable when it is shared.”",
    tags: ["Governance", "Education", "Public Policy"]
  },
  {
    id: 2,
    name: "Dr. Ama Boateng",
    role: "Retired Chief Medical Officer",
    expertise: "Healthcare Strategy & Administration",
    quote: "“Retirement should not mean the end of contribution.”",
    tags: ["Healthcare", "Leadership", "Research"]
  },
  {
    id: 3,
    name: "Ing. Samuel Osei",
    role: "Former Head of Infrastructure, GHA",
    expertise: "Civil Engineering & Project Management",
    quote: "“Practical wisdom is the bridge to sustainable progress.”",
    tags: ["Engineering", "Infrastructure", "Leadership"]
  },
  {
    id: 4,
    name: "Mrs. Elizabeth Addo",
    role: "Retired Regional Director, Agriculture",
    expertise: "Sustainable Farming & Rural Development",
    quote: "“Supporting communities is a lifetime commitment.”",
    tags: ["Agriculture", "Community Development", "Finance"]
  },
  {
    id: 5,
    name: "Mr. Kofi Asante",
    role: "Former CTO, National ICT Agency",
    expertise: "Digital Transformation & Cyber Security",
    quote: "“Innovation thrives on the foundation of experience.”",
    tags: ["ICT", "Technology", "Public Policy"]
  }
]

const reasons = [
  {
    id: "01",
    label: "Depth of Experience",
    headline: "Depth of Experience",
    description: "Access decades of accumulated expertise across governance, healthcare, education, engineering, business, research, and community development.",
    image: "/img-4.jpg"
  },
  {
    id: "02",
    label: "Mentorship That Shapes Generations",
    headline: "Mentorship That Shapes Generations",
    description: "CREX empowers retired professionals to guide emerging leaders, support institutions, and preserve valuable institutional knowledge.",
    image: "/img-3.jpg"
  },
  {
    id: "03",
    label: "Expertise for National Development",
    headline: "Expertise for National Development",
    description: "Our network supports organisations, NGOs, public institutions, and development initiatives through consultancy, training, research, and strategic advisory services.",
    image: "/img-3.jpg"
  }
]

const impactItems = [
  {
    id: 1,
    title: "Talent Identification & Database Development",
    description: "Building a trusted and dynamic network of retired professionals across diverse sectors and expertise areas.",
    tag: "Retired Experts Network",
    image: "/img-4.jpg"
  },
  {
    id: 2,
    title: "Capacity Re-engagement & Continuous Development",
    description: "Providing orientation, retooling, mentorship training, and upskilling opportunities to align expertise with current societal and industry needs.",
    tag: "Training & Development",
    image: "/img-5.jpg"
  },
  {
    id: 3,
    title: "Deployment & Consultancy Services",
    description: "Connecting retired experts to opportunities in governance, consultancy, mentorship, institutional strengthening, and development projects.",
    tag: "Consultancy & Advisory",
    image: "/img-6.jpg"
  },
  {
    id: 4,
    title: "Advocacy & Policy Influence",
    description: "Advocating for policies that recognise retirees as a critical part of Africa’s human capital and development ecosystem.",
    tag: "Policy & Advocacy",
    image: "/img-1.jpg"
  },
  {
    id: 5,
    title: "Research, Knowledge Management & Thought Leadership",
    description: "Capturing and sharing decades of experience through research, publications, policy insights, and knowledge-sharing initiatives.",
    tag: "Research & Publications",
    image: "/img-2.jpg"
  }
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeReason, setActiveReason] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const numbersRef = useRef(null)
  const SLIDE_DURATION = 8000

  useEffect(() => {
    if (numbersRef.current) {
      const activeItem = numbersRef.current.querySelector('.number-item.active');
      if (activeItem) {
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeReason]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="app">
      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/yournumber" 
        className="whatsapp-float" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.394 0 12.03c0 2.122.554 4.194 1.604 6.046L0 24l6.101-1.602a11.815 11.815 0 005.94 1.6h.005c6.637 0 12.032-5.395 12.035-12.031a11.75 11.75 0 00-3.528-8.511z"/>
        </svg>
      </a>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
        <button className="close-menu" onClick={() => setIsMenuOpen(false)}>&times;</button>
        <div className="mobile-nav-content">
          <a href="#" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>About CREX</a>
          <a href="#" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>How It Works</a>
          <a href="#" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Opportunities</a>
          <a href="#" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>For Experts</a>
          <a href="#" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Projects & Partnerships</a>
          <a href="#" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Publications</a>
          <button className="btn btn-primary" style={{ marginTop: '30px', width: '100%' }}>Join CREX</button>
        </div>
      </div>

      {/* Navbar */}
      <header className="navbar">
        <div className="container">
          <div className="logo-section">
            <div className="brand-box">CREX</div>
          </div>
          
          <nav className="nav-links">
            <a href="#" className="nav-link">About CREX</a>
            <a href="#" className="nav-link">How It Works</a>
            <a href="#" className="nav-link">Opportunities</a>
            <a href="#" className="nav-link">For Experts</a>
            <a href="#" className="nav-link">Projects & Partnerships</a>
            <a href="#" className="nav-link">Publications</a>
          </nav>
          
          <div className="header-actions">
            <button className="btn btn-primary desktop-btn">Join CREX</button>
            <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(true)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Carousel */}
      <section className="hero-fullscreen">
        <div className="carousel-background">
          {slides.map((slide, index) => (
            <div 
              key={slide.id} 
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0.3) 60%), url(${slide.image})` }}
            />
          ))}
        </div>

        <div className="container hero-overlay-content">
          <div className="hero-text-content">
            <h2 className="slide-headline" key={`h-${currentSlide}`}>{slides[currentSlide].headline}</h2>
            <p className="slide-descriptor" key={`d-${currentSlide}`}>{slides[currentSlide].descriptor}</p>
            <blockquote className="slide-quote" key={`q-${currentSlide}`}>
              {slides[currentSlide].supportingText}
            </blockquote>
            <button className="btn btn-primary cta-arrow" key={`btn-${currentSlide}`}>
              {slides[currentSlide].cta}
            </button>
          </div>

          <div className="hero-nav-bottom">
            {slides.map((slide, index) => (
              <div 
                key={slide.id} 
                className={`hero-nav-item ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              >
                <div className="progress-bar-container">
                  <div className={`progress-bar-fill ${index === currentSlide ? 'animating' : ''}`} />
                </div>
                <span className="nav-label">{slide.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Organisations Choose CREX Section */}
      <section className="why-choose-section section-padding">
        <div className="container">
          <div className="why-choose-layout">
            <div className="why-choose-left">
              <h2 className="section-title">Why Organisations Choose CREX</h2>
              
              <div className="interactive-numbers" ref={numbersRef}>
                {reasons.map((reason, index) => (
                  <div 
                    key={reason.id} 
                    className={`number-item ${index === activeReason ? 'active' : ''}`}
                    onClick={() => setActiveReason(index)}
                  >
                    <span className="number-id">{reason.id}</span>
                    <span className="number-label desktop-only">{reason.label}</span>
                  </div>
                ))}
              </div>

              <div className="reason-content" key={activeReason}>
                <h3 className="reason-headline">{reasons[activeReason].headline}</h3>
                <p className="reason-desc">{reasons[activeReason].description}</p>
                <button className="btn btn-secondary">Explore Solutions</button>
              </div>
            </div>

            <div className="why-choose-right">
              <div className="reason-image-container">
                <img 
                  src={reasons[activeReason].image} 
                  alt={reasons[activeReason].headline} 
                  className="reason-image fade-in"
                  key={activeReason}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section section-padding">
        <div className="container">
          <div className="impact-header">
            <h2 className="section-title">How CREX Creates Impact</h2>
            <p className="section-desc">
              CREX connects retired professionals with institutions, communities, and development initiatives that need trusted experience, strategic guidance, and practical wisdom.
            </p>
            <button className="btn btn-secondary">Explore Opportunities</button>
          </div>

          <div className="impact-grid">
            {impactItems.map((item) => (
              <div className="impact-card" key={item.id}>
                <div className="impact-image-container">
                  <img src={item.image} alt={item.title} className="impact-image" />
                  <div className="impact-tag">{item.tag}</div>
                </div>
                <div className="impact-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Africa’s Retired Experts */}
      <section className="experts-section section-padding">
        <div className="container">
          <div className="experts-header">
            <h2 className="section-title white">Meet Africa’s Retired Experts</h2>
            <p className="section-desc white-p">
              CREX brings together retired professionals, former executives, educators, researchers, engineers, public servants, and development experts whose decades of experience continue to create impact across Africa.
            </p>
            <button className="btn btn-primary">Join the CREX Network</button>
          </div>
          
          <div className="experts-slider-container">
            <div className="experts-slider">
              {experts.map((expert) => (
                <div key={expert.id} className="expert-card">
                  <div className="expert-photo-container">
                    <div className="expert-photo-placeholder">
                      <div className="expert-logo-box">CREX</div>
                    </div>
                    <div className="expert-hover-overlay">
                      <blockquote className="expert-hover-quote">{expert.quote}</blockquote>
                    </div>
                  </div>
                  <div className="expert-info">
                    <h4 className="expert-name">{expert.name}</h4>
                    <p className="expert-role">{expert.role}</p>
                    <p className="expert-focus">{expert.expertise}</p>
                    <div className="expert-tags">
                      {expert.tags.map((tag, idx) => (
                        <span key={idx} className="expert-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="slider-instructions desktop-only">Scroll to explore experts →</div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
