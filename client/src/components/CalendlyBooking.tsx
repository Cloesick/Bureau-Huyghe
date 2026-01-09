import { useEffect, useState } from 'react';
import { Calendar, Clock, Video, MapPin, Phone, Check, ChevronRight } from 'lucide-react';

// Appointment types for Bureau Huyghe
const appointmentTypes = [
  {
    id: 'kennismaking',
    title: 'Kennismakingsgesprek',
    duration: '30 min',
    description: 'Gratis introductiegesprek om uw project te bespreken',
    icon: Video,
    calendlyEvent: 'kennismaking-30min',
    color: 'bg-blue-500'
  },
  {
    id: 'terreinbezoek',
    title: 'Terreinbezoek Plannen',
    duration: '15 min',
    description: 'Telefonisch gesprek om een terreinbezoek in te plannen',
    icon: MapPin,
    calendlyEvent: 'terreinbezoek-planning',
    color: 'bg-green-500'
  },
  {
    id: 'offerte',
    title: 'Offerte Bespreking',
    duration: '45 min',
    description: 'Gedetailleerde bespreking van uw offerte en vragen',
    icon: Phone,
    calendlyEvent: 'offerte-bespreking-45min',
    color: 'bg-purple-500'
  },
  {
    id: 'juridisch',
    title: 'Juridisch Adviesgesprek',
    duration: '60 min',
    description: 'Uitgebreid gesprek over juridische kwesties',
    icon: Calendar,
    calendlyEvent: 'juridisch-advies-60min',
    color: 'bg-orange-500'
  }
];

interface CalendlyBookingProps {
  variant?: 'full' | 'compact' | 'inline';
  preselectedType?: string;
  calendlyUsername?: string;
}

export default function CalendlyBooking({ 
  variant = 'full', 
  preselectedType,
  calendlyUsername = 'bureau-huyghe' // Replace with actual Calendly username
}: CalendlyBookingProps) {
  const [selectedType, setSelectedType] = useState<string | null>(preselectedType || null);
  const [showCalendly, setShowCalendly] = useState(false);

  // Load Calendly widget script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openCalendlyPopup = (eventType: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const calendly = (window as any).Calendly;
    if (calendly) {
      calendly.initPopupWidget({
        url: `https://calendly.com/${calendlyUsername}/${eventType}`
      });
    }
  };

  const handleSelectType = (typeId: string, eventType: string) => {
    setSelectedType(typeId);
    if (variant === 'compact') {
      openCalendlyPopup(eventType);
    } else {
      setShowCalendly(true);
    }
  };

  // Compact variant - just buttons
  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap gap-3">
        {appointmentTypes.slice(0, 2).map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => openCalendlyPopup(type.calendlyEvent)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <Icon className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-gray-700">{type.title}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Inline variant - embedded calendar
  if (variant === 'inline') {
    const selectedAppointment = appointmentTypes.find(t => t.id === selectedType) || appointmentTypes[0];
    
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Plan een Afspraak</h3>
          <p className="text-gray-600">Kies een type gesprek en selecteer een geschikt moment</p>
        </div>
        
        {/* Type selector */}
        <div className="p-4 bg-gray-50 border-b border-gray-100">
          <div className="flex flex-wrap gap-2">
            {appointmentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedType === type.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-primary-50'
                }`}
              >
                {type.title}
              </button>
            ))}
          </div>
        </div>

        {/* Calendly embed */}
        <div 
          className="calendly-inline-widget" 
          data-url={`https://calendly.com/${calendlyUsername}/${selectedAppointment.calendlyEvent}?hide_gdpr_banner=1&hide_landing_page_details=1`}
          style={{ minWidth: '320px', height: '630px' }}
        />
      </div>
    );
  }

  // Full variant - cards with selection
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
          <Calendar className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Plan een Afspraak
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Kies het type gesprek dat het beste bij uw situatie past. 
          We nemen de tijd om uw project grondig te bespreken.
        </p>
      </div>

      {/* Appointment type cards */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {appointmentTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;
          
          return (
            <button
              key={type.id}
              onClick={() => handleSelectType(type.id, type.calendlyEvent)}
              className={`relative p-6 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? 'border-primary-500 bg-primary-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-md'
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
              
              <div className={`w-12 h-12 ${type.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {type.title}
              </h3>
              
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <Clock className="w-4 h-4" />
                <span>{type.duration}</span>
              </div>
              
              <p className="text-gray-600 text-sm">
                {type.description}
              </p>

              <div className="mt-4 flex items-center text-primary-600 font-medium text-sm">
                <span>Selecteer tijdslot</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Calendly popup trigger info */}
      {showCalendly && selectedType && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 text-center">
            <p className="text-primary-800 mb-4">
              Klik hieronder om een beschikbaar tijdslot te kiezen in onze agenda.
            </p>
            <button
              onClick={() => {
                const type = appointmentTypes.find(t => t.id === selectedType);
                if (type) openCalendlyPopup(type.calendlyEvent);
              }}
              className="inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-600 transition-colors"
            >
              <Calendar className="w-5 h-5" />
              Open Agenda
            </button>
          </div>
        </div>
      )}

      {/* Benefits */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 pt-8 border-t border-gray-200">
        <div className="text-center">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Check className="w-5 h-5 text-green-600" />
          </div>
          <h4 className="font-bold text-gray-900 mb-1">Gratis Kennismaking</h4>
          <p className="text-sm text-gray-600">Eerste gesprek altijd vrijblijvend</p>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <h4 className="font-bold text-gray-900 mb-1">Flexibele Tijden</h4>
          <p className="text-sm text-gray-600">Ook 's avonds en op zaterdag</p>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Video className="w-5 h-5 text-purple-600" />
          </div>
          <h4 className="font-bold text-gray-900 mb-1">Online of Ter Plaatse</h4>
          <p className="text-sm text-gray-600">Kies wat voor u het beste werkt</p>
        </div>
      </div>
    </div>
  );
}

