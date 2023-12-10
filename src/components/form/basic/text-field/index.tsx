import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material'
import { FormControl, FormControlProps } from 'components/form/form-control'
import { forwardRef } from 'react'

export type TextFieldProps = Omit<FormControlProps, 'children'> &
  MuiTextFieldProps & {
    disableAutofill?: boolean
  }

export const TextField = forwardRef<HTMLDivElement, TextFieldProps>(
  (
    {
      htmlFor,
      label,
      error,
      helperText,
      required,
      disableAutofill,
      ...textFieldProps
    },
    ref,
  ) => {
    return (
      <FormControl
        htmlFor={htmlFor}
        error={error}
        fullWidth={textFieldProps.fullWidth}
        helperText={helperText}
        disabled={textFieldProps.disabled}
      >
        <MuiTextField
          ref={ref}
          required={required}
          label={label}
          {...textFieldProps}
          error={error}
          type={textFieldProps.type}
          inputProps={{ maxLength: 1_500_000 }}
          {...(disableAutofill
            ? {
                inputProps: textFieldProps.inputProps,
              }
            : undefined)}
        />
      </FormControl>
    )
  },
)
