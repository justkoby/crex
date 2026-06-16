/* ─────────────────────────────────────────────────────────
   Step 2 – Employment & Job Search Details
───────────────────────────────────────────────────────── */
import React from 'react'
import { FormField, TextInput, SelectInput, RadioGroup, PillRadioGroup } from './formUtils'
import { INDUSTRIES, LOCATIONS, EMPLOYMENT_TYPES, AVAILABILITY_OPTIONS } from './formConstants'

const FormStepEmployment = ({ data, onChange, errors }) => {
  const showOtherLocation = data.preferredLocation === 'Other'

  return (
    <div className="form-grid">

      {/* Former Place of Work */}
      <FormField label="Former Place of Work" htmlFor="formerWork">
        <TextInput
          id="formerWork"
          placeholder="e.g. Ghana Education Service"
          value={data.formerWork}
          onChange={v => onChange('formerWork', v)}
        />
      </FormField>

      {/* Job Title / Role */}
      <FormField label="Job Title / Role" htmlFor="jobTitle">
        <TextInput
          id="jobTitle"
          placeholder="e.g. Senior Lecturer"
          value={data.jobTitle}
          onChange={v => onChange('jobTitle', v)}
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

      {/* Preferred Job Location */}
      <FormField label="Preferred Job Location" htmlFor="preferredLocation" required error={errors.preferredLocation}>
        <SelectInput
          id="preferredLocation"
          placeholder="Select Location"
          options={LOCATIONS}
          value={data.preferredLocation}
          onChange={v => { onChange('preferredLocation', v); if (v !== 'Other') onChange('otherLocation', '') }}
          error={errors.preferredLocation}
        />
      </FormField>

      {/* Other Location – conditional */}
      {showOtherLocation && (
        <FormField label="Specify Other Location" htmlFor="otherLocation" fullWidth>
          <TextInput
            id="otherLocation"
            placeholder="e.g. Sunyani"
            value={data.otherLocation}
            onChange={v => onChange('otherLocation', v)}
          />
        </FormField>
      )}

      {/* Available Time to Start */}
      <FormField label="Available Time to Start" required error={errors.availableTime}>
        <RadioGroup
          name="availableTime"
          options={AVAILABILITY_OPTIONS}
          value={data.availableTime}
          onChange={v => onChange('availableTime', v)}
          vertical
        />
      </FormField>

      {/* Employment Type */}
      <FormField label="Employment Type" required error={errors.employmentType}>
        <PillRadioGroup
          name="employmentType"
          options={EMPLOYMENT_TYPES}
          value={data.employmentType}
          onChange={v => onChange('employmentType', v)}
        />
      </FormField>

      {/* Willing to Relocate */}
      <FormField label="Willing to Relocate?" required error={errors.willingToRelocate} fullWidth>
        <RadioGroup
          name="willingToRelocate"
          options={['Yes', 'No']}
          value={data.willingToRelocate}
          onChange={v => onChange('willingToRelocate', v)}
        />
      </FormField>

    </div>
  )
}

export default FormStepEmployment
