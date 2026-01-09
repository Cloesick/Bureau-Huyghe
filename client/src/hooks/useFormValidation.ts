import { useState, useCallback } from 'react';

interface ValidationRules {
  [key: string]: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    email?: boolean;
    phone?: boolean;
    custom?: (value: any) => boolean;
    message?: string;
  };
}

interface ValidationErrors {
  [key: string]: string;
}

export function useFormValidation<T extends Record<string, any>>(
  initialData: T,
  validationRules: ValidationRules
) {
  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = useCallback((name: string, value: any): string => {
    const rules = validationRules[name];
    if (!rules) return '';

    if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
      return rules.message || 'Dit veld is verplicht';
    }

    if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
      return rules.message || `Minimaal ${rules.minLength} karakters`;
    }

    if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
      return rules.message || `Maximaal ${rules.maxLength} karakters`;
    }

    if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
      return rules.message || 'Ongeldige waarde';
    }

    if (rules.email && typeof value === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return rules.message || 'Ongeldig e-mailadres';
    }

    if (rules.phone && typeof value === 'string' && !/^[\+]?[0-9\s\-\/]{9,}$/.test(value)) {
      return rules.message || 'Ongeldig telefoonnummer';
    }

    if (rules.custom && !rules.custom(value)) {
      return rules.message || 'Ongeldige waarde';
    }

    return '';
  }, [validationRules]);

  const validateForm = useCallback(() => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach((key) => {
      const error = validateField(key, data[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [data, validateField, validationRules]);

  const handleChange = useCallback((name: string, value: any) => {
    setData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [touched, validateField]);

  const handleBlur = useCallback((name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, data[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [data, validateField]);

  const resetForm = useCallback(() => {
    setData(initialData);
    setErrors({});
    setTouched({});
  }, [initialData]);

  return {
    data,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setData
  };
}

export type FormValidationReturn = ReturnType<typeof useFormValidation>;
