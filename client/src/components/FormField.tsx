import { useState } from 'react';
import { Calendar, Upload } from 'lucide-react';
import { format } from 'date-fns';

export interface FieldProps {
  label: string;
  name: string;
  type: 'text' | 'select' | 'number' | 'date' | 'file' | 'textarea' | 'tel' | 'email' | 'url' | 'password' | 'radio' | 'checkbox' | 'switch' | 'color' | 'range' | 'time' | 'datetime-local' | 'month' | 'week';
  value: string;
  onChange: (name: string, value: string | File[]) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  className?: string;
  icon?: React.ReactNode;
  accept?: string;
  multiple?: boolean;
  rows?: number;
  min?: number;
  max?: number;
  'data-test'?: string;
}

export default function FormField({
  label,
  name,
  type,
  value,
  onChange,
  onBlur,
  error,
  required,
  placeholder,
  options,
  className = '',
  icon,
  accept,
  multiple,
  rows = 3,
  min,
  max,
  'data-test': dataTest,
}: FieldProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFiles = (newFiles: File[]) => {
    setFiles(prev => {
      const combined = multiple ? [...prev, ...newFiles] : newFiles;
      onChange(name, combined);
      return combined;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index);
      onChange(name, newFiles);
      return newFiles;
    });
  };

  const baseInputClasses = `
    w-full px-4 py-3 border-2 rounded-lg
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
    transition-all
    ${error ? 'border-red-300' : 'border-gray-200'}
    ${className}
  `;

  const renderRadioGroup = (name: string, options: string[]) => (
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option} className="flex items-center space-x-2">
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={(e) => onChange(name, e.target.value)}
            className="h-4 w-4 text-primary-500 focus:ring-primary-500"
          />
          <span className="text-gray-700">{option}</span>
        </label>
      ))}
    </div>
  );

  const renderCheckbox = () => (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        name={name}
        checked={value === 'true'}
        onChange={(e) => onChange(name, e.target.checked.toString())}
        className="h-4 w-4 text-primary-500 focus:ring-primary-500 rounded"
      />
      <span className="text-gray-700">{label}</span>
    </label>
  );

  const renderSwitch = () => (
    <label className="flex items-center space-x-2">
      <div
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value === 'true' ? 'bg-primary-500' : 'bg-gray-200'}`}
        onClick={() => onChange(name, (value !== 'true').toString())}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value === 'true' ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </div>
      <span className="text-gray-700">{label}</span>
    </label>
  );

  const renderRange = () => (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-gray-500">
        <span>{min || 0}</span>
        <span>{max || 100}</span>
      </div>
      <input
        type="range"
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        min={min}
        max={max}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
      />
      <div className="text-center text-sm text-gray-600">{value}</div>
    </div>
  );

  const renderInput = () => {
    switch (type) {
      case 'radio':
        return renderRadioGroup(name, options || []);

      case 'checkbox':
        return renderCheckbox();

      case 'switch':
        return renderSwitch();

      case 'range':
        return renderRange();

      case 'select':
        return (
          <select
            id={name}
            name={name}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            onBlur={onBlur}
            required={required}
            className={`${baseInputClasses} bg-white`}
            data-test={dataTest}
          >
            <option value="">{placeholder || 'Selecteer...'}</option>
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            onBlur={onBlur}
            required={required}
            placeholder={placeholder}
            rows={rows}
            className={`${baseInputClasses} resize-none`}
            data-test={dataTest}
          />
        );

      case 'date':
        return (
          <div className="relative">
            <input
              id={name}
              name={name}
              type="date"
              value={value}
              onChange={(e) => onChange(name, e.target.value)}
              onBlur={onBlur}
              required={required}
              className={`${baseInputClasses} pl-12`}
              min={min ? format(new Date(min), 'yyyy-MM-dd') : undefined}
              max={max ? format(new Date(max), 'yyyy-MM-dd') : undefined}
              data-test={dataTest}
            />
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        );

      case 'file':
        return (
          <div
            className={`
              relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
              transition-colors
              ${dragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-500'}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            data-test={dataTest}
          >
            <input
              type="file"
              id={name}
              name={name}
              onChange={handleFileChange}
              accept={accept}
              multiple={multiple}
              className="hidden"
            />
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">
              {dragActive ? 'Laat bestanden hier los...' : 'Sleep bestanden hierheen of klik om te uploaden'}
            </p>
            <p className="text-sm text-gray-500">{accept}</p>

            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white p-2 rounded border border-gray-200"
                  >
                    <span className="text-sm text-gray-600 truncate max-w-xs">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Verwijder bestand"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="relative">
            <input
              id={name}
              name={name}
              type={type}
              value={value}
              onChange={(e) => onChange(name, e.target.value)}
              onBlur={onBlur}
              required={required}
              placeholder={placeholder}
              className={`${baseInputClasses} ${icon ? 'pl-12' : ''}`}
              min={min}
              max={max}
              data-test={dataTest}
            />
            {icon && (
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                {icon}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {renderInput()}
      {error && (
        <p className="text-sm text-red-600" data-test={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
