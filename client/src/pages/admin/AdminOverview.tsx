import { 
  Images, 
  MessageSquare, 
  Eye, 
  TrendingUp,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { 
    name: 'Portfolio Items', 
    value: '24', 
    change: '+3', 
    trend: 'up',
    icon: Images,
    href: '/admin/portfolio'
  },
  { 
    name: 'Nieuwe Leads', 
    value: '12', 
    change: '+5', 
    trend: 'up',
    icon: MessageSquare,
    href: '/admin/leads'
  },
  { 
    name: 'Paginaweergaven', 
    value: '2.4k', 
    change: '+18%', 
    trend: 'up',
    icon: Eye,
    href: '#'
  },
  { 
    name: 'Offertes deze maand', 
    value: '8', 
    change: '-2', 
    trend: 'down',
    icon: TrendingUp,
    href: '/admin/leads'
  },
];

const recentLeads = [
  { id: 1, name: 'Jan Peeters', service: 'Perceelafpaling', date: '2 uur geleden', status: 'new' },
  { id: 2, name: 'Marie Claes', service: 'Bouwmeting', date: '5 uur geleden', status: 'contacted' },
  { id: 3, name: 'Peter Janssens', service: 'Plaatsbeschrijving', date: '1 dag geleden', status: 'quoted' },
  { id: 4, name: 'Lisa De Smet', service: 'Topografie', date: '2 dagen geleden', status: 'new' },
];

const upcomingAppointments = [
  { id: 1, client: 'Bouwbedrijf Verstraete', type: 'Terreinbezoek', date: 'Vandaag, 14:00' },
  { id: 2, client: 'Notaris Van Damme', type: 'Offerte bespreking', date: 'Morgen, 10:00' },
  { id: 3, client: 'Familie Declercq', type: 'Kennismaking', date: 'Wo 15 jan, 09:30' },
];

export default function AdminOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overzicht</h1>
        <p className="text-gray-500 mt-1">Welkom terug! Hier is een overzicht van uw website.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.name}
              to={stat.href}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <span className={`flex items-center text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                  {stat.trend === 'up' 
                    ? <ArrowUpRight className="w-4 h-4 ml-1" />
                    : <ArrowDownRight className="w-4 h-4 ml-1" />
                  }
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.name}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Leads */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recente Leads</h2>
              <Link to="/admin/leads" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Bekijk alle →
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{lead.name}</p>
                    <p className="text-sm text-gray-500">{lead.service}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      lead.status === 'new' 
                        ? 'bg-green-100 text-green-700'
                        : lead.status === 'contacted'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {lead.status === 'new' ? 'Nieuw' : lead.status === 'contacted' ? 'Gecontacteerd' : 'Offerte verstuurd'}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">{lead.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Komende Afspraken</h2>
              <Link to="/admin/appointments" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Bekijk alle →
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {upcomingAppointments.map((apt) => (
              <div key={apt.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-accent-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{apt.client}</p>
                    <p className="text-sm text-gray-500">{apt.type}</p>
                  </div>
                  <p className="text-sm text-gray-600">{apt.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Snelle Acties</h3>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/portfolio/new"
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            + Nieuw Portfolio Item
          </Link>
          <Link
            to="/admin/content"
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Content Bewerken
          </Link>
          <Link
            to="/admin/leads?status=new"
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Nieuwe Leads Bekijken
          </Link>
        </div>
      </div>
    </div>
  );
}
