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

const insights = [
  {
    id: 1,
    category: "GOVERNANCE & DEVELOPMENT",
    title: "Why Institutional Memory Matters for National Development",
    excerpt: "When experienced professionals leave active service without structured knowledge transfer, institutions risk losing decades of practical wisdom.",
    content: `
      <h2>Introduction</h2>
      <p>Across Africa, many institutions experience significant transitions as experienced professionals retire from active service. While retirement marks the end of formal employment for many individuals, it often also results in the gradual loss of valuable institutional memory, leadership experience, operational knowledge, and strategic insight.</p>
      <p>Institutional memory is more than archived documents or policy manuals. It includes the accumulated experiences, lessons, relationships, decision-making patterns, and practical understanding developed over decades of service. These intangible assets are often difficult to replace and can significantly influence the stability, continuity, and effectiveness of organisations and national systems.</p>
      <p>CREX believes that preserving and transferring institutional memory is essential for sustainable development, effective governance, and long-term national growth.</p>

      <h2>The Hidden Cost of Lost Experience</h2>
      <p>When experienced professionals leave institutions without structured systems for knowledge transfer, organisations often face challenges such as:</p>
      <ul>
        <li>Reduced operational continuity</li>
        <li>Repetition of past mistakes</li>
        <li>Weak succession planning</li>
        <li>Slower decision-making</li>
        <li>Loss of technical expertise</li>
        <li>Reduced mentorship for younger staff</li>
        <li>Declining organisational culture and values</li>
      </ul>
      <p>Many institutions unknowingly lose decades of practical wisdom during retirement transitions. While new talent brings innovation and energy, experience remains critical for stability, strategic thinking, and contextual understanding.</p>

      <h2>Experience as a Development Resource</h2>
      <p>Retired professionals possess insights developed through years of leadership, crisis management, institutional reform, technical practice, governance, public service, research, and community engagement. This experience represents an important national development resource that should not be overlooked.</p>
      <p>Countries that intentionally harness the expertise of retirees are better positioned to strengthen institutions, support leadership transitions, mentor emerging professionals, improve governance systems, and enhance organisational resilience.</p>

      <h2>The Role of Mentorship</h2>
      <p>One of the most effective ways to preserve institutional memory is through mentorship. Mentorship creates opportunities for practical learning, leadership guidance, intergenerational collaboration, values transfer, and strategic continuity.</p>
      <p>Younger professionals often benefit greatly from the practical experiences and leadership perspectives of retired experts who have navigated complex institutional and societal challenges.</p>
      <p>At CREX, mentorship is viewed not only as professional guidance, but also as a tool for national capacity building and leadership development.</p>

      <h2>Building Systems for Knowledge Transfer</h2>
      <p>Institutions can strengthen continuity by:</p>
      <ul>
        <li>documenting experiences and case studies</li>
        <li>engaging retirees in advisory roles</li>
        <li>creating mentorship programs</li>
        <li>involving retired experts in training and orientation</li>
        <li>establishing knowledge management systems</li>
        <li>supporting intergenerational learning initiatives</li>
      </ul>
      <p>Such approaches help organisations preserve critical expertise while empowering younger professionals with practical and contextual understanding.</p>

      <h2>The CREX Perspective</h2>
      <p>CREX believes retirement should not result in the loss of valuable expertise from society. Instead, retirement can become a new phase of contribution where experienced professionals continue to support institutions, communities, and development initiatives. By reconnecting retirees to meaningful opportunities, CREX seeks to preserve institutional memory while strengthening national human capital.</p>

      <h2>Conclusion</h2>
      <p>Institutional memory is one of the most valuable yet underutilised assets within organisations and nations. As societies continue to evolve and younger generations assume leadership roles, the guidance and experience of retired professionals remain essential. Preserving expertise is not simply about honouring the past. It is about strengthening the future.</p>
    `
  },
  {
    id: 2,
    category: "RETIREMENT & SOCIETY",
    title: "Retirement as a New Phase of National Contribution",
    excerpt: "Redefining retirement as a transition to specialized consultancy and community leadership roles.",
    content: `
      <h2>Introduction</h2>
      <p>For many people, retirement has traditionally been viewed as the final stage of professional life — a period of rest and withdrawal from active contribution. However, changing social realities, increased life expectancy, and evolving development challenges are reshaping the meaning of retirement across the world.</p>
      <p>Today, many retired professionals remain intellectually active, professionally capable, and deeply passionate about contributing to society. Their accumulated knowledge, practical experience, and leadership insight continue to hold tremendous value for institutions, communities, and younger generations.</p>
      <p>CREX believes retirement should not mark the end of productivity, purpose, or impact. Instead, it should represent a transition into new opportunities for mentorship, advisory work, consultancy, research, training, and national development.</p>

      <h2>Redefining the “Golden Years”</h2>
      <p>The retirement phase is often referred to as the “golden years,” yet many retirees experience challenges such as loss of professional identity, social isolation, and reduced engagement. At the same time, societies lose access to decades of accumulated expertise when experienced professionals are disconnected from active national life.</p>
      <p>By redefining retirement as a period of continued engagement and contribution, societies can unlock tremendous social and economic value.</p>

      <h2>The Value of Experience</h2>
      <p>Retired professionals offer practical wisdom, strategic insight, leadership maturity, technical expertise, problem-solving abilities, and institutional knowledge. These qualities are particularly important in governance, education, healthcare, engineering, business development, mentorship, policy advisory, and community development. Experience often provides perspectives that cannot easily be learned through textbooks or short-term training alone.</p>

      <h2>Intergenerational Collaboration</h2>
      <p>One of the greatest opportunities within modern development lies in connecting generations. Young professionals contribute innovation, digital skills, and fresh perspectives, while retired professionals contribute experience, stability, guidance, and contextual understanding. When these strengths are combined, institutions become stronger and more resilient.</p>

      <h2>Retirement and National Development</h2>
      <p>Many African countries face youth unemployment, leadership gaps, institutional weaknesses, and knowledge transfer challenges. Retired professionals can play a significant role in addressing these challenges through mentorship programs, consultancy support, volunteer engagement, and skills development. Retirees are therefore not simply former workers. They remain an important part of a nation’s human capital.</p>

      <h2>The CREX Vision</h2>
      <p>CREX seeks to transform retirement into a new phase of national contribution by reconnecting retirees to opportunities, supporting mentorship and training, enabling consultancy and advisory work, and preserving valuable expertise. The organisation believes that retirees remain experienced change-makers capable of driving societal and economic transformation.</p>

      <h2>Conclusion</h2>
      <p>Retirement should not be viewed as the end of relevance or contribution. With the right structures and opportunities, retired professionals can continue shaping institutions, mentoring future leaders, and supporting national development. Experience remains valuable at every stage of life.</p>
    `
  },
  {
    id: 3,
    category: "MENTORSHIP & LEADERSHIP",
    title: "Bridging Generational Gaps Through Mentorship",
    excerpt: "How senior experts are shaping the next cohort of African leaders through structured mentorship programs.",
    content: `
      <h2>Introduction</h2>
      <p>Across many organisations and institutions, generational transitions are becoming increasingly common. Younger professionals are entering leadership pipelines while experienced professionals retire from active service. This shift creates both opportunities and challenges.</p>
      <p>While younger generations often bring innovation, adaptability, and digital skills, experienced professionals possess decades of practical knowledge, leadership insight, and contextual understanding that remain essential for sustainable growth and institutional continuity. Mentorship provides a powerful bridge between generations by enabling knowledge sharing, leadership development, and mutual learning.</p>

      <h2>The Importance of Mentorship</h2>
      <p>Mentorship supports professional growth, confidence building, leadership preparation, decision-making development, skills transfer, and institutional continuity. For younger professionals, mentorship often provides practical guidance that complements academic and technical training. For retirees, mentorship creates opportunities to remain engaged, purposeful, and impactful.</p>

      <h2>Leadership Beyond Titles</h2>
      <p>Leadership is not limited to formal positions or organisational authority. Retired professionals often continue leading through coaching, mentorship, advisory work, community engagement, training, and policy influence. Their ability to share lived experiences and practical lessons can help emerging professionals navigate complex challenges more effectively.</p>

      <h2>Intergenerational Learning</h2>
      <p>Effective mentorship is not one-directional. While retirees provide guidance and institutional knowledge, younger professionals also contribute technological awareness, contemporary perspectives, innovation, and changing workplace insights. This exchange creates stronger collaboration and continuous learning across generations.</p>

      <h2>Mentorship in Development</h2>
      <p>Mentorship can contribute significantly to educational development, entrepreneurship, public service leadership, institutional strengthening, and youth empowerment. By connecting experienced professionals with younger generations, societies can accelerate leadership development while preserving valuable expertise.</p>

      <h2>The CREX Approach</h2>
      <p>CREX promotes mentorship as a strategic tool for knowledge transfer, leadership development, institutional continuity, and national capacity building. Through structured mentorship opportunities, retired professionals can continue shaping future generations while remaining actively engaged in society.</p>

      <h2>Conclusion</h2>
      <p>Strong societies are built through collaboration between generations. Mentorship creates opportunities for wisdom, innovation, and experience to work together toward shared progress. When experience is shared intentionally, everyone benefits.</p>
    `
  },
  {
    id: 4,
    category: "KNOWLEDGE MANAGEMENT",
    title: "Preserving Expertise for Future Generations",
    excerpt: "Methodologies for capturing and documenting institutional knowledge from retiring executives.",
    content: `
      <h2>Introduction</h2>
      <p>Knowledge is one of the most valuable assets within any institution, profession, or society. Yet across many organisations, decades of practical experience and institutional learning are often lost when experienced professionals retire without structured systems for documentation and knowledge transfer.</p>
      <p>This challenge affects public institutions, private organisations, educational systems, healthcare facilities, and development initiatives across Africa. Preserving expertise is about ensuring that valuable lessons, experiences, leadership practices, and professional insights remain accessible to future generations. CREX believes that knowledge preservation is essential for institutional continuity, leadership development, and sustainable national progress.</p>

      <h2>The Importance of Knowledge Management</h2>
      <p>Knowledge management involves documenting expertise, organising institutional learning, sharing professional insights, and transferring practical experience. Strong systems help institutions improve continuity, reduce repeated mistakes, strengthen training, and enhance decision-making. Without intentional knowledge preservation, organisations risk losing valuable expertise developed over decades.</p>

      <h2>Experience Beyond Documentation</h2>
      <p>Many forms of expertise cannot be fully captured through reports or manuals alone. Retired professionals often hold practical judgment, contextual understanding, relationship networks, leadership instincts, and crisis-management experience. These insights are developed through years of practice and lived experience. Creating opportunities for dialogue, mentorship, interviews, and storytelling is therefore essential for preserving institutional wisdom.</p>

      <h2>The Role of Technology</h2>
      <p>Modern digital tools create new opportunities for preserving and sharing expertise. Institutions can now build digital knowledge libraries, record expert interviews, create mentorship platforms, and archive publications. Technology can help ensure that valuable professional knowledge remains accessible beyond retirement.</p>

      <h2>Knowledge Sharing Across Generations</h2>
      <p>Younger professionals often seek practical guidance that extends beyond formal education. Retired professionals can support this need through mentorship programs, guest lectures, advisory sessions, case-study discussions, and leadership coaching. Such engagements create stronger intergenerational learning environments while preserving valuable expertise.</p>

      <h2>The CREX Commitment</h2>
      <p>CREX is committed to documenting professional insights, promoting thought leadership, supporting mentorship, and facilitating knowledge-sharing initiatives. The organisation recognises retired professionals as custodians of valuable expertise capable of supporting future generations and institutional growth.</p>

      <h2>Conclusion</h2>
      <p>Knowledge should not retire when professionals do. Societies become stronger when they intentionally preserve and transfer the experiences of those who have spent decades building institutions, solving problems, and shaping development. By preserving expertise today, we strengthen leadership and development for tomorrow.</p>
    `
  },
  {
    id: 5,
    category: "PUBLIC POLICY & ADVOCACY",
    title: "Retirees as a Strategic National Resource",
    excerpt: "Retired professionals are often viewed through the lens of social welfare. CREX advocates for a shift in perspective.",
    content: `
      <h2>Introduction</h2>
      <p>Retired professionals are often viewed primarily through the lens of social welfare and ageing support. While well-being and social protection remain important, retirees also represent an enormous reservoir of knowledge, leadership, technical expertise, and national experience.</p>
      <p>Many societies have yet to fully recognise retirees as a strategic development resource capable of contributing meaningfully to governance, mentorship, policy development, institutional strengthening, and economic growth.</p>
      <p>CREX advocates for a shift in perspective — one that positions retirees not as passive dependents, but as active contributors to national transformation.</p>

      <h2>The Growing Importance of Experienced Professionals</h2>
      <p>Across many sectors, institutions face increasing challenges related to leadership transitions, skills shortages, institutional instability, and workforce development. At the same time, large numbers of experienced professionals retire each year with valuable expertise that remains underutilised. Harnessing this expertise can help strengthen both institutions and national development efforts.</p>

      <h2>Retirees and Human Capital Development</h2>
      <p>Human capital development involves investing in the skills and capabilities of people to improve national progress. Retired professionals remain an important part of this ecosystem because they contribute leadership experience, technical expertise, mentorship, and institutional memory. Their continued engagement can help accelerate learning and improve decision-making.</p>

      <h2>Creating Opportunities for Continued Contribution</h2>
      <p>Retirees can continue supporting society through consultancy assignments, mentorship initiatives, governance advisory roles, community engagement, and policy support. However, such opportunities often require structured systems that connect retirees to organisations and development initiatives.</p>

      <h2>The Need for Policy Support</h2>
      <p>Governments and institutions can strengthen retiree engagement through national mentorship initiatives, skills databases, active ageing policies, and intergenerational development strategies. Policies that encourage continued contribution can benefit both retirees and society at large.</p>

      <h2>Active Ageing and Well-being</h2>
      <p>Meaningful engagement after retirement can positively influence mental well-being, social connection, purpose, and identity. Retirement should therefore be viewed not only as a financial transition, but also as a social and developmental opportunity.</p>

      <h2>The CREX Perspective</h2>
      <p>CREX believes retirees remain a vital component of Ghana and Africa’s human capital. By creating pathways for continued engagement, the organisation seeks to strengthen institutions, preserve expertise, and advance national development. Retirees continue to possess the wisdom and leadership needed to shape future generations.</p>

      <h2>Conclusion</h2>
      <p>Retirees represent one of society’s most underutilised strategic resources. Recognising and integrating their expertise into development systems can strengthen institutions, empower younger generations, and contribute significantly to national growth. Experience remains a powerful asset for development.</p>
    `
  }
];

