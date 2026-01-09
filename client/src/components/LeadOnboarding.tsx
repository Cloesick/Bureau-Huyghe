import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Building2, FileText, Scale, ChevronRight, ChevronLeft } from 'lucide-react';

type Step = 1 | 2 | 3;
type ProjectType = 'PROPERTY' | 'CONSTRUCTION' | 'TECHNICAL' | 'LEGAL';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  projectType?: ProjectType;
  projectAddress?: string;
  projectDescription?: string;
  password: string;
  confirmPassword: string;
}

export default function LeadOnboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const projectTypes = [
    {
      id: 'PROPERTY',
      icon: MapPin,
      title: 'Landmeten & Afpaling',
      description: 'Perceelafbakening, topografische opmetingen'
    },
    {
      id: 'CONSTRUCTION',
      icon: Building2,
      title: 'Bouwmeting',
      description: 'Bouwplaats uitzetting, maatvoering'
    },
    {
      id: 'TECHNICAL',
      icon: FileText,
      title: 'Technische Documentatie',
      description: 'Digitale modellen, GIS mapping'
    },
    {
      id: 'LEGAL',
      icon: Scale,
      title: 'Juridische Diensten',
      description: 'Expertises, plaatsbeschrijvingen'
    }
  ];

  const validateStep = (step: Step): boolean => {
    const newErrors: Partial<FormData> = {};

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'Naam is verplicht';
      if (!formData.email) newErrors.email = 'Email is verplicht';
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Ongeldig email adres';
      }
    }

    if (step === 2) {
      if (!formData.projectType) newErrors.projectType = 'PROPERTY' as ProjectType;
      if (!formData.projectAddress) newErrors.projectAddress = 'Adres is verplicht';
    }

    if (step === 3) {
      if (!formData.password) newErrors.password = 'Wachtwoord is verplicht';
      if (formData.password && formData.password.length < 8) {
        newErrors.password = 'Wachtwoord moet minimaal 8 karakters lang zijn';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Wachtwoorden komen niet overeen';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => (prev < 3 ? (prev + 1) as Step : prev));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => (prev > 1 ? (prev - 1) as Step : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Registration failed');
      }

      // Registration successful
      navigate('/dashboard');
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Er is een fout opgetreden');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`flex items-center ${step < 3 ? 'flex-1' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step <= currentStep ? 'bg-primary-500 text-white' : 'bg-gray-200'
              }`}
            >
              {step}
            </div>
            {step < 3 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  step < currentStep ? 'bg-primary-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Error Message */}
      {serverError && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Contact Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Contact Informatie</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="form-label">
                  Voornaam *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="input-field"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="form-label">
                  Achternaam *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="input-field"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="email" className="form-label">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-field"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="form-label">
                Telefoon
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="company" className="form-label">
                Bedrijf
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
          </div>
        )}

        {/* Step 2: Project Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Project Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {projectTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        projectType: type.id as ProjectType,
                      }))
                    }
                    className={`p-4 text-left rounded-lg border-2 transition-colors ${
                      formData.projectType === type.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-500'
                    }`}
                  >
                    <Icon className="w-6 h-6 text-primary-500 mb-2" />
                    <h3 className="font-semibold">{type.title}</h3>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </button>
                );
              })}
            </div>
            {errors.projectType && (
              <p className="mt-1 text-sm text-red-600">{errors.projectType}</p>
            )}
            <div>
              <label htmlFor="projectAddress" className="form-label">
                Project Adres *
              </label>
              <input
                type="text"
                id="projectAddress"
                name="projectAddress"
                value={formData.projectAddress}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Straat, nummer, postcode en gemeente"
              />
              {errors.projectAddress && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.projectAddress}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="projectDescription" className="form-label">
                Project Omschrijving
              </label>
              <textarea
                id="projectDescription"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleInputChange}
                rows={4}
                className="input-field"
                placeholder="Beschrijf uw project of vraag..."
              />
            </div>
          </div>
        )}

        {/* Step 3: Account Creation */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Account Aanmaken</h2>
            <div>
              <label htmlFor="password" className="form-label">
                Wachtwoord *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="input-field"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="form-label">
                Bevestig Wachtwoord *
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="input-field"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Terug
            </button>
          )}
          <button
            type={currentStep === 3 ? 'submit' : 'button'}
            onClick={currentStep === 3 ? undefined : handleNext}
            className="flex items-center ml-auto px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            {currentStep === 3 ? (
              'Account Aanmaken'
            ) : (
              <>
                Volgende
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
