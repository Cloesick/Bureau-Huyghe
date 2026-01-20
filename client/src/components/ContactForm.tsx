import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Building2, User, Mail, Phone, Briefcase } from 'lucide-react';
import FormField from './FormField';
import { useFormValidation } from '../hooks/useFormValidation';
import { useFormPersistence } from '../hooks/useFormPersistence';
import { api } from '../services/api';

// Service categories with icons and descriptions
const serviceCategories = {
  property: { label: '📍 Landmeting & Afpaling', description: 'Perceelafbakening, topografische opmetingen en GPS metingen' },
  construction: { label: '🏗️ Bouwmeting', description: 'Bouwplaats uitzetting, maatvoering en 3D scanning' },
  technical: { label: '📐 Technische Documentatie', description: 'Digitale modellen, GIS mapping en technische plannen' },
  legal: { label: '⚖️ Juridische Diensten', description: 'Expertises en plaatsbeschrijvingen' },
  other: { label: '❓ Andere vraag', description: 'Uw vraag past niet in bovenstaande categorieën' },
};

// Dynamic sub-fields configuration based on service selection - EXHAUSTIVE
const serviceSubFields: Record<string, { label: string; name: string; type: 'text' | 'select' | 'number' | 'date'; options?: string[]; placeholder?: string; required?: boolean; helpText?: string }[]> = {
  property: [
    { label: 'Type eigendom', name: 'eigendomType', type: 'select', options: ['Woning / Residentieel', 'Appartement / Mede-eigendom', 'Landbouwgrond', 'Bouwgrond', 'Commercieel vastgoed', 'Industrieel terrein', 'Parking / Oprit', 'Bos / Natuurgebied', 'Anders'], required: true },
    { label: 'Geschatte oppervlakte', name: 'oppervlakte', type: 'select', options: ['< 500 m²', '500 - 1.000 m²', '1.000 - 2.500 m²', '2.500 - 5.000 m²', '5.000 - 10.000 m²', '> 10.000 m²', 'Onbekend'], required: true },
    { label: 'Reden voor afpaling', name: 'redenAfpaling', type: 'select', options: ['Verkoop van eigendom', 'Aankoop van eigendom', 'Grensgeschil met buren', 'Bouwproject / Vergunning', 'Verdeling / Erfenis', 'Controle bestaande grenzen', 'Splitsing perceel', 'Samenvoeging percelen', 'Andere reden'], required: true },
    { label: 'Kadastraal perceelnummer', name: 'kadasterNummer', type: 'text', placeholder: 'Bv. Afdeling 1, Sectie A, Nr. 123/B', helpText: 'Te vinden op uw eigendomsakte' },
    { label: 'Aantal aangrenzende buren', name: 'aantalBuren', type: 'select', options: ['1 buur', '2 buren', '3 buren', '4 of meer buren', 'Onbekend'] },
    { label: 'Bestaande grenspalen aanwezig?', name: 'grenspalen', type: 'select', options: ['Ja, volledig zichtbaar', 'Ja, maar sommige ontbreken/beschadigd', 'Nee, geen zichtbare palen', 'Onbekend'] },
    { label: 'Type meting gewenst', name: 'metingType', type: 'select', options: ['Perceelafpaling', 'Topografische opmeting', 'GPS meting', 'Opmeting bestaande toestand', 'Combinatie van diensten'], required: true },
    { label: 'Toegankelijkheid terrein', name: 'toegankelijkheid', type: 'select', options: ['Goed toegankelijk', 'Beperkt toegankelijk (helling, begroeiing)', 'Moeilijk toegankelijk', 'Onbekend'] },
    { label: 'Dringendheid', name: 'urgentie', type: 'select', options: ['🔴 Zeer dringend (< 1 week)', '🟠 Dringend (1-2 weken)', '🟢 Normaal (2-4 weken)', '⚪ Flexibel'], required: true },
  ],
  construction: [
    { label: 'Type bouwproject', name: 'projectType', type: 'select', options: ['Eengezinswoning', 'Meergezinswoning / Appartementen', 'Commercieel gebouw', 'Industrieel gebouw', 'Infrastructuur (wegen, bruggen)', 'Uitbreiding bestaand gebouw', 'Zwembad / Tuinaanleg', 'Zonnepanelen installatie', 'Anders'], required: true },
    { label: 'Projectfase', name: 'projectFase', type: 'select', options: ['Ontwerp / Vergunningsaanvraag', 'Voor aanvang bouw', 'Funderingsfase', 'Tijdens bouw', 'Na voltooiing (as-built)', 'Renovatie bestaand gebouw'], required: true },
    { label: 'Gewenste dienst', name: 'dienstType', type: 'select', options: ['Uitzetting bouwlijnen', 'Maatvoering / Controle', 'Hoogtemetingen / Peil', 'As-built opmeting', 'Monitoring / Zettingsmetingen', 'Volumeberekening', '3D scanning', 'Combinatie'], required: true },
    { label: 'Geschatte bouwoppervlakte', name: 'bouwOppervlakte', type: 'select', options: ['< 200 m²', '200 - 500 m²', '500 - 1.000 m²', '1.000 - 5.000 m²', '> 5.000 m²', 'Onbekend'] },
    { label: 'Werkt u met een architect?', name: 'architect', type: 'select', options: ['Ja', 'Nee', 'Nog op zoek'] },
    { label: 'Naam architect/aannemer', name: 'architectNaam', type: 'text', placeholder: 'Optioneel - voor coördinatie' },
    { label: 'Geplande startdatum', name: 'startDatum', type: 'date' },
    { label: 'Dringendheid', name: 'urgentie', type: 'select', options: ['🔴 Zeer dringend (< 1 week)', '🟠 Dringend (1-2 weken)', '🟢 Normaal (2-4 weken)', '⚪ Flexibel'], required: true },
  ],
  technical: [
    { label: 'Type documentatie', name: 'documentType', type: 'select', options: ['3D Laserscan', 'BIM Model', 'GIS Mapping', '2D CAD Tekeningen', 'Point Cloud', 'Fotogrammetrie / Drone', 'Technische plannen', 'Combinatie'], required: true },
    { label: 'Te documenteren object', name: 'objectType', type: 'select', options: ['Gebouw - Interieur', 'Gebouw - Exterieur', 'Gebouw - Volledig', 'Terrein / Landschap', 'Infrastructuur', 'Monument / Erfgoed', 'Industriële installatie', 'Anders'], required: true },
    { label: 'Doel van documentatie', name: 'doel', type: 'select', options: ['Vergunningsaanvraag', 'As-built documentatie', 'BIM model voor ontwerp', 'Renovatie planning', 'Erfgoed conservatie', 'Facility management', 'Technisch dossier', 'Anders'], required: true },
    { label: 'Gewenst outputformaat', name: 'outputFormaat', type: 'select', options: ['DWG/DXF', 'IFC (BIM)', 'Revit', 'PDF', 'E57 (Point Cloud)', 'LAS/LAZ', 'OBJ/FBX (3D)', 'Shapefile (GIS)', 'Meerdere formaten', 'Advies gewenst'] },
    { label: 'Vereiste nauwkeurigheid', name: 'nauwkeurigheid', type: 'select', options: ['Hoog (< 5mm)', 'Gemiddeld (5-20mm)', 'Laag (> 20mm)', 'Onbekend / Advies gewenst'] },
    { label: 'Geschatte oppervlakte/volume', name: 'omvang', type: 'text', placeholder: 'Bv. 500m² of 2000m³' },
    { label: 'Dringendheid', name: 'urgentie', type: 'select', options: ['🔴 Zeer dringend (< 1 week)', '🟠 Dringend (1-2 weken)', '🟢 Normaal (2-4 weken)', '⚪ Flexibel'], required: true },
  ],
  legal: [
    { label: 'Type juridische dienst', name: 'juridischType', type: 'select', options: ['Plaatsbeschrijving intrede (huur)', 'Plaatsbeschrijving uittrede (huur)', 'Plaatsbeschrijving voor bouwwerken', 'Expertise grensgeschil', 'Schade-expertise', 'Technische waardebepaling', 'Technisch advies', 'Gerechtsdeskundige opdracht', 'Anders'], required: true },
    { label: 'Doel van de expertise', name: 'doel', type: 'select', options: ['Preventief / Voorzorg', 'Minnelijke schikking', 'Gerechtelijke procedure', 'Verzekeringsdossier', 'Verkoop / Overdracht', 'Huurgeschil', 'Anders'], required: true },
    { label: 'Type eigendom', name: 'eigendomType', type: 'select', options: ['Woning', 'Appartement', 'Commercieel pand', 'Industrieel pand', 'Grond / Terrein', 'Anders'], required: true },
    { label: 'Werkt u met een advocaat?', name: 'advocaat', type: 'select', options: ['Ja', 'Nee', 'Mogelijk nodig'] },
    { label: 'Naam advocaat/notaris', name: 'advocaatNaam', type: 'text', placeholder: 'Optioneel - voor coördinatie' },
    { label: 'Is er een deadline?', name: 'deadline', type: 'select', options: ['Ja, binnen 1 week', 'Ja, binnen 2 weken', 'Ja, binnen 1 maand', 'Ja, later dan 1 maand', 'Nee, geen specifieke deadline'] },
    { label: 'Tegenpartij bekend?', name: 'tegenpartij', type: 'select', options: ['Ja', 'Nee', 'Niet van toepassing'] },
    { label: 'Dringendheid', name: 'urgentie', type: 'select', options: ['🔴 Zeer dringend (< 1 week)', '🟠 Dringend (1-2 weken)', '🟢 Normaal (2-4 weken)', '⚪ Flexibel'], required: true },
  ],
  other: [
    { label: 'Onderwerp van uw vraag', name: 'subject', type: 'text', placeholder: 'Beschrijf kort waar uw vraag over gaat', required: true },
    { label: 'Gerelateerd aan', name: 'gerelateerd', type: 'select', options: ['Landmeting / Afpaling', 'Bouwmeting', 'Technische documentatie', 'Juridisch advies', 'Offerte / Prijzen', 'Bestaand dossier', 'Algemene vraag', 'Klacht', 'Anders'], required: true },
    { label: 'Bent u een bestaande klant?', name: 'bestaandeKlant', type: 'select', options: ['Ja', 'Nee', 'Weet niet'] },
    { label: 'Hoe heeft u ons gevonden?', name: 'gevonden', type: 'select', options: ['Google zoekresultaten', 'Sociale media', 'Aanbeveling', 'Reclamebord/flyer', 'Bestaande klant', 'Anders'] },
    { label: 'Dringendheid', name: 'urgentie', type: 'select', options: ['🔴 Zeer dringend (< 1 week)', '🟠 Dringend (1-2 weken)', '🟢 Normaal (2-4 weken)', '⚪ Flexibel'], required: true },
  ]
};

