/* ─────────────────────────────────────────────────────────
   Step 2 – Expertise & Professional Background
   Redesigned for Retired Experts Membership Portal
   ───────────────────────────────────────────────────────── */
import React from 'react'
import { FormField, TextInput, SelectInput, Textarea } from './formUtils'
import {
  INDUSTRIES,
  EDUCATION_LEVELS,
  WORK_YEARS,
  LANGUAGES,
  COMMON_SKILLS,
} from './formConstants'

const ALL_LANGUAGES = [...LANGUAGES, 'Other']

const FormStepQualification = ({ data, onChange, errors }) => {
  const showOtherEducation = data.educationLevel === 'Other'
  const showOtherLanguage  = (data.languages || []).includes('Other')

  const toggleLanguage = (lang) => {
    const current = data.languages || []
    onChange('languages',
      current.includes(lang)
        ? current.filter(l => l !== lang)
        : [...current, lang]
    )
  }

  const toggleSkill = (skill) => {
    const current = data.keySkills || []
    onChange('keySkills',
      current.includes(skill)
        ? current.filter(s => s !== skill)
        : [...current, skill]
    )
  }

  return (
    <div className="form-grid">
      {/* Section Divider */}
      <div className="form-section-label col-full">Expertise & Professional Background</div>

      {/* Job Title / Role */}
      <FormField
        label="Job Title / Role (Pre-retirement)"
        htmlFor="jobTitle"
        required
        error={errors.jobTitle}
        helper="What was your main role or profession before retirement?"
      >
        <TextInput
          id="jobTitle"
          placeholder="e.g. Senior Lecturer, Finance Director"
          value={data.jobTitle}
          onChange={v => onChange('jobTitle', v)}
          error={errors.jobTitle}
          valid={!errors.jobTitle && !!data.jobTitle}
        />
      </FormField>

      {/* Former Place of Work */}
      <FormField label="Former Place of Work" htmlFor="formerWork">
        <TextInput
          id="formerWork"
          placeholder="e.g. Ghana Education Service, Barclays Bank"
          value={data.formerWork}
          onChange={v => onChange('formerWork', v)}
        />
      </FormField>

      {/* Industry */}
      <FormField label="Industry" htmlFor="industry" required error={errors.industry}>
        <SelectInput
          id="industry"
          placeholder="Select Industry"
          options={INDUSTRIES}
          value={data.industry}
          onChange={v => onChange('industry', v)}
          error={errors.industry}
        />
      </FormField>

      {/* Years of Working Experience */}
      <FormField label="Years of Working Experience" htmlFor="workYears" required error={errors.workYears}>
        <SelectInput
          id="workYears"
          placeholder="Select years"
          options={WORK_YEARS}
          value={data.workYears}
          onChange={v => onChange('workYears', v)}
          error={errors.workYears}
        />
      </FormField>

      {/* Highest Level of Education */}
      <FormField label="Highest Level of Education" htmlFor="educationLevel" required error={errors.educationLevel}>
        <SelectInput
          id="educationLevel"
          placeholder="Select education level"
          options={EDUCATION_LEVELS}
          value={data.educationLevel}
          onChange={v => onChange('educationLevel', v)}
          error={errors.educationLevel}
        />
      </FormField>

      {/* Other Education – conditional */}
      {showOtherEducation && (
        <FormField label="Specify Your Qualification" htmlFor="otherEducation">
          <TextInput
            id="otherEducation"
            placeholder="Please specify your qualification"
            value={data.otherEducation}
            onChange={v => onChange('otherEducation', v)}
          />
        </FormField>
      )}

      {/* Institution(s) Attended – textarea, full width */}
      <FormField
        label="Institution(s) Attended"
        htmlFor="institutions"
        required
        error={errors.institutions}
        helper="Add school/institution name(s) and years completed, one per line"
        fullWidth
      >
        <Textarea
          id="institutions"
          placeholder={"e.g. University of Ghana – BA Economics (1985)\nKNUST – MSc Civil Engineering (1990)"}
          value={data.institutions}
          onChange={v => onChange('institutions', v)}
          error={errors.institutions}
          rows={3}
        />
      </FormField>

      {/* Key Skills – checkbox grid, full width */}
      <FormField
        label="Key Skills"
        required
        error={errors.keySkills}
        helper="Select at least 3 skills that represent your core expertise."
        fullWidth
      >
        <div className="language-checkbox-grid">
          {COMMON_SKILLS.map(skill => (
            <label key={skill} className="language-checkbox-item">
              <input
                type="checkbox"
                className="lang-checkbox-input"
                id={`skill-${skill}`}
                checked={(data.keySkills || []).includes(skill)}
                onChange={() => toggleSkill(skill)}
              />
              <span className="lang-checkbox-custom">
                <svg className="lang-check-icon" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="1,6 4.5,9.5 11,2" />
                </svg>
              </span>
              <span className="lang-label">{skill}</span>
            </label>
          ))}
        </div>
      </FormField>

      {/* Languages Spoken – checkbox grid, full width */}
      <FormField
        label="Languages Spoken"
        required
        error={errors.languages}
        fullWidth
      >
        <div className="language-checkbox-grid">
          {ALL_LANGUAGES.map(lang => (
            <label key={lang} className="language-checkbox-item">
              <input
                type="checkbox"
                className="lang-checkbox-input"
                id={`lang-${lang}`}
                checked={(data.languages || []).includes(lang)}
                onChange={() => toggleLanguage(lang)}
              />
              <span className="lang-checkbox-custom">
                <svg className="lang-check-icon" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="1,6 4.5,9.5 11,2" />
                </svg>
              </span>
              <span className="lang-label">{lang}</span>
            </label>
          ))}
        </div>
      </FormField>

      {/* Other Language – conditional */}
      {showOtherLanguage && (
        <FormField label="Specify Other Language(s)" htmlFor="otherLanguage" fullWidth>
          <TextInput
            id="otherLanguage"
            placeholder="e.g. Dagbani, Arabic"
            value={data.otherLanguage}
            onChange={v => onChange('otherLanguage', v)}
          />
        </FormField>
      )}

      {/* Professional Certifications – optional, full width */}
      <FormField
        label="Professional Certifications"
        htmlFor="certifications"
        optional
        fullWidth
      >
        <Textarea
          id="certifications"
          placeholder="e.g. Chartered Accountant – ICA Ghana (1988), PMP (2005)"
          value={data.certifications}
          onChange={v => onChange('certifications', v)}
          rows={2}
        />
      </FormField>
    </div>
  )
}

export default FormStepQualification
