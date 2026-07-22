import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import AboutPage from './About'
import ContactPage from './Contact'
import PartnershipsPage from './Partnerships'
import LeadershipPage from './Leadership'
import RegistrationForm from './registration/RegistrationForm'
import AdminPage from './admin/AdminPage'
import PublicationsPage from './Publications'

const slides = [
  {
    id: 1,
    label: "Impact",
    image: "/img-1.jpg",
    headline: "Turning retiree experience into impact for development",
    descriptor: "CREX IMPACT",
    supportingText: "CREX highlights the value of the “golden years” (retirement phase) in supporting Ghana's growth by leveraging retiree expertise, experience and passion for sustainable development",
    cta: "Join the CREX Network →"
  },
  {
    id: 2,
    label: "People",
    image: "/img-2.jpg",
    headline: "Our careers built projects. Our retirement builds people",
    descriptor: "MENTORSHIP & SKILLS",
    supportingText: "At CREX, one story can train 100 engineers before they pour bad concrete",
    cta: "Join the CREX Network →"
  },
  {
    id: 3,
    label: "Results",
    image: "/img-3.jpg",
    headline: "Mobilizing retiree expertise for results",
    descriptor: "CAPACITY RE-ENGAGEMENT",
    supportingText: "CREX facilitates training and mentorship programmes where retired experts pass down tacit knowledge, technical and leadership skills to the younger workforce",
    cta: "Join the CREX Network →"
  },
  {
    id: 4,
    label: "Know-How",
    image: "/img-4.jpg",
    headline: "Retirees have “know-how” that lives in their heads, hands and guts – not in a manual",
    descriptor: "PRACTICAL WISDOM",
    supportingText: "You can’t Google a gut feeling earned in 1984, but you can Google CREX for invaluable expertise, experience and guidance.",
    cta: "Join the CREX Network →"
  },
  {
    id: 5,
    label: "Purpose",
    image: "/img-5.jpg",
    headline: "Connecting retiree knowledge to purposeful work",
    descriptor: "DEPLOYMENT & CONSULTANCY",
    supportingText: "CREX deploys experienced professionals to support public/private-sector organisations, institutions and development initiatives across Africa",
    cta: "Join the CREX Network →"
  },
  {
    id: 6,
    label: "Opportunity",
    image: "/img-1.jpg",
    headline: "Connecting experience with opportunity",
    descriptor: "INTERGENERATIONAL TRANSFER",
    supportingText: "Experience becomes most valuable when it is shared. CREX connects retired professionals with opportunities to mentor and shape future leaders",
    cta: "Join the CREX Network →"
  },
  {
    id: 7,
    label: "Insight",
    image: "/img-2.jpg",
    headline: "Knowledge does not retire when professionals do",
    descriptor: "VALUABLE NATIONAL ASSET",
    supportingText: "Pension ends contracts, not competencies. The ID expires, the insight doesn’t. CREX is keeping Ghana’s smartest experts on duty",
    cta: "Join the CREX Network →"
  },
  {
    id: 8,
    label: "Service",
    image: "/img-3.jpg",
    headline: "Redefining retirement – the golden years of service",
    descriptor: "ACTIVE RETIREMENT",
    supportingText: "At CREX, we are retired, not expired. We are retired, not tired. Our stories, experiences and expertise still save careers, organisations, companies and lives",
    cta: "Join the CREX Network →"
  }
]

const experts = [
  {
    id: 1,
    name: "Prof. Albert Martins",
    role: "Chair, Board of Trustees",
    expertise: "Marketing, Business Strategy & Consultancy",
    years: "25+ years experience",
    quote: "“Experience becomes most valuable when it is shared.”",
    tags: ["Marketing", "Strategy", "Education"]
  },
  {
    id: 2,
    name: "Henry Michael Wood (Esq)",
    role: "Secretary, Board of Trustees",
    expertise: "Legal Counsel & Partnership Oversight",
    years: "20+ years experience",
    quote: "“Strong partnerships build stronger institutions.”",
    tags: ["Law", "Advocacy", "Partnerships"]
  },
  {
    id: 3,
    name: "Dr. Christian Boamah-Mensah",
    role: "Trustee",
    expertise: "Obstetrics & Gynaecology, Clinical Leadership & Administration",
    years: "30+ years experience",
    quote: "“Quality healthcare and mentorship are the cornerstones of national development.”",
    tags: ["Healthcare", "Administration", "Mentorship"]
  },
  {
    id: 4,
    name: "Dr. Mrs. Benedicta Quao",
    role: "Trustee",
    expertise: "Economics, Research & Management Consultancy",
    years: "25+ years experience",
    quote: "“Retirement should not mean the end of contribution.”",
    tags: ["Economics", "Research", "Training"]
  },
  {
    id: 5,
    name: "Dr. Sampson Narteh-Yoe",
    role: "Trustee",
    expertise: "Corporate Finance & Treasury Management",
    years: "25+ years experience",
    quote: "“Practical wisdom is the bridge to sustainable progress.”",
    tags: ["Finance", "Banking", "Economics"]
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
    description: "Systematically identifying, profiling, and maintaining a dynamic database of retired professionals across sectors.",
    tag: "Retired Experts Network",
    image: "/img-4.jpg"
  },
  {
    id: 2,
    title: "Capacity Re-engagement & Continuous Development",
    description: "Providing orientation, upskilling, and retooling to align retirees’ expertise with current market and societal needs.",
    tag: "Training & Development",
    image: "/img-5.jpg"
  },
  {
    id: 3,
    title: "Deployment & Consultancy Services",
    description: "Matching retirees to opportunities in public, private, and non-profit sectors for training, research, advisory, consultancy, mentorship, board appointment and project-based roles.",
    tag: "Consultancy & Advisory",
    image: "/img-6.jpg"
  },
  {
    id: 4,
    title: "Advocacy & Policy Influence",
    description: "Promoting policies that recognise and integrate retirees as a vital component of national human capital.",
    tag: "Policy & Advocacy",
    image: "/img-1.jpg"
  },
  {
    id: 5,
    title: "Research, Knowledge Management & Thought Leadership",
    description: "Researching, disseminating, and publishing insights drawn from retirees’ experiences to inform development practice.",
    tag: "Research & Publications",
    image: "/img-2.jpg"
  }
];

