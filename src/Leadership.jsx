import React, { useState } from 'react'
import './Leadership.css'

export default function LeadershipPage() {
  const [activeTab, setActiveTab] = useState('board')
  const [expandedCard, setExpandedCard] = useState(null)

  const boardMembers = [
    {
      name: "Prof. Albert Martins",
      role: "Chair, Board of Trustees",
      initials: "AM",
      bio: `Prof Albert Martins is the founder and Executive Director of the Centre for Retired Experts. He is a Chartered Marketer holding a PhD in Marketing (UK); M.Sc. in Marketing (UK); MBA in Marketing (Ghana); Postgraduate Diploma in Marketing (CIM - UK); Diploma, Marketing & Social Research (UK) and a B.A. (Honours) in Social Sciences (Ghana). Until November 2022, Prof Martins was a Senior Lecturer in Marketing and the Director of Business Development at the University of Professional Studies, Accra (UPSA). He was previously the Deputy Director, Research & Consultancy Centre of the University. Between 2014 and 2016, he worked as the Vice-President (Academic) at Accra Business School, now Gold Coast University. He is a member of the Chartered Institute of Marketing (UK); a Chartered member of the Chartered Institute of Marketing Ghana (CIMG), and the Marketing Research Society (UK).

Prof Martins commenced his career as an academic at the Ghana School of Marketing in 2001 and lectured in Chartered Institute of Marketing (CIM) courses. Between early 2002 and 2003, he lectured in Marketing at the University of Ghana School of Administration, before proceeding to the United Kingdom. Whilst in the UK between 2003 and 2013, he lectured at Jeff Wooller College; Warnborough University and the London Metropolitan University at Professional, Undergraduate and Postgraduate levels, besides working as a Business Consultant in the private sector.

Prof. Martins has a wealth of experience in Marketing practice and Business consultancy. He worked as the Marketing Manager of erstwhile state-owned Western Veneer & Lumber Company (WVLC) from 1991-2000 and as the Managing Consultant of Primus Marketing & Consultancy Ltd from 2000-2003. Besides lecturing in the UK, he consulted for Management Strategies for Africa (MSA) and Frontier Partners which specialized in business strategy for UK small firms from 2005 to 2013. Furthermore, Prof Martins has extensively trained in Ghana and the UK in the areas of Strategic Marketing Management; Change Management and Corporate/Business Strategy. Additionally, Prof Martins is an ordained Minister of God, currently serving as the Senior Pastor, Revival Outreach Church, Revival Cathedral, Accra. He is the founder of the Pastors' Offspring Network (POFFNET), a Christian non-governmental organisation supporting pastors' children to discover and purpose, greatness and fulfilment.`
    },
    {
      name: "Henry Michael Wood (Esq)",
      role: "Secretary, Board of Trustees",
      initials: "HW",
      bio: "Board Secretary and Acting Policy, Advocacy & Partnerships Manager, providing legal counsel and partnership oversight. He brings extensive legal expertise and administrative leadership to the board."
    },
    {
      name: "Dr. Christian Boamah-Mensah",
      role: "Trustee",
      initials: "CBM",
      bio: `Dr. Christian Boamah-Mensah is an Obstetrician and Gynaecologist with over three decades of experience in clinical practice, health administration, medical training, and reproductive health advocacy.

He has held many sensitive positions within the Ghana Police Service Medical Directorate, including specialist and leadership roles, and previously headed the Department of Obstetrics and Gynaecology at the Police Hospital, Accra.

Dr. Boamah-Mensah served with distinction in the Ghana Police Service Medical Directorate from 1995 to 2022, rising through the ranks from Medical Officer to Deputy Commissioner of Police (DCOP) and Specialist Obstetrician and Gynaecologist. Along his career, he handled many highly sensitive positions, including providing medical care for the nation's highest office. Between 2016 and 2022, he was the Head of the Department of Obstetrics and Gynaecology at the Police Hospital, Accra, where he provided specialist clinical leadership, mentored healthcare professionals, and enhanced maternal healthcare services.`
    },
    {
      name: "Dr. Mrs. Benedicta Quao",
      role: "Trustee",
      initials: "BQ",
      bio: `Benedicta is a Senior Research Fellow/Senior Lecturer/Economist and a Management Consultant with the University of Professional Studies, Accra (UPSA). She lectures in Entrepreneurship Development, SME Management and Business Ethics. Prior to joining UPSA, she was a Manager in the Advisory Services of PricewaterhouseCoopers (pwc). She had responsibility for capacity building, Monitoring and Evaluation, Project Fund Management, Market Research, Micro and Small Enterprises Development and Gender related services. Benedicta built significant experience in her area of specialty through the provision of consulting services and advice to MSEs, NGOs, and their development partners including: Consultant in charge of Gender and Microfinance related issues at Optimal Consultancy Services, a Special Advisor in Charge of Business Development and Fundraising Worldwide for Africa Forum Network (Affnet)- an International NGO, an Associate Consultant of GIMPA Consultancy Services; and Economic Advisor in the Investment Management and Banking Services department of Pentax Management Consultancy Services.

She has also been involved in training/capacity building, market research in economic development, micro and small enterprise management, and accounting. Her area of competence includes: capacity building, policy analysis, economic/market research especially for the MSME sector, feasibility/business plans, proposal writing, and auditing. Benedicta also worked for Ministry of Health Services as an assistant administrator and on attachment as an auditor with Deloitte and Touché. Benedicta holds a PhD in Marketing, an M.Phil. in Economics, a BA (Honors) in Economics and Mathematics and a diploma in Education.

Until recently served as the Vice Board Chair of the Board of VisionFund Micro Credit (a microfinance arm of World Vision International) till 2018 when she was appointed the substantive Board Chair. She has served the Board since and retired in April 2022 after 9 years of blissful service. She was instrumental in VisionFund's engagement with the Central Bank and other relevant stakeholders. She brings to CREX a great wealth of expertise and experience in Management, Consultancy, Training, and Research.`
    },
    {
      name: "Dr. Sampson Narteh-Yoe",
      role: "Trustee",
      initials: "SNY",
      bio: `A Financial Economist and a Chartered Licensed International Financial Analyst with over 25 years work experience in various fields, Sampson is currently a Senior Lecturer of Finance at the University of Professional Studies, Accra in the Banking and Finance Department and the Lead Consultant for TCT Africa Consult (formerly The Corporate Treasurer) Limited. He has also worked as the Treasurer of The Construction Bank (GH) Ltd (set up the Treasury Department from scratch) and the Chief Financial Officer of Blu Telecommunications Ltd.

In addition, he has worked in Finance and Treasury in various organizations across Telecommunications, Petroleum, FMCG/Manufacturing, and in a Non-Governmental Organization. He also has a huge amount of corporate banking experience. He is adept at Treasury Management, Financial Management and Controls, Forex Trading and Economic Analysis. Sampson has worked in Scancom (MTN) – Senior Treasury Manager; Barclays Bank – Head, MIS and Sales Performance Manager (Corporate Banking Division), Nestle Ghana – Treasurer (set up the Treasury Department from scratch) and Shell Ghana Ltd – Assistant Treasurer.

Sampson holds a PhD and Postgraduate Diploma degrees in Economics and Finance from the University of Gdansk, Poland, a MSc degree in Economics with specialization in Finance from the Donetsk State University, Ukraine. He is a Chartered Licensed International Financial Analyst (LIFA), Fellow of the Chartered Institute of Corporate Treasurers (CICT) and a Certified Treasury Analyst. Dr Sampson Narteh-Yoe brings his great wealth of experience in Corporate finance, accounting, management and training to CREX.`
    }
  ]

  const managementTeam = [
    {
      name: "Prof. Albert Martins",
      role: "Executive Director & Ag. Marketing & Resource Mobilisation Manager",
      initials: "AM",
      bio: "Founder and Executive Director. Former Senior Lecturer at UPSA with extensive experience in Strategic Marketing Management, Change Management, and Corporate/Business Strategy."
    },
    {
      name: "Dr. Sampson Narteh-Yoe",
      role: "Ag. Director of Finance & Administration",
      initials: "SNY",
      bio: "Senior Lecturer of Finance at UPSA with a PhD in Economics and Finance. Expert in Treasury Management, Financial Controls, and Economic Analysis."
    },
    {
      name: "Dr. Christian Boamah-Mensah",
      role: "Ag. Recruitment, Development & Deployment Manager",
      initials: "CBM",
      bio: "Managing database profiling, retooling alignment, and opportunity matching workflows for retired experts. Over three decades of experience in clinical practice and health administration."
    },
    {
      name: "Dr. Benedicta Quao",
      role: "Ag. Research, Training & Consultancy Manager",
      initials: "BQ",
      bio: "Directing professional training, capacity building, and consultancy services. Senior Lecturer at UPSA and former PwC Advisory Manager."
    },
    {
      name: "Mr. Henry Wood (Esq)",
      role: "Ag. Policy, Advocacy & Partnerships Manager",
      initials: "HW",
      bio: "Leading legal coordination, policy advocacy campaigns, and strategic partnerships with public and private sector stakeholders."
    },
    {
      name: "Justice Asiedu",
      role: "Ag. Business Development, Operations & Events Coordinator",
      initials: "JA",
      bio: "Coordinating operational logistics, business development opportunities, and organizational events."
    }
  ]

  const activeTeam = activeTab === 'board' ? boardMembers : managementTeam

  return (
    <div className="leadership-page">
      {/* Hero */}
      <section className="leadership-hero">
        <div className="container">
          <div className="leadership-hero-content">
            <span className="leadership-hero-tag">Our People</span>
            <h1 className="leadership-hero-title">Leadership & Team</h1>
            <p className="leadership-hero-desc">
              Meet the experienced professionals who guide the strategic direction and daily operations of the Centre for Retired Experts.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Tabs */}
      <section className="leadership-detail-section">
        <div className="container">
          <div className="leadership-tabs">
            <button
              className={`leadership-tab ${activeTab === 'board' ? 'active' : ''}`}
              onClick={() => { setActiveTab('board'); setExpandedCard(null); }}
            >
              Board of Trustees
            </button>
            <button
              className={`leadership-tab ${activeTab === 'management' ? 'active' : ''}`}
              onClick={() => { setActiveTab('management'); setExpandedCard(null); }}
            >
              Acting Management Team
            </button>
          </div>

          <div className="leadership-grid">
            {activeTeam.map((member, idx) => (
              <div
                className={`leadership-card ${expandedCard === idx ? 'expanded' : ''}`}
                key={`${activeTab}-${idx}`}
                onClick={() => setExpandedCard(expandedCard === idx ? null : idx)}
              >
                <div className="leadership-card-header">
                  <div className="leadership-avatar">{member.initials}</div>
                  <div>
                    <h3 className="leadership-name">{member.name}</h3>
                    <p className="leadership-role">{member.role}</p>
                  </div>
                </div>
                <div className="leadership-bio">
                  {member.bio.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
                <span className="leadership-expand-hint">
                  {expandedCard === idx ? 'Click to collapse ▲' : 'Click to read full bio ▼'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