const validationRules = {
  name: { required: true, minLength: 2, message: 'Vul uw volledige naam in' },
  email: { required: true, email: true, message: 'Vul een geldig e-mailadres in' },
  phone: { phone: true, message: 'Vul een geldig telefoonnummer in' },
  service: { required: true, message: 'Selecteer een dienst' },
  message: { required: true, minLength: 10, message: 'Vul een bericht in van minimaal 10 karakters' }
};

export default function ContactForm() {
  const {
    data: formData,
    errors,
    handleChange: handleValidatedChange,
    handleBlur,
    validateForm,
    resetForm
  } = useFormValidation({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: '',
    // Project location fields
    projectStraat: '',
    projectPostcode: '',
    projectGemeente: ''
  }, validationRules);

  const { updateData: persistForm, clearData: clearPersistedForm } = useFormPersistence('contact-form', formData);

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleFieldChange = (name: string, value: string | File[]) => {
    if (typeof value !== 'string') return;
    // If service changes, clear previous sub-field values
    if (name === 'service') {
      const currentSubFields = serviceSubFields[formData.service] || [];
      const newData = { ...formData };
      currentSubFields.forEach(field => {
        const fieldName = field.name as keyof typeof formData;
        delete newData[fieldName];
      });
      newData[name as keyof typeof formData] = value;
      handleValidatedChange(name, value);
      persistForm(newData);
    } else {
      handleValidatedChange(name, value);
      persistForm({ [name]: value } as Partial<typeof formData>);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setStatus('submitting');

    try {
      const response = await api.createLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        service: formData.service || undefined,
        message: formData.message,
      });

      if (response.success) {
        setStatus('success');
        resetForm();
        clearPersistedForm();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  // Get current sub-fields for validation
  const currentSubFields = formData.service ? serviceSubFields[formData.service] || [] : [];
  const requiredSubFields = currentSubFields.filter(f => f.required);
  const hasAllRequiredSubFields = requiredSubFields.every(f => {
    const value = formData[f.name as keyof typeof formData];
    return typeof value === 'string' && value.trim().length > 0;
  });

  if (status === 'success') {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg border border-green-200 p-10 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Bedankt voor uw aanvraag!</h3>
        <p className="text-gray-600 mb-2">
          Wij hebben uw bericht goed ontvangen.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          We nemen contact met u op.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          Nog een vraag stellen
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 space-y-6">
      {/* Form Header */}
      <div className="border-b border-gray-100 pb-4 mb-2">
        <h3 className="text-lg font-semibold text-gray-900">Uw contactgegevens</h3>
        <p className="text-sm text-gray-500">Velden met * zijn verplicht</p>
      </div>

      {status === 'error' && (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-3 border border-red-200">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <div>
            <p className="font-medium">Er is iets misgegaan</p>
            <p className="text-red-600">Probeer het opnieuw of bel ons op 050/45 70 31</p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-1 text-gray-400" />
            Volledige naam *
          </label>
          <FormField
            label="Volledige naam *"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleFieldChange}
            onBlur={() => handleBlur('name')}
            error={errors.name}
            placeholder="Jan Janssens"
            icon={<User className="w-4 h-4" />}
            required
            data-test="name-input"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-1 text-gray-400" />
            E-mailadres *
          </label>
          <FormField
            label="E-mailadres *"
            name="email"
            type="text"
            value={formData.email}
            onChange={handleFieldChange}
            onBlur={() => handleBlur('email')}
            error={errors.email}
            placeholder="jan@bedrijf.be"
            icon={<Mail className="w-4 h-4" />}
            required
            data-test="email-input"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-1 text-gray-400" />
            Telefoonnummer
          </label>
          <FormField
            label="Telefoonnummer"
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleFieldChange}
            onBlur={() => handleBlur('phone')}
            error={errors.phone}
            placeholder="+32 xxx xx xx xx"
            icon={<Phone className="w-4 h-4" />}
            data-test="phone-input"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
            <Building2 className="w-4 h-4 inline mr-1 text-gray-400" />
            Bedrijfsnaam
          </label>
          <FormField
            label="Bedrijfsnaam"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleFieldChange}
            placeholder="Uw bedrijfsnaam (optioneel)"
            icon={<Building2 className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Service Selection */}
      <div className="border-t border-gray-100 pt-6">
        <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
          <Briefcase className="w-4 h-4 inline mr-1 text-gray-400" />
          Waar kunnen wij u mee helpen? *
        </label>
        <div className="space-y-1">
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={(e) => handleFieldChange('service', e.target.value)}
            onBlur={() => handleBlur('service')}
            required
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white ${
              errors.service ? 'border-red-300' : 'border-gray-200'
            }`}
            data-test="service-select"
          >
            <option value="">-- Selecteer een dienst --</option>
            {Object.entries(serviceCategories).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="text-sm text-red-600" data-test="service-error">
              {errors.service}
            </p>
          )}
        </div>
        {formData.service && serviceCategories[formData.service as keyof typeof serviceCategories] && (
          <p className="mt-2 text-sm text-primary-500 bg-primary-50 px-3 py-2 rounded-lg">
            ℹ️ {serviceCategories[formData.service as keyof typeof serviceCategories].description}
          </p>
        )}
      </div>

      {/* Dynamic sub-fields based on service selection */}
      {formData.service && serviceSubFields[formData.service] && (
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 p-5 rounded-xl space-y-4 border border-primary-200">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
            <p className="text-sm font-semibold text-primary-500">Vertel ons meer over uw situatie</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {serviceSubFields[formData.service].map((field) => (
              <div key={field.name} className={field.type === 'text' && field.placeholder && field.placeholder.length > 30 ? 'md:col-span-2' : ''}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData] || ''}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    required={field.required}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white"
                    data-test={`field-${field.name}`}
                  >
                    <option value="">Selecteer...</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={formData[field.name as keyof typeof formData] || ''}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    data-test={`field-${field.name}`}
                  />
                )}
                {field.helpText && (
                  <p className="mt-1 text-xs text-gray-500">{field.helpText}</p>
                )}
              </div>
            ))}
          </div>
          
          {/* Project Location - shown for property, construction, legal services */}
          {['property', 'construction', 'legal'].includes(formData.service) && (
            <div className="mt-4 pt-4 border-t border-primary-200">
              <p className="text-sm font-medium text-gray-700 mb-3">📍 Locatie van het project (optioneel)</p>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    name="projectStraat"
                    value={formData.projectStraat || ''}
                    onChange={(e) => handleFieldChange('projectStraat', e.target.value)}
                    placeholder="Straat en huisnummer"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    name="projectPostcode"
                    value={formData.projectPostcode || ''}
                    onChange={(e) => handleFieldChange('projectPostcode', e.target.value)}
                    placeholder="Postcode"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm"
                  />
                  <input
                    type="text"
                    name="projectGemeente"
                    value={formData.projectGemeente || ''}
                    onChange={(e) => handleFieldChange('projectGemeente', e.target.value)}
                    placeholder="Gemeente"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Message Field */}
      <div className="border-t border-gray-100 pt-6">
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
          Uw bericht of vraag *
        </label>
        <FormField
          label="Uw bericht of vraag *"
          name="message"
          type="textarea"
          value={formData.message}
          onChange={handleFieldChange}
          onBlur={() => handleBlur('message')}
          error={errors.message}
          placeholder="Beschrijf uw vraag of situatie zo volledig mogelijk. Hoe meer informatie, hoe beter wij u kunnen helpen..."
          required
          rows={5}
          data-test="message-input"
        />
        <p className="mt-1 text-xs text-gray-400">Minimum 10 karakters</p>
      </div>

      {/* Privacy Notice */}
      <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 border border-gray-100">
        <p>
          🔒 Uw gegevens worden vertrouwelijk behandeld. Wij gebruiken uw informatie enkel om uw aanvraag te behandelen.
        </p>
      </div>

      {/* Submit Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-500 order-2 sm:order-1">
          Velden met <span className="text-red-500">*</span> zijn verplicht
        </p>
        <button
          type="submit"
          disabled={status === 'submitting' || !hasAllRequiredSubFields}
          className="order-1 sm:order-2 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
          data-test="submit-button"
        >
          {status === 'submitting' ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Bezig met verzenden...
            </>
          ) : (
            <>
              Verstuur aanvraag
              <Send className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="px-4 py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Laat ons u helpen
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Heeft u vragen of wilt u vrijblijvend kennismaken? Vul het formulier in en wij nemen binnen 24 uur contact met u op.
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
