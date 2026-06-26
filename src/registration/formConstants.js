/* ─────────────────────────────────────────────────────────
   CREX AFRICA – Registration Form Constants
───────────────────────────────────────────────────────── */

export const GHANA_REGIONS = [
  'Ahafo', 'Ashanti', 'Bono', 'Bono East', 'Central',
  'Eastern', 'Greater Accra', 'North East', 'Northern',
  'Oti', 'Savannah', 'Upper East', 'Upper West',
  'Volta', 'Western', 'Western North',
]

export const INDUSTRIES = [
  'Health', 'Education', 'Finance', 'Construction',
  'Technology', 'Hospitality', 'Retail', 'Administration',
  'Sales & Marketing', 'Security', 'Transport & Logistics',
  'Manufacturing', 'Agriculture', 'Legal & Compliance',
  'Media & Communications', 'Other',
]

export const LOCATIONS = [
  'Accra', 'Kumasi', 'Takoradi', 'Tema',
  'Cape Coast', 'Tamale', 'Remote', 'Any Location', 'Other',
]

export const EMPLOYMENT_TYPES = [
  'Full-time', 'Part-time', 'Contract', 'Remote', 'Hybrid',
]

export const AVAILABILITY_OPTIONS = [
  'Immediately', 'In 2 weeks', 'In a month',
]

export const EDUCATION_LEVELS = [
  'SHS (Senior High School)',
  'HND (Higher National Diploma)',
  'Diploma',
  'Degree (Bachelor\'s)',
  'Master\'s Degree',
  'PhD (Doctorate)',
  'Other',
]

export const WORK_YEARS = [
  'No experience',
  'Less than 1 year',
  '1 – 2 years',
  '3 – 5 years',
  '6 – 10 years',
  '10+ years',
]

export const LANGUAGES = [
  'English', 'French', 'Twi', 'Ga', 'Ewe', 'Hausa',
]

export const ACCEPTED_CV_EXTENSIONS = ['.pdf', '.doc', '.docx']
export const ACCEPTED_CV_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
export const MAX_CV_SIZE_MB = 5

export const TITLES = ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.']
export const GENDERS = ['Male', 'Female']
export const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Consultancy', 'Advisory', 'Remote', 'Hybrid']
export const WEEKLY_COMMITMENTS = ['1 – 10 hours', '11 – 20 hours', '21 – 30 hours', '30+ hours', 'Flexible']
export const HOW_HEARD_OPTIONS = ['Word of Mouth', 'Social Media', 'Newspaper / Radio', 'Flyer / Brochure', 'CREX Event', 'Other']
export const COMMON_SKILLS = [
  'Consulting',
  'Mentorship & Coaching',
  'Project Management',
  'Financial Management',
  'Strategic Planning',
  'Administration',
  'Human Resources',
  'Teaching & Training',
  'Research & Analysis',
  'Policy Development',
  'Operations Management',
  'Public Relations',
]

export const STEP_LABELS = [
  'Personal Info',
  'Expertise',
  'Preferences',
  'Declaration',
]

export const STEP_TITLES = [
  'Personal & Contact Information',
  'Expertise & Professional Background',
  'Job Preferences',
  'Declaration & Consent',
]

export const TOTAL_STEPS = 4

/** Default empty state for the entire form */
export const INITIAL_FORM_DATA = {
  // Step 1 – Personal & Contact
  title:        '',
  fullName:     '',
  dateOfBirth:  '',
  gender:       '',
  phone:        '',
  email:        '',
  address:      '',
  city:         '',
  region:       '',
  nationality:  '',
  ghanaCard:    '',

  // Step 2 – Expertise & Background
  formerWork:         '',
  jobTitle:           '',
  industry:           '',
  educationLevel:     '',
  otherEducation:     '',
  institutions:       '',
  workYears:          '',
  keySkills:          [],   // array of strings
  languages:          [],   // array of strings
  otherLanguage:      '',
  certifications:     '',

  // Step 3 – Preferences & CV
  availableTime:      '',   // Availability
  employmentType:     '',   // Job Type
  weeklyCommitment:   '',   // Weekly Commitment
  willingToRelocate:  '',
  preferredLocation:  '',
  otherLocation:      '',
  howHeard:           '',   // How heard about CREX
  hasCV:              '',
  cvFile:             null,

  // Step 4 – Consent & Signature
  confirmAccuracy:    false,
  consentDataSharing: false,
  receiveAlerts:      false,
  signatureName:      '',
  signatureDate:      new Date().toISOString().split('T')[0],
}

