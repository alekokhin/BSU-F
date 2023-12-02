import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControlLabel,
} from '@mui/material'
import { FormControl, FormControlProps } from 'components/form/form-control'
import { forwardRef } from 'react'

export type CheckboxProps = Omit<FormControlProps, 'children'> &
  MuiCheckboxProps & {
    labelPlacement?: 'end' | 'start' | 'top' | 'bottom' | undefined
    checkboxColor?: string
  }

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  (
    {
      label,
      error,
      labelPlacement,
      helperText,
      required,
      defaultChecked,
      checked,
      onChange,
      name,
      value,
      ...checkboxProps
    },
    ref,
  ) => {
    return (
      <FormControl
        fullWidth={checkboxProps.fullWidth}
        ref={ref}
        htmlFor={label}
        error={error}
        helperText={helperText}
        required={required}
        disabled={checkboxProps.disabled}
      >
        <FormControlLabel
          value="end"
          sx={{ color: checkboxProps.checkboxColor }}
          control={
            <MuiCheckbox
              size="small"
              defaultChecked={defaultChecked}
              checked={checked}
              {...checkboxProps}
              value={value}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onChange?.(event, event.target.checked)
              }}
              sx={{
                color: checkboxProps.checkboxColor,
                '&.Mui-checked': {
                  color: checkboxProps.checkboxColor,
                },
              }}
              name={name}
            />
          }
          label={label}
          labelPlacement={labelPlacement}
        />
      </FormControl>
    )
  },
)
