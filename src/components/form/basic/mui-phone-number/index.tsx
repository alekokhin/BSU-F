import { TextFieldProps as MuiTextFieldProps } from '@mui/material'
import { FormControl, FormControlProps } from 'components/form/form-control'
import { isValidPhoneNumber } from 'libphonenumber-js'
import parseMax from 'libphonenumber-js/max'
import MuiPhoneNumber from 'mui-phone-number'
import { ChangeEvent, forwardRef, useState } from 'react'

type PhoneNumber = {
  country: string
  phoneNumber: string
}

export type MuiPhoneNumberProps = Omit<FormControlProps, 'children'> &
  MuiTextFieldProps & {
    defaultCountry: string
    disableAutofill?: boolean
    onChange?: (phones: PhoneNumber) => void
  }

export const MuiPhoneNumberField = forwardRef<
  HTMLDivElement,
  MuiPhoneNumberProps
>(
  (
    {
      label,
      helperText,
      required,
      error,
      disableAutofill,
      name,
      defaultCountry,
      onChange,
      ...MuiPhoneNumberProps
    },
    ref,
  ) => {
    const [value, setValue] = useState('')
    const [myError, setError] = useState('')

    const handlePhoneNumberChange = (
      newValue: string | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
      const stringValue =
        typeof newValue === 'string' ? newValue : newValue.target.value
      setValue(stringValue)

      if (isValidPhoneNumber(stringValue)) {
        const parseNum = parseMax(stringValue)
        const phones: PhoneNumber = {
          country: String(parseNum?.country),
          phoneNumber: String(parseNum?.nationalNumber),
        }
        onChange?.(phones)
        setError('')
      } else {
        setError('Please input a valid number')
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        error
      }
    }

    return (
      <FormControl
        fullWidth={MuiPhoneNumberProps.fullWidth}
        htmlFor={label}
        error={error}
        helperText={myError || helperText} // Show the error message if there is an error
        disabled={MuiPhoneNumberProps.disabled}
      >
        <MuiPhoneNumber
          defaultCountry={defaultCountry}
          variant="outlined"
          ref={ref}
          name={name}
          required={required}
          label={label}
          {...MuiPhoneNumberProps}
          error={Boolean(error)}
          value={value}
          onChange={handlePhoneNumberChange}
        />
      </FormControl>
    )
  },
)
