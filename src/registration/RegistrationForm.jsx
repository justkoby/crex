/* ─────────────────────────────────────────────────────────
   CREX Africa – RegistrationForm (Parent Orchestrator)

   Responsibilities:
   ✔ Holds all form data in a single flat state object
   ✔ Tracks the current step (1 – 5)
   ✔ Validates each step before advancing
   ✔ Renders the correct step component
   ✔ Shows an animated progress bar
   ✔ Shows a step-dot indicator
   ✔ Logs the full form payload on submission
   ✔ Shows a success screen after submission
───────────────────────────────────────────────────────── */
import React, { useState, useEffect, useRef } from 'react'
import '../Register.css'

import {
  STEP_LABELS,
  STEP_TITLES,
  TOTAL_STEPS,
  INITIAL_FORM_DATA,
} from './formConstants'
import { validateStep } from './formValidation'
import { supabase } from '../lib/supabase'

import FormStepPersonal     from './FormStepPersonal'
import FormStepEmployment   from './FormStepEmployment'
import FormStepQualification from './FormStepQualification'
import FormStepUpload       from './FormStepUpload'
import FormStepConsent      from './FormStepConsent'

/* ── Step Components Map ──────────────────────────────── */
const STEP_COMPONENTS = [
  FormStepPersonal,
  FormStepEmployment,
  FormStepQualification,
  FormStepUpload,
  FormStepConsent,
]

/* ── Progress Header ──────────────────────────────────── */
const ProgressHeader = ({ currentStep, totalSteps }) => {
  const percent = Math.round((currentStep / totalSteps) * 100)

  return (
    <div className="register-progress-section">
      {/* Step label + count */}
      <div className="step-indicator-row">
        <span className="step-indicator-label">{STEP_LABELS[currentStep - 1]}</span>
        <span className="step-indicator-count">Step {currentStep} of {totalSteps}</span>
      </div>

      {/* Step title */}
      <div className="step-title-row">
        <h2 className="step-title">{STEP_TITLES[currentStep - 1]}</h2>
      </div>

      {/* Progress bar */}
      <div className="crex-progress-track">
        <div className="crex-progress-fill" style={{ width: `${percent}%` }} />
      </div>

      {/* Step dots */}
      <div className="step-dots">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={[
              'step-dot',
              i + 1 === currentStep ? 'active' : '',
              i + 1 < currentStep  ? 'completed' : '',
            ].join(' ').trim()}
          >
            {i + 1 < currentStep ? '✓' : i + 1}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Success Screen ───────────────────────────────────── */
const SuccessScreen = ({ onGoHome }) => (
  <div className="register-success">
    <div className="success-icon">🎉</div>
    <h2 className="success-title">Registration Submitted!</h2>
    <p className="success-text">
      Thank you for registering with CREX Africa. Your candidate profile has been received
      and will be reviewed by our team. We will be in touch via WhatsApp or email shortly.
    </p>
    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '8px' }}>
      <button className="btn-crex-back" onClick={onGoHome}>Return to Home</button>
    </div>
  </div>
)

