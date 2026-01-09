import { Routes, Route } from 'react-router-dom';
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
import { AdminDashboard, AdminOverview, AdminPortfolio, AdminLeads, AdminContent } from './pages/admin';

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
      
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />}>
        <Route index element={<AdminOverview />} />
        <Route path="portfolio" element={<AdminPortfolio />} />
        <Route path="leads" element={<AdminLeads />} />
        <Route path="content" element={<AdminContent />} />
      </Route>
      
      <Route path="*" element={<div>404 - Pagina niet gevonden</div>} />
    </Routes>
  );
}

export default App;
