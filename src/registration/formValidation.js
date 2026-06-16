/* ─────────────────────────────────────────────────────────
   CREX AFRICA – Per-step Validation Logic
───────────────────────────────────────────────────────── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Validate a single step.
 * @param {number} step - 1-indexed step number
 * @param {object} data - the full flat formData object
 * @returns {object} errors - keyed by field name
 */
export function validateStep(step, data) {
  const e = {}

  /* ── Step 1: Personal Information ── */
  if (step === 1) {
    if (!data.fullName?.trim())       e.fullName    = 'Full name is required'
    if (!data.dateOfBirth)             e.dateOfBirth = 'Date of birth is required'
    if (!data.gender)                  e.gender      = 'Please select a gender'
    if (!data.phone?.trim())           e.phone       = 'Phone number is required'
    if (!data.email?.trim())           e.email       = 'Email address is required'
    else if (!EMAIL_RE.test(data.email)) e.email     = 'Please enter a valid email address'
    if (!data.address?.trim())         e.address     = 'Residential address is required'
    if (!data.city?.trim())            e.city        = 'City / Town is required'
    if (!data.region)                  e.region      = 'Please select a region'
    if (!data.nationality?.trim())     e.nationality = 'Nationality is required'
    if (!data.ghanaCard?.trim())       e.ghanaCard   = 'Ghana Card number is required'
  }

  /* ── Step 2: Employment ── */
  if (step === 2) {
    if (!data.industry)             e.industry          = 'Please select an industry'
    if (!data.preferredLocation)    e.preferredLocation = 'Please select a preferred job location'
    if (!data.employmentType)       e.employmentType    = 'Please select an employment type'
    if (!data.availableTime)        e.availableTime     = 'Please indicate when you can start'
    if (!data.willingToRelocate)    e.willingToRelocate = 'Please indicate willingness to relocate'
  }

  /* ── Step 3: Qualifications ── */
  if (step === 3) {
    if (!data.educationLevel)          e.educationLevel = 'Please select your highest level of education'
    if (!data.institutions?.trim())    e.institutions   = 'Please list your institution(s) and years completed'
    if (!data.workYears)               e.workYears      = 'Please select your years of working experience'
    const skillCount = (data.keySkills || []).length
    if (skillCount < 3)                e.keySkills      = `Please add at least 3 key skills (${skillCount} added so far)`
    if (!(data.languages || []).length) e.languages     = 'Please select at least one language spoken'
  }

  /* ── Step 4: CV Upload ── */
  if (step === 4) {
    if (!data.hasCV)                   e.hasCV  = 'Please indicate whether you have a CV'
    if (data.hasCV === 'Yes' && !data.cvFile) e.cvFile = 'Please attach your CV to continue'
  }

  /* ── Step 5: Declaration & Consent ── */
  if (step === 5) {
    if (!data.confirmAccuracy)       e.confirmAccuracy    = 'You must confirm that your information is accurate'
    if (!data.consentDataSharing)    e.consentDataSharing = 'You must consent to data sharing to proceed'
    if (!data.signatureName?.trim()) e.signatureName      = 'Applicant signature (full name) is required'
    if (!data.signatureDate)         e.signatureDate      = 'Please enter the date'
  }

  return e
}
