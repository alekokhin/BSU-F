import { Checkbox, CheckboxProps } from 'components/form/basic/checkbox'
import { isRequired } from 'components/form/validations'
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form'

export type ControlledCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = CheckboxProps &
  UseControllerProps<TFieldValues, TName> & {
    labelPlacement?: 'end' | 'start' | 'top' | 'bottom' | undefined
    checkboxColor?: string
  }

export const ControlledCheckbox = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  labelPlacement,
  fullWidth,
  disabled,
  required,
  checked,
  rules,
  inputProps,
  helperText,
  checkboxColor,
}: ControlledCheckboxProps<TFieldValues, TName>) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules: {
      ...rules,
      required: isRequired(required),
    },
  })

  return (
    <Checkbox
      {...field}
      value={field.value}
      name={field.name}
      error={Boolean(fieldState.error)}
      onChange={field.onChange}
      labelPlacement={labelPlacement}
      helperText={fieldState.error?.message || helperText}
      label={label}
      fullWidth={fullWidth}
      required={required}
      checked={checked}
      checkboxColor={checkboxColor}
      inputProps={inputProps}
      disabled={disabled}
    />
  )
}
