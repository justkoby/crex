import React, { useState, useRef } from 'react'
import './Register.css'

/* ──────────────────────────────────────────────
   CONSTANTS
────────────────────────────────────────────── */
const GHANA_REGIONS = [
  'Ahafo',
  'Ashanti',
  'Bono',
  'Bono East',
  'Central',
  'Eastern',
  'Greater Accra',
  'North East',
  'Northern',
  'Oti',
  'Savannah',
  'Upper East',
  'Upper West',
  'Volta',
  'Western',
  'Western North',
]

const INDUSTRIES = [
  'Health',
  'Education',
  'Finance',
  'Construction',
  'Technology',
  'Hospitality',
  'Retail',
  'Administration',
  'Sales & Marketing',
  'Security',
  'Transport & Logistics',
  'Manufacturing',
  'Other',
]

const LOCATIONS = [
  'Accra',
  'Kumasi',
  'Takoradi',
  'Tema',
  'Cape Coast',
  'Tamale',
  'Remote',
  'Any Location',
  'Other',
]

const EDUCATION_LEVELS = [
  'SHS (Senior High School)',
  'HND (Higher National Diploma)',
  'Diploma',
  'Degree (Bachelor\'s)',
  'Master\'s Degree',
  'PhD (Doctorate)',
  'Other',
]

const WORK_YEARS = [
  'No experience',
  'Less than 1 year',
  '1 – 2 years',
  '3 – 5 years',
  '6 – 10 years',
  '10+ years',
]

const LANGUAGES = [
  'English',
  'French',
  'Twi',
  'Ga',
  'Ewe',
  'Hausa',
]

const STEP_LABELS = [
  'Personal',
  'Employment',
  'Qualifications',
  'Documents',
  'Declaration',
]

/* ──────────────────────────────────────────────
   SMALL UI COMPONENTS
────────────────────────────────────────────── */
const RequiredStar = () => <span className="required-star">*</span>

const FormLabel = ({ htmlFor, children, required }) => (
  <label className="crex-label" htmlFor={htmlFor}>
    {children}{required && <RequiredStar />}
  </label>
)

const HelperText = ({ children }) => (
  <span className="crex-helper-text">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
    </svg>
    {children}
  </span>
)

const ErrorText = ({ children }) => (
  <span className="crex-error-text">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
    {children}
  </span>
)

