/* ─────────────────────────────────────────────────────────
   CREX AFRICA – Shared Form UI Components
   Used across all step components
───────────────────────────────────────────────────────── */
import React, { useState } from 'react'

/* ── Labels & Helper Text ─────────────────────────────── */
export const FormLabel = ({ htmlFor, children, required, optional }) => (
  <label className="crex-label" htmlFor={htmlFor}>
    {children}
    {required && <span className="required-star">*</span>}
    {optional && (
      <span style={{ fontWeight: 400, color: 'var(--crex-muted)', fontSize: '12px', marginLeft: '8px' }}>
        (Optional)
      </span>
    )}
  </label>
)

export const HelperText = ({ children }) => (
  <span className="crex-helper-text">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
    </svg>
    {children}
  </span>
)

export const ErrorText = ({ children }) => (
  <span className="crex-error-text">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
    </svg>
    {children}
  </span>
)

/* ── Text / Email / Tel / Date Input ──────────────────── */
export const TextInput = ({ id, type = 'text', placeholder, value, onChange, error, valid, style }) => (
  <input
    id={id}
    type={type}
    className={`crex-input${error ? ' is-invalid' : valid ? ' is-valid' : ''}`}
    placeholder={placeholder}
    value={value}
    onChange={e => onChange(e.target.value)}
    style={style}
  />
)

/* ── Textarea ─────────────────────────────────────────── */
export const Textarea = ({ id, placeholder, value, onChange, error, rows = 3 }) => (
  <textarea
    id={id}
    className={`crex-input crex-textarea${error ? ' is-invalid' : value ? ' is-valid' : ''}`}
    placeholder={placeholder}
    value={value}
    onChange={e => onChange(e.target.value)}
    rows={rows}
  />
)

/* ── Select Dropdown ──────────────────────────────────── */
export const SelectInput = ({ id, value, onChange, options, placeholder, error }) => (
  <div className="crex-select-wrapper">
    <select
      id={id}
      className={`crex-select${error ? ' is-invalid' : value ? ' is-valid' : ''}`}
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="">{placeholder || 'Select…'}</option>
      {options.map(opt => (
        <option key={opt.value ?? opt} value={opt.value ?? opt}>
          {opt.label ?? opt}
        </option>
      ))}
    </select>
  </div>
)

/* ── Radio Group ──────────────────────────────────────── */
export const RadioGroup = ({ name, options, value, onChange, vertical = false }) => (
  <div className="radio-group" style={vertical ? { flexDirection: 'column', gap: '10px' } : {}}>
    {options.map(opt => (
      <label key={opt} className="radio-option">
        <input
          type="radio"
          name={name}
          value={opt}
          checked={value === opt}
          onChange={() => onChange(opt)}
        />
        <span className="radio-custom" />
        <span className="radio-label">{opt}</span>
      </label>
    ))}
  </div>
)

/* ── Pill Radio Group (single-select) ────────────────── */
export const PillRadioGroup = ({ name, options, value, onChange }) => (
  <div className="radio-pill-group">
    {options.map(opt => (
      <label key={opt} className="radio-pill">
        <input
          type="radio"
          name={name}
          value={opt}
          checked={value === opt}
          onChange={() => onChange(opt)}
        />
        <span className="radio-pill-label">{opt}</span>
      </label>
    ))}
  </div>
)

/* ── Language Checkbox Grid ───────────────────────────── */
export const LanguageCheckboxGrid = ({ options, selected, onToggle }) => (
  <div className="language-checkbox-grid">
    {options.map(lang => (
      <label key={lang} className="language-checkbox-item">
        <input
          type="checkbox"
          className="lang-checkbox-input"
          id={`lang-${lang}`}
          checked={selected.includes(lang)}
          onChange={() => onToggle(lang)}
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
)

/* ── Skills Tag Input ────────────────────────────────── */
export const SkillsTagInput = ({ skills, onChange, error }) => {
  const [inputVal, setInputVal] = useState('')
  const MAX = 5
  const MIN = 3

  const add = (val) => {
    const t = val.trim()
    if (!t || skills.includes(t) || skills.length >= MAX) { setInputVal(''); return }
    onChange([...skills, t])
    setInputVal('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(inputVal) }
    else if (e.key === 'Backspace' && !inputVal && skills.length > 0) {
      onChange(skills.slice(0, -1))
    }
  }

  return (
    <div>
      <div className={`skills-tag-box${error ? ' is-invalid' : skills.length >= MIN ? ' is-valid' : ''}`}>
        {skills.map((sk, i) => (
          <span key={i} className="skill-tag">
            {sk}
            <button
              type="button"
              className="skill-tag-remove"
              onClick={() => onChange(skills.filter((_, j) => j !== i))}
              aria-label={`Remove ${sk}`}
            >×</button>
          </span>
        ))}
        {skills.length < MAX && (
          <input
            className="skills-tag-input"
            type="text"
            placeholder={skills.length === 0 ? 'e.g. Leadership, Finance…' : 'Add skill…'}
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => add(inputVal)}
          />
        )}
      </div>
      <HelperText>
        Press Enter or comma to add · Min 3, Max 5 · {MAX - skills.length} slot(s) remaining
      </HelperText>
    </div>
  )
}

/* ── Consent Checkbox ────────────────────────────────── */
export const ConsentCheckbox = ({ id, checked, onChange, label, error }) => (
  <div>
    <label className="crex-checkbox" htmlFor={id}>
      <input id={id} type="checkbox" checked={!!checked} onChange={onChange} />
      <span className="checkbox-custom">
        <svg className="checkbox-check" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="1,6 4.5,9.5 11,2" />
        </svg>
      </span>
      <span className="checkbox-label">{label}</span>
    </label>
    {error && <div style={{ paddingLeft: '28px', marginTop: '4px' }}><ErrorText>{error}</ErrorText></div>}
  </div>
)

/* ── Form Field Wrapper ──────────────────────────────── */
export const FormField = ({ label, htmlFor, required, optional, helper, error, children, fullWidth }) => (
  <div className={`crex-form-group${fullWidth ? ' col-full' : ''}`}>
    {label && <FormLabel htmlFor={htmlFor} required={required} optional={optional}>{label}</FormLabel>}
    {children}
    {helper && !error && <HelperText>{helper}</HelperText>}
    {error && <ErrorText>{error}</ErrorText>}
  </div>
)
