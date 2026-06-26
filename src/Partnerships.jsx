import React from 'react'
import './Partnerships.css'

export default function PartnershipsPage({ onNavigateToContact }) {
  const partners = [
    {
      name: "Chartered Institute of Marketing, Ghana (CIMG)",
      logo: "/CIMG.jpg",
      description: "The Chartered Institute of Marketing, Ghana (CIMG) envisions to be the voice of marketing practice in Ghana, and aims to see both private and public organisations embrace the marketing concept and be marketing-oriented in their operations. CIMG's mission is to lead in the development of world-class marketing professionals and practitioners for effective marketing practice in Ghana. The objects of the Institute are to set standards for the practice of marketing, and to regulate the practice of the marketing profession in the country; To achieve these objects, the Institute provides training and conducts examinations in accordance with international best practice to improve the skills and competencies of all those working in and aspiring to work in marketing; conduct innovative marketing research; conduct and provide for the conduct of qualifying examinations for membership and award professional marketing certificates."
    },
    {
      name: "The Centre for Ageing Studies (CFAS)",
      logo: "/CFAS.png",
      description: "The Centre for Ageing Studies (CFAS) is a Centre at the University of Ghana, Legon, established to advance multidisciplinary, cutting-edge research and educational programmes that will promote the well-being of older adults. CFAS aims to be a leader in ageing research in Africa, provides resources for healthy ageing, conducts cutting-edge research and provides training in ageing studies. CFAS translates research advancements into practical understanding and interventions; advocates sound policy to enhance the quality of life and promotes the health and welfare of adult citizens. CFAS also provides a Resource Centre for healthy ageing where varied enhancement of training programmes are offered to older adults, families and community members by professionals."
    },
    {
      name: "Youth Bridge Foundation (YBF)",
      logo: "/YBF.png",
      description: "The Youth Bridge Foundation (YBF) is an independent non-profit organisation committed to bridging gaps for positive youth development across the continent of Africa and the Diaspora. YBF achieves this purpose and mandate through cutting-edge and evidence-based youth research, sustained advocacy, training and mentorship. YBF equips teachers, students, professionals, and underserved communities with the digital and cybersecurity skills needed to learn, innovate, compete, and succeed in an increasingly connected world."
    },
    {
      name: "Research & Consultancy Centre (RCC - UPSA)",
      logo: "/RCC-UPSA.png",
      description: "The Research and Consultancy Centre (RCC) is a strategic centre in UPSA established to oversee, promote and administer all research and consultancy activities of the University. Since its establishment, the Centre has gained reputation for creating value for its clients and bring competitive advantage to their activities. The Centre has a wide range of expertise but specializes in the provision of research and consultancy services in the following areas: survey design and implementation; data management and analysis; social and economic research; monitoring and evaluation; impact assessment; professional training and human resource development, and business advisory services. RCC's knowledge and commitment, combined with extensive experiences gained from working on both international and national assignments enables the Centre to provide the highest quality of service to its clients."
    }
  ]

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
