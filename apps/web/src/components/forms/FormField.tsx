import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '../ui/Input';

interface FormFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  helperText?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
}

export function FormField({
  name,
  label,
  placeholder,
  type = 'text',
  helperText,
  required,
  leftIcon,
  rightIcon,
  disabled,
}: FormFieldProps) {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          {...field}
          type={type}
          label={label + (required ? ' *' : '')}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          disabled={disabled}
        />
      )}
    />
  );
}