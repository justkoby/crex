/* ─────────────────────────────────────────────────────────
   Step 1 – Personal & Contact Information
   Redesigned for Retired Experts Membership Portal
   ───────────────────────────────────────────────────────── */
import React from 'react'
import { FormField, TextInput, SelectInput, Textarea } from './formUtils'
import { GHANA_REGIONS, TITLES, GENDERS } from './formConstants'

const FormStepPersonal = ({ data, onChange, errors }) => {
  return (
    <div className="form-grid">
      {/* Welcome Intro Box */}
      <div className="crex-intro-box col-full">
        <p className="intro-title">Centre for Retired Experts (CREX)</p>
        <p className="intro-text">
          Welcome to the Centre for Retired Experts (CREX), a non-governmental, apolitical organisation that mobilises the experience, knowledge, and expertise of retirees across the public, private, and civil society sectors for post-retirement job opportunities.
        </p>
        <p className="intro-text">
          By completing this form, you are offering to join a community of retired experts who remain active nation-builders at their own pace and expressing your willingness to accept CREX-sourced job opportunities inside and outside Ghana when they become available.
        </p>
        <div className="intro-alert">
          <span className="intro-alert-icon">⏱️</span>
          <p className="intro-alert-text">
            This form takes a few minutes to complete. Your information will be handled confidentially and used solely for CREX membership and job engagement purposes.
          </p>
        </div>
      </div>

      {/* Section Divider */}
      <div className="form-section-label col-full">Personal & Contact Details</div>

      {/* Title */}
      <FormField label="Title" htmlFor="title" required error={errors.title}>
        <SelectInput
          id="title"
          placeholder="Select Title"
          options={TITLES}
          value={data.title}
          onChange={v => onChange('title', v)}
          error={errors.title}
        />
      </FormField>

      {/* Gender */}
      <FormField label="Gender" htmlFor="gender" required error={errors.gender}>
        <SelectInput
          id="gender"
          placeholder="Select Gender"
          options={GENDERS}
          value={data.gender}
          onChange={v => onChange('gender', v)}
          error={errors.gender}
        />
      </FormField>

      {/* Full Name */}
      <FormField label="Full Name" htmlFor="fullName" required error={errors.fullName}>
        <TextInput
          id="fullName"
          placeholder="e.g. Kwabena Mensah"
          value={data.fullName}
          onChange={v => onChange('fullName', v)}
          error={errors.fullName}
          valid={!errors.fullName && !!data.fullName}
        />
      </FormField>

      {/* Date of Birth */}
      <FormField label="Date of Birth" htmlFor="dateOfBirth" required error={errors.dateOfBirth}>
        <TextInput
          id="dateOfBirth"
          type="date"
          value={data.dateOfBirth}
          onChange={v => onChange('dateOfBirth', v)}
          error={errors.dateOfBirth}
          valid={!errors.dateOfBirth && !!data.dateOfBirth}
        />
      </FormField>

      {/* Phone */}
      <FormField
        label="Phone Number (WhatsApp)"
        htmlFor="phone"
        required
        error={errors.phone}
        helper="Use the WhatsApp number you want CREX to contact you on."
      >
        <TextInput
          id="phone"
          type="tel"
          placeholder="e.g. 0244 000 000"
          value={data.phone}
          onChange={v => onChange('phone', v)}
          error={errors.phone}
          valid={!errors.phone && !!data.phone}
        />
      </FormField>

      {/* Email */}
      <FormField label="Email Address" htmlFor="email" required error={errors.email}>
        <TextInput
          id="email"
          type="email"
          placeholder="e.g. kwabena@email.com"
          value={data.email}
          onChange={v => onChange('email', v)}
          error={errors.email}
          valid={!errors.email && !!data.email}
        />
      </FormField>

      {/* Nationality */}
      <FormField label="Nationality" htmlFor="nationality" required error={errors.nationality}>
        <TextInput
          id="nationality"
          placeholder="e.g. Ghanaian"
          value={data.nationality}
          onChange={v => onChange('nationality', v)}
          error={errors.nationality}
          valid={!errors.nationality && !!data.nationality}
        />
      </FormField>

      {/* Ghana Card – required */}
      <FormField
        label="Ghana Card Number"
        htmlFor="ghanaCard"
        required
        error={errors.ghanaCard}
        helper="For identity verification. Format: GHA-XXXXXXXXX-X"
      >
        <TextInput
          id="ghanaCard"
          placeholder="GHA-XXXXXXXXX-X"
          value={data.ghanaCard}
          onChange={v => onChange('ghanaCard', v.toUpperCase())}
          error={errors.ghanaCard}
          valid={!errors.ghanaCard && !!data.ghanaCard}
        />
      </FormField>

      {/* City */}
      <FormField label="City / Town" htmlFor="city" required error={errors.city}>
        <TextInput
          id="city"
          placeholder="e.g. Accra"
          value={data.city}
          onChange={v => onChange('city', v)}
          error={errors.city}
          valid={!errors.city && !!data.city}
        />
      </FormField>

      {/* Region */}
      <FormField label="Region" htmlFor="region" required error={errors.region}>
        <SelectInput
          id="region"
          placeholder="Select Region"
          options={GHANA_REGIONS}
          value={data.region}
          onChange={v => onChange('region', v)}
          error={errors.region}
        />
      </FormField>

      {/* Residential Address – full width, textarea */}
      <FormField label="Residential Address" htmlFor="address" required error={errors.address} fullWidth>
        <Textarea
          id="address"
          placeholder="e.g. No. 5 Ring Road Central, Accra"
          value={data.address}
          onChange={v => onChange('address', v)}
          error={errors.address}
          rows={3}
        />
      </FormField>
    </div>
  )
}

export default FormStepPersonal
