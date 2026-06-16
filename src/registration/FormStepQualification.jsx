/* ─────────────────────────────────────────────────────────
   Step 3 – Qualifications & Experience
───────────────────────────────────────────────────────── */
import React from 'react'
import {
  FormField, TextInput, SelectInput, Textarea,
  SkillsTagInput, LanguageCheckboxGrid,
} from './formUtils'
import { EDUCATION_LEVELS, WORK_YEARS, LANGUAGES } from './formConstants'

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

  return (
    <div className="form-grid">

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

      {/* Other Education – conditional */}
      {showOtherEducation && (
        <FormField label="Specify Your Qualification" htmlFor="otherEducation" fullWidth>
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
        helper="Add school name(s) and years completed, one per line"
        fullWidth
      >
        <Textarea
          id="institutions"
          placeholder={"e.g. University of Ghana – BA Economics (2002)\nKNUST – MBA Finance (2006)"}
          value={data.institutions}
          onChange={v => onChange('institutions', v)}
          error={errors.institutions}
          rows={3}
        />
      </FormField>

      {/* Key Skills – tag input, full width */}
      <FormField
        label="Key Skills"
        required
        error={errors.keySkills}
        fullWidth
      >
        <SkillsTagInput
          skills={data.keySkills || []}
          onChange={val => onChange('keySkills', val)}
          error={errors.keySkills}
        />
        {errors.keySkills && (
          <span className="crex-error-text" style={{ display: 'block', marginTop: '4px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            {errors.keySkills}
          </span>
        )}
      </FormField>

      {/* Languages Spoken – checkbox grid, full width */}
      <FormField
        label="Languages Spoken"
        required
        error={errors.languages}
        fullWidth
      >
        <LanguageCheckboxGrid
          options={ALL_LANGUAGES}
          selected={data.languages || []}
          onToggle={toggleLanguage}
        />
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
          placeholder="e.g. ACCA (2010), Project Management Professional – PMP (2015)"
          value={data.certifications}
          onChange={v => onChange('certifications', v)}
          rows={2}
        />
      </FormField>

    </div>
  )
}

export default FormStepQualification
