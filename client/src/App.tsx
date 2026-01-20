import { Routes, Route, Navigate } from 'react-router-dom';
import BureauHuyghePage from './pages/BureauHuyghePage';
import ContactPage from './pages/ContactPage';
import LandmetingPage from './pages/LandmetingPage';
import BouwmetingPage from './pages/BouwmetingPage';
import TechnischeDocumentatiePage from './pages/TechnischeDocumentatiePage';
import NieuwsPage from './pages/NieuwsPage';
import CertificeringenPage from './pages/CertificeringenPage';
import JuridischPage from './pages/JuridischPage';
import OffertePage from './pages/OffertePage';
import PortfolioPage from './pages/PortfolioPage';
import NotFoundPage from './pages/NotFoundPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AppointmentsPage from './pages/AppointmentsPage';
import { AdminDashboard, AdminOverview, AdminPortfolio, AdminLeads, AdminContent, AdminProjects } from './pages/admin';
import ClientPortal from './pages/ClientPortal';
import { PortalOverview, PortalProjects, PortalDocuments, PortalUpload, PortalSettings } from './pages/portal';
import PropertySurveyPage from './pages/services/PropertySurveyPage';
import ConstructionSurveyPage from './pages/services/ConstructionSurveyPage';
import TechnicalDocumentationPage from './pages/services/TechnicalDocumentationPage';
import LegalServicesPage from './pages/services/LegalServicesPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<BureauHuyghePage />} />
      <Route path="/landmeting" element={<LandmetingPage />} />
      <Route path="/bouwmeting" element={<BouwmetingPage />} />
      <Route path="/technische-documentatie" element={<TechnischeDocumentatiePage />} />
      <Route path="/juridisch" element={<JuridischPage />} />
      <Route path="/offerte" element={<OffertePage />} />
      <Route path="/nieuws" element={<NieuwsPage />} />
      <Route path="/certificeringen" element={<CertificeringenPage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/property-survey" element={<PropertySurveyPage />} />
      <Route path="/services/construction-survey" element={<ConstructionSurveyPage />} />
      <Route path="/services/technical-documentation" element={<TechnicalDocumentationPage />} />
      <Route path="/services/legal-services" element={<LegalServicesPage />} />

      <Route path="/appointments" element={<AppointmentsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/dashboard" element={<Navigate to="/portal" replace />} />
      <Route path="/dashboard/documents" element={<Navigate to="/portal/documents" replace />} />
      <Route path="/dashboard/*" element={<Navigate to="/portal" replace />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />}>
        <Route index element={<AdminOverview />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="portfolio" element={<AdminPortfolio />} />
        <Route path="leads" element={<AdminLeads />} />
        <Route path="content" element={<AdminContent />} />
      </Route>

      {/* Client Portal Routes */}
      <Route path="/portal" element={<ClientPortal />}>
        <Route index element={<PortalOverview />} />
        <Route path="projects" element={<PortalProjects />} />
        <Route path="documents" element={<PortalDocuments />} />
        <Route path="upload" element={<PortalUpload />} />
        <Route path="settings" element={<PortalSettings />} />
      </Route>
      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
