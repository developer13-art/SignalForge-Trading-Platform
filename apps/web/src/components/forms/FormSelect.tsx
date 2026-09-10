import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Select } from '../ui/Select';

interface FormSelectProps {
  name: string;
  label?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
}

export function FormSelect({
  name,
  label,
  options,
  placeholder,
  helperText,
  required,
  disabled,
}: FormSelectProps) {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          label={label + (required ? ' *' : '')}
          options={options}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          disabled={disabled}
        />
      )}
    />
  );
}