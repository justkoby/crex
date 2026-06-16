/* ─────────────────────────────────────────────────────────
   Step 1 – Personal Information
───────────────────────────────────────────────────────── */
import React from 'react'
import { FormField, TextInput, SelectInput, RadioGroup, HelperText, ErrorText } from './formUtils'
import { GHANA_REGIONS } from './formConstants'

const FormStepPersonal = ({ data, onChange, errors }) => {
  return (
    <div className="form-grid">

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

      {/* Gender */}
      <FormField label="Gender" required error={errors.gender}>
        <RadioGroup
          name="gender"
          options={['Male', 'Female']}
          value={data.gender}
          onChange={v => onChange('gender', v)}
        />
      </FormField>

      {/* Phone */}
      <FormField
        label="Phone Number"
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

      {/* Residential Address – full width */}
      <FormField label="Residential Address" htmlFor="address" required error={errors.address} fullWidth>
        <TextInput
          id="address"
          placeholder="e.g. No. 5 Ring Road Central, Accra"
          value={data.address}
          onChange={v => onChange('address', v)}
          error={errors.address}
          valid={!errors.address && !!data.address}
        />
      </FormField>

      {/* Ghana Card – full width */}
      <FormField
        label="Ghana Card Number"
        htmlFor="ghanaCard"
        required
        error={errors.ghanaCard}
        helper="This is used for identity verification only. Format: GHA-XXXXXXXXX-X"
        fullWidth
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

    </div>
  )
}

export default FormStepPersonal
