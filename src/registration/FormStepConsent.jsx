/* ─────────────────────────────────────────────────────────
   Step 5 – Declaration & Consent
───────────────────────────────────────────────────────── */
import React from 'react'
import { FormField, ConsentCheckbox, TextInput } from './formUtils'

const FormStepConsent = ({ data, onChange, errors }) => {
  const toggle = field => onChange(field, !data[field])

  return (
    <div className="form-grid">

      {/* ── Required consents ──────────────────── */}
      <div className="crex-form-group col-full">
        <div className="consent-section-header">
          <span className="consent-badge required-badge">Required</span>
        </div>
        <div className="consent-block">
          <ConsentCheckbox
            id="confirmAccuracy"
            checked={data.confirmAccuracy}
            onChange={() => toggle('confirmAccuracy')}
            label="I confirm that the information provided is accurate and complete to the best of my knowledge."
            error={errors.confirmAccuracy}
          />
          <ConsentCheckbox
            id="consentDataSharing"
            checked={data.consentDataSharing}
            onChange={() => toggle('consentDataSharing')}
            label="I consent to CREX collecting, storing, and sharing my profile with potential employers and partner organisations for recruitment purposes."
            error={errors.consentDataSharing}
          />
        </div>
      </div>

      {/* ── Optional consent ───────────────────── */}
      <div className="crex-form-group col-full">
        <div className="consent-section-header">
          <span className="consent-badge optional-badge">Optional</span>
        </div>
        <div className="consent-block">
          <ConsentCheckbox
            id="receiveAlerts"
            checked={data.receiveAlerts}
            onChange={() => toggle('receiveAlerts')}
            label="I would like to receive job alerts and updates from CREX via WhatsApp or email."
          />
        </div>
      </div>

      {/* ── Applicant Signature ────────────────── */}
      <FormField label="Applicant Signature" htmlFor="signatureName" required error={errors.signatureName}>
        <TextInput
          id="signatureName"
          placeholder="Type your full name as your signature"
          value={data.signatureName}
          onChange={v => onChange('signatureName', v)}
          error={errors.signatureName}
          valid={!errors.signatureName && !!data.signatureName}
          style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif', fontSize: '16px' }}
        />
      </FormField>

      {/* ── Date ──────────────────────────────── */}
      <FormField label="Date" htmlFor="signatureDate" required error={errors.signatureDate}>
        <TextInput
          id="signatureDate"
          type="date"
          value={data.signatureDate}
          onChange={v => onChange('signatureDate', v)}
          error={errors.signatureDate}
          valid={!errors.signatureDate && !!data.signatureDate}
        />
      </FormField>

      {/* ── For Official Use Only ─────────────── */}
      <div className="crex-form-group col-full">
        <div className="official-use-box">
          <p className="official-use-title">For Official Use Only</p>
          <div className="official-use-fields">
            {['Registered by', 'Date', 'Candidate ID'].map(lbl => (
              <div key={lbl} className="official-use-field">
                <span className="official-field-label">{lbl}</span>
                <span className="official-field-line" />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default FormStepConsent
