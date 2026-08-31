import React, { useState } from 'react'
import './About.css'

export default function AboutPage({ onNavigateToContact }) {
  const [activeTab, setActiveTab] = useState('board')

  const teamData = {
    board: [
      {
        name: "Prof. Albert Martins",
        role: "Chair, Board of Trustees",
        bio: "Prof Albert Martins is the founder and Executive Director of the Centre for Retired Experts. He holds a PhD in Marketing (UK), MSc in Marketing (UK), MBA in Marketing (Ghana), and has over 25 years of experience in Marketing practice, Business consultancy, and Academic lecturing both in Ghana and the UK. He was previously a Senior Lecturer at UPSA and Deputy Director of its Research & Consultancy Centre.",
        initials: "AM"
      },
      {
        name: "Henry Michael Wood (Esq)",
        role: "Secretary, Board of Trustees",
        bio: "Board Secretary and Acting Policy, Advocacy & Partnerships Manager, providing legal counsel and partnership oversight. He brings extensive legal expertise and administrative leadership to the board.",
        initials: "HW"
      },
      {
        name: "Dr. Christian Boamah-Mensah",
        role: "Trustee",
        bio: "Dr. Christian Boamah-Mensah is an Obstetrician and Gynaecologist with over three decades of experience in clinical practice, health administration, medical training, and reproductive health advocacy. He has held many sensitive positions within the Ghana Police Service Medical Directorate, including specialist and leadership roles, and previously headed the Department of Obstetrics and Gynaecology at the Police Hospital, Accra. He brings deep expertise in maternal and reproductive healthcare, policy development, and professional capacity building.",
        initials: "CBM"
      },
      {
        name: "Dr. Mrs. Benedicta Quao",
        role: "Trustee",
        bio: "Senior Research Fellow, Lecturer, Economist and Management Consultant with UPSA. Former Manager in Advisory Services at PwC. Benedicta brings a wealth of expertise and experience in Management, Consultancy, Training, and MSME sector research, having previously served as Board Chair of VisionFund Micro Credit.",
        initials: "BQ"
      },
      {
        name: "Dr. Sampson Narteh-Yoe",
        role: "Trustee",
        bio: "Financial Economist and Chartered Licensed International Financial Analyst with over 25 years of experience. Senior Lecturer of Finance at UPSA and Lead Consultant for TCT Africa Consult. Former Treasurer of Construction Bank (GH) Ltd and CFO of Blu Telecommunications.",
        initials: "SNY"
      }
    ],
    management: [
      {
        name: "Prof. Albert Martins",
        role: "Executive Director & Ag. Marketing & Resource Mobilisation Manager",
        bio: "Founder and Executive Director. Former Senior Lecturer at UPSA with extensive experience in Strategic Marketing Management, Change Management, and Corporate/Business Strategy.",
        initials: "AM"
      },
      {
        name: "Dr. Sampson Narteh-yoe",
        role: "Ag. Director of Finance & Administration",
        bio: "Senior Lecturer of Finance at UPSA with a PhD in Economics and Finance. Expert in Treasury Management, Financial Controls, and Economic Analysis.",
        initials: "SNY"
      },
      {
        name: "Dr. Christian Boamah-Mensah",
        role: "Ag. Recruitment, Development & Deployment Manager",
        bio: "Managing database profiling, retooling alignment, and opportunity matching workflows for retired experts. Over three decades of experience in clinical practice and health administration.",
        initials: "CBM"
      },
      {
        name: "Dr. Benedicta Quao",
        role: "Ag. Research, Training & Consultancy Manager",
        bio: "Directing professional training, capacity building, and consultancy services. Senior Lecturer at UPSA and former PwC Advisory Manager.",
        initials: "BQ"
      },
      {
        name: "Mr. Henry Wood (Esq)",
        role: "Ag. Policy, Advocacy & Partnerships Manager",
        bio: "Leading legal coordination, policy advocacy campaigns, and strategic partnerships with public and private sector stakeholders.",
        initials: "HW"
      },
      {
        name: "Justice Asiedu",
        role: "Ag. Business Development, Operations & Events Coordinator",
        bio: "Coordinating operational logistics, business development opportunities, and organizational events.",
        initials: "JA"
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
              <span className="about-hero-tag">About CREX Ghana</span>
              <h1 className="about-hero-title">Reconnecting Experience with Opportunity</h1>
              <p className="about-hero-desc">
                CREX transforms retiree expertise into meaningful impact for national and continental development across Africa.
              </p>
              <div className="about-hero-actions">
                <button className="btn btn-primary" onClick={onNavigateToContact}>Join the Network</button>
                <a href="#who-we-are" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>Learn More</a>
              </div>
            </div>
            <div className="about-hero-image-container">
              <img src="/crex-img-2.jpg" alt="Centre for Retired Experts - Reconnecting Experience with Opportunity" className="about-hero-image" style={{ objectFit: 'cover', objectPosition: 'center 25%' }} />
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
                Welcome to the Centre for Retired Experts CREX, a specialised think-tank on retired professionals. It is a non-governmental, apolitical action-oriented organisation established to identify, mobilise and deploy the wealth of experience, knowledge, institutional memory and expertise of retirees for development. This is achieved by reconnecting retirees to meaningful opportunities that drive sustainable development, mentorship, and institutional strengthening across Africa. Thus, CREX’s core mandate is to turn retiree experience into impact for development.
              </p>
              <p className="about-split-text">
                CREX embraces all categories of retirees across Ghana's public, private, and civil society sectors, channelling their experiences and expertise productively for national development. CREX is the place where Experience meets Significance, and where we strongly believe that retirement is not the end of Service but the beginning of Significance. The Organisation is currently headquartered in Ghana, with plans to expand into other African countries.
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

      {/* 4. Purpose Section */}
      <section className="about-purpose section-padding light-bg" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="container">
          <div className="about-split-layout">
            <div className="about-split-left">
              <span className="about-hero-tag">The Challenge & Response</span>
              <h2>Our Purpose</h2>
            </div>
            <div className="about-split-right">
              <p className="about-split-text" style={{ fontSize: '1.25rem', color: 'var(--deep-wine)', fontWeight: '500', marginBottom: '20px' }}>
                Valuable institutional memory, professional wisdom and expertise are lost when experts retire without mechanisms to transfer knowledge.
              </p>
              <p className="about-split-text" style={{ marginBottom: '15px' }}>
                In Ghana, Retiree expertise and experiences are grossly underutilised after retirement. There is a lack of structured platforms for retirees to continue contributing to national productivity or community development. This has resulted in a critical gap between the potential contributions of retirees and the systems available to engage them.
              </p>
              <p className="about-split-text" style={{ marginBottom: '15px' }}>
                Additionally, Ghana lacks a coordinated national framework or database for mobilising and deploying retired professionals for developmental projects. Besides, there is a weak institutional knowledge transfer system among public and private sector organisations in Ghana.
              </p>
              <p className="about-split-text" style={{ marginTop: '20px', borderLeft: '4px solid var(--gold)', paddingLeft: '20px', fontStyle: 'italic' }}>
                CREX has been established to address these challenges. CREX highlights the value of the “golden years” (retirement phase) in supporting Ghana’s growth and seeks to transform retirement into a new phase of national contribution - ensuring that retirement does not become an end to productivity, but a new beginning in the lifelong journey of national service.
              </p>
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
              <p className="vm-text" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
                Becoming the foremost institution passionately creating nations in Africa where retired experts remain active nation-builders whose expertise power the next generations.
              </p>
            </div>

            <div className="vm-card">
              <div className="vm-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </div>
              <h3 className="vm-title">Our Mission</h3>
              <ul className="vm-text" style={{ textAlign: 'left', paddingLeft: '0', display: 'flex', flexDirection: 'column', gap: '15px', listStyleType: 'none' }}>
                <li style={{ borderLeft: '3px solid var(--gold)', paddingLeft: '12px', fontSize: '0.95rem', lineHeight: '1.5' }}>
                  <strong>Complementing capital:</strong> Complementing Ghana’s human resource capital by identifying, mobilising and deploying retirees' expertise and experience for sustainable development across diverse sectors.
                </li>
                <li style={{ borderLeft: '3px solid var(--gold)', paddingLeft: '12px', fontSize: '0.95rem', lineHeight: '1.5' }}>
                  <strong>Empowering retirees:</strong> Empowering retirees by creating sustainable opportunities for their engagement in advisory, mentorship, capacity-building, research, consultancy and community development initiatives through collaborative partnerships around the world.
                </li>
                <li style={{ borderLeft: '3px solid var(--gold)', paddingLeft: '12px', fontSize: '0.95rem', lineHeight: '1.5' }}>
                  <strong>Enabling beneficiaries:</strong> Enabling beneficiaries (user-organisations or communities) to make informed decisions, solve complex problems, and achieve their goals more effectively through its wealth of retired experts who provide vintage experience, expertise, practical wisdom, excellent solutions and valuable insights.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5.5 Objectives Section */}
      <section className="about-objectives section-padding white-bg" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="container">
          <div className="about-section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="about-hero-tag">Strategic Targets</span>
            <h2 className="about-section-title">Our Objectives</h2>
            <p className="about-section-desc" style={{ margin: '20px auto 0', maxWidth: '800px' }}>
              CREX operates under eight clear objectives designed to channel retiree knowledge into sustainable national progress and member well-being.
            </p>
          </div>

          <div className="objectives-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
            <div className="objective-card" style={{ background: 'var(--warm-ivory)', padding: '30px', borderRadius: '16px', borderLeft: '4px solid var(--gold)' }}>
              <span className="obj-number" style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--deep-wine)', marginBottom: '10px' }}>01</span>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--charcoal)' }}>To serve as a structured platform for retirees to remain engaged, relevant, and socially connected after leaving formal employment.</p>
            </div>
            <div className="objective-card" style={{ background: 'var(--warm-ivory)', padding: '30px', borderRadius: '16px', borderLeft: '4px solid var(--gold)' }}>
              <span className="obj-number" style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--deep-wine)', marginBottom: '10px' }}>02</span>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--charcoal)' }}>To create and manage a comprehensive national database of retired professionals across sectors.</p>
            </div>
            <div className="objective-card" style={{ background: 'var(--warm-ivory)', padding: '30px', borderRadius: '16px', borderLeft: '4px solid var(--gold)' }}>
              <span className="obj-number" style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--deep-wine)', marginBottom: '10px' }}>03</span>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--charcoal)' }}>To identify short-term and long-term job opportunities in Ghana and abroad for CREX registered members.</p>
            </div>
            <div className="objective-card" style={{ background: 'var(--warm-ivory)', padding: '30px', borderRadius: '16px', borderLeft: '4px solid var(--gold)' }}>
              <span className="obj-number" style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--deep-wine)', marginBottom: '10px' }}>04</span>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--charcoal)' }}>To establish structured mentorship frameworks and facilitate skills transfer and intergenerational knowledge exchange between retired experts and younger generations of professionals, entrepreneurs and students.</p>
            </div>
            <div className="objective-card" style={{ background: 'var(--warm-ivory)', padding: '30px', borderRadius: '16px', borderLeft: '4px solid var(--gold)' }}>
              <span className="obj-number" style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--deep-wine)', marginBottom: '10px' }}>05</span>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--charcoal)' }}>To advocate for the recognition of retirees as valuable national assets and promote positive ageing, active retirement and retirement well-being.</p>
            </div>
            <div className="objective-card" style={{ background: 'var(--warm-ivory)', padding: '30px', borderRadius: '16px', borderLeft: '4px solid var(--gold)' }}>
              <span className="obj-number" style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--deep-wine)', marginBottom: '10px' }}>06</span>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--charcoal)' }}>To facilitate research, advisory and consultancy assignments where retirees’ expertise can drive policy formulation and implementation.</p>
            </div>
            <div className="objective-card" style={{ background: 'var(--warm-ivory)', padding: '30px', borderRadius: '16px', borderLeft: '4px solid var(--gold)' }}>
              <span className="obj-number" style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--deep-wine)', marginBottom: '10px' }}>07</span>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--charcoal)' }}>To secure funding and partnerships to support CREX aspirations, operations and projects.</p>
            </div>
            <div className="objective-card" style={{ background: 'var(--warm-ivory)', padding: '30px', borderRadius: '16px', borderLeft: '4px solid var(--gold)' }}>
              <span className="obj-number" style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--deep-wine)', marginBottom: '10px' }}>08</span>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--charcoal)' }}>To promote the well-being of its retiree members.</p>
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
              <h3 className="wwd-title">Talent Identification &amp; Database Development</h3>
              <p className="wwd-text">
                Systematically identifying, profiling, and maintaining a dynamic database of retired professionals across sectors.
              </p>
            </div>

            <div className="wwd-card">
              <span className="wwd-icon">🎓</span>
              <h3 className="wwd-title">Capacity Re-engagement &amp; Continuous Development</h3>
              <p className="wwd-text">
                Providing orientation, upskilling, and retooling to align retirees’ expertise with current market and societal needs.
              </p>
            </div>

            <div className="wwd-card">
              <span className="wwd-icon">💼</span>
              <h3 className="wwd-title">Deployment &amp; Consultancy Services</h3>
              <p className="wwd-text">
                Matching retirees to opportunities in public, private, and non-profit sectors for training, research, advisory, consultancy, mentorship, board appointment and project-based roles.
              </p>
            </div>

            <div className="wwd-card">
              <span className="wwd-icon">⚖️</span>
              <h3 className="wwd-title">Advocacy &amp; Policy Influence</h3>
              <p className="wwd-text">
                Promoting policies that recognise and integrate retirees as a vital component of national human capital.
              </p>
            </div>

            <div className="wwd-card">
              <span className="wwd-icon">🔍</span>
              <h3 className="wwd-title">Research, Knowledge Management &amp; Thought Leadership</h3>
              <p className="wwd-text">
                Researching, disseminating, and publishing insights drawn from retirees’ experiences to inform development practice.
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
              Our culture and engagements are built on six foundational principles that define who we are and how we serve.
            </p>
          </div>

          <div className="values-grid">
            <div className="value-card-row">
              <div className="value-row-left">
                <span className="value-num">01</span>
                <h3 className="value-title">Development</h3>
              </div>
              <p className="value-text">
                Prioritising national development over financial gains.
              </p>
            </div>

            <div className="value-card-row">
              <div className="value-row-left">
                <span className="value-num">02</span>
                <h3 className="value-title">Integrity</h3>
              </div>
              <p className="value-text">
                Upholding honesty, accountability, and ethical standards.
              </p>
            </div>

            <div className="value-card-row">
              <div className="value-row-left">
                <span className="value-num">03</span>
                <h3 className="value-title">Excellence</h3>
              </div>
              <p className="value-text">
                Delivering the highest quality service and knowledge transfer.
              </p>
            </div>

            <div className="value-card-row">
              <div className="value-row-left">
                <span className="value-num">04</span>
                <h3 className="value-title">Innovation</h3>
              </div>
              <p className="value-text">
                Combining vintage experience and technology for solutions.
              </p>
            </div>

            <div className="value-card-row">
              <div className="value-row-left">
                <span className="value-num">05</span>
                <h3 className="value-title">Collaboration</h3>
              </div>
              <p className="value-text">
                Fostering fruitful partnerships with stakeholders.
              </p>
            </div>

            <div className="value-card-row">
              <div className="value-row-left">
                <span className="value-num">06</span>
                <h3 className="value-title">Respect and Inclusion</h3>
              </div>
              <p className="value-text">
                Valuing diverse experiences, expertise and dignity of all.
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
              CREX is guided by seasoned trustees and an acting management team committed to national contribution.
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
              className={`lead-tab-btn ${activeTab === 'management' ? 'active' : ''}`}
              onClick={() => setActiveTab('management')}
            >
              Acting Management Team
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
              <button className="btn btn-primary" onClick={onNavigateToContact}>Register as Retired Expert</button>
              <button className="btn btn-secondary" onClick={onNavigateToContact}>Partner With CREX</button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
