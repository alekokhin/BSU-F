import {
  MuiPhoneNumberField,
  MuiPhoneNumberProps,
} from 'components/form/basic/mui-phone-number'
import { isRequired } from 'components/form/validations'
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form'

export type ControlledMuiPhoneNumberProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = MuiPhoneNumberProps &
  UseControllerProps<TFieldValues, TName> & {
    defaultCountry?: string
  }

export const ControlledMuiPhoneNumber = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  disabled,
  required,
  rules,
  helperText,
  fullWidth,
  defaultCountry,
}: ControlledMuiPhoneNumberProps<TFieldValues, TName>) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules: {
      ...rules,
      required: isRequired(required),
    },
  })

  return (
    <MuiPhoneNumberField
      {...field}
      value={field.value}
      name={field.name}
      defaultCountry={defaultCountry}
      error={Boolean(fieldState.error)}
      onChange={field.onChange}
      helperText={fieldState.error?.message || helperText}
      label={label}
      fullWidth={fullWidth}
      required={required}
      disabled={disabled}
    />
  )
}
