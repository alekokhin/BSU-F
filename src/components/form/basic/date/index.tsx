import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
  LocalizationProvider,
} from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { FormControl, FormControlProps } from 'components/form/form-control'
import { forwardRef } from 'react'
export type DatePickerProps<T> = Omit<FormControlProps, 'children'> &
  MuiDatePickerProps<T>
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps<any>>(
  ({ label, error, helperText, required, onChange, value, format }, ref) => {
    return (
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <FormControl
          ref={ref}
          htmlFor={label}
          label={label}
          error={error}
          helperText={helperText}
          required={required}
        >
          <MuiDatePicker
            label={label}
            value={value}
            format={format}
            onChange={(value, context) => onChange?.(value, context)}
          />
        </FormControl>
      </LocalizationProvider>
    )
  },
)
