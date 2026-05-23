import React, { useState } from 'react';
import './Contact.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      // Simulate API submission
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setSubmitted(false);
  };

  return (
    <div className="contact-page">
      {/* 1. Contact Hero */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <span className="contact-hero-tag">Get In Touch</span>
            <h1>Connect with CREX</h1>
            <p className="contact-hero-desc">
              Whether you are a retired professional looking to join our network, an institution seeking expert advisory, or a development partner interested in collaboration, we would love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Contact Main Section */}
      <section className="contact-main-section">
        <div className="container">
          <div className="contact-grid">
            
            {/* Left: Contact Info Stack */}
            <div className="contact-info-stack">
              
              {/* Phone Card */}
              <div className="contact-info-card">
                <div className="contact-card-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div className="contact-card-details">
                  <h3>Phone</h3>
                  <p>Our team is available for inquiries:</p>
                  <p style={{ marginTop: '10px', fontSize: '1.1rem' }}>
                    <a href="tel:+233266195525">0266195525</a> / <a href="tel:+233552352477">0552352477</a>
                  </p>
                </div>
              </div>

              {/* Email Card */}
              <div className="contact-info-card">
                <div className="contact-card-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className="contact-card-details">
                  <h3>Email</h3>
                  <p>Send us a direct email at:</p>
                  <p style={{ marginTop: '10px', fontSize: '1.1rem' }}>
                    <a href="mailto:crexghana@gmail.com">crexghana@gmail.com</a>
                  </p>
                </div>
              </div>

              {/* Address Card */}
              <div className="contact-info-card">
                <div className="contact-card-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="contact-card-details">
                  <h3>Location</h3>
                  <p><strong>Physical Address:</strong><br />No. G206 Goroka Street, Amrahia, Accra, Ghana</p>
                  <p style={{ marginTop: '10px' }}><strong>Mailing Address:</strong><br />P.O. Box CT 22, Cantonments, Accra, Ghana</p>
                </div>
              </div>

            </div>

            {/* Right: Interactive Contact Form Container */}
            <div className="contact-form-container">
              {!submitted ? (
                <>
                  <h2 className="contact-form-title">Send a Message</h2>
                  <p className="contact-form-subtitle">
                    Fill out the form below and a member of the CREX Secretariat will get back to you as soon as possible.
                  </p>
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group-row">
                      <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Prof. / Dr. / Mr. / Mrs. Name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="yourname@domain.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="subject">Subject / Professional Area</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="form-control"
                        placeholder="e.g. Join Experts Network / Consultancy Request"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        className="form-control"
                        placeholder="Type your message, query, or application background here..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary btn-submit">
                      Send Message →
                    </button>
                  </form>
                </>
              ) : (
                <div className="contact-success-box">
                  <div className="success-icon-container">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <h3>Message Sent!</h3>
                  <p>
                    Thank you for reaching out to the Centre for Retired Experts (CREX). Your message has been successfully received, and our Secretariat will follow up with you within 24 to 48 hours.
                  </p>
                  <button className="btn btn-secondary" onClick={handleReset}>
                    Send Another Message
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
