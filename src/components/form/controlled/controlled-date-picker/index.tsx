import { DatePicker, DatePickerProps } from 'components/form/basic/date'
import { isRequired } from 'components/form/validations'
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form'

export type ControlledDatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  T extends string = string,
> = DatePickerProps<T> & UseControllerProps<TFieldValues, TName>

export const ControlledDatePicker = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  rules,
  required,
  label,
  helperText,
  disabled,
  format,
}: ControlledDatePickerProps<TFieldValues, TName>) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules: {
      ...rules,
      required: isRequired(required),
    },
  })
  return (
    <DatePicker
      ref={field.ref}
      value={field.value}
      error={Boolean(fieldState.error)}
      helperText={fieldState.error?.message || helperText}
      onChange={field.onChange}
      label={label}
      disabled={disabled}
      required={required}
      format={format}
    />
  )
}