/* ── Main RegistrationForm Component ─────────────────── */
const RegistrationForm = ({ onNavigateHome }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData,    setFormData]    = useState(INITIAL_FORM_DATA)
  const [errors,      setErrors]      = useState({})
  const [submitted,   setSubmitted]   = useState(false)
  const [alertMsg,    setAlertMsg]    = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const cardRef = useRef(null)

  /* Scroll to top of card whenever the step changes */
  useEffect(() => {
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [currentStep])

  /* ── Update a single field ─────────────────────────── */
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear the error for this field as the user edits
    if (errors[field]) {
      setErrors(prev => { const next = { ...prev }; delete next[field]; return next })
    }
  }

  /* ── Advance to next step ──────────────────────────── */
  const handleNext = () => {
    if (isSubmitting) return
    const stepErrors = validateStep(currentStep, formData)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      setAlertMsg('Please fill in all required fields before continuing.')
      return
    }
    setErrors({})
    setAlertMsg('')
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(s => s + 1)
    } else {
      handleSubmit()
    }
  }

  /* ── Go back ───────────────────────────────────────── */
  const handleBack = () => {
    if (isSubmitting) return
    setErrors({})
    setAlertMsg('')
    setCurrentStep(s => Math.max(1, s - 1))
  }

  /* ── Final submission ──────────────────────────────── */
  const handleSubmit = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)
    setAlertMsg('')

    let cvPath = null
    const hasCV = formData.hasCV === 'Yes'

    try {
      // 1. Upload CV to Storage first if hasCV is true
      if (hasCV) {
        if (!formData.cvFile) {
          throw new Error('Please select a CV file to upload.')
        }

        const fileName = `${Date.now()}_${formData.cvFile.name}`
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('candidate-cvs')
          .upload(fileName, formData.cvFile)

        if (uploadError) {
          throw new Error(`CV upload failed: ${uploadError.message}`)
        }

        cvPath = uploadData.path
      }

      // 2. Prepare database payload
      const payload = {
        full_name: formData.fullName,
        date_of_birth: formData.dateOfBirth || null,
        gender: formData.gender || null,
        phone: formData.phone,
        email: formData.email,
        residential_address: formData.address || null,
        city: formData.city || null,
        region: formData.region || null,
        nationality: formData.nationality || null,
        ghana_card_number: formData.ghanaCard || null,
        
        former_place_of_work: formData.formerWork || null,
        job_title_role: formData.jobTitle || null,
        industry: formData.industry || null,
        preferred_location: formData.preferredLocation || null,
        other_location: formData.otherLocation || null,
        employment_type: formData.employmentType || null,
        available_start_time: formData.availableTime || null,
        willing_to_relocate: formData.willingToRelocate || null,
        
        highest_education: (formData.educationLevel === 'Other' && formData.otherEducation) ? formData.otherEducation : (formData.educationLevel || null),
        institutions_attended: formData.institutions || null,
        years_experience: formData.workYears || null,
        key_skills: formData.keySkills || [],
        languages_spoken: formData.languages || [],
        other_language: formData.otherLanguage || null,
        certifications: formData.certifications || null,
        
        has_cv: hasCV,
        cv_file_path: cvPath,
        
        declaration_confirmed: formData.confirmAccuracy || false,
        data_consent: formData.consentDataSharing || false,
        job_alerts_consent: formData.receiveAlerts || false,
        applicant_signature: formData.signatureName || null,
        signed_date: formData.signatureDate || null
      }

      // 3. Insert applicant record
      const { error: dbError } = await supabase
        .from('applicants')
        .insert([payload])

      if (dbError) {
        throw dbError
      }

      setSubmitted(true)
    } catch (err) {
      console.error('Submission error:', err)
      setAlertMsg(err.message || 'An error occurred during submission. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  /* ── Render ────────────────────────────────────────── */
  const StepComponent = STEP_COMPONENTS[currentStep - 1]
  const isLastStep    = currentStep === TOTAL_STEPS

  return (
    <div className="register-page">
      {/* ── Page Header ───────────────────────────── */}
      <div className="register-header">
        <div className="register-logo-box">
          <div className="register-logo-badge">CREX</div>
          <span className="register-logo-label">Africa</span>
        </div>
        <h1 className="register-main-title">Create Your Candidate Profile</h1>
        <p className="register-subtitle">
          Join our growing network of experienced professionals and let CREX connect
          you with opportunities across Ghana and Africa.
        </p>
      </div>

      {/* ── Form Card ─────────────────────────────── */}
      <div className="register-card" ref={cardRef}>

        {submitted ? (
          <SuccessScreen onGoHome={onNavigateHome} />
        ) : (
          <>
            {/* Progress header */}
            <ProgressHeader currentStep={currentStep} totalSteps={TOTAL_STEPS} />

            {/* Validation alert */}
            {alertMsg && (
              <div className="register-alert register-alert-error">
                <span>⚠️</span>
                <span>{alertMsg}</span>
              </div>
            )}

            {/* Active step */}
            <div className="register-form-body">
              <StepComponent
                data={formData}
                onChange={handleChange}
                errors={errors}
              />
            </div>

            {/* Navigation buttons */}
            <div className="register-form-actions">
              <button
                type="button"
                className="btn-crex-back"
                onClick={handleBack}
                disabled={currentStep === 1 || isSubmitting}
              >
                ← Back
              </button>

              <div className="register-step-hint">
                {currentStep} / {TOTAL_STEPS}
              </div>

              <button
                type="button"
                className="btn-crex-next"
                onClick={handleNext}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="crex-spinner" />
                    Submitting...
                  </>
                ) : isLastStep ? (
                  'Submit Registration ✓'
                ) : (
                  'Save & Continue →'
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {/* ── Footer note ───────────────────────────── */}
      {!submitted && (
        <p className="register-footer-note">
          🔒 Your information is kept confidential and will only be shared with potential
          employers with your consent.
        </p>
      )}
    </div>
  )
}

export default RegistrationForm
