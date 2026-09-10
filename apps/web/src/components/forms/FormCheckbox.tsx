import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Checkbox } from '../ui/Checkbox';

interface FormCheckboxProps {
  name: string;
  label?: string;
  description?: string;
}

export function FormCheckbox({ name, label, description }: FormCheckboxProps) {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Checkbox
          checked={field.value}
          onChange={(e) => field.onChange(e.target.checked)}
          label={label}
          description={description}
          error={error}
        />
      )}
    />
  );
}