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

  /* ── Step 1: Personal & Contact Information ── */
  if (step === 1) {
    if (!data.title)                   e.title       = 'Please select a title'
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

  /* ── Step 2: Expertise & Professional Background ── */
  if (step === 2) {
    if (!data.jobTitle?.trim())        e.jobTitle    = 'Job title / role is required'
    if (!data.educationLevel)          e.educationLevel = 'Please select your highest level of education'
    if (!data.institutions?.trim())    e.institutions   = 'Please list your institution(s) and years completed'
    if (!data.workYears)               e.workYears      = 'Please select your years of working experience'
    const skillCount = (data.keySkills || []).length
    if (skillCount < 3)                e.keySkills      = `Please select at least 3 key skills (${skillCount} selected)`
    if (!(data.languages || []).length) e.languages     = 'Please select at least one language spoken'
  }

  /* ── Step 3: Job Preferences ── */
  if (step === 3) {
    if (!data.availableTime)        e.availableTime     = 'Please select your availability'
    if (!data.employmentType)       e.employmentType    = 'Please select preferred job type'
    if (!data.weeklyCommitment)     e.weeklyCommitment  = 'Please select weekly commitment'
    if (!data.preferredLocation)    e.preferredLocation = 'Please select preferred location'
    if (!data.howHeard)             e.howHeard          = 'Please select how you heard about us'
    if (!data.willingToRelocate)    e.willingToRelocate = 'Please select relocation preference'
    if (!data.hasCV)                e.hasCV             = 'Please indicate whether you have a CV'
    if (data.hasCV === 'Yes' && !data.cvFile) e.cvFile  = 'Please attach your CV to continue'
  }

  /* ── Step 4: Declaration & Consent ── */
  if (step === 4) {
    if (!data.confirmAccuracy)       e.confirmAccuracy    = 'You must confirm that your information is accurate'
    if (!data.consentDataSharing)    e.consentDataSharing = 'You must consent to data sharing to proceed'
    if (!data.signatureName?.trim()) e.signatureName      = 'Applicant signature (full name) is required'
    if (!data.signatureDate)         e.signatureDate      = 'Please enter the date'
  }

  return e
}

