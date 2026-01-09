import { useState } from 'react';
import { 
  Search, 
  Mail, 
  Phone, 
  Calendar,
  MapPin,
  ChevronDown,
  Eye,
  MessageSquare,
  X
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  location?: string;
  budget?: string;
  urgency?: string;
  status: 'new' | 'contacted' | 'quoted' | 'won' | 'lost';
  createdAt: string;
  notes?: string;
}

const statusOptions = [
  { value: 'new', label: 'Nieuw', color: 'bg-green-100 text-green-700' },
  { value: 'contacted', label: 'Gecontacteerd', color: 'bg-blue-100 text-blue-700' },
  { value: 'quoted', label: 'Offerte verstuurd', color: 'bg-purple-100 text-purple-700' },
  { value: 'won', label: 'Gewonnen', color: 'bg-emerald-100 text-emerald-700' },
  { value: 'lost', label: 'Verloren', color: 'bg-gray-100 text-gray-700' },
];

const services = [
  'Perceelafpaling',
  'Topografie',
  'Bouwmeting',
  '3D Scanning',
  'Plaatsbeschrijving',
  'Juridisch Advies'
];

// Mock data
const initialLeads: Lead[] = [
  {
    id: '1',
    name: 'Jan Peeters',
    email: 'jan.peeters@email.be',
    phone: '+32 477 12 34 56',
    service: 'Perceelafpaling',
    message: 'Graag een offerte voor afpaling van mijn perceel. Het gaat om een bouwgrond van ongeveer 800m².',
    location: 'Damme',
    budget: '€500 - €1000',
    urgency: 'Binnen 2 weken',
    status: 'new',
    createdAt: '2024-01-08T10:30:00',
  },
  {
    id: '2',
    name: 'Marie Claes',
    email: 'marie.claes@bedrijf.be',
    phone: '+32 478 98 76 54',
    service: 'Bouwmeting',
    message: 'Wij hebben een 3D scan nodig van ons industrieel pand voor renovatieplannen.',
    location: 'Zeebrugge',
    budget: '> €2000',
    urgency: 'Binnen 1 maand',
    status: 'contacted',
    createdAt: '2024-01-08T08:15:00',
    notes: 'Telefonisch contact gehad, afspraak gepland voor volgende week.'
  },
  {
    id: '3',
    name: 'Peter Janssens',
    email: 'peter.j@gmail.com',
    phone: '+32 479 11 22 33',
    service: 'Plaatsbeschrijving',
    message: 'Plaatsbeschrijving nodig voor verhuur van appartement.',
    location: 'Brugge',
    status: 'quoted',
    createdAt: '2024-01-07T14:00:00',
    notes: 'Offerte verstuurd op 7/1, wacht op reactie.'
  },
  {
    id: '4',
    name: 'Lisa De Smet',
    email: 'lisa.desmet@architect.be',
    phone: '+32 476 55 44 33',
    service: 'Topografie',
    message: 'Topografische opmeting voor nieuwbouwproject. Perceel van 2000m² met hoogteverschillen.',
    location: 'Knokke-Heist',
    budget: '€1000 - €2000',
    urgency: 'Dringend',
    status: 'new',
    createdAt: '2024-01-06T16:45:00',
  },
];

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus;
    const matchesService = selectedService === 'all' || lead.service === selectedService;
    return matchesSearch && matchesStatus && matchesService;
  });

  const updateLeadStatus = (leadId: string, newStatus: Lead['status']) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ));
    if (selectedLead?.id === leadId) {
      setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const getStatusBadge = (status: Lead['status']) => {
    const option = statusOptions.find(s => s.value === status);
    return option ? (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${option.color}`}>
        {option.label}
      </span>
    ) : null;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Zojuist';
    if (diffHours < 24) return `${diffHours} uur geleden`;
    if (diffDays === 1) return 'Gisteren';
    if (diffDays < 7) return `${diffDays} dagen geleden`;
    return date.toLocaleDateString('nl-BE', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Leads & Aanvragen</h1>
        <p className="text-gray-500 mt-1">Beheer inkomende offerteaanvragen en contactverzoeken</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {statusOptions.slice(0, 4).map(status => {
          const count = leads.filter(l => l.status === status.value).length;
          return (
            <button
              key={status.value}
              onClick={() => setSelectedStatus(status.value)}
              className={`p-4 rounded-xl border transition-all ${
                selectedStatus === status.value 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-100 bg-white hover:border-gray-200'
              }`}
            >
              <p className="text-2xl font-bold text-gray-900">{count}</p>
              <p className="text-sm text-gray-500">{status.label}</p>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Zoek op naam, email of bericht..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="pl-4 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
              >
                <option value="all">Alle statussen</option>
                {statusOptions.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="pl-4 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
              >
                <option value="all">Alle diensten</option>
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Leads List & Detail */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-2 space-y-3">
          {filteredLeads.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Geen leads gevonden</p>
            </div>
          ) : (
            filteredLeads.map(lead => (
              <div
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className={`bg-white rounded-xl border p-4 cursor-pointer transition-all ${
                  selectedLead?.id === lead.id 
                    ? 'border-primary-500 shadow-md' 
                    : 'border-gray-100 hover:border-gray-200 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                      {getStatusBadge(lead.status)}
                      {lead.urgency === 'Dringend' && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                          Dringend
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{lead.service}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">{lead.message}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-xs text-gray-400">{formatDate(lead.createdAt)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-1">
          {selectedLead ? (
            <div className="bg-white rounded-xl border border-gray-100 sticky top-24">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{selectedLead.name}</h3>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="p-1 hover:bg-gray-100 rounded lg:hidden"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <p className="text-sm text-gray-500">{selectedLead.service}</p>
              </div>

              <div className="p-4 space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <a 
                    href={`mailto:${selectedLead.email}`}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600"
                  >
                    <Mail className="w-4 h-4" />
                    {selectedLead.email}
                  </a>
                  <a 
                    href={`tel:${selectedLead.phone}`}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600"
                  >
                    <Phone className="w-4 h-4" />
                    {selectedLead.phone}
                  </a>
                  {selectedLead.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {selectedLead.location}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedLead.createdAt).toLocaleDateString('nl-BE', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Bericht</p>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                    {selectedLead.message}
                  </p>
                </div>

                {/* Extra Info */}
                {(selectedLead.budget || selectedLead.urgency) && (
                  <div className="flex gap-4">
                    {selectedLead.budget && (
                      <div>
                        <p className="text-xs font-medium text-gray-500">Budget</p>
                        <p className="text-sm text-gray-700">{selectedLead.budget}</p>
                      </div>
                    )}
                    {selectedLead.urgency && (
                      <div>
                        <p className="text-xs font-medium text-gray-500">Urgentie</p>
                        <p className="text-sm text-gray-700">{selectedLead.urgency}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Notes */}
                {selectedLead.notes && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Notities</p>
                    <p className="text-sm text-gray-700 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                      {selectedLead.notes}
                    </p>
                  </div>
                )}

                {/* Status Update */}
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-2">Status wijzigen</p>
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map(status => (
                      <button
                        key={status.value}
                        onClick={() => updateLeadStatus(selectedLead.id, status.value as Lead['status'])}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                          selectedLead.status === status.value
                            ? status.color
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    Bellen
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
              <Eye className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Selecteer een lead om details te bekijken</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
