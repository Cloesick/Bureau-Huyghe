import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, MapPin, Ruler, Building2, FileText, 
  ChevronRight, ChevronLeft, Check, Euro, Clock,
  ArrowRight, Info, Zap
} from 'lucide-react';

// Pricing configuration - base prices and multipliers
const pricingConfig = {
  perceelafpaling: {
    label: 'Perceelafpaling',
    icon: MapPin,
    description: 'Nauwkeurige afbakening van uw perceel',
    basePrice: 350,
    pricePerBoundary: 75, // per grens met buur
    areaMultipliers: {
      '<500': 1.0,
      '500-1000': 1.15,
      '1000-2500': 1.35,
      '2500-5000': 1.6,
      '5000-10000': 2.0,
      '>10000': 2.5
    },
    urgencyMultipliers: {
      'normal': 1.0,
      'dringend': 1.25,
      'zeer-dringend': 1.5
    },
    includes: [
      'Terreinbezoek en opmeting',
      'Plaatsing grenspalen',
      'Officieel proces-verbaal',
      'Digitaal plan (PDF + DWG)'
    ],
    timeEstimate: '3-5 werkdagen'
  },
  topografie: {
    label: 'Topografische Opmeting',
    icon: Ruler,
    description: 'Complete terreinopmeting met hoogtegegevens',
    basePrice: 450,
    pricePerHectare: 180,
    areaMultipliers: {
      '<1000': 1.0,
      '1000-5000': 1.2,
      '5000-10000': 1.4,
      '1-5ha': 1.8,
      '5-10ha': 2.5,
      '>10ha': 3.5
    },
    urgencyMultipliers: {
      'normal': 1.0,
      'dringend': 1.25,
      'zeer-dringend': 1.5
    },
    includes: [
      'Volledige terreinopmeting',
      'Hoogtekaart / DTM',
      '2D situatieplan',
      'Digitale bestanden (DWG/PDF)'
    ],
    timeEstimate: '5-10 werkdagen'
  },
  bouwmeting: {
    label: 'Bouwmeting',
    icon: Building2,
    description: 'Uitzetting en controle voor bouwprojecten',
    basePrice: 275,
    pricePerSession: 150,
    projectMultipliers: {
      'eengezinswoning': 1.0,
      'meergezinswoning': 1.8,
      'commercieel': 2.2,
      'industrieel': 2.8,
      'infrastructuur': 3.5
    },
    serviceMultipliers: {
      'uitzetting': 1.0,
      'maatvoering': 0.8,
      'as-built': 1.2,
      'monitoring': 1.5,
      'combinatie': 2.0
    },
    urgencyMultipliers: {
      'normal': 1.0,
      'dringend': 1.25,
      'zeer-dringend': 1.5
    },
    includes: [
      'Uitzetting bouwlijnen',
      'Hoogte-/peilmetingen',
      'Controlemetingen',
      'Meetrapport'
    ],
    timeEstimate: '1-3 werkdagen'
  },
  plaatsbeschrijving: {
    label: 'Plaatsbeschrijving',
    icon: FileText,
    description: 'Gedetailleerde documentatie van bestaande toestand',
    basePrice: 400,
    pricePerRoom: 35,
    propertyMultipliers: {
      'appartement': 0.8,
      'woning': 1.0,
      'commercieel': 1.4,
      'industrieel': 1.8
    },
    purposeMultipliers: {
      'huur-intrede': 1.0,
      'huur-uittrede': 1.0,
      'bouwwerken': 1.3,
      'gerechtelijk': 1.5
    },
    urgencyMultipliers: {
      'normal': 1.0,
      'dringend': 1.25,
      'zeer-dringend': 1.5
    },
    includes: [
      'Volledige inspectie',
      'Fotodocumentatie',
      'Gedetailleerd rapport',
      'Digitale aflevering'
    ],
    timeEstimate: '3-7 werkdagen'
  }
};

type ServiceType = keyof typeof pricingConfig;

interface QuoteData {
  service: ServiceType | '';
  // Perceelafpaling
  area: string;
  neighborCount: string;
  // Bouwmeting
  projectType: string;
  serviceType: string;
  // Plaatsbeschrijving
  propertyType: string;
  roomCount: string;
  purpose: string;
  // Common
  urgency: string;
  // Contact
  name: string;
  email: string;
  phone: string;
}