const featuredReport = {
  title: "The Future of Retiree Expertise in Africa",
  category: "2026 TRENDS REPORT",
  image: "/report-cover.png",
  content: `
    <h2>Executive Summary</h2>
    <p>Africa is undergoing rapid demographic, economic, technological, and institutional transformation. As younger generations enter leadership and workforce systems, many experienced professionals retire from active service each year, often taking with them decades of valuable knowledge and expertise.</p>
    <p>This report explores the growing importance of retirees as contributors to mentorship, governance, consultancy, institutional strengthening, and sustainable development across Africa. The report also examines how governments, institutions, and development organisations can create systems that preserve and deploy retiree expertise for national progress.</p>

    <h2>Introduction</h2>
    <p>The role of retirees within society is changing. Increased life expectancy, evolving workforce structures, and rising development challenges are reshaping conversations around retirement and ageing. Many retired professionals remain healthy, intellectually active, and professionally capable. This creates both a challenge and an opportunity: societies risk losing valuable expertise, but they also have the potential to harness experience as a development resource.</p>

    <h2>Key Challenges</h2>
    <ul>
      <li><strong>1. Loss of Institutional Memory:</strong> Many organisations struggle to preserve practical knowledge when experienced professionals retire.</li>
      <li><strong>2. Weak Mentorship Systems:</strong> Young professionals often lack access to experienced mentors and leadership guidance.</li>
      <li><strong>3. Skills and Leadership Gaps:</strong> Several sectors continue to face shortages in technical expertise, governance capacity, and institutional leadership.</li>
      <li><strong>4. Limited Retiree Engagement Systems:</strong> Few structured platforms currently exist to reconnect retirees with meaningful opportunities.</li>
    </ul>

    <h2>Opportunities for Impact</h2>
    <p>Retired professionals can support governance and advisory services, leadership mentorship, institutional training, consultancy assignments, policy development, and research initiatives. Their expertise can strengthen both public and private sector institutions.</p>

    <h2>The Role of Technology</h2>
    <p>Digital platforms now make it easier to build retiree databases, match experts to opportunities, host virtual mentorship sessions, and document institutional knowledge. Technology therefore presents new opportunities for large-scale engagement of retired professionals across borders and sectors.</p>

    <h2>Recommendations</h2>
    <h3>Governments</h3>
    <ul>
      <li>Develop active ageing and mentorship policies</li>
      <li>Support retiree engagement initiatives</li>
      <li>Promote intergenerational collaboration</li>
    </ul>
    <h3>Institutions</h3>
    <ul>
      <li>Establish knowledge transfer systems</li>
      <li>Create advisory and mentorship roles for retirees</li>
      <li>Preserve institutional expertise intentionally</li>
    </ul>
    <h3>Development Organisations</h3>
    <ul>
      <li>Integrate retirees into capacity-building programs</li>
      <li>Leverage experienced professionals in community projects</li>
      <li>Support knowledge-sharing initiatives</li>
    </ul>

    <h2>The CREX Vision</h2>
    <p>CREX seeks to become Africa’s leading platform for mobilising and deploying retiree expertise for sustainable development. The organisation believes retirement should not end contribution, experience remains valuable, and mentorship strengthens societies. By reconnecting retirees to meaningful opportunities, CREX aims to strengthen institutions, empower communities, and preserve valuable knowledge for future generations.</p>

    <h2>Conclusion</h2>
    <p>Africa possesses a growing population of experienced retired professionals whose expertise remains highly valuable for development. With the right structures, policies, and platforms, retirees can continue contributing meaningfully to governance, mentorship, consultancy, research, and national transformation. The future of development will not depend only on new knowledge, but also on how societies preserve and apply the wisdom gained through experience.</p>
  `
};




