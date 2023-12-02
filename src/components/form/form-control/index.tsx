import {
  FormControl as MuiFormControl,
  FormHelperText,
  InputLabel,
  Typography,
} from '@mui/material'
import { forwardRef } from 'react'

export type FormControlProps = {
  children: React.ReactNode
  htmlFor?: string
  label?: string
  helperText?: React.ReactNode
  error?: boolean
  required?: boolean
  disabled?: boolean
  fullWidth?: boolean
}

export const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
  (props: FormControlProps, ref) => {
    return (
      <MuiFormControl
        fullWidth={props.fullWidth}
        required={props.required}
        ref={ref}
        margin="none"
      >
        {props.label && (
          <InputLabel
            error={props.error}
            disableAnimation
            shrink
            htmlFor={props.htmlFor}
            required={props.required}
            sx={{
              transform: 'none',
              color: props.disabled ? 'text.disabled' : 'text.primary',
              ml: 2,
              mb: 0.5,
              position: 'static',
              fontSize: '14px',
              lineHeight: '17px',
              fontWeight: 400,
              zIndex: 0,
            }}
          >
            {props.label}
          </InputLabel>
        )}

        {props.children}

        <FormHelperText
          error={props.error}
          sx={{
            mt: 0.5,
            ml: 2,
            fontSize: '13px',
            color: theme => theme.palette.error.main,
          }}
        >
          <Typography fontSize={10} fontWeight={600}>
            {props.helperText || ''}
          </Typography>
        </FormHelperText>
      </MuiFormControl>
    )
  },
)
