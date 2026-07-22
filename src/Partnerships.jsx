import React from 'react'
import './Partnerships.css'

export default function PartnershipsPage({ onNavigateToContact }) {
  const partners = [
    {
      name: "Youth Bridge Foundation (YBF)",
      logo: "/YBF.png",
      description: "The Youth Bridge Foundation (YBF) is an independent non-profit organisation committed to bridging gaps for positive youth development across the continent of Africa and the Diaspora. YBF achieves this purpose and mandate through cutting-edge and evidence-based youth research, sustained advocacy, training and mentorship. YBF equips teachers, students, professionals, and underserved communities with the digital and cybersecurity skills needed to learn, innovate, compete, and succeed in an increasingly connected world."
    }
  ];


  return (
    <div className="partnerships-page">
      {/* Hero */}
      <section className="partnerships-hero">
        <div className="container">
          <div className="partnerships-hero-content">
            <span className="partnerships-hero-tag">Strategic Collaborations</span>
            <h1 className="partnerships-hero-title">Our Partnerships</h1>
            <p className="partnerships-hero-desc">
              CREX collaborates with reputable institutions across academia, research, marketing, youth development, and professional practice to amplify the impact of retiree expertise and create meaningful pathways for sustainable development.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Detail Section */}
      <section className="partnerships-detail-section">
        <div className="container">
          <div className="partnerships-detail-grid">
            {partners.map((partner, idx) => (
              <div className="partnership-detail-card" key={idx}>
                <div className="partnership-logo-container">
                  <img src={partner.logo} alt={partner.name} className="partnership-logo-img" />
                </div>
                <div className="partnership-detail-content">
                  <h2 className="partnership-detail-name">{partner.name}</h2>
                  <p className="partnership-detail-desc">{partner.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="partnerships-cta" style={{ backgroundImage: 'url(/bg-01.jpg)' }}>
        <div className="cta-overlay"></div>
        <div className="cta-content">
          <span className="cta-small-label">Collaborate With Us</span>
          <h2 className="cta-headline">Partner With CREX to Create Lasting Impact</h2>
          <p className="cta-text">
            Join our growing network of institutional partners working to harness the expertise of retired professionals for sustainable development across Ghana and Africa.
          </p>
          <div className="cta-actions">
            <button className="btn btn-primary cta-btn-gold" onClick={onNavigateToContact}>Get In Touch</button>
          </div>
        </div>
      </section>
    </div>
  )
}