function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeReason, setActiveReason] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const numbersRef = useRef(null)
  const isFirstRender = useRef(true)
  const SLIDE_DURATION = 8000

  // Force scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
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
      {/* WhatsApp Floating Button - Deactivated for now
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
      */}

      {/* Blog Modal */}
      {selectedPost && (
        <div className="blog-modal-overlay" onClick={() => setSelectedPost(null)}>
          <div className="blog-modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedPost(null)}>&times;</button>
            <div className="modal-category">{selectedPost.category}</div>
            <h2 className="modal-title">{selectedPost.title}</h2>
            <div className="modal-body" dangerouslySetInnerHTML={{ __html: selectedPost.content }}></div>
            <button className="btn btn-primary" style={{marginTop: '40px'}} onClick={() => setSelectedPost(null)}>Close Article</button>
          </div>
        </div>
      )}

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
        <div className="container navbar-container">
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

      {/* Impact Section */}
      <section className="impact-section section-padding">
        <div className="container">
          <div className="impact-header-layout">
            <div className="impact-header-text">
              <h2 className="section-title">How CREX Creates Impact</h2>
              <p className="section-desc">
                CREX connects retired professionals with institutions, communities, and development initiatives that need trusted experience, strategic guidance, and practical wisdom.
              </p>
            </div>
            <div className="impact-nav-arrows">
              <button className="nav-arrow prev-impact" onClick={() => {
                document.querySelector('.impact-grid').scrollBy({ left: -450, behavior: 'smooth' });
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button className="nav-arrow next-impact" onClick={() => {
                document.querySelector('.impact-grid').scrollBy({ left: 450, behavior: 'smooth' });
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          <div className="impact-slider-container">
            <div className="impact-grid">
              {impactItems.map((item, index) => (
                <div className="impact-card" key={item.id}>
                  <div className="impact-image-container">
                    <img src={item.image} alt={item.title} className="impact-image" />
                  </div>
                  <div className="impact-content">
                    <h3 className="impact-card-title">{item.title}</h3>
                    <div className={`impact-accent-line accent-line-${(index % 5) + 1}`}></div>
                    <p className="impact-card-desc">{item.description}</p>
                    <div className="impact-card-footer">
                      <span className="impact-footer-icon">
                        {index === 0 && "📂"}
                        {index === 1 && "🎓"}
                        {index === 2 && "💼"}
                        {index === 3 && "⚖️"}
                        {index === 4 && "🔍"}
                      </span>
                      <span className="impact-footer-tag">{item.tag}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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

      {/* Research, Insights & Thought Leadership */}
      <section className="insights-section section-padding">
        <div className="container">
          <div className="insights-header">
            <div className="insights-header-text">
              <h2 className="section-title">Latest Insights</h2>
              <p className="section-desc">
                Drawing from decades of professional experience, CREX documents and shares insights that support policy, institutional development, mentorship, and sustainable growth across Africa.
              </p>
            </div>
            <a href="#" className="view-all-link">View All Insights <span>▶</span></a>
          </div>

          <div className="insights-layout">
            <div className="insights-grid">
              {insights.slice(0, 4).map((item) => (
                <div className="insight-card" key={item.id}>
                  <div className="insight-category">{item.category}</div>
                  <h3 className="insight-title">{item.title}</h3>
                  <p className="insight-excerpt">{item.excerpt}</p>
                  <button 
                    className="insight-read-more" 
                    onClick={() => setSelectedPost(item)}
                  >
                    Read More
                  </button>
                </div>
              ))}
            </div>

            <div className="featured-report-card" onClick={() => setSelectedPost(featuredReport)} style={{cursor: 'pointer'}}>
              <div className="report-pattern-overlay"></div>
              <div className="report-content-box">
                <div className="report-image-box">
                  <img src={featuredReport.image} alt={featuredReport.title} className="report-cover-img" />
                </div>
                <div className="report-info">
                  <span className="report-tag">REPORTS</span>
                  <h3 className="report-title">{featuredReport.title}</h3>
                  <button className="btn btn-primary" style={{backgroundColor: 'var(--gold)', color: 'var(--deep-wine)', border: 'none'}}>View Application</button>
                  <div className="report-cta-line" style={{marginTop: '20px'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta-section" style={{backgroundImage: 'url(/bg-01.jpg)'}}>
        <div className="cta-overlay"></div>
        <div className="cta-content">
          <span className="cta-small-label">JOIN THE NETWORK</span>
          <h2 className="cta-headline">Experience Still Has the Power to Transform Society</h2>
          <p className="cta-text">
            CREX connects retired professionals with opportunities to mentor, advise, train, consult, and contribute to sustainable development across Ghana and Africa.
          </p>
          <div className="cta-actions">
            <button className="btn btn-primary cta-btn-gold">Register as a Retired Expert</button>
            <button className="btn btn-secondary cta-btn-outline">Partner With CREX</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-logo">CREX</div>
              <p className="footer-description">
                The Centre for Retired Experts (CREX) mobilises and deploys retired professionals to support mentorship, consultancy, governance, training, research, and sustainable development across Africa.
              </p>
              <div className="social-links">
                <a href="#" className="social-link">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="#" className="social-link">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="social-link">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
              </div>
            </div>
            
            <div className="footer-col footer-col-desktop">
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#">About CREX</a></li>
                <li><a href="#">How CREX Works</a></li>
                <li><a href="#">Opportunities</a></li>
                <li><a href="#">Areas of Expertise</a></li>
                <li><a href="#">Publications</a></li>
                <li><a href="#">Projects & Partnerships</a></li>
                <li><a href="#">News & Events</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>

            <div className="footer-col footer-col-desktop">
              <h4 className="footer-title">Programs & Activities</h4>
              <ul className="footer-links">
                <li><a href="#">Mentorship</a></li>
                <li><a href="#">Consultancy Services</a></li>
                <li><a href="#">Capacity Development</a></li>
                <li><a href="#">Advocacy & Policy</a></li>
                <li><a href="#">Research & Publications</a></li>
                <li><a href="#">Retiree Engagement</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-title">Contact Information</h4>
              <div className="contact-info">
                <p><strong>Centre for Retired Experts (CREX)</strong></p>
                <p>No. G206 Goroka Street, Amrahia, Accra</p>
                <p>P.O. Box CT 22, Cantonments, Accra</p>
                <p style={{ marginTop: '15px' }}><strong>Phone:</strong><br />0266195525 / 0552352477</p>
                <p style={{ marginTop: '10px' }}><strong>Email:</strong><br />crexghana@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="copyright">© 2026 Centre for Retired Experts (CREX). All Rights Reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms & Conditions</a>
              <a href="#">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