/* ──────────────────────────────────────────────
   STEP PROGRESS HEADER
────────────────────────────────────────────── */
const StepProgressHeader = ({ currentStep, totalSteps }) => {
  const percent = Math.round((currentStep / totalSteps) * 100)

  return (
    <div className="register-progress-section">
      <div className="step-indicator-row">
        <span className="step-indicator-label">{STEP_LABELS[currentStep - 1]}</span>
        <span className="step-indicator-count">Step {currentStep} of {totalSteps}</span>
      </div>

      <div className="step-title-row">
        <h2 className="step-title">
          {currentStep === 1 && 'Personal Information'}
          {currentStep === 2 && 'Employment & Job Search Details'}
          {currentStep === 3 && 'Qualifications & Experience'}
          {currentStep === 4 && 'Documents'}
          {currentStep === 5 && 'Declaration & Consent'}
        </h2>
      </div>

      <div className="crex-progress-track">
        <div className="crex-progress-fill" style={{ width: `${percent}%` }} />
      </div>

      <div className="step-dots">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`step-dot ${i + 1 === currentStep ? 'active' : ''} ${i + 1 < currentStep ? 'completed' : ''}`}
          >
            {i + 1 < currentStep ? '✓' : i + 1}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   STEP 1 — PERSONAL INFORMATION
────────────────────────────────────────────── */
const Step1 = ({ data, onChange, errors }) => {
  return (
    <div className="form-grid">
      {/* Full Name */}
      <div className="crex-form-group">
        <FormLabel htmlFor="fullName" required>Full Name</FormLabel>
        <input
          id="fullName"
          className={`crex-input ${errors.fullName ? 'is-invalid' : data.fullName ? 'is-valid' : ''}`}
          type="text"
          placeholder="e.g. Kwabena Mensah"
          value={data.fullName}
          onChange={e => onChange('fullName', e.target.value)}
        />
        {errors.fullName && <ErrorText>{errors.fullName}</ErrorText>}
      </div>

      {/* Date of Birth */}
      <div className="crex-form-group">
        <FormLabel htmlFor="dateOfBirth" required>Date of Birth</FormLabel>
        <input
          id="dateOfBirth"
          className={`crex-input ${errors.dateOfBirth ? 'is-invalid' : data.dateOfBirth ? 'is-valid' : ''}`}
          type="date"
          value={data.dateOfBirth}
          onChange={e => onChange('dateOfBirth', e.target.value)}
        />
        {errors.dateOfBirth && <ErrorText>{errors.dateOfBirth}</ErrorText>}
      </div>

      {/* Gender */}
      <div className="crex-form-group">
        <FormLabel required>Gender</FormLabel>
        <div className="radio-group">
          {['Male', 'Female'].map(g => (
            <label key={g} className="radio-option">
              <input
                type="radio"
                name="gender"
                value={g}
                checked={data.gender === g}
                onChange={() => onChange('gender', g)}
              />
              <span className="radio-custom" />
              <span className="radio-label">{g}</span>
            </label>
          ))}
        </div>
        {errors.gender && <ErrorText>{errors.gender}</ErrorText>}
      </div>

      {/* Phone */}
      <div className="crex-form-group">
        <FormLabel htmlFor="phone" required>Phone Number</FormLabel>
        <input
          id="phone"
          className={`crex-input ${errors.phone ? 'is-invalid' : data.phone ? 'is-valid' : ''}`}
          type="tel"
          placeholder="e.g. 0244 000 000"
          value={data.phone}
          onChange={e => onChange('phone', e.target.value)}
        />
        <HelperText>Use the WhatsApp number you want CREX to contact you on.</HelperText>
        {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
      </div>

      {/* Email */}
      <div className="crex-form-group">
        <FormLabel htmlFor="email" required>Email Address</FormLabel>
        <input
          id="email"
          className={`crex-input ${errors.email ? 'is-invalid' : data.email ? 'is-valid' : ''}`}
          type="email"
          placeholder="e.g. kwabena@email.com"
          value={data.email}
          onChange={e => onChange('email', e.target.value)}
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}
      </div>

      {/* City */}
      <div className="crex-form-group">
        <FormLabel htmlFor="city" required>City / Town</FormLabel>
        <input
          id="city"
          className={`crex-input ${errors.city ? 'is-invalid' : data.city ? 'is-valid' : ''}`}
          type="text"
          placeholder="e.g. Accra"
          value={data.city}
          onChange={e => onChange('city', e.target.value)}
        />
        {errors.city && <ErrorText>{errors.city}</ErrorText>}
      </div>

      {/* Region */}
      <div className="crex-form-group">
        <FormLabel htmlFor="region" required>Region</FormLabel>
        <div className="crex-select-wrapper">
          <select
            id="region"
            className={`crex-select ${errors.region ? 'is-invalid' : data.region ? 'is-valid' : ''}`}
            value={data.region}
            onChange={e => onChange('region', e.target.value)}
          >
            <option value="">Select Region</option>
            {GHANA_REGIONS.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        {errors.region && <ErrorText>{errors.region}</ErrorText>}
      </div>

      {/* Nationality */}
      <div className="crex-form-group">
        <FormLabel htmlFor="nationality" required>Nationality</FormLabel>
        <input
          id="nationality"
          className={`crex-input ${errors.nationality ? 'is-invalid' : data.nationality ? 'is-valid' : ''}`}
          type="text"
          placeholder="e.g. Ghanaian"
          value={data.nationality}
          onChange={e => onChange('nationality', e.target.value)}
        />
        {errors.nationality && <ErrorText>{errors.nationality}</ErrorText>}
      </div>

      {/* Residential Address */}
      <div className="crex-form-group col-full">
        <FormLabel htmlFor="address" required>Residential Address</FormLabel>
        <input
          id="address"
          className={`crex-input ${errors.address ? 'is-invalid' : data.address ? 'is-valid' : ''}`}
          type="text"
          placeholder="e.g. No. 5 Ring Road Central, Accra"
          value={data.address}
          onChange={e => onChange('address', e.target.value)}
        />
        {errors.address && <ErrorText>{errors.address}</ErrorText>}
      </div>

      {/* Ghana Card */}
      <div className="crex-form-group col-full">
        <FormLabel htmlFor="ghanaCard" required>Ghana Card Number</FormLabel>
        <input
          id="ghanaCard"
          className={`crex-input ${errors.ghanaCard ? 'is-invalid' : data.ghanaCard ? 'is-valid' : ''}`}
          type="text"
          placeholder="GHA-XXXXXXXXX-X"
          value={data.ghanaCard}
          onChange={e => onChange('ghanaCard', e.target.value.toUpperCase())}
        />
        <HelperText>This is used for identity verification only.</HelperText>
        {errors.ghanaCard && <ErrorText>{errors.ghanaCard}</ErrorText>}
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   STEP 2 — EMPLOYMENT & JOB SEARCH
────────────────────────────────────────────── */
const Step2 = ({ data, onChange, errors }) => {
  const showOtherLocation = data.preferredLocation === 'Other'

  return (
    <div className="form-grid">
      {/* Former Place of Work */}
      <div className="crex-form-group">
        <FormLabel htmlFor="formerWork">Former Place of Work</FormLabel>
        <input
          id="formerWork"
          className="crex-input"
          type="text"
          placeholder="e.g. Ghana Education Service"
          value={data.formerWork}
          onChange={e => onChange('formerWork', e.target.value)}
        />
      </div>

      {/* Job Title */}
      <div className="crex-form-group">
        <FormLabel htmlFor="jobTitle">Job Title / Role</FormLabel>
        <input
          id="jobTitle"
          className="crex-input"
          type="text"
          placeholder="e.g. Senior Lecturer"
          value={data.jobTitle}
          onChange={e => onChange('jobTitle', e.target.value)}
        />
      </div>

      {/* Industry */}
      <div className="crex-form-group">
        <FormLabel htmlFor="industry" required>Industry</FormLabel>
        <div className="crex-select-wrapper">
          <select
            id="industry"
            className={`crex-select ${errors.industry ? 'is-invalid' : data.industry ? 'is-valid' : ''}`}
            value={data.industry}
            onChange={e => onChange('industry', e.target.value)}
          >
            <option value="">Select Industry</option>
            {INDUSTRIES.map(ind => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>
        {errors.industry && <ErrorText>{errors.industry}</ErrorText>}
      </div>

      {/* Preferred Location */}
      <div className="crex-form-group">
        <FormLabel htmlFor="preferredLocation" required>Preferred Job Location</FormLabel>
        <div className="crex-select-wrapper">
          <select
            id="preferredLocation"
            className={`crex-select ${errors.preferredLocation ? 'is-invalid' : data.preferredLocation ? 'is-valid' : ''}`}
            value={data.preferredLocation}
            onChange={e => onChange('preferredLocation', e.target.value)}
          >
            <option value="">Select Location</option>
            {LOCATIONS.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        {errors.preferredLocation && <ErrorText>{errors.preferredLocation}</ErrorText>}
      </div>

      {/* Other Location – conditional */}
      <div className={`crex-form-group conditional-field ${showOtherLocation ? 'visible' : 'hidden'}`}>
        <FormLabel htmlFor="otherLocation">Specify Other Location</FormLabel>
        <input
          id="otherLocation"
          className="crex-input"
          type="text"
          placeholder="e.g. Sunyani"
          value={data.otherLocation}
          onChange={e => onChange('otherLocation', e.target.value)}
        />
      </div>

      {/* Available Time to Start */}
      <div className="crex-form-group">
        <FormLabel required>Available Time to Start</FormLabel>
        <div className="radio-group" style={{ flexDirection: 'column', gap: '10px' }}>
          {['Immediately', 'In 2 weeks', 'In a month'].map(opt => (
            <label key={opt} className="radio-option">
              <input
                type="radio"
                name="availableTime"
                value={opt}
                checked={data.availableTime === opt}
                onChange={() => onChange('availableTime', opt)}
              />
              <span className="radio-custom" />
              <span className="radio-label">{opt}</span>
            </label>
          ))}
        </div>
        {errors.availableTime && <ErrorText>{errors.availableTime}</ErrorText>}
      </div>

      {/* Employment Type */}
      <div className="crex-form-group">
        <FormLabel required>Employment Type</FormLabel>
        <div className="radio-pill-group">
          {['Full-time', 'Part-time', 'Contract', 'Remote', 'Hybrid'].map(type => (
            <label key={type} className="radio-pill">
              <input
                type="radio"
                name="employmentType"
                value={type}
                checked={data.employmentType === type}
                onChange={() => onChange('employmentType', type)}
              />
              <span className="radio-pill-label">{type}</span>
            </label>
          ))}
        </div>
        {errors.employmentType && <ErrorText>{errors.employmentType}</ErrorText>}
      </div>

      {/* Willing to Relocate */}
      <div className="crex-form-group col-full">
        <FormLabel required>Willing to Relocate?</FormLabel>
        <div className="radio-group">
          {['Yes', 'No'].map(opt => (
            <label key={opt} className="radio-option">
              <input
                type="radio"
                name="willingToRelocate"
                value={opt}
                checked={data.willingToRelocate === opt}
                onChange={() => onChange('willingToRelocate', opt)}
              />
              <span className="radio-custom" />
              <span className="radio-label">{opt}</span>
            </label>
          ))}
        </div>
        {errors.willingToRelocate && <ErrorText>{errors.willingToRelocate}</ErrorText>}
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   KEY SKILLS TAG INPUT
────────────────────────────────────────────── */
const SkillsTagInput = ({ skills, onChange, error }) => {
  const [inputVal, setInputVal] = useState('')
  const MAX_SKILLS = 5
  const MIN_SKILLS = 3

  const addSkill = (val) => {
    const trimmed = val.trim()
    if (!trimmed) return
    if (skills.includes(trimmed)) { setInputVal(''); return }
    if (skills.length >= MAX_SKILLS) return
    onChange([...skills, trimmed])
    setInputVal('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addSkill(inputVal)
    } else if (e.key === 'Backspace' && !inputVal && skills.length > 0) {
      onChange(skills.slice(0, -1))
    }
  }

  const removeSkill = (idx) => onChange(skills.filter((_, i) => i !== idx))

  const remaining = MAX_SKILLS - skills.length

  return (
    <div>
      <div className={`skills-tag-box ${error ? 'is-invalid' : skills.length >= MIN_SKILLS ? 'is-valid' : ''}`}>
        {skills.map((sk, i) => (
          <span key={i} className="skill-tag">
            {sk}
            <button type="button" className="skill-tag-remove" onClick={() => removeSkill(i)} aria-label={`Remove ${sk}`}>×</button>
          </span>
        ))}
        {skills.length < MAX_SKILLS && (
          <input
            className="skills-tag-input"
            type="text"
            placeholder={skills.length === 0 ? 'e.g. Leadership, Finance…' : 'Add skill…'}
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => addSkill(inputVal)}
          />
        )}
      </div>
      <span className="crex-helper-text" style={{ marginTop: '5px' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
        Press Enter or comma to add a skill. {remaining > 0 ? `${remaining} more allowed.` : 'Maximum reached.'}
      </span>
    </div>
  )
}

/* ──────────────────────────────────────────────
   STEP 3 — QUALIFICATIONS & EXPERIENCE
────────────────────────────────────────────── */
const Step3 = ({ data, onChange, errors }) => {
  const showOtherEducation = data.educationLevel === 'Other'
  const showOtherLanguage  = (data.languages || []).includes('Other')

  const handleLanguageToggle = (lang) => {
    const current = data.languages || []
    if (current.includes(lang)) {
      onChange('languages', current.filter(l => l !== lang))
    } else {
      onChange('languages', [...current, lang])
    }
  }

  return (
    <div className="form-grid">

      {/* Highest Education Level — dropdown */}
      <div className="crex-form-group">
        <FormLabel htmlFor="educationLevel" required>Highest Level of Education</FormLabel>
        <div className="crex-select-wrapper">
          <select
            id="educationLevel"
            className={`crex-select ${errors.educationLevel ? 'is-invalid' : data.educationLevel ? 'is-valid' : ''}`}
            value={data.educationLevel || ''}
            onChange={e => onChange('educationLevel', e.target.value)}
          >
            <option value="">Select education level</option>
            {EDUCATION_LEVELS.map(lv => (
              <option key={lv} value={lv}>{lv}</option>
            ))}
          </select>
        </div>
        {errors.educationLevel && <ErrorText>{errors.educationLevel}</ErrorText>}
      </div>

      {/* Years of Working Experience */}
      <div className="crex-form-group">
        <FormLabel htmlFor="workYears" required>Years of Working Experience</FormLabel>
        <div className="crex-select-wrapper">
          <select
            id="workYears"
            className={`crex-select ${errors.workYears ? 'is-invalid' : data.workYears ? 'is-valid' : ''}`}
            value={data.workYears || ''}
            onChange={e => onChange('workYears', e.target.value)}
          >
            <option value="">Select years</option>
            {WORK_YEARS.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        {errors.workYears && <ErrorText>{errors.workYears}</ErrorText>}
      </div>

      {/* Other Education — conditional */}
      {showOtherEducation && (
        <div className="crex-form-group col-full">
          <FormLabel htmlFor="otherEducation">Specify Your Qualification</FormLabel>
          <input
            id="otherEducation"
            className="crex-input"
            type="text"
            placeholder="Please specify your qualification"
            value={data.otherEducation || ''}
            onChange={e => onChange('otherEducation', e.target.value)}
          />
        </div>
      )}

      {/* Institution(s) Attended — textarea */}
      <div className="crex-form-group col-full">
        <FormLabel htmlFor="institutions" required>Institution(s) Attended</FormLabel>
        <textarea
          id="institutions"
          className={`crex-input crex-textarea ${errors.institutions ? 'is-invalid' : data.institutions ? 'is-valid' : ''}`}
          placeholder="e.g. University of Ghana – BA Economics (2002)&#10;KNUST – MBA Finance (2006)"
          value={data.institutions || ''}
          onChange={e => onChange('institutions', e.target.value)}
          rows={3}
        />
        <HelperText>Add school name(s) and years completed, one per line</HelperText>
        {errors.institutions && <ErrorText>{errors.institutions}</ErrorText>}
      </div>

      {/* Key Skills — tag input */}
      <div className="crex-form-group col-full">
        <FormLabel required>Key Skills</FormLabel>
        <SkillsTagInput
          skills={data.keySkills || []}
          onChange={(val) => onChange('keySkills', val)}
          error={errors.keySkills}
        />
        {errors.keySkills && <ErrorText>{errors.keySkills}</ErrorText>}
      </div>

      {/* Languages Spoken — checkboxes */}
      <div className="crex-form-group col-full">
        <FormLabel required>Languages Spoken</FormLabel>
        <div className="language-checkbox-grid">
          {[...LANGUAGES, 'Other'].map(lang => (
            <label key={lang} className="language-checkbox-item">
              <input
                type="checkbox"
                className="lang-checkbox-input"
                id={`lang-${lang}`}
                checked={(data.languages || []).includes(lang)}
                onChange={() => handleLanguageToggle(lang)}
              />
              <span className="lang-checkbox-custom">
                <svg className="lang-check-icon" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="1,6 4.5,9.5 11,2"/>
                </svg>
              </span>
              <span className="lang-label">{lang}</span>
            </label>
          ))}
        </div>
        {errors.languages && <ErrorText>{errors.languages}</ErrorText>}
      </div>

      {/* Other Language — conditional */}
      {showOtherLanguage && (
        <div className="crex-form-group col-full">
          <FormLabel htmlFor="otherLanguage">Specify Other Language(s)</FormLabel>
          <input
            id="otherLanguage"
            className="crex-input"
            type="text"
            placeholder="e.g. Dagbani, Arabic"
            value={data.otherLanguage || ''}
            onChange={e => onChange('otherLanguage', e.target.value)}
          />
        </div>
      )}

      {/* Professional Certifications — optional */}
      <div className="crex-form-group col-full">
        <FormLabel htmlFor="certifications">
          Professional Certifications
          <span style={{ fontWeight: 400, color: 'var(--crex-muted)', fontSize: '12px', marginLeft: '8px' }}>(Optional)</span>
        </FormLabel>
        <textarea
          id="certifications"
          className="crex-input crex-textarea"
          placeholder="e.g. ACCA (2010), Project Management Professional – PMP (2015)"
          value={data.certifications || ''}
          onChange={e => onChange('certifications', e.target.value)}
          rows={2}
        />
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   STEP 4 — CV UPLOAD
────────────────────────────────────────────── */
const ACCEPTED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
const ACCEPTED_EXT   = ['.pdf', '.doc', '.docx']
const MAX_SIZE_MB    = 5

const Step4 = ({ data, onChange, errors }) => {
  const fileRef = useRef(null)
  const [fileError, setFileError] = useState('')
  const hasCV  = data.hasCV === 'Yes'

  const validateAndSetFile = (file) => {
    if (!file) return
    setFileError('')
    // Type check
    const ext = '.' + file.name.split('.').pop().toLowerCase()
    if (!ACCEPTED_EXT.includes(ext) && !ACCEPTED_TYPES.includes(file.type)) {
      setFileError('Unsupported file type. Please upload a PDF, DOC, or DOCX file.')
      return
    }
    // Size check (5 MB)
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setFileError(`File is too large. Maximum allowed size is ${MAX_SIZE_MB}MB.`)
      return
    }
    onChange('cvFile', file)
  }

  const handleFileChange = (e) => validateAndSetFile(e.target.files[0])

  const handleDrop = (e) => {
    e.preventDefault()
    validateAndSetFile(e.dataTransfer.files[0])
  }

  const removeFile = (e) => {
    e.stopPropagation()
    onChange('cvFile', null)
    setFileError('')
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div className="form-grid">

      {/* Has CV? */}
      <div className="crex-form-group col-full">
        <FormLabel required>Do you have a CV?</FormLabel>
        <div className="radio-group">
          {['Yes', 'No'].map(opt => (
            <label key={opt} className="radio-option">
              <input
                type="radio"
                name="hasCV"
                value={opt}
                checked={data.hasCV === opt}
                onChange={() => {
                  onChange('hasCV', opt)
                  if (opt === 'No') { onChange('cvFile', null); setFileError('') }
                }}
              />
              <span className="radio-custom" />
              <span className="radio-label">{opt}</span>
            </label>
          ))}
        </div>
        {errors.hasCV && <ErrorText>{errors.hasCV}</ErrorText>}
      </div>

      {/* Upload zone — shown when Yes */}
      {hasCV && (
        <div className="crex-form-group col-full">
          <FormLabel required>Upload CV</FormLabel>
          <HelperText>Please upload your most recent CV.</HelperText>

          <div style={{ marginTop: '10px' }}>
            <div
              className={`file-upload-zone ${data.cvFile ? 'has-file' : ''} ${fileError || errors.cvFile ? 'upload-error' : ''}`}
              onClick={() => fileRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}
            >
              {data.cvFile ? (
                <>
                  <span className="file-upload-icon">✅</span>
                  <div className="file-name-display">{data.cvFile.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--crex-muted)', marginTop: '4px' }}>
                    {(data.cvFile.size / (1024 * 1024)).toFixed(2)} MB
                  </div>
                  <button
                    type="button"
                    className="file-remove-btn"
                    onClick={removeFile}
                  >
                    Remove file
                  </button>
                </>
              ) : (
                <>
                  <span className="file-upload-icon">📄</span>
                  <p className="file-upload-text">
                    <strong>Click to upload</strong> or drag and drop
                  </p>
                  <p className="file-upload-hint">PDF, DOC, DOCX only</p>
                </>
              )}
            </div>

            {/* Specs row */}
            <div className="cv-specs-row">
              <div className="cv-spec-item">
                <span className="cv-spec-icon">📋</span>
                <div>
                  <div className="cv-spec-label">Accepted formats</div>
                  <div className="cv-spec-val">PDF, DOC, DOCX</div>
                </div>
              </div>
              <div className="cv-spec-item">
                <span className="cv-spec-icon">⚖️</span>
                <div>
                  <div className="cv-spec-label">Maximum size</div>
                  <div className="cv-spec-val">5 MB</div>
                </div>
              </div>
            </div>

            {(fileError || errors.cvFile) && <ErrorText>{fileError || errors.cvFile}</ErrorText>}
          </div>
        </div>
      )}

      {/* No CV notice */}
      {data.hasCV === 'No' && (
        <div className="crex-form-group col-full">
          <div className="register-alert register-alert-success" style={{ margin: 0 }}>
            <span>💡</span>
            <span>No problem! You can still complete your registration. CREX may follow up to request a CV during the matching process.</span>
          </div>
        </div>
      )}
    </div>
  )
}

/* ──────────────────────────────────────────────
   STEP 5 — DECLARATION & CONSENT
────────────────────────────────────────────── */
const ConsentCheckbox = ({ id, checked, onChange, label, required, error }) => (
  <div>
    <label className="crex-checkbox" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={!!checked}
        onChange={onChange}
      />
      <span className="checkbox-custom">
        <svg className="checkbox-check" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="1,6 4.5,9.5 11,2"/>
        </svg>
      </span>
      <span className="checkbox-label">{label}</span>
    </label>
    {error && <div style={{ paddingLeft: '28px' }}><ErrorText>{error}</ErrorText></div>}
  </div>
)

const Step5 = ({ data, onChange, errors }) => {
  const handleCheck = (field) => onChange(field, !data[field])

  return (
    <div className="form-grid">

      {/* Required Consents */}
      <div className="crex-form-group col-full">
        <div className="consent-section-header required-header">
          <span className="consent-badge required-badge">Required</span>
        </div>
        <div className="consent-block">
          <ConsentCheckbox
            id="confirmAccuracy"
            checked={data.confirmAccuracy}
            onChange={() => handleCheck('confirmAccuracy')}
            label="I confirm that the information provided is accurate and complete to the best of my knowledge."
            error={errors.confirmAccuracy}
          />
          <ConsentCheckbox
            id="consentDataSharing"
            checked={data.consentDataSharing}
            onChange={() => handleCheck('consentDataSharing')}
            label="I consent to CREX collecting, storing, and sharing my profile with potential employers and partner organisations for recruitment purposes."
            error={errors.consentDataSharing}
          />
        </div>
      </div>

      {/* Optional Consent */}
      <div className="crex-form-group col-full">
        <div className="consent-section-header optional-header">
          <span className="consent-badge optional-badge">Optional</span>
        </div>
        <div className="consent-block">
          <ConsentCheckbox
            id="receiveAlerts"
            checked={data.receiveAlerts}
            onChange={() => handleCheck('receiveAlerts')}
            label="I would like to receive job alerts and updates from CREX via WhatsApp or email."
          />
        </div>
      </div>

      {/* Signature */}
      <div className="crex-form-group">
        <FormLabel htmlFor="signatureName" required>Applicant Signature</FormLabel>
        <input
          id="signatureName"
          className={`crex-input signature-input ${errors.signatureName ? 'is-invalid' : data.signatureName ? 'is-valid' : ''}`}
          type="text"
          placeholder="Type your full name as your signature"
          value={data.signatureName || ''}
          onChange={e => onChange('signatureName', e.target.value)}
        />
        {errors.signatureName && <ErrorText>{errors.signatureName}</ErrorText>}
      </div>

      {/* Date */}
      <div className="crex-form-group">
        <FormLabel htmlFor="signatureDate" required>Date</FormLabel>
        <input
          id="signatureDate"
          className={`crex-input ${errors.signatureDate ? 'is-invalid' : data.signatureDate ? 'is-valid' : ''}`}
          type="date"
          value={data.signatureDate || new Date().toISOString().split('T')[0]}
          onChange={e => onChange('signatureDate', e.target.value)}
        />
        {errors.signatureDate && <ErrorText>{errors.signatureDate}</ErrorText>}
      </div>

      {/* Official Use Only */}
      <div className="crex-form-group col-full">
        <div className="official-use-box">
          <p className="official-use-title">For Official Use Only</p>
          <div className="official-use-fields">
            <div className="official-use-field">
              <span className="official-field-label">Registered by</span>
              <span className="official-field-line"></span>
            </div>
            <div className="official-use-field">
              <span className="official-field-label">Date</span>
              <span className="official-field-line"></span>
            </div>
            <div className="official-use-field">
              <span className="official-field-label">Candidate ID</span>
              <span className="official-field-line"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   SUBMISSION SUCCESS
────────────────────────────────────────────── */
const SubmitSuccess = ({ onGoHome }) => (
  <div className="register-success">
    <div className="success-icon">🎉</div>
    <h2 className="success-title">Registration Submitted!</h2>
    <p className="success-text">
      Thank you for registering with CREX Africa. Your candidate profile has been received and will be reviewed by our team. We will be in touch via WhatsApp or email shortly.
    </p>
    <button className="btn-crex-next" onClick={onGoHome} style={{ margin: '0 auto' }}>
      Return to Home
    </button>
  </div>
)

/* ──────────────────────────────────────────────
   VALIDATION PER STEP
────────────────────────────────────────────── */
const validateStep = (step, formData) => {
  const errs = {}

  if (step === 1) {
    if (!formData.step1.fullName?.trim())     errs.fullName    = 'Full name is required'
    if (!formData.step1.dateOfBirth)           errs.dateOfBirth = 'Date of birth is required'
    if (!formData.step1.gender)                errs.gender      = 'Please select a gender'
    if (!formData.step1.phone?.trim())         errs.phone       = 'Phone number is required'
    if (!formData.step1.email?.trim())         errs.email       = 'Email address is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.step1.email)) errs.email = 'Please enter a valid email'
    if (!formData.step1.address?.trim())       errs.address     = 'Residential address is required'
    if (!formData.step1.city?.trim())          errs.city        = 'City / Town is required'
    if (!formData.step1.region)                errs.region      = 'Please select a region'
    if (!formData.step1.nationality?.trim())   errs.nationality = 'Nationality is required'
    if (!formData.step1.ghanaCard?.trim())     errs.ghanaCard   = 'Ghana Card number is required'
  }

  if (step === 2) {
    if (!formData.step2.industry)              errs.industry         = 'Please select an industry'
    if (!formData.step2.preferredLocation)     errs.preferredLocation= 'Please select a preferred location'
    if (!formData.step2.employmentType)        errs.employmentType   = 'Please select an employment type'
    if (!formData.step2.availableTime)         errs.availableTime    = 'Please select when you can start'
    if (!formData.step2.willingToRelocate)     errs.willingToRelocate= 'Please indicate willingness to relocate'
  }

  if (step === 3) {
    if (!formData.step3.educationLevel)                       errs.educationLevel = 'Please select your education level'
    if (!formData.step3.institutions?.trim())                  errs.institutions   = 'Please list your institution(s) and years completed'
    if (!formData.step3.workYears)                             errs.workYears      = 'Please select your years of experience'
    const skills = formData.step3.keySkills || []
    if (skills.length < 3)                                     errs.keySkills      = `Please add at least 3 key skills (${skills.length} added so far)`
    if (!formData.step3.languages?.length)                     errs.languages      = 'Please select at least one language'
  }

  if (step === 4) {
    if (!formData.step4.hasCV)                 errs.hasCV  = 'Please indicate if you have a CV'
    if (formData.step4.hasCV === 'Yes' && !formData.step4.cvFile) errs.cvFile = 'Please attach your CV'
  }

  if (step === 5) {
    if (!formData.step5.confirmAccuracy)       errs.confirmAccuracy  = 'You must confirm the accuracy of your information'
    if (!formData.step5.consentDataSharing)    errs.consentDataSharing = 'You must consent to data sharing to proceed'
    if (!formData.step5.signatureName?.trim()) errs.signatureName    = 'Please enter your name as a signature'
    if (!formData.step5.signatureDate)         errs.signatureDate    = 'Please enter the date'
  }

  return errs
}

/* ──────────────────────────────────────────────
   MAIN REGISTER COMPONENT
────────────────────────────────────────────── */
const Register = ({ onNavigateHome }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [alertMsg, setAlertMsg] = useState('')
  const totalSteps = 5

  const [formData, setFormData] = useState({
    step1: {
      fullName: '', dateOfBirth: '', gender: '', phone: '',
      email: '', address: '', city: '', region: '',
      nationality: '', ghanaCard: '',
    },
    step2: {
      formerWork: '', jobTitle: '', industry: '', preferredLocation: '',
      otherLocation: '', employmentType: '', availableTime: '', willingToRelocate: '',
    },
    step3: {
      educationLevel: '', otherEducation: '', institutions: '',
      workYears: '', keySkills: [], languages: [], otherLanguage: '',
      certifications: '',
    },
    step4: {
      hasCV: '', cvFile: null,
    },
    step5: {
      confirmAccuracy: false, consentDataSharing: false,
      receiveAlerts: false, signatureName: '', signatureDate: new Date().toISOString().split('T')[0],
    },
  })

  const stepKey = `step${currentStep}`

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [stepKey]: { ...prev[stepKey], [field]: value }
    }))
    // Clear that field's error
    if (errors[field]) {
      setErrors(prev => { const e = { ...prev }; delete e[field]; return e })
    }
  }

  const handleNext = () => {
    const errs = validateStep(currentStep, formData)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      setAlertMsg('Please complete all required fields before continuing.')
      return
    }
    setErrors({})
    setAlertMsg('')
    if (currentStep < totalSteps) {
      setCurrentStep(s => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // Final submit
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    setErrors({})
    setAlertMsg('')
    setCurrentStep(s => s - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) {
    return (
      <div className="register-page">
        <div className="register-header">
          <div className="register-logo-box">
            <div className="register-logo-badge">CREX</div>
            <div className="register-logo-label">Africa</div>
          </div>
        </div>
        <div className="register-card">
          <SubmitSuccess onGoHome={onNavigateHome} />
        </div>
      </div>
    )
  }

  return (
    <div className="register-page">
      {/* ── Header ── */}
      <div className="register-header">
        <button
          className="register-logo-box"
          onClick={onNavigateHome}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <div className="register-logo-badge">CREX</div>
          <div className="register-logo-label">Africa</div>
        </button>
        <h1 className="register-main-title">Create Your Candidate Profile</h1>
        <p className="register-subtitle">
          Complete your profile so CREX can match you with suitable job opportunities.
        </p>
      </div>

      {/* ── Card ── */}
      <div className="register-card">
        {/* Progress */}
        <StepProgressHeader currentStep={currentStep} totalSteps={totalSteps} />

        {/* Alert */}
        {alertMsg && (
          <div className="register-alert register-alert-error">
            <span>⚠️</span>
            <span>{alertMsg}</span>
          </div>
        )}

        {/* Form Body */}
        <div className="register-form-body">
          {currentStep === 1 && (
            <Step1
              data={formData.step1}
              onChange={handleChange}
              errors={errors}
            />
          )}
          {currentStep === 2 && (
            <Step2
              data={formData.step2}
              onChange={handleChange}
              errors={errors}
            />
          )}
          {currentStep === 3 && (
            <Step3
              data={formData.step3}
              onChange={handleChange}
              errors={errors}
            />
          )}
          {currentStep === 4 && (
            <Step4
              data={formData.step4}
              onChange={handleChange}
              errors={errors}
            />
          )}
          {currentStep === 5 && (
            <Step5
              data={formData.step5}
              onChange={handleChange}
              errors={errors}
            />
          )}
        </div>

        {/* Actions */}
        <div className="register-form-actions">
          <button
            className="btn-crex-back"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back
          </button>

          <button className="btn-crex-next" onClick={handleNext}>
            {currentStep === totalSteps ? 'Submit Registration' : 'Save & Continue'}
            {currentStep < totalSteps && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            )}
            {currentStep === totalSteps && <span>✓</span>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register
