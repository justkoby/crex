/* ─────────────────────────────────────────────────────────
   Step 4 – CV Upload
───────────────────────────────────────────────────────── */
import React, { useRef, useState } from 'react'
import { FormField, RadioGroup, ErrorText, HelperText } from './formUtils'
import {
  ACCEPTED_CV_EXTENSIONS,
  ACCEPTED_CV_MIME_TYPES,
  MAX_CV_SIZE_MB,
} from './formConstants'

const FormStepUpload = ({ data, onChange, errors }) => {
  const fileRef   = useRef(null)
  const [fileErr, setFileErr] = useState('')

  const validate = (file) => {
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

      {/* Does the applicant have a CV? */}
      <FormField label="Do you have a CV?" required error={errors.hasCV} fullWidth>
        <RadioGroup
          name="hasCV"
          options={['Yes', 'No']}
          value={data.hasCV}
          onChange={v => {
            onChange('hasCV', v)
            if (v === 'No') { onChange('cvFile', null); setFileErr('') }
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
              onDrop={e => { e.preventDefault(); validate(e.dataTransfer.files[0]) }}
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
              onChange={e => validate(e.target.files[0])}
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

export default FormStepUpload
