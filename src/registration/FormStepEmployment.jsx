/* ─────────────────────────────────────────────────────────
   Step 3 – Job Preferences & CV Upload
   Redesigned for Retired Experts Membership Portal
   ───────────────────────────────────────────────────────── */
import React, { useRef, useState } from 'react'
import { FormField, TextInput, SelectInput, RadioGroup, HelperText, ErrorText } from './formUtils'
import {
  LOCATIONS,
  JOB_TYPES,
  WEEKLY_COMMITMENTS,
  HOW_HEARD_OPTIONS,
  ACCEPTED_CV_EXTENSIONS,
  ACCEPTED_CV_MIME_TYPES,
  MAX_CV_SIZE_MB,
} from './formConstants'

const AVAILABILITY_OPTIONS = ['Immediately', 'In 2 weeks', 'In a month', 'Flexible']

const FormStepEmployment = ({ data, onChange, errors }) => {
  const showOtherLocation = data.preferredLocation === 'Other'
  const fileRef = useRef(null)
  const [fileErr, setFileErr] = useState('')

  const handleFileValidate = (file) => {
    if (!file) return
    setFileErr('')
    const ext = '.' + file.name.split('.').pop().toLowerCase()
    if (!ACCEPTED_CV_EXTENSIONS.includes(ext) && !ACCEPTED_CV_MIME_TYPES.includes(file.type)) {
      setFileErr('Unsupported file type. Please upload a PDF, DOC, or DOCX file.')
      return
    }
    if (file.size > MAX_CV_SIZE_MB * 1024 * 1024) {
      setFileErr(`File too large. Maximum allowed size is ${MAX_CV_SIZE_MB} MB.`)
      return
    }
    onChange('cvFile', file)
  }

  const removeFile = (e) => {
    e.stopPropagation()
    onChange('cvFile', null)
    setFileErr('')
    if (fileRef.current) fileRef.current.value = ''
  }

  const hasCV = data.hasCV === 'Yes'
  const hasError = fileErr || errors.cvFile

  return (
    <div className="form-grid">
      {/* Section Divider */}
      <div className="form-section-label col-full">Job Preferences</div>

      {/* Availability */}
      <FormField label="Availability" htmlFor="availableTime" required error={errors.availableTime}>
        <SelectInput
          id="availableTime"
          placeholder="Select Availability"
          options={AVAILABILITY_OPTIONS}
          value={data.availableTime}
          onChange={v => onChange('availableTime', v)}
          error={errors.availableTime}
        />
      </FormField>

      {/* Job Type */}
      <FormField label="Job Type" htmlFor="employmentType" required error={errors.employmentType}>
        <SelectInput
          id="employmentType"
          placeholder="Select Job Type"
          options={JOB_TYPES}
          value={data.employmentType}
          onChange={v => onChange('employmentType', v)}
          error={errors.employmentType}
        />
      </FormField>

      {/* Weekly Commitment */}
      <FormField label="Weekly Commitment" htmlFor="weeklyCommitment" required error={errors.weeklyCommitment}>
        <SelectInput
          id="weeklyCommitment"
          placeholder="Select Weekly Commitment"
          options={WEEKLY_COMMITMENTS}
          value={data.weeklyCommitment}
          onChange={v => onChange('weeklyCommitment', v)}
          error={errors.weeklyCommitment}
        />
      </FormField>

      {/* How did you hear about CREX */}
      <FormField label="How did you hear about CREX?" htmlFor="howHeard" required error={errors.howHeard}>
        <SelectInput
          id="howHeard"
          placeholder="Select Wording"
          options={HOW_HEARD_OPTIONS}
          value={data.howHeard}
          onChange={v => onChange('howHeard', v)}
          error={errors.howHeard}
        />
      </FormField>

      {/* Preferred Job Location */}
      <FormField label="Preferred Job Location" htmlFor="preferredLocation" required error={errors.preferredLocation}>
        <SelectInput
          id="preferredLocation"
          placeholder="Select Location"
          options={LOCATIONS}
          value={data.preferredLocation}
          onChange={v => {
            onChange('preferredLocation', v)
            if (v !== 'Other') onChange('otherLocation', '')
          }}
          error={errors.preferredLocation}
        />
      </FormField>

      {/* Willing to Relocate */}
      <FormField label="Willing to Relocate?" required error={errors.willingToRelocate}>
        <RadioGroup
          name="willingToRelocate"
          options={['Yes', 'No']}
          value={data.willingToRelocate}
          onChange={v => onChange('willingToRelocate', v)}
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

      {/* Section Divider - CV Upload */}
      <div className="form-section-label col-full">Curriculum Vitae (CV) Upload</div>

      {/* Do you have a CV? */}
      <FormField label="Do you have a CV?" required error={errors.hasCV} fullWidth>
        <RadioGroup
          name="hasCV"
          options={['Yes', 'No']}
          value={data.hasCV}
          onChange={v => {
            onChange('hasCV', v)
            if (v === 'No') {
              onChange('cvFile', null)
              setFileErr('')
            }
          }}
        />
      </FormField>

      {/* Upload zone – shown only when user says Yes */}
      {hasCV && (
        <div className="crex-form-group col-full">
          <label className="crex-label">
            Upload CV <span className="required-star">*</span>
          </label>
          <HelperText>Please upload your most recent CV.</HelperText>

          <div style={{ marginTop: '10px' }}>
            {/* Drop zone */}
            <div
              className={`file-upload-zone${data.cvFile ? ' has-file' : ''}${hasError ? ' upload-error' : ''}`}
              onClick={() => fileRef.current?.click()}
              onDrop={e => {
                e.preventDefault()
                handleFileValidate(e.dataTransfer.files[0])
              }}
              onDragOver={e => e.preventDefault()}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && fileRef.current?.click()}
              aria-label="CV file upload area"
            >
              {data.cvFile ? (
                <>
                  <span className="file-upload-icon">✅</span>
                  <div className="file-name-display">{data.cvFile.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--crex-muted)', marginTop: '4px' }}>
                    {(data.cvFile.size / (1024 * 1024)).toFixed(2)} MB
                  </div>
                  <button type="button" className="file-remove-btn" onClick={removeFile}>
                    Remove file
                  </button>
                </>
              ) : (
                <>
                  <span className="file-upload-icon">📄</span>
                  <p className="file-upload-text">
                    <strong>Click to upload</strong> or drag and drop your CV here
                  </p>
                  <p className="file-upload-hint">PDF, DOC, DOCX only · Max {MAX_CV_SIZE_MB} MB</p>
                </>
              )}
            </div>

            {/* Hidden file input */}
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }}
              onChange={e => handleFileValidate(e.target.files[0])}
            />

            {/* File specs */}
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
                  <div className="cv-spec-val">{MAX_CV_SIZE_MB} MB</div>
                </div>
              </div>
            </div>

            {hasError && <ErrorText>{fileErr || errors.cvFile}</ErrorText>}
          </div>
        </div>
      )}

      {/* Friendly note when user has no CV */}
      {data.hasCV === 'No' && (
        <div className="crex-form-group col-full">
          <div className="register-alert register-alert-success" style={{ margin: 0 }}>
            <span>💡</span>
            <span>
              No problem! You can still complete your registration. CREX may follow up
              to request a CV during the matching process.
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default FormStepEmployment
