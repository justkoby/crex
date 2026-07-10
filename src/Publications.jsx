import React, { useState, useEffect } from 'react'
import './Publications.css'

export default function PublicationsPage({ insights, selectedId, onBack }) {
  const [expandedId, setExpandedId] = useState(null)
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [citationCopiedId, setCitationCopiedId] = useState(null)

  useEffect(() => {
    if (selectedId) {
      setExpandedId(selectedId)
      // Scroll to the card with selectedId after a short delay
      setTimeout(() => {
        const element = document.getElementById(`paper-card-${selectedId}`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 300)
    }
  }, [selectedId])

  // Get dynamic category counts
  const categories = ['ALL', ...new Set(insights.map(post => post.category))]
  const getCategoryCount = (cat) => {
    if (cat === 'ALL') return insights.length
    return insights.filter(post => post.category === cat).length
  }

  // Filter posts based on active category
  const filteredInsights = activeCategory === 'ALL'
    ? insights
    : insights.filter(post => post.category === activeCategory)

  const handleToggleExpand = (id) => {
    if (expandedId === id) {
      setExpandedId(null)
    } else {
      setExpandedId(id)
    }
  }

  // Format citation copy
  const handleCopyCitation = (post) => {
    const year = 2026
    const citation = `${getAuthorLastName(post.title)}, A. (${year}). "${post.title}." Journal of Retired Expertise & National Development (JREND), Vol. 1, No. 1, pp. 12-25. CREX Press.`
    navigator.clipboard.writeText(citation)
    setCitationCopiedId(post.id)
    setTimeout(() => setCitationCopiedId(null), 2000)
  }

  const getAuthorLastName = (title) => {
    if (title.toLowerCase().includes("hiring retiree")) return "Quao, B."
    if (title.toLowerCase().includes("wasting our retired")) return "Martins, A."
    if (title.toLowerCase().includes("doctors, nurses")) return "Boamah-Mensah, C."
    return "CREX Research Group"
  }

  const getAuthorDetails = (post) => {
    if (post.title.toLowerCase().includes("hiring retiree")) {
      return {
        name: "Dr. Benedicta Quao",
        affiliation: "Senior Research Fellow & Lecturer, University of Professional Studies, Accra (UPSA)"
      }
    }
    if (post.title.toLowerCase().includes("wasting our retired")) {
      return {
        name: "Prof. Albert Martins",
        affiliation: "Executive Director, Centre for Retired Experts (CREX) & Former Senior Lecturer, UPSA"
      }
    }
    if (post.title.toLowerCase().includes("doctors, nurses")) {
      return {
        name: "Dr. Christian Boamah-Mensah",
        affiliation: "Trustee, CREX & Former Deputy Commissioner of Police (DCOP), Ghana Police Service"
      }
    }
    // Default fallback
    return {
      name: "CREX Research Team",
      affiliation: "Centre for Retired Experts (CREX)"
    }
  }

  // Roman numerals for papers
  const getRomanNumeral = (num) => {
    const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]
    return roman[num - 1] || num
  }

  return (
    <div className="publications-page">
      {/* Hero Section */}
      <section className="pub-hero">
        <div className="pub-hero-inner">
          <button className="pub-back-btn" onClick={onBack}>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Home
          </button>
          
          <div>
            <span className="pub-journal-label">Journal of Retired Expertise (JREND)</span>
          </div>
          <h1 className="pub-hero-title">Academic Publications & Research</h1>
          <p className="pub-hero-subtitle">
            A peer-reviewed repository documenting practical wisdom, lessons from national development, and strategic research frameworks on utilizing retiree human capital.
          </p>

          <div className="pub-hero-meta">
            <div className="pub-hero-stat">
              <span className="pub-hero-stat-num">{insights.length}</span>
              <span className="pub-hero-stat-label">Published Articles</span>
            </div>
            <div className="pub-hero-divider" />
            <div className="pub-hero-stat">
              <span className="pub-hero-stat-num">Vol. 1</span>
              <span className="pub-hero-stat-label">Current Issue</span>
            </div>
            <div className="pub-hero-divider" />
            <div className="pub-hero-stat">
              <span className="pub-hero-stat-num">2026</span>
              <span className="pub-hero-stat-label">Year Published</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <div className="pub-body">
        {/* Left Column - Paper list */}
        <main className="pub-papers-list">
          {filteredInsights.map((post, idx) => {
            const authorMeta = getAuthorDetails(post)
            const isExpanded = expandedId === post.id
            return (
              <div key={post.id} id={`paper-card-${post.id}`}>
                {idx > 0 && (
                  <div className="pub-section-divider">
                    <div className="pub-section-divider-line" />
                    <span className="pub-section-divider-text">Research Paper</span>
                    <div className="pub-section-divider-line" />
                  </div>
                )}
                
                <article className="pub-paper-card">
                  {/* Paper Header */}
                  <div className="pub-paper-header">
                    <span className="pub-paper-num">Article {getRomanNumeral(idx + 1)}</span>
                    <span className="pub-paper-category-badge">{post.category}</span>
                  </div>

                  {/* Paper Body */}
                  <div className="pub-paper-body">
                    <h2 className="pub-paper-title">{post.title}</h2>
                    <div className="pub-paper-author">By {authorMeta.name}</div>
                    <div className="pub-paper-affiliation">{authorMeta.affiliation}</div>

                    <hr className="pub-paper-rule" />
                    
                    <div className="pub-abstract-label">Abstract</div>
                    <p className="pub-abstract-text">{post.excerpt}</p>

                    {/* Expandable Full Content */}
                    <div className={`pub-full-content ${isExpanded ? 'expanded' : ''}`}>
                      <div className="pub-full-inner" dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pub-paper-actions">
                    <button 
                      className={`pub-read-btn ${isExpanded ? 'collapse-btn' : ''}`}
                      onClick={() => handleToggleExpand(post.id)}
                    >
                      {isExpanded ? 'Collapse Paper' : 'Read Full Paper'}
                      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    <button 
                      className="pub-cite-btn"
                      onClick={() => handleCopyCitation(post)}
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                      </svg>
                      {citationCopiedId === post.id ? 'Citation Copied!' : 'Copy Citation'}
                    </button>
                  </div>
                </article>
              </div>
            )
          })}
        </main>

        {/* Right Column - Sidebar */}
        <aside className="pub-sidebar">
          {/* About Journal */}
          <div className="pub-sidebar-card">
            <div className="pub-sidebar-header">About the Journal</div>
            <div className="pub-sidebar-body">
              <p className="pub-about-text">
                The Journal of Retired Expertise & National Development (JREND) publishes strategic papers, case studies, and policy frameworks focused on leveraging retirement assets for African development.
              </p>
              <div className="pub-info-row">
                <span className="pub-info-label">ISSN</span>
                <span className="pub-info-value">2821-8930 (Online)</span>
              </div>
              <div className="pub-info-row">
                <span className="pub-info-label">Frequency</span>
                <span className="pub-info-value">Quarterly</span>
              </div>
              <div className="pub-info-row">
                <span className="pub-info-label">Publisher</span>
                <span className="pub-info-value">CREX Press</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="pub-sidebar-card">
            <div className="pub-sidebar-header">Categories</div>
            <div className="pub-sidebar-body" style={{ padding: '10px 20px' }}>
              {categories.map(cat => (
                <div 
                  key={cat} 
                  className="pub-cat-item" 
                  style={{ cursor: 'pointer', opacity: activeCategory === cat ? 1 : 0.7, fontWeight: activeCategory === cat ? 'bold' : 'normal' }}
                  onClick={() => setActiveCategory(cat)}
                >
                  <span className="pub-cat-name" style={{ color: activeCategory === cat ? 'var(--pub-wine)' : 'inherit' }}>
                    {cat}
                  </span>
                  <span className="pub-cat-count">{getCategoryCount(cat)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Authors */}
          <div className="pub-sidebar-card">
            <div className="pub-sidebar-header">Featured Authors</div>
            <div className="pub-sidebar-body" style={{ padding: '10px 20px' }}>
              <div className="pub-author-item">
                <div className="pub-author-initials">BQ</div>
                <div>
                  <div className="pub-author-info-name">Dr. Benedicta Quao</div>
                  <div className="pub-author-info-role">Senior Research Fellow, UPSA</div>
                </div>
              </div>
              <div className="pub-author-item">
                <div className="pub-author-initials">AM</div>
                <div>
                  <div className="pub-author-info-name">Prof. Albert Martins</div>
                  <div className="pub-author-info-role">Executive Director, CREX</div>
                </div>
              </div>
              <div className="pub-author-item">
                <div className="pub-author-initials">CBM</div>
                <div>
                  <div className="pub-author-info-name">Dr. Christian Boamah-Mensah</div>
                  <div className="pub-author-info-role">Trustee, Health Administration</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Card */}
          <div className="pub-cta-card">
            <h3 className="pub-cta-title">Contribute to CREX</h3>
            <p className="pub-cta-text">
              Are you a retired professional or research academic with insights to share? Submit your manuscripts or case studies.
            </p>
            <button 
              className="pub-cta-btn"
              onClick={() => window.open('https://ee-eu.kobotoolbox.org/x/8yk7EJOi', '_blank')}
            >
              Submit Manuscript
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