const projectsData = {
  current: [
    {
      title: "Partnership Development",
      description: "Developing collaborative partnerships with strategic businesses and organisations."
    },
    {
      title: "CREX Mini Launch Project",
      description: "Establishing the core launch framework and introductory events."
    }
  ],
  upcoming: [
    {
      title: "Exploratory Research Study",
      description: "Is there real demand for retiree Services in Ghana?"
    },
    {
      title: "Retiree Retooling Training",
      description: "A Workshop on Digital Literacy & Artificial Intelligence."
    }
  ],
  completed: [
    {
      title: "Baseline Study",
      description: "Productive Ageing in Ghana: A Survey of Pensioners’ Engagement in Post-Retirement Work in Ghana."
    }
  ]
};

const partnershipsData = [
  {
    name: "Youth Bridge Foundation (YBF)",
    desc: "The Youth Bridge Foundation (YBF) is an independent non-profit organisation committed to bridging gaps for positive youth development across the continent of Africa and the Diaspora. YBF achieves this purpose and mandate through cutting-edge and evidence-based youth research, sustained advocacy, training and mentorship."
  }
];


const newsEventsData = {
  news: [
    {
      title: "CREX holds a one-day management workshop at Spintex Road",
      date: "June 2026",
      tag: "News"
    }
  ],
  upcoming: [
    {
      title: "CREX to commission website on 22nd June 2026",
      tag: "Event"
    },
    {
      title: "CREX to sign MOU with Youth Bridge Foundation soon",
      tag: "MOU"
    },
    {
      title: "CREX to sign up as a columnist with Graphic Communications",
      tag: "Media"
    },
    {
      title: "CREX to hold Research Dissemination/Mini Launch on 20th August 2026",
      tag: "Launch"
    }
  ],
  recent: [
    {
      title: "CREX Board pays a courtesy call on Registrar of the Chartered Institute of Marketing (CIMG)",
      tag: "Visit"
    },
    {
      title: "CREX Board pays working visit to Centre for Ageing Studies, Univ of Ghana.",
      tag: "Visit"
    },
    {
      title: "CREX receives draft commissioned report from Dr. Adams",
      tag: "Report"
    }
  ]
};

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
  },
  {
    id: 6,
    category: "PUBLICATIONS",
    title: "HIRING RETIREE EXPERTS - AN INVESTMENT WORTH MAKING",
    excerpt: "Hiring retired individuals proves to be an investment worth making. Retired professionals have a lot to offer to organisations as they bring a wealth of knowledge, experience, maturity, expertise, etc.",
    content: `
      <p><em>By Dr. Benedicta Quao, Centre for Retired Experts (CREX)</em></p>
      <h2>Introduction</h2>
      <p>Though the current corporate landscape has changed with the introduction of technology and innovation, organisations are constantly looking for cost-effective professionals who deliver the greatest value. In this regard, hiring retired individuals proves to be an investment worth making. Retired professionals have a lot to offer to organisations as they bring a wealth of knowledge, experience, maturity, expertise, etc. to the corporate or organisational table. The following discussion justifies why forward-looking organisations should pursue experienced retired professionals.</p>
      <h2>Experience and Expert Advice</h2>
      <p>With decades of professional expertise, retired workers are a treasure of industry knowledge and experience. Their past roles have equipped them with insights into overcoming challenges, streamlining operations, and fostering innovation. This wealth of experience reduces the learning curve for companies, allowing them to quickly integrate retirees into crucial roles without extensive training. Retired professionals carry massive experience in their profile and can increasingly leverage on their experience to provide corporate value as mentors, consultants and advisors to the organisation. Years of professional experience equip retirees with a well-rounded approach to tackling challenges. Their ability to assess situations from various angles leads to creative and effective problem-solving. Retirees also provide a counterbalance to younger employees’ often faster-paced decision-making styles. Their measured approach ensures that risks are carefully evaluated, contributing to more sustainable outcomes.</p>
      <h2>Value for Money</h2>
      <p>Retired professionals have experienced complicated situations in both life and professional domains and thus do not easily go wrong in implementing decisions that involve risks. By using the intuition and judgment of retired experts, organisations can attract better associations, profits, and sales revenue as well as make an impact on society. Retired workers have built their reputations on reliability and commitment. After years of cultivating strong work ethics, they consistently deliver high-quality results. Their focus on completing tasks efficiently ensures fewer errors and improved productivity. Companies hiring retirees often notice a decline in absenteeism and an increase in overall dependability.</p>
      <h2>Mentorship</h2>
      <p>Retired experts are natural mentors, offering younger employees guidance that fosters growth and confidence. Their ability to impart practical knowledge and professional wisdom creates a collaborative environment where learning thrives. By sharing tips, strategies, and insights, retirees bridge generational gaps and enrich workplace relationships. Employees junior to such retired professionals can share their problems pertaining to both personal and professional concerns and receive beneficial advice from such experts. Mentorship not only boosts employee morale but also enhances retention rates. Younger staff members feel supported and empowered when paired with experienced colleagues, and can certainly look up to these seasoned veterans due to the high standards they set.</p>
      <h2>Professionalism and Strong Work Ethic</h2>
      <p>Most pensioners who are looking for post-retirement employment are proactive in handling complex tasks as employees of an organisation. Having spent years building their careers, retirees bring a strong sense of integrity and professionalism to the workplace. Their presence fosters a culture of respect, accountability, and collaboration. Teams benefit from retirees’ example, which often inspires younger employees to adopt similar values. Moreover, retired professionals have developed a strong work ethic due to actively working for several years.</p>
      <h2>Cost-effectiveness</h2>
      <p>Business organisations do not need to spend additional time and money training retired working professionals. Therefore, retirees’ ability to contribute to the firm is much quicker and cheaper. Retirees can be hired as part-time employees at part-time salaries with flexible working hours, which optimises staffing costs. Indeed retiree recruitment is an added advantage for start-ups and small-scale organisations with limited company employees and smaller office spaces. By providing retired professionals to work remotely and in hybrid formats in part-time commitments, organisations can save on infrastructural costs. Additionally, retirees’ availability for short-term assignments ensures critical tasks are completed without the long-term financial burden of additional full-time hires.</p>
      <h2>Innovation and Networking</h2>
      <p>Most retired professionals possess deep creativity and divergent thinking, and also exhibit deep understanding of certain issues as opposed to their younger counterparts. This creative prowess can help develop unique projects and working methods in organizations, which in turn might transform their overall working environment for the better. With decades of professional connections, retirees often come with an extensive network of industry contacts. These relationships can open doors to new business opportunities, partnerships, or collaborations. By employing retired professionals, organisations gain access to resources and insights that might otherwise be out of reach. Retirees also use their networks to stay informed about industry trends.</p>
      <h2>Conclusion</h2>
      <p>The Centre for Retired Experts (CREX) recommends that Business organisations should consider recruiting retired professionals based on the foregoing benefits. CREX suggests however, that organisations should balance that with the recruitment of young talent. This hybrid approach can enhance cost-effectiveness and foster a balanced workforce that combines deep experience, institutional knowledge, and mentorship with fresh perspectives, digital fluency, and innovation. This synergy strengthens organisational resilience, knowledge transfer, and adaptability in fast-changing markets.</p>
      <p><em>The writer is a Senior Research Fellow/Senior Lecturer at the University of Professional Studies, Accra (UPSA) and a volunteer at the Centre for Retired Experts (CREX). CREX has been established to unlock and harness the wealth of knowledge, skills, and experience of retired Ghanaian professionals by reconnecting them to meaningful opportunities that drive sustainable development, mentorship, and institutional strengthening in Ghana.</em></p>
    `
  },
  {
    id: 7,
    category: "PUBLICATIONS",
    title: "LET'S STOP WASTING OUR RETIRED EXPERTS",
    excerpt: "Ghana's rigid retirement laws force capable professionals out of service prematurely, leading to the underutilization of their vast expertise.",
    content: `
      <p><em>By Prof. Albert Martins, Centre for Retired Experts (CREX)</em></p>
      <h2>Introduction</h2>
      <p>Every year, thousands of seasoned experts retire from the public and private sectors of Ghana’s economy. Many of these retirees would have spent about three to four decades building institutions, managing complex projects, mentoring younger professionals, solving real problems, navigating institutional complexities, managing people, and learning from both successes and failures. Retirees, therefore, possess valuable expertise or professional experience which cannot be easily imported or manufactured.</p>
      <p>Unfortunately, Ghana’s institutional systems rarely provide structured avenues for retaining or utilising this vast expertise after retirement. Once retirement arrives (usually at age 60), society and industry largely ignore them, as if their expertise has suddenly expired. It is regrettable that whilst retiree experience is a silent but valuable national asset, retired professionals represent one of Ghana’s most underutilised national resources. At a time when Ghana is facing significant development challenges from productivity gaps in public institutions to the need for stronger entrepreneurship and innovation, we cannot afford to waste the vast reservoir of knowledge and experience embodied in our retired professionals.</p>
      <h2>Sad reality</h2>
      <p>Across the world, nations are increasingly recognising that retired resources are a silent national asset. In Ghana, however, retirement often marks the end of formal employment. Ironically, it also marks the end of national engagement with some of our most experienced and knowledgeable professionals. Many highly experienced professionals retire at the peak of their intellectual and professional capacity, only to find themselves largely disconnected from national productivity. Though retired, many retirees remain intellectually active, professionally relevant, and physically capable of contributing meaningfully to society for another 15 to 20 years after retirement. Their accumulated wisdom represents a national treasure that cannot be easily replaced.</p>
      <p>However, once these professionals turn 60, they abruptly move from high responsibility to limited engagement. Ghana’s rigid retirement laws force capable professionals out of service prematurely, leading to the underutilization of their vast expertise. This represents not only a personal loss for retirees but also a significant national waste of knowledge, skills, and institutional memory.</p>
      <h2>Experience in the drain</h2>
      <p>Non-utilisation of retiree experts is a huge cost to Ghana and a reduction in national productivity. Highly capable professionals who still have 15–20 productive years ahead of them after retirement are often left underutilised. In a country like Ghana facing skills shortages, such a situation should be considered economically irresponsible. When experienced professionals exit the workforce without mechanisms for continued engagement, organisations lose valuable historical knowledge about policies, processes, and lessons from past successes and failures. Lessons learned over decades can disappear overnight, which could be a big loss to any economy.</p>
      <p>Ghana lacks a structured mentorship programme for its young professionals. The country’s failure to leverage the rich expertise of retired professionals results in weak mentorship for young professionals which negatively affects entrepreneurship and business development. Ghana has a vibrant and youthful population with great entrepreneurial potential, yet many startups fail due to a lack of guidance, strategic planning, and managerial experience. Young professionals entering leadership roles may struggle without mentorship. Retired experts can provide critical mentorship and invaluable guidance to startups, students, young engineers, entrepreneurs, teachers, public administrators, trainee managers, etc. Another reality is that the underutilization of retired resources in Ghana results in brain drain. Of course, retirees also know how to go out there to seek greener pastures.</p>
      <p>The social cost of wasting retiree expertise cannot be discounted. Retirement can bring psychological and medical challenges to many professionals who suddenly move from highly active roles to limited engagement. Many retirees experience a loss of identity, reduced social engagement, and financial stress despite having much to offer society. A society that sidelines its experienced citizens risks losing not only productivity but also valuable wisdom, social stability and intergenerational continuity. Moreover, there is no structured platform for retirees to continue contributing to national productivity after retirement. Ghana currently lacks a clear policy on retiree engagement and relevant institutions to leverage on retirees’ expertise.</p>
      <h2>Country Practices</h2>
      <p>Many countries have recognised the value of retired professionals to national development. Countries such as Japan, Germany, and Singapore actively promote “active ageing” policies, encouraging retirees to participate in consulting, mentoring, and flexible employment. Japan encourages retirees to remain active in volunteerism, part-time work, mentoring, and consulting. In Singapore, retired professionals are often re-hired under flexible arrangements to support knowledge transfer. In Germany, companies frequently maintain senior expert programs, where retired engineers and specialists provide consultancy on critical projects. Considering the foregoing, Ghana can no longer afford to neglect one of its most valuable resources: retired, experienced professionals.</p>
      <h2>Conclusion</h2>
      <p>Ghana is striving to build a resilient and competitive economy, which requires not only youthful energy but also experienced guidance. Harnessing retired expertise in Ghana could strengthen institutions, support entrepreneurship, improve governance, and accelerate development. Retirement should never mean redundancy, and Ghana must sustain its human expertise. The time has come for a national conversation which ensures that the knowledge and wisdom of Ghana’s retired professionals remain a vital part of the country’s development journey. Thankfully, in a recent study in January 2026, the Centre for Retired Experts (CREX) affirmed that given the opportunity, retirees in Ghana are available, able and willing to continue working after retiring at age 60.</p>
      <p><em>By Prof. Albert Martins<br>Centre for Retired Experts (CREX)<br>P.0. Box CT 22, Cantonments, Accra<br>Tel: 0266195525 / 0549249040<br>crexghana@gmail.com</em></p>
    `
  },
  {
    id: 8,
    category: "PUBLICATIONS",
    title: "How Retired Doctors, Nurses, Midwives and Medical Professionals Can Be Mobilised to Support Ghana’s Health Delivery System",
    excerpt: "Mobilising retired doctors, nurses, midwives and medical professionals is not merely a matter of honouring their experience; it is a practical, affordable and achievable strategy for strengthening healthcare delivery.",
    content: `
      <p><em>By Dr. Christian Boamah-Mensah, Centre for Retired Experts (CREX)</em></p>
      <h2>Introduction</h2>
      <p>Ghana’s healthcare system has made remarkable progress over the years, yet it continues to face persistent challenges relating to workforce shortages, unequal distribution of health personnel, and the migration of skilled professionals to developed countries. While discussions often focus on training more doctors, nurses and midwives, one valuable resource remains largely underutilized: retired medical professionals.</p>
      <p>Across the country are thousands of retired doctors, nurses, midwives, pharmacists, laboratory scientists and allied health professionals who possess decades of knowledge, experience and practical wisdom. Many remain physically active, mentally alert and deeply committed to serving society. The question is not whether Ghana has sufficient expertise to improve healthcare delivery, but whether we are willing to harness the expertise that already exists.</p>
      
      <h2>Workforce Challenges & Strategic Reserves</h2>
      <p>The need is evident. Research on Ghana’s health workforce has consistently shown shortages and inequitable distribution of health personnel, particularly in rural and underserved communities. Although the density of physicians, nurses and midwives increased significantly between 2005 and 2017, workforce gaps continue to affect service delivery in many parts of the country. Studies by health workforce experts and the Ghana Health Service have highlighted the continuing challenge of staffing health facilities adequately and equitably.</p>
      <p>Retired medical professionals represent a strategic reserve that can help bridge some of these gaps without the substantial cost of recruiting and training entirely new personnel. Their contribution, however, should not be viewed as a replacement for younger professionals but as a complementary resource that strengthens the entire health system. These professionals have time and are highly motivated than the mid-career professionals who are constrained by job and family obligations.</p>
      
      <h2>Global Case Studies & Best Practices</h2>
      <p>Several countries have demonstrated the value of this approach. In the United States, the Medical Reserve Corps mobilizes retired and volunteer health professionals to support public health activities, emergencies and community outreach programmes. During the COVID-19 pandemic, retired doctors and nurses were re-engaged to support overwhelmed health systems. Similarly, the United Kingdom called upon retired National Health Service personnel to provide clinical and advisory support during periods of high demand. These experiences showed that retired professionals can serve effectively when supported by clear policies and appropriate structures. Other existing frameworks include the United Nations Volunteers program, Voluntary Services Oversees and the Peace Corps.</p>
      
      <h2>Proposed Framework: National Retired Health Corps</h2>
      <p>Ghana can adapt these lessons to its own context. The Ministry of Health and the Ghana Health Service could establish a National Retired Health Professionals Corps. Membership would be voluntary and open to retired practitioners who are medically fit and willing to contribute. A national database could be created to capture their specialties, experience, geographical location and availability.</p>
      <p>Rather than requiring retirees to work full-time, flexible engagement models should be adopted. Some could provide part-time clinical services in district hospitals and polyclinics. Others could support maternal and child health programmes, mentor newly qualified nurses and doctors, supervise community health workers, or participate in public health education campaigns. Experienced retired midwives, for example, could play a crucial role in mentoring younger colleagues in regions where maternal healthcare remains under pressure.</p>
      
      <h2>Leveraging Telemedicine & Digital Solutions</h2>
      <p>Technology also creates new possibilities. Retired specialists residing in Accra, Kumasi, Takoradi or even abroad could provide telemedicine consultations and professional guidance to health facilities in remote districts. Such an approach would extend specialist expertise to underserved communities at relatively low cost.</p>
      
      <h2>Enhancing Medical Education & Adjunct Teaching</h2>
      <p>Medical education is another area where retirees can make a significant contribution. Many nursing and medical schools face shortages of experienced instructors. Retired professionals could serve as adjunct lecturers, clinical supervisors and mentors, helping to shape the next generation of healthcare workers. Their practical experience often complements the academic knowledge offered in formal training institutions.</p>
      
      <h2>Policy Requirements & Licensing Frameworks</h2>
      <p>For this initiative to succeed, policymakers must address concerns regarding licensing, professional indemnity, remuneration and working conditions. Retired professionals who volunteer should receive transportation allowances, modest stipends where appropriate, and access to continuous professional development opportunities. Most importantly, they should be treated with dignity and recognized as valuable national assets rather than as individuals whose usefulness ended at retirement.</p>
      
      <h2>Collaboration & Implementation Pathways</h2>
      <p>The Centre for Retired Experts (CREX) and similar organisations could become important partners in identifying, recruiting and coordinating retired health professionals. Collaboration among the Ministry of Health, professional associations, teaching hospitals and development partners would further strengthen implementation.</p>
      <p>Ghana is blessed with a generation of retired healthcare professionals who helped build the nation’s health system. Their retirement should not signify the end of their contribution to national development. Instead, it should mark a transition from full-time practice to strategic service, mentorship and knowledge transfer.</p>
      
      <h2>Conclusion</h2>
      <p>At a time when healthcare systems around the world are searching for innovative ways to improve service delivery, Ghana has an opportunity to tap into a resource that already exists. Mobilising retired doctors, nurses, midwives and medical professionals is not merely a matter of honouring their experience; it is a practical, affordable and achievable strategy for strengthening healthcare delivery and improving health outcomes for all Ghanaians, if they could be deployed thoughtfully and respectfully.</p>
      <p><em>Sources: Asamani et al. (2021), Human Resources for Health; Asamani et al. (2020), Human Resources for Health; World Health Organization (WHO) Human Resources for Health reports on Ghana.</em></p>
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

/* ── URL-path → page name mapping ─────────────────────── */
const pathToPage = (path) => {
  if (path === '/admin' || path === '/dashboard') return 'admin'
  if (path === '/register') return 'register'
  if (path === '/about')    return 'about'
  if (path === '/contact')  return 'contact'
  if (path === '/partnerships') return 'partnerships'
  if (path === '/leadership') return 'leadership'
  if (path === '/publications') return 'publications'
  return 'home'
}

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeReason, setActiveReason] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [selectedPubId, setSelectedPubId] = useState(null)
  const numbersRef = useRef(null)
  const SLIDE_DURATION = 8000
  const [adminClickCount, setAdminClickCount] = useState(0)

  // ── URL-driven page state ──────────────────────────────
  const [currentPage, setCurrentPageState] = useState(
    () => pathToPage(window.location.pathname)
  )

  const setCurrentPage = (page) => {
    if (page === 'register') {
      window.open('https://ee-eu.kobotoolbox.org/x/8yk7EJOi', '_blank', 'noopener,noreferrer')
      return
    }
    const pathMap = {
      home:         '/',
      about:        '/about',
      register:     '/register',
      contact:      '/contact',
      partnerships: '/partnerships',
      leadership:   '/leadership',
      admin:        '/admin',
      publications: '/publications',
    }
    const newPath = pathMap[page] || '/'
    if (window.location.pathname !== newPath) {
      window.history.pushState({ page }, '', newPath)
    }
    setCurrentPageState(page)
  }

  // Handle browser back/forward buttons
  useEffect(() => {
    const onPop = () => setCurrentPageState(pathToPage(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigateToSection = (sectionSelector) => {
    setCurrentPage('home')
    setIsMenuOpen(false)
    setTimeout(() => {
      const element = document.querySelector(sectionSelector)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  const handleOpenPublication = (post) => {
    setSelectedPubId(post.id)
    setCurrentPage('publications')
    window.scrollTo(0, 0)
  }

  const getInitials = (name) => {
    const cleanName = name.replace(/^(Prof\.|Dr\.|Mrs\.|Ing\.|Mr\.)\s+/i, '')
    return cleanName.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
  }

  // Scroll to top on mount (only for non-root paths), or redirect if accessing /register directly
  useEffect(() => {
    if (window.location.pathname === '/register') {
      window.location.replace('https://ee-eu.kobotoolbox.org/x/8yk7EJOi')
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

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
          <a href="#" className={`mobile-nav-link ${currentPage === 'about' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentPage('about'); setIsMenuOpen(false); window.scrollTo(0, 0); }}>About CREX</a>
          <a href="#" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); navigateToSection('.how-it-works-section'); }}>How It Works</a>
          <a href="#" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); navigateToSection('.why-choose-section'); }}>Opportunities</a>
          <a href="#" className={`mobile-nav-link ${currentPage === 'leadership' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentPage('leadership'); setIsMenuOpen(false); window.scrollTo(0, 0); }}>Leadership</a>
          <a href="#" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); navigateToSection('.projects-partnerships-section'); }}>Projects</a>
          <a href="#" className={`mobile-nav-link ${currentPage === 'partnerships' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentPage('partnerships'); setIsMenuOpen(false); window.scrollTo(0, 0); }}>Partnerships</a>
          <a href="#" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); navigateToSection('.news-events-section'); }}>News & Events</a>
          <a href="#" className={`mobile-nav-link ${currentPage === 'contact' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); setIsMenuOpen(false); window.scrollTo(0, 0); }}>Contact</a>
          <button className="btn btn-primary" style={{ marginTop: '30px', width: '100%' }} onClick={() => { setCurrentPage('register'); setIsMenuOpen(false); window.scrollTo(0, 0); }}>Join CREX</button>
        </div>
      </div>

      {/* Navbar */}
      <header className="navbar">
        <div className="container navbar-container">
          <div className="logo-section" onClick={() => { setCurrentPage('home'); window.scrollTo(0, 0); }} style={{ cursor: 'pointer' }}>
            <div className="brand-box">CREX</div>
          </div>
          
          <nav className="nav-links">
            <a href="#" className={`nav-link ${currentPage === 'about' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentPage('about'); window.scrollTo(0, 0); }}>About CREX</a>
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); navigateToSection('.how-it-works-section'); }}>How It Works</a>
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); navigateToSection('.why-choose-section'); }}>Opportunities</a>
            <a href="#" className={`nav-link ${currentPage === 'leadership' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentPage('leadership'); window.scrollTo(0, 0); }}>Leadership</a>
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); navigateToSection('.projects-partnerships-section'); }}>Projects</a>
            <a href="#" className={`nav-link ${currentPage === 'partnerships' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentPage('partnerships'); window.scrollTo(0, 0); }}>Partnerships</a>
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); navigateToSection('.news-events-section'); }}>News & Events</a>
            <a href="#" className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); window.scrollTo(0, 0); }}>Contact</a>
          </nav>
          
          <div className="header-actions">
            <button className="btn btn-primary desktop-btn" onClick={() => { setCurrentPage('register'); window.scrollTo(0, 0); }}>Join CREX</button>
            <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(true)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {currentPage === 'home' ? (
        <>
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
            <button 
              className="btn btn-primary cta-arrow" 
              key={`btn-${currentSlide}`}
              onClick={() => { setCurrentPage('register'); window.scrollTo(0, 0); }}
            >
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

      {/* Partner Logo Scroll Bar */}
      <section className="partner-logo-scroll">
        <div className="partner-logo-track">
          {/* Original Set */}
          <img src="/YBF.png" alt="YBF" className="partner-logo-item" />
          <img src="/YBF.png" alt="YBF" className="partner-logo-item" />
          <img src="/YBF.png" alt="YBF" className="partner-logo-item" />
          <img src="/YBF.png" alt="YBF" className="partner-logo-item" />
          
          {/* Duplicated Set for Seamless Infinite Scroll */}
          <img src="/YBF.png" alt="YBF" className="partner-logo-item" />
          <img src="/YBF.png" alt="YBF" className="partner-logo-item" />
          <img src="/YBF.png" alt="YBF" className="partner-logo-item" />
          <img src="/YBF.png" alt="YBF" className="partner-logo-item" />
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

      {/* How It Works Section */}
      <section className="how-it-works-section section-padding white-bg" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', backgroundColor: 'var(--warm-ivory)' }}>
        <div className="container">
          <div className="section-header-centered" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="cta-small-label" style={{ color: 'var(--gold)', letterSpacing: '0.15em' }}>REGISTRATION STEPS</span>
            <h2 className="section-title" style={{ marginTop: '10px' }}>How It Works</h2>
            <p className="section-desc" style={{ margin: '20px auto 0', maxWidth: '800px' }}>
              Follow these simple steps to join our network and connect your vintage expertise with purposeful opportunities.
            </p>
          </div>

          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            <div className="step-card" style={{ background: 'var(--white)', padding: '40px 30px', borderRadius: '16px', textAlign: 'center', position: 'relative', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <div className="step-number" style={{ width: '50px', height: '50px', background: 'var(--deep-wine)', color: 'var(--white)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontWeight: 'bold', fontSize: '1.2rem' }}>1</div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--deep-wine)', marginBottom: '15px' }}>Register as a Retired Expert</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--charcoal)', lineHeight: '1.6' }}>Fill out our comprehensive registration form to profile your background, skills, and areas of interest.</p>
              <button className="btn btn-primary" style={{ marginTop: '20px', fontSize: '0.8rem', padding: '8px 16px' }} onClick={() => { setCurrentPage('register'); window.scrollTo(0, 0); }}>Start Registration</button>
            </div>
            
            <div className="step-card" style={{ background: 'var(--white)', padding: '40px 30px', borderRadius: '16px', textAlign: 'center', position: 'relative', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <div className="step-number" style={{ width: '50px', height: '50px', background: 'var(--deep-wine)', color: 'var(--white)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontWeight: 'bold', fontSize: '1.2rem' }}>2</div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--deep-wine)', marginBottom: '15px' }}>View Terms and Conditions</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--charcoal)', lineHeight: '1.6' }}>Review our membership guidelines and terms of deployment to understand how we protect and value your contributions.</p>
              <button className="btn btn-secondary" style={{ marginTop: '20px', fontSize: '0.8rem', padding: '8px 16px' }} onClick={() => { setCurrentPage('register'); window.scrollTo(0, 0); }}>View Terms</button>
            </div>

            <div className="step-card" style={{ background: 'var(--white)', padding: '40px 30px', borderRadius: '16px', textAlign: 'center', position: 'relative', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <div className="step-number" style={{ width: '50px', height: '50px', background: 'var(--deep-wine)', color: 'var(--white)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontWeight: 'bold', fontSize: '1.2rem' }}>3</div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--deep-wine)', marginBottom: '15px' }}>View and Apply for a Job</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--charcoal)', lineHeight: '1.6' }}>Browse matching short-term advisory and consultancy roles, or let us match your profile directly to strategic requests.</p>
              <button className="btn btn-secondary" style={{ marginTop: '20px', fontSize: '0.8rem', padding: '8px 16px' }} onClick={() => navigateToSection('.projects-partnerships-section')}>View Opportunities</button>
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
                    onClick={(e) => {
                      setActiveReason(index);
                      const container = e.currentTarget.parentElement;
                      if (container) {
                        const left = e.currentTarget.offsetLeft - (container.clientWidth / 2) + (e.currentTarget.clientWidth / 2);
                        container.scrollTo({ left, behavior: 'smooth' });
                      }
                    }}
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

      {/* Projects & Partnerships Section */}
      <section className="projects-partnerships-section section-padding light-bg">
        <div className="container">
          <div className="section-header-centered" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="cta-small-label" style={{ color: 'var(--gold)', letterSpacing: '0.15em' }}>ACTIVITIES & PROJECTS</span>
            <h2 className="section-title" style={{ marginTop: '10px' }}>Our Projects</h2>
            <p className="section-desc" style={{ margin: '20px auto 0', maxWidth: '800px' }}>
              CREX initiates research, capacity building, and collaborative development projects with reputable institutions to leverage retiree expertise for maximum impact.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {/* Projects Column - Full Width */}
            <div className="projects-column">
              <div className="project-group" style={{ marginBottom: '40px' }}>
                <h4 className="project-group-title" style={{ color: 'var(--gold)', fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '0.05em' }}>Current Projects</h4>
                <div className="project-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
                  {projectsData.current.map((proj, idx) => (
                    <div className="project-card-item" key={idx} style={{ background: 'var(--white)', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                      <span className="project-status-badge current" style={{ display: 'inline-block', background: 'rgba(90, 16, 38, 0.1)', color: 'var(--deep-wine)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '12px' }}>Current</span>
                      <h5 style={{ fontSize: '1.3rem', color: 'var(--deep-wine)', marginBottom: '8px' }}>{proj.title}</h5>
                      <p style={{ fontSize: '0.95rem', color: 'var(--charcoal)', lineHeight: '1.5' }}>{proj.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="project-group" style={{ marginBottom: '40px' }}>
                <h4 className="project-group-title" style={{ color: 'var(--gold)', fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '0.05em' }}>Upcoming Projects</h4>
                <div className="project-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
                  {projectsData.upcoming.map((proj, idx) => (
                    <div className="project-card-item" key={idx} style={{ background: 'var(--white)', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                      <span className="project-status-badge upcoming" style={{ display: 'inline-block', background: 'rgba(201, 162, 39, 0.1)', color: '#a0801a', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '12px' }}>Upcoming</span>
                      <h5 style={{ fontSize: '1.3rem', color: 'var(--deep-wine)', marginBottom: '8px' }}>{proj.title}</h5>
                      <p style={{ fontSize: '0.95rem', color: 'var(--charcoal)', lineHeight: '1.5' }}>{proj.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="project-group">
                <h4 className="project-group-title" style={{ color: 'var(--gold)', fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '0.05em' }}>Completed Projects</h4>
                <div className="project-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
                  {projectsData.completed.map((proj, idx) => (
                    <div className="project-card-item" key={idx} style={{ background: 'var(--white)', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                      <span className="project-status-badge completed" style={{ display: 'inline-block', background: 'rgba(0,0,0,0.05)', color: '#666', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '12px' }}>Completed</span>
                      <h5 style={{ fontSize: '1.3rem', color: 'var(--deep-wine)', marginBottom: '8px' }}>{proj.title}</h5>
                      <p style={{ fontSize: '0.95rem', color: 'var(--charcoal)', lineHeight: '1.5' }}>{proj.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Leadership Team */}
      <section className="experts-section section-padding">
        <div className="container">
          <div className="experts-header" style={{ marginBottom: '80px' }}>
            <h2 className="section-title white">Meet the Leadership Team</h2>
            <p className="section-desc white-p">
              CREX brings together retired professionals, former executives, educators, researchers, engineers, public servants, and development experts whose decades of experience continue to create impact across Africa.
            </p>
            <button className="btn btn-primary" onClick={() => { setCurrentPage('leadership'); window.scrollTo(0, 0); }}>Meet the Team</button>
          </div>
          
          <div className="experts-slider-container">
            <div className="experts-slider">
              {experts.map((expert) => (
                <div key={expert.id} className="expert-card" onClick={() => { setCurrentPage('leadership'); window.scrollTo(0, 0); }} style={{ cursor: 'pointer' }}>
                  <div className="expert-photo-container">
                    <div className="expert-photo-placeholder">
                      <div className="expert-logo-box">CREX</div>
                    </div>
                    <div className="expert-hover-overlay">
                      <blockquote className="expert-hover-quote">{expert.quote}</blockquote>
                    </div>
                  </div>
                  <div className="expert-info">
                    <div className="expert-top">
                      <div className="expert-avatar">{getInitials(expert.name)}</div>
                      <div>
                        <h4 className="expert-name">{expert.name}</h4>
                      </div>
                    </div>
                    <p className="expert-role">{expert.role}</p>
                    <p className="expert-description">{expert.expertise}</p>
                    {expert.years && <p className="expert-experience">{expert.years}</p>}
                    <div className="expert-tags">
                      {expert.tags.map((tag, idx) => (
                        <span key={idx} className="expert-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="slider-instructions desktop-only">Scroll to explore →</div>
            <button className="btn btn-secondary view-experts-mobile" onClick={() => { setCurrentPage('leadership'); window.scrollTo(0, 0); }}>View Full Team</button>
          </div>
        </div>
      </section>
      {/* Research, Insights & Thought Leadership Section */}
      <section className="insights-section section-padding" id="insights" style={{ paddingBottom: '20px' }}>
        <div className="container">
          <div className="insights-header">
            <div className="insights-header-text">
              <span className="cta-small-label" style={{ color: 'var(--gold)', letterSpacing: '0.15em' }}>RESEARCH & PUBLICATIONS</span>
              <h2 className="section-title" style={{ marginTop: '10px' }}>Insights & Publications</h2>
              <p className="section-desc">
                CREX is committed to documenting professional insights, promoting thought leadership, and disseminating research drawn from retirees’ experiences to inform development practice.
              </p>
            </div>
          </div>

          <div className="insights-layout" style={{ display: 'block' }}>
            <div className="insights-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              {insights.slice(-3).reverse().map((post) => (
                <div key={post.id} className="insight-card">
                  <div>
                    <span className="insight-category">{post.category}</span>
                  </div>
                  <h3 className="insight-title" style={{ cursor: 'pointer' }} onClick={() => handleOpenPublication(post)}>
                    {post.title}
                  </h3>
                  <p className="insight-excerpt">{post.excerpt}</p>
                  <button className="btn btn-secondary" style={{ width: 'fit-content', padding: '8px 16px', fontSize: '0.8rem' }} onClick={() => handleOpenPublication(post)}>
                    Read Full Article
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News & Events Section */}
      <section className="news-events-section section-padding" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div className="section-header-centered" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="section-title">News & Events</h2>
            <p className="section-desc" style={{ margin: '20px auto 0', maxWidth: '800px' }}>
              Stay updated with the latest news, upcoming engagements, and recent activities of the Centre for Retired Experts.
            </p>
          </div>

          <div className="news-events-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '40px' }}>
            {/* News Column */}
            <div className="news-column">
              <h3 className="news-column-header" style={{ color: 'var(--deep-wine)', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px', fontSize: '1.6rem' }}>Latest News</h3>
              {newsEventsData.news.map((item, idx) => (
                <div className="news-item-card" key={idx} style={{ background: 'var(--warm-ivory)', padding: '30px', borderRadius: '16px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 'bold', textTransform: 'uppercase' }}>{item.tag} • {item.date}</span>
                  <h4 style={{ fontSize: '1.4rem', color: 'var(--deep-wine)', marginTop: '10px', marginBottom: '15px', lineHeight: '1.3' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.95rem', color: '#555', marginBottom: '20px' }}>
                    The Centre for Retired Experts held a strategic one-day management workshop to align on deployment frameworks, database scaling, and partnership expansions for 2026.
                  </p>
                  <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.8rem' }} onClick={() => navigateToSection('.final-cta-section')}>Read Full Release</button>
                </div>
              ))}
            </div>

            {/* Upcoming Events Column */}
            <div className="upcoming-events-column">
              <h3 className="news-column-header" style={{ color: 'var(--deep-wine)', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px', fontSize: '1.6rem' }}>Upcoming Events</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {newsEventsData.upcoming.map((event, idx) => (
                  <div className="event-list-item" key={idx} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                    <div style={{ background: 'var(--deep-wine)', color: 'var(--white)', padding: '10px', borderRadius: '8px', minWidth: '50px', textAlign: 'center', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                      {idx === 0 && "JUN"}
                      {idx === 1 && "JUL"}
                      {idx === 2 && "JUL"}
                      {idx === 3 && "AUG"}
                      <div style={{ fontSize: '1.1rem' }}>
                        {idx === 0 && "22"}
                        {idx === 1 && "08"}
                        {idx === 2 && "25"}
                        {idx === 3 && "20"}
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', background: 'rgba(201,162,39,0.15)', color: 'var(--gold)', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>{event.tag}</span>
                      <h4 style={{ fontSize: '1.05rem', color: 'var(--charcoal)', marginTop: '5px', fontWeight: '600' }}>{event.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Events Column */}
            <div className="recent-events-column">
              <h3 className="news-column-header" style={{ color: 'var(--deep-wine)', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px', fontSize: '1.6rem' }}>Recent Events</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {newsEventsData.recent.map((event, idx) => (
                  <div className="recent-event-card" key={idx} style={{ background: 'var(--white)', padding: '15px', borderRadius: '8px', borderLeft: '3px solid #ccc', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                    <span style={{ fontSize: '0.75rem', color: '#888', fontWeight: 'bold', textTransform: 'uppercase' }}>{event.tag}</span>
                    <h4 style={{ fontSize: '1rem', color: 'var(--charcoal)', marginTop: '5px', fontWeight: '500', lineHeight: '1.4' }}>{event.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section section-padding light-bg" style={{ textAlign: 'center' }}>
        <div className="container">
          <div className="section-header-centered" style={{ textAlign: 'center', marginBottom: '45px' }}>
            <span className="cta-small-label" style={{ color: 'var(--gold)', letterSpacing: '0.15em' }}>CREX IN PICTURES</span>
            <h2 className="section-title" style={{ marginTop: '10px' }}>CREX Photo Gallery</h2>
            <p className="section-desc" style={{ margin: '20px auto 0', maxWidth: '800px' }}>
              Highlights from our workshops, courtesy calls, research activities, and community engagements.
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => { setCurrentPage('about'); window.scrollTo(0, 0); }} style={{ margin: '0 auto' }}>View Gallery</button>
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
            <button className="btn btn-primary cta-btn-gold" onClick={() => { setCurrentPage('register'); window.scrollTo(0, 0); }}>Register as a Retired Expert</button>
            <button className="btn btn-secondary cta-btn-outline" onClick={() => { setCurrentPage('contact'); window.scrollTo(0, 0); }}>Partner With CREX</button>
          </div>
        </div>
      </section>

      {/* Rolling Ticker Section */}
      <section className="rolling-ticker-section" style={{ background: 'var(--deep-wine)', color: 'var(--white)', padding: '20px 0', overflow: 'hidden', position: 'relative' }}>
        <div className="ticker-wrap">
          <div className="ticker">
            <span className="ticker-item"><strong>Retired Experts -</strong> Your expertise still matters. Your last day at work shouldn’t be the last day Ghana benefits from your expertise. CREX connects your expertise to purposeful work.</span>
            <span className="ticker-item"><strong>Public Sector -</strong> Bridge capacity gaps with proven expertise from CREX- at low cost and high quality.</span>
            <span className="ticker-item"><strong>Private Sector -</strong> Invest in CREX for consultancy, mentorship and advisory services that deliver measurable returns.</span>
            <span className="ticker-item"><strong>Donors & Foundations –</strong> Support CREX to offer a high-leverage model for scalable, sustainable development impact.</span>
            <span className="ticker-item"><strong>General Public –</strong> Retiree experience is a national resource. Support CREX to put it to work.</span>
            {/* Duplicate for seamless looping */}
            <span className="ticker-item"><strong>Retired Experts -</strong> Your expertise still matters. Your last day at work shouldn’t be the last day Ghana benefits from your expertise. CREX connects your expertise to purposeful work.</span>
            <span className="ticker-item"><strong>Public Sector -</strong> Bridge capacity gaps with proven expertise from CREX- at low cost and high quality.</span>
            <span className="ticker-item"><strong>Private Sector -</strong> Invest in CREX for consultancy, mentorship and advisory services that deliver measurable returns.</span>
            <span className="ticker-item"><strong>Donors & Foundations –</strong> Support CREX to offer a high-leverage model for scalable, sustainable development impact.</span>
            <span className="ticker-item"><strong>General Public –</strong> Retiree experience is a national resource. Support CREX to put it to work.</span>
          </div>
        </div>
      </section>
        </>
      ) : currentPage === 'about' ? (
        <AboutPage onNavigateToContact={() => { setCurrentPage('contact'); window.scrollTo(0, 0); }} />
      ) : currentPage === 'register' ? (
        <RegistrationForm onNavigateHome={() => { setCurrentPage('home'); window.scrollTo(0, 0); }} />
      ) : currentPage === 'admin' ? (
        <AdminPage />
      ) : currentPage === 'leadership' ? (
        <LeadershipPage />
      ) : currentPage === 'partnerships' ? (
        <PartnershipsPage onNavigateToContact={() => { setCurrentPage('contact'); window.scrollTo(0, 0); }} />
      ) : currentPage === 'publications' ? (
        <PublicationsPage insights={insights} selectedId={selectedPubId} onBack={() => { setCurrentPage('home'); setSelectedPubId(null); }} />
      ) : (
        <ContactPage />
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-logo">CREX</div>
              <p className="footer-tagline-mobile">Experience still has a role to play.</p>
              <p className="footer-description">
                The Centre for Retired Experts (CREX) connects retired professionals to opportunities in mentorship, consultancy, governance, training, research, and sustainable development.
              </p>
              <button className="btn btn-primary footer-cta-mobile" onClick={() => navigateToSection('.final-cta-section')}>Register as Retired Expert</button>
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
                <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('about'); window.scrollTo(0, 0); }}>About CREX</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateToSection('.how-it-works-section'); }}>How CREX Works</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateToSection('.why-choose-section'); }}>Opportunities</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('leadership'); window.scrollTo(0, 0); }}>Leadership</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateToSection('.projects-partnerships-section'); }}>Projects</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('partnerships'); window.scrollTo(0, 0); }}>Partnerships</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateToSection('.news-events-section'); }}>News & Events</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); window.scrollTo(0, 0); }}>Contact</a></li>
              </ul>
            </div>

            <div className="footer-col footer-col-desktop">
              <h4 className="footer-title">Programs & Activities</h4>
              <ul className="footer-links">
                <li><a href="#">Mentorship</a></li>
                <li><a href="#">Consultancy Services</a></li>
                <li><a href="#">Capacity Development</a></li>
                <li><a href="#">Advocacy & Policy</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('publications'); window.scrollTo(0, 0); }}>Research & Publications</a></li>
                <li><a href="#">Retiree Engagement</a></li>
              </ul>
            </div>

            <div className="footer-col footer-col-mobile-links">
              <h4 className="footer-title">Quick Links</h4>
              <div className="footer-links-mobile">
                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('about'); window.scrollTo(0, 0); }}>About</a>
                <span className="divider">|</span>
                <a href="#" onClick={(e) => { e.preventDefault(); navigateToSection('.why-choose-section'); }}>Opportunities</a>
                <span className="divider">|</span>
                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('leadership'); window.scrollTo(0, 0); }}>Leadership</a>
                <span className="divider">|</span>
                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('partnerships'); window.scrollTo(0, 0); }}>Partnerships</a>
                <span className="divider">|</span>
                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); window.scrollTo(0, 0); }}>Contact</a>
              </div>
            </div>

            <div className="footer-col">
              <h4 className="footer-title">Contact</h4>
              <div className="contact-info">
                <p className="desktop-only"><strong>Centre for Retired Experts (CREX)</strong></p>
                <p><strong>Phone:</strong> <a href="tel:+233266195525">0266195525</a> / <a href="tel:+233552352477">0552352477</a></p>
                <p style={{ marginTop: '10px' }}><strong>Email:</strong> <a href="mailto:info@crexghana.org">info@crexghana.org</a></p>
                <p style={{ marginTop: '10px' }}><strong>Address:</strong> No. G206 Goroka Street, Amrahia, Accra<br /><span className="desktop-only">P.O. Box CT 22, Cantonments, Accra</span></p>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p
              className="copyright"
              onClick={() => {
                const next = adminClickCount + 1
                setAdminClickCount(next)
                if (next >= 5) {
                  setAdminClickCount(0)
                  setCurrentPage('admin')
                  window.scrollTo(0, 0)
                }
              }}
              style={{ cursor: 'default', userSelect: 'none' }}
              title=""
            >
              © 2026 Centre for Retired Experts (CREX). All Rights Reserved.
            </p>
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
