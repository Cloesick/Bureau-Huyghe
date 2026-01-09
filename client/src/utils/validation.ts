export type ValidationRule = {
  test: (value: any, formData?: Record<string, any>) => boolean;
  message: string;
};

export type ValidationRules = {
  [key: string]: ValidationRule[];
};

export const required = (message = 'Dit veld is verplicht'): ValidationRule => ({
  test: (value) => {
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    return value !== null && value !== undefined;
  },
  message
});

export const minLength = (length: number, message?: string): ValidationRule => ({
  test: (value) => String(value).length >= length,
  message: message || `Minimaal ${length} karakters`
});

export const maxLength = (length: number, message?: string): ValidationRule => ({
  test: (value) => String(value).length <= length,
  message: message || `Maximaal ${length} karakters`
});

export const email = (message = 'Ongeldig e-mailadres'): ValidationRule => ({
  test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  message
});

export const phone = (message = 'Ongeldig telefoonnummer'): ValidationRule => ({
  test: (value) => /^[\+]?[0-9\s\-\/]{9,}$/.test(value),
  message
});

export const url = (message = 'Ongeldige URL'): ValidationRule => ({
  test: (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },
  message
});

export const numeric = (message = 'Alleen cijfers toegestaan'): ValidationRule => ({
  test: (value) => /^\d+$/.test(value),
  message
});

export const decimal = (message = 'Ongeldig decimaal getal'): ValidationRule => ({
  test: (value) => /^\d*\.?\d+$/.test(value),
  message
});

export const min = (min: number, message?: string): ValidationRule => ({
  test: (value) => Number(value) >= min,
  message: message || `Minimaal ${min}`
});

export const max = (max: number, message?: string): ValidationRule => ({
  test: (value) => Number(value) <= max,
  message: message || `Maximaal ${max}`
});

export const pattern = (regex: RegExp, message: string): ValidationRule => ({
  test: (value) => regex.test(value),
  message
});

export const matchField = (field: string, message: string): ValidationRule => ({
  test: (value: any, formData?: Record<string, any>) => {
    if (!formData) return true;
    return value === formData[field];
  },
  message
});

export const fileType = (types: string[], message?: string): ValidationRule => ({
  test: (value) => {
    if (!value || !Array.isArray(value)) return true;
    return value.every((file: File) => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      return extension ? types.includes(extension) : false;
    });
  },
  message: message || `Toegestane bestandstypen: ${types.join(', ')}`
});

export const fileSize = (maxSize: number, message?: string): ValidationRule => ({
  test: (value) => {
    if (!value || !Array.isArray(value)) return true;
    return value.every((file: File) => file.size <= maxSize);
  },
  message: message || `Maximale bestandsgrootte: ${Math.round(maxSize / 1024 / 1024)}MB`
});

export const validateField = (
  value: any,
  rules: ValidationRule[],
  formData?: Record<string, any>
): string | null => {
  for (const rule of rules) {
    if (!rule.test(value, formData)) {
      return rule.message;
    }
  }
  return null;
};

export const validateForm = (
  data: Record<string, any>,
  rules: ValidationRules
): Record<string, string> => {
  const errors: Record<string, string> = {};

  Object.entries(rules).forEach(([field, fieldRules]) => {
    const error = validateField(data[field], fieldRules, data);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};
