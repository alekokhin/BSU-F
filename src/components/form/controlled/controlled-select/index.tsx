import { Select, SelectProps } from 'components/form/basic/Select'
import { isRequired } from 'components/form/validations'
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form'

export type ControlledTextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  T extends string = string,
> = SelectProps<T> & UseControllerProps<TFieldValues, TName>

export const ControlledSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  T extends string = string,
>({
  name,
  control,
  label,
  disabled,
  required,
  rules,
  fullWidth,
  helperText,
  options,
}: ControlledTextFieldProps<TFieldValues, TName, T>) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules: {
      ...rules,
      required: isRequired(required),
    },
  })

  return (
    <Select
      sx={{ borderRadius: '50px' }}
      ref={field.ref}
      value={field.value}
      onChange={field.onChange}
      error={Boolean(fieldState.error)}
      helperText={fieldState.error?.message || helperText}
      label={label}
      fullWidth={fullWidth}
      disabled={disabled}
      required={required}
      options={options}
    />
  )
}
