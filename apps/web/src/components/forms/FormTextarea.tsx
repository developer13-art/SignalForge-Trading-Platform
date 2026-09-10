import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Textarea } from '../ui/Textarea';

interface FormTextareaProps {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  rows?: number;
}

export function FormTextarea({ name, label, placeholder, helperText, required, rows }: FormTextareaProps) {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Textarea
          {...field}
          label={label + (required ? ' *' : '')}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          rows={rows}
        />
      )}
    />
  );
}