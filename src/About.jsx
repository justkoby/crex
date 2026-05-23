import React, { useState } from 'react'
import './About.css'

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('board')

  const teamData = {
    board: [
      {
        name: "Prof. Kwabena Mensah",
        role: "Chairman, Board of Trustees",
        bio: "Former Director at the Ministry of Education with over 35 years of experience in educational policy, governance, and national reform development.",
        initials: "KM"
      },
      {
        name: "Dr. Ama Boateng",
        role: "Trustee & Healthcare Specialist",
        bio: "Retired Chief Medical Officer and public health administrator. Passionate about health policy planning, active ageing, and elderly wellness.",
        initials: "AB"
      },
      {
        name: "Mrs. Elizabeth Addo",
        role: "Trustee & Rural Development Expert",
        bio: "Retired Regional Director of Agriculture. Focused on sustainable farming practices, food security, and rural empowerment initiatives.",
        initials: "EA"
      }
    ],
    associates: [
      {
        name: "Ing. Samuel Osei",
        role: "Senior Associate, Infrastructure",
        bio: "Former Head of Infrastructure at the Ghana Highway Authority. Specializes in civil engineering, project management, and structural safety auditing.",
        initials: "SO"
      },
      {
        name: "Mr. Kofi Asante",
        role: "Senior Associate, Digital Transformation",
        bio: "Former CTO of the National ICT Agency. Leading expert in technology deployment, cyber security framework development, and national database systems.",
        initials: "KA"
      }
    ],
    management: [
      {
        name: "Mr. Kofi Asante",
        role: "Acting Executive Director",
        bio: "Overseeing the strategic direction, partner relations, and deployment workflows at CREX. Dedicated to bridging experience and opportunity.",
        initials: "KA"
      }
    ]
  }

  return (
    <div className="about-page">
      
      {/* 1. Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-layout">
            <div className="about-hero-content">
              <span className="about-hero-tag">About CREX Africa</span>
              <h1 className="about-hero-title">Reconnecting Experience with Opportunity</h1>
              <p className="about-hero-desc">
                CREX transforms retiree expertise into meaningful impact for national and continental development across Africa.
              </p>
              <div className="about-hero-actions">
                <button className="btn btn-primary">Join the Network</button>
                <a href="#who-we-are" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>Learn More</a>
              </div>
            </div>
            <div className="about-hero-image-container">
              <img src="/about_hero.png" alt="Retired Ghanaian professionals mentoring younger team" className="about-hero-image" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. "Who We Are" Split Section */}
      <section id="who-we-are" className="about-split">
        <div className="container">
          <div className="about-split-layout">
            <div className="about-split-left">
              <h2>About CREX</h2>
            </div>
            <div className="about-split-right">
              <p className="about-split-text">
                The Centre for Retired Experts (CREX) is a specialized think tank on retiree expertise founded in 2026 and headquartered in Ghana. CREX exists to transform retiree experience into meaningful impact for national and continental development.
              </p>
              <p className="about-split-text">
                We believe retirement should not represent the end of productivity or contribution. Instead, it should mark the beginning of a new chapter — one where decades of experience, leadership, and institutional knowledge continue to shape businesses, communities, governments, and future generations.
              </p>
              <p className="about-split-text">
                CREX was established to reconnect retired professionals with opportunities where their expertise can still create measurable social, economic, and developmental value across Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Statistics Strip */}
      <section className="about-stats">
        <div className="container">
          <div className="about-stats-grid">
            <div className="about-stat-item">
              <span className="about-stat-num">500+</span>
              <span className="about-stat-label">Retired Experts</span>
            </div>
            <div className="about-stat-item">
              <span className="about-stat-num">12+</span>
              <span className="about-stat-label">Sectors Covered</span>
            </div>
            <div className="about-stat-item">
              <span className="about-stat-num">50+</span>
              <span className="about-stat-label">Advisory Engagements</span>
            </div>
            <div className="about-stat-item">
              <span className="about-stat-num">100%</span>
              <span className="about-stat-label">African Impact</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why CREX Exists (Storytelling Blocks) */}
      <section className="about-why-exists">
        <div className="container">
          <div className="about-section-header">
            <span className="about-hero-tag">Why CREX Matters</span>
            <h2 className="about-section-title">Harnessing Decades of Wisdom</h2>
            <p className="about-section-desc">
              Modern societies face increasingly complex economic, social, and institutional challenges. While innovation and youth remain important drivers of progress, experience remains equally essential. CREX ensures this expertise is not lost.
            </p>
          </div>

          <div className="story-blocks-container">
            {/* Block 1 */}
            <div className="story-block">
              <div className="story-image-container">
                <img src="/retired_teacher.png" alt="Retired teacher mentoring" className="story-image" />
              </div>
              <div className="story-content">
                <span className="story-num">01 / Education &amp; Mentorship</span>
                <h3 className="story-title">Decades of Practical Problem-Solving</h3>
                <p className="story-text">
                  Across Africa, thousands of highly experienced educators and professionals retire every year with decades of practical wisdom, leadership insight, and technical expertise. By pairing them with classrooms and communities, CREX transfers this knowledge to younger generations.
                </p>
              </div>
            </div>

            {/* Block 2 */}
            <div className="story-block reversed">
              <div className="story-image-container">
                <img src="/executive_advising.png" alt="Executive advising startups" className="story-image" />
              </div>
              <div className="story-content">
                <span className="story-num">02 / Leadership &amp; Governance</span>
                <h3 className="story-title">Strategic Decision-Making Support</h3>
                <p className="story-text">
                  Retired corporate executives, public administrators, and financial experts support emerging organizations and local SMEs. Their advisory support helps institutions build robust governance structures, manage risks, and scale sustainably.
                </p>
              </div>
            </div>

            {/* Block 3 */}
            <div className="story-block">
              <div className="story-image-container">
                <img src="/engineer_reviewing.png" alt="Engineer reviewing plans" className="story-image" />
              </div>
              <div className="story-content">
                <span className="story-num">03 / Engineering &amp; Technology</span>
                <h3 className="story-title">Preserving Technical &amp; Historical Expertise</h3>
                <p className="story-text">
                  Senior engineers and project managers review structural plans, oversee quality standards, and provide crucial engineering audit advice, ensuring new infrastructure is built on solid, time-tested foundations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Vision & Mission Cards */}
      <section className="about-vision-mission">
        <div className="container">
          <div className="vision-mission-grid">
            <div className="vm-card">
              <div className="vm-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="vm-title">Our Vision</h3>
              <p className="vm-text">
                To become Africa’s leading platform for mobilising and deploying the expertise of retirees for sustainable development.
              </p>
            </div>

            <div className="vm-card">
              <div className="vm-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </div>
              <h3 className="vm-title">Our Mission</h3>
              <p className="vm-text">
                CREX strengthens human capital by identifying, engaging, and deploying the proven expertise, competencies, knowledge, and experiences of retired professionals across diverse sectors for development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. What We Do */}
      <section className="about-what-we-do">
        <div className="container">
          <div className="about-section-header">
            <span className="about-hero-tag">Programs &amp; Functions</span>
            <h2 className="about-section-title">What We Do</h2>
            <p className="about-section-desc">
              By connecting experienced professionals to meaningful opportunities, CREX strengthens national development while also promoting active ageing, dignity, wellbeing, and lifelong contribution.
            </p>
          </div>

          <div className="what-we-do-grid">
            <div className="wwd-card">
              <span className="wwd-icon">📂</span>
              <h3 className="wwd-title">Talent Identification</h3>
              <p className="wwd-text">
                We systematically identify, profile, and maintain a growing database of retired professionals across multiple sectors and disciplines.
              </p>
            </div>

            <div className="wwd-card">
              <span className="wwd-icon">🎓</span>
              <h3 className="wwd-title">Capacity Re-engagement</h3>
              <p className="wwd-text">
                We support retirees through orientation, retooling, and continuous learning programs that align their expertise with evolving industry and societal needs.
              </p>
            </div>

            <div className="wwd-card">
              <span className="wwd-icon">💼</span>
              <h3 className="wwd-title">Deployment &amp; Consultancy</h3>
              <p className="wwd-text">
                We connect retired experts to opportunities within public institutions, private organizations, NGOs, educational institutions, and development initiatives where their expertise can drive meaningful outcomes.
              </p>
            </div>

            <div className="wwd-card">
              <span className="wwd-icon">⚖️</span>
              <h3 className="wwd-title">Advocacy &amp; Policy Influence</h3>
              <p className="wwd-text">
                We advocate for policies that recognize retirees as an important component of national human capital and sustainable development across Ghana and Africa.
              </p>
            </div>

            <div className="wwd-card">
              <span className="wwd-icon">🔍</span>
              <h3 className="wwd-title">Research &amp; Thought Leadership</h3>
              <p className="wwd-text">
                We document, publish, and share insights from retired professionals to preserve institutional memory and support future development practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Core Values */}
      <section className="about-values">
        <div className="container">
          <div className="about-section-header">
            <span className="about-hero-tag">Our Foundational Beliefs</span>
            <h2 className="about-section-title">Core Values</h2>
            <p className="about-section-desc">
              Our culture and engagements are built on five foundational principles that define who we are and how we serve.
            </p>
          </div>

          <div className="values-grid">
            <div className="value-card-row">
              <div className="value-row-left">
                <span className="value-num">01</span>
                <h3 className="value-title">Excellence</h3>
              </div>
              <p className="value-text">
                Delivering high-quality service, knowledge transfer, and professional engagement.
              </p>
            </div>

            <div className="value-card-row">
              <div className="value-row-left">
                <span className="value-num">02</span>
                <h3 className="value-title">Integrity</h3>
              </div>
              <p className="value-text">
                Upholding honesty, accountability, and ethical leadership in all engagements.
              </p>
            </div>

            <div className="value-card-row">
              <div className="value-row-left">
                <span className="value-num">03</span>
                <h3 className="value-title">Innovation</h3>
              </div>
              <p className="value-text">
                Blending experience with modern systems and technology to solve evolving challenges.
              </p>
            </div>

            <div className="value-card-row">
              <div className="value-row-left">
                <span className="value-num">04</span>
                <h3 className="value-title">Collaboration</h3>
              </div>
              <p className="value-text">
                Building meaningful partnerships across sectors and communities.
              </p>
            </div>

            <div className="value-card-row">
              <div className="value-row-left">
                <span className="value-num">05</span>
                <h3 className="value-title">Respect for Experience</h3>
              </div>
              <p className="value-text">
                Recognizing the dignity, value, and contribution of retirees and experienced professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Leadership Team Preview */}
      <section className="about-leadership">
        <div className="container">
          <div className="about-section-header">
            <span className="about-hero-tag">Governance &amp; Leadership</span>
            <h2 className="about-section-title">Our Leadership</h2>
            <p className="about-section-desc">
              CREX is guided by seasoned trustees, senior technical associates, and acting management committed to national contribution.
            </p>
          </div>

          <div className="leadership-tabs">
            <button 
              className={`lead-tab-btn ${activeTab === 'board' ? 'active' : ''}`}
              onClick={() => setActiveTab('board')}
            >
              Board of Trustees
            </button>
            <button 
              className={`lead-tab-btn ${activeTab === 'associates' ? 'active' : ''}`}
              onClick={() => setActiveTab('associates')}
            >
              Technical Associates
            </button>
            <button 
              className={`lead-tab-btn ${activeTab === 'management' ? 'active' : ''}`}
              onClick={() => setActiveTab('management')}
            >
              Acting Management
            </button>
          </div>

          <div className="lead-grid">
            {teamData[activeTab].map((member, index) => (
              <div className="lead-card" key={index}>
                <div className="lead-avatar-placeholder">
                  {member.initials}
                </div>
                <h3 className="lead-name">{member.name}</h3>
                <div className="lead-role">{member.role}</div>
                <p className="lead-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="about-final-cta">
        <div className="container">
          <div className="about-final-cta-content">
            <span className="about-cta-tag">Active Ageing &amp; Contribution</span>
            <h2 className="about-cta-title">Experience Still Has a Role to Play</h2>
            <p className="about-cta-text">
              CREX is building a future where retirement is not viewed as withdrawal from society, but as a transition into continued relevance, mentorship, leadership, and impact.
            </p>
            <div className="about-cta-actions">
              <button className="btn btn-primary">Register as Retired Expert</button>
              <button className="btn btn-secondary">Partner With CREX</button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