export default function QuoteCalculator() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuoteData>({
    service: '',
    area: '',
    neighborCount: '',
    projectType: '',
    serviceType: '',
    propertyType: '',
    roomCount: '',
    purpose: '',
    urgency: 'normal',
    name: '',
    email: '',
    phone: ''
  });
  const [showResult, setShowResult] = useState(false);

  const handleChange = (field: keyof QuoteData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const selectedService = data.service ? pricingConfig[data.service] : null;

  // Calculate price based on selections
  const calculatedPrice = useMemo(() => {
    if (!data.service || !selectedService) return { min: 0, max: 0 };

    let basePrice = selectedService.basePrice;
    let multiplier = 1;

    // Service-specific calculations
    if (data.service === 'perceelafpaling') {
      const config = pricingConfig.perceelafpaling;
      if (data.area && config.areaMultipliers[data.area as keyof typeof config.areaMultipliers]) {
        multiplier *= config.areaMultipliers[data.area as keyof typeof config.areaMultipliers];
      }
      if (data.neighborCount) {
        const neighbors = parseInt(data.neighborCount) || 2;
        basePrice += neighbors * config.pricePerBoundary;
      }
    }

    if (data.service === 'topografie') {
      const config = pricingConfig.topografie;
      if (data.area && config.areaMultipliers[data.area as keyof typeof config.areaMultipliers]) {
        multiplier *= config.areaMultipliers[data.area as keyof typeof config.areaMultipliers];
      }
    }

    if (data.service === 'bouwmeting') {
      const config = pricingConfig.bouwmeting;
      if (data.projectType && config.projectMultipliers[data.projectType as keyof typeof config.projectMultipliers]) {
        multiplier *= config.projectMultipliers[data.projectType as keyof typeof config.projectMultipliers];
      }
      if (data.serviceType && config.serviceMultipliers[data.serviceType as keyof typeof config.serviceMultipliers]) {
        multiplier *= config.serviceMultipliers[data.serviceType as keyof typeof config.serviceMultipliers];
      }
    }

    if (data.service === 'plaatsbeschrijving') {
      const config = pricingConfig.plaatsbeschrijving;
      if (data.propertyType && config.propertyMultipliers[data.propertyType as keyof typeof config.propertyMultipliers]) {
        multiplier *= config.propertyMultipliers[data.propertyType as keyof typeof config.propertyMultipliers];
      }
      if (data.purpose && config.purposeMultipliers[data.purpose as keyof typeof config.purposeMultipliers]) {
        multiplier *= config.purposeMultipliers[data.purpose as keyof typeof config.purposeMultipliers];
      }
      if (data.roomCount) {
        const rooms = parseInt(data.roomCount) || 5;
        basePrice += rooms * config.pricePerRoom;
      }
    }

    // Urgency multiplier
    if (data.urgency && selectedService.urgencyMultipliers[data.urgency as keyof typeof selectedService.urgencyMultipliers]) {
      multiplier *= selectedService.urgencyMultipliers[data.urgency as keyof typeof selectedService.urgencyMultipliers];
    }

    const calculated = basePrice * multiplier;
    // Return range (±15%)
    return {
      min: Math.round(calculated * 0.85),
      max: Math.round(calculated * 1.15)
    };
  }, [data, selectedService]);

  const canProceed = () => {
    if (step === 1) return !!data.service;
    if (step === 2) {
      if (data.service === 'perceelafpaling') return !!data.area;
      if (data.service === 'topografie') return !!data.area;
      if (data.service === 'bouwmeting') return !!data.projectType && !!data.serviceType;
      if (data.service === 'plaatsbeschrijving') return !!data.propertyType && !!data.purpose;
    }
    return true;
  };

  const nextStep = () => {
    if (step === 3) {
      setShowResult(true);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => setStep(prev => Math.max(1, prev - 1));

  const resetCalculator = () => {
    setStep(1);
    setShowResult(false);
    setData({
      service: '',
      area: '',
      neighborCount: '',
      projectType: '',
      serviceType: '',
      propertyType: '',
      roomCount: '',
      purpose: '',
      urgency: 'normal',
      name: '',
      email: '',
      phone: ''
    });
  };

  if (showResult) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-lg">
              <Calculator className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold">Uw Prijsindicatie</h2>
          </div>
          <p className="text-primary-100 text-sm">Op basis van uw selecties</p>
        </div>

        {/* Result */}
        <div className="p-6">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 mb-2">Geschatte prijs (excl. BTW)</p>
            <div className="flex items-center justify-center gap-2">
              <Euro className="w-8 h-8 text-accent-500" />
              <span className="text-4xl font-bold text-gray-900">
                {calculatedPrice.min} - {calculatedPrice.max}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              * Dit is een indicatieve prijs. De exacte prijs wordt bepaald na terreinbezoek.
            </p>
          </div>

          {/* Service Summary */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              {selectedService && <selectedService.icon className="w-5 h-5 text-primary-500" />}
              {selectedService?.label}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>Levertijd: {selectedService?.timeEstimate}</span>
              </div>
              <div className="mt-3">
                <p className="text-xs font-medium text-gray-500 mb-2">Inbegrepen:</p>
                <ul className="space-y-1">
                  {selectedService?.includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <Check className="w-3 h-3 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Link
              to={`/contact?service=${data.service}&quote=${calculatedPrice.min}-${calculatedPrice.max}`}
              className="w-full flex items-center justify-center gap-2 bg-accent-500 text-white py-3 px-6 rounded-xl font-bold hover:bg-accent-600 transition-colors"
            >
              Exacte Offerte Aanvragen
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/offerte"
              className="w-full flex items-center justify-center gap-2 bg-primary-100 text-primary-700 py-3 px-6 rounded-xl font-medium hover:bg-primary-200 transition-colors"
            >
              Uitgebreide Offerte Aanvraag
            </Link>
            <button
              onClick={resetCalculator}
              className="w-full text-gray-500 py-2 text-sm hover:text-gray-700 transition-colors"
            >
              Nieuwe berekening
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/20 rounded-lg">
            <Calculator className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold">Snelle Prijscalculator</h2>
        </div>
        <p className="text-primary-100 text-sm">Krijg direct een indicatieve prijs voor uw project</p>
      </div>

      {/* Progress */}
      <div className="px-6 pt-4">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  s < step
                    ? 'bg-green-500 text-white'
                    : s === step
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {s < step ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 3 && (
                <div className={`w-16 sm:w-24 h-1 mx-2 ${s < step ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mb-4">
          <span>Dienst</span>
          <span>Details</span>
          <span>Opties</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pt-2">
        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">Welke dienst heeft u nodig?</p>
            <div className="grid grid-cols-2 gap-3">
              {(Object.keys(pricingConfig) as ServiceType[]).map((key) => {
                const service = pricingConfig[key];
                const Icon = service.icon;
                const isSelected = data.service === key;
                return (
                  <button
                    key={key}
                    onClick={() => handleChange('service', key)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-primary-600' : 'text-gray-400'}`} />
                    <p className={`font-medium text-sm ${isSelected ? 'text-primary-700' : 'text-gray-700'}`}>
                      {service.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{service.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Service-specific details */}
        {step === 2 && data.service === 'perceelafpaling' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">Vertel ons meer over uw perceel</p>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Geschatte oppervlakte *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(pricingConfig.perceelafpaling.areaMultipliers).map((area) => (
                  <button
                    key={area}
                    onClick={() => handleChange('area', area)}
                    className={`p-3 rounded-lg border text-sm transition-all ${
                      data.area === area
                        ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium'
                        : 'border-gray-200 hover:border-primary-300 text-gray-600'
                    }`}
                  >
                    {area} m²
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aantal aangrenzende buren
              </label>
              <div className="flex gap-2">
                {['1', '2', '3', '4', '5+'].map((count) => (
                  <button
                    key={count}
                    onClick={() => handleChange('neighborCount', count.replace('+', ''))}
                    className={`flex-1 p-3 rounded-lg border text-sm transition-all ${
                      data.neighborCount === count.replace('+', '')
                        ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium'
                        : 'border-gray-200 hover:border-primary-300 text-gray-600'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && data.service === 'topografie' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">Hoe groot is het op te meten terrein?</p>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Oppervlakte *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(pricingConfig.topografie.areaMultipliers).map((area) => (
                  <button
                    key={area}
                    onClick={() => handleChange('area', area)}
                    className={`p-3 rounded-lg border text-sm transition-all ${
                      data.area === area
                        ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium'
                        : 'border-gray-200 hover:border-primary-300 text-gray-600'
                    }`}
                  >
                    {area.includes('ha') ? area : `${area} m²`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && data.service === 'bouwmeting' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">Vertel ons meer over uw bouwproject</p>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type project *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(pricingConfig.bouwmeting.projectMultipliers).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleChange('projectType', type)}
                    className={`p-3 rounded-lg border text-sm capitalize transition-all ${
                      data.projectType === type
                        ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium'
                        : 'border-gray-200 hover:border-primary-300 text-gray-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gewenste dienst *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(pricingConfig.bouwmeting.serviceMultipliers).map((service) => (
                  <button
                    key={service}
                    onClick={() => handleChange('serviceType', service)}
                    className={`p-3 rounded-lg border text-sm capitalize transition-all ${
                      data.serviceType === service
                        ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium'
                        : 'border-gray-200 hover:border-primary-300 text-gray-600'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && data.service === 'plaatsbeschrijving' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">Vertel ons meer over de plaatsbeschrijving</p>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type eigendom *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(pricingConfig.plaatsbeschrijving.propertyMultipliers).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleChange('propertyType', type)}
                    className={`p-3 rounded-lg border text-sm capitalize transition-all ${
                      data.propertyType === type
                        ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium'
                        : 'border-gray-200 hover:border-primary-300 text-gray-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doel *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(pricingConfig.plaatsbeschrijving.purposeMultipliers).map((purpose) => (
                  <button
                    key={purpose}
                    onClick={() => handleChange('purpose', purpose)}
                    className={`p-3 rounded-lg border text-sm transition-all ${
                      data.purpose === purpose
                        ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium'
                        : 'border-gray-200 hover:border-primary-300 text-gray-600'
                    }`}
                  >
                    {purpose.replace(/-/g, ' ').replace('huur ', 'Huur ')}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aantal kamers/ruimtes
              </label>
              <div className="flex gap-2">
                {['3', '5', '8', '10', '15+'].map((count) => (
                  <button
                    key={count}
                    onClick={() => handleChange('roomCount', count.replace('+', ''))}
                    className={`flex-1 p-3 rounded-lg border text-sm transition-all ${
                      data.roomCount === count.replace('+', '')
                        ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium'
                        : 'border-gray-200 hover:border-primary-300 text-gray-600'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Urgency */}
        {step === 3 && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">Hoe dringend is uw aanvraag?</p>
            
            <div className="space-y-2">
              {[
                { value: 'normal', label: 'Normaal', desc: '2-4 weken', icon: '🟢', extra: '' },
                { value: 'dringend', label: 'Dringend', desc: '1-2 weken', icon: '🟠', extra: '+25%' },
                { value: 'zeer-dringend', label: 'Zeer dringend', desc: '< 1 week', icon: '🔴', extra: '+50%' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleChange('urgency', option.value)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                    data.urgency === option.value
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{option.icon}</span>
                    <div>
                      <p className={`font-medium ${data.urgency === option.value ? 'text-primary-700' : 'text-gray-700'}`}>
                        {option.label}
                      </p>
                      <p className="text-xs text-gray-500">{option.desc}</p>
                    </div>
                  </div>
                  {option.extra && (
                    <span className="text-sm font-medium text-accent-600 bg-accent-50 px-2 py-1 rounded">
                      {option.extra}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Live price preview */}
            <div className="mt-6 p-4 bg-gradient-to-r from-accent-50 to-primary-50 rounded-xl border border-accent-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent-500" />
                  <span className="text-sm font-medium text-gray-700">Indicatieve prijs:</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gray-900">
                    €{calculatedPrice.min} - €{calculatedPrice.max}
                  </span>
                  <p className="text-xs text-gray-500">excl. BTW</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          {step > 1 ? (
            <button
              onClick={prevStep}
              className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Vorige
            </button>
          ) : (
            <div />
          )}
          
          <button
            onClick={nextStep}
            disabled={!canProceed()}
            className="flex items-center gap-2 bg-primary-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === 3 ? 'Bekijk Resultaat' : 'Volgende'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Info note */}
        <div className="mt-4 flex items-start gap-2 text-xs text-gray-500">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>
            Deze calculator geeft een indicatieve prijs. De exacte prijs wordt bepaald na een 
            gratis terreinbezoek of telefonisch gesprek.
          </p>
        </div>
      </div>
    </div>
  );
}

// Compact version for homepage sidebar
export function QuoteCalculatorCompact() {
  return (
    <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl p-6 text-white">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-white/20 rounded-lg">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold">Snelle Prijscalculator</h3>
          <p className="text-accent-100 text-sm">Direct een indicatie</p>
        </div>
      </div>
      <p className="text-accent-100 text-sm mb-4">
        Bereken in 30 seconden een indicatieve prijs voor uw landmeetproject.
      </p>
      <Link
        to="/offerte#calculator"
        className="flex items-center justify-center gap-2 bg-white text-accent-600 py-3 px-4 rounded-xl font-bold hover:bg-accent-50 transition-colors"
      >
        Start Calculator
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
