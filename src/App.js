import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ScrollToTop from "./ScrollToTop";

// 🔹 Admin Dashboard & Components
import Dashboard from "./pages/dashboard";
import Articles from "./components/Articles";
import TeamMembers from "./components/TeamMembers";
import SystemUsers from "./components/SystemUsers";
import Reports from "./components/Reports";

import ArticlesDetail from "./pages/ArticlesDetail";
import BlogGrid from "./components/Articles/blog_grid";

// 🔹 Authentication Pages
import Login from "./pages/Login";

// 🔹 Practice Areas
import Litigation from "./components/Practise/Litigation";
import TechnologyLaw from "./components/Practise/TechnologyLaw";
import CorporateCommercial from "./components/Practise/CorporateCommercial";
import RealEstateProperty from "./components/Practise/RealEstateProperty";
import AviationLawPractise from "./components/Practise/AviationLawPractise";
import ProcurementLaw from "./components/Practise/ProcurementLaw";
import DataProtection from "./components/Practise/DataProtection";
import FamilyMarriage from "./components/Practise/FamilyMarriage";
import NotarialServices from "./components/Practise/NotarialServices";
import InvestmentFranchise from "./components/Practise/InvestmentFranchise";

// 🔹 People
import People from "./components/People/People";
import PersonProfile from "./components/People/PersonProfile";
import '@fortawesome/fontawesome-free/css/all.min.css';

// 🔹 Careers
import Careers from "./pages/Careers";
import JobDetail from "./pages/JobDetail";

// 🔹 Service Details Page (NEW)
import ServiceDetails from "./components/ServiceDetails";

// 🔹 Floating Contact Menu Component
const FloatingContactMenu = () => {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-50 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8">
      {/* Call Button - Green */}
      <a 
        href="tel:+254786437754"
        className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all flex items-center justify-center w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
        title="Call Us"
      >
        <i className="fas fa-phone-alt text-lg md:text-xl lg:text-2xl"></i>
      </a>
      
      {/* WhatsApp Button - WhatsApp Green */}
      <a 
        href="https://wa.me/254786437754"
        className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all flex items-center justify-center w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
        title="WhatsApp Us"
      >
        <i className="fab fa-whatsapp text-lg md:text-xl lg:text-2xl"></i>
      </a> 

      {/* Email Button - Blue */}
      <a 
        href="mailto:gmorinaadvocates@gmail.com"
        className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all flex items-center justify-center w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
        title="Email Us"
      >
        <i className="fas fa-envelope text-lg md:text-xl lg:text-2xl"></i>
      </a>
    </div>
  );
};

function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      <Router>
        <ScrollToTop />
        <Routes>
          {/* 🔹 Main Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/vacancy" element={<JobDetail />} />
          <Route path="/job/:id" element={<JobDetail />} />

          {/* 🔹 Blog & Articles */}
          <Route path="/blog" element={<BlogGrid />} />
          <Route path="/articles" element={<BlogGrid />} />
          <Route path="/articles/:id" element={<ArticlesDetail />} />
       
          {/* 🔹 Authentication Pages */}
          <Route path="/login" element={<Login />} />

          {/* 🔹 Practice Areas */}
          <Route path="/procurement-law" element={<ProcurementLaw />} />
          <Route path="/litigation-dispute" element={<Litigation />} />
          <Route path="/technology-ip-internetlaw" element={<TechnologyLaw />} />
          <Route path="/corporate-commercial-law" element={<CorporateCommercial />} />
          <Route path="/real-estate-property-law" element={<RealEstateProperty />} />
          <Route path="/aviation-law-practise" element={<AviationLawPractise />} />
          <Route path="/it-data-protection-crypto" element={<DataProtection />} />
          <Route path="/family-marriage-succession" element={<FamilyMarriage />} />
          <Route path="/notarial-services-certificates" element={<NotarialServices />} />
          <Route path="/investment-franchise" element={<InvestmentFranchise />} />

          {/* 🔹 People */}
          <Route path="/our-people" element={<People />} />
          <Route path="/our-people/:name" element={<PersonProfile />} />

          {/* 🔹 Admin Dashboard & Management */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/articles" element={<Articles />} />
          <Route path="/dashboard/team-members" element={<TeamMembers />} />
          <Route path="/dashboard/system-users" element={<SystemUsers />} />
          <Route path="/dashboard/reports" element={<Reports />} />

          {/* 🔹 Service Details Route (NEW) */}
          <Route path="/services/:id" element={<ServiceDetails />} />
        </Routes>

        {/* 🔹 Floating Contact Menu & ChatBox on All Pages */}
        <FloatingContactMenu />
      </Router>
    </div>
  );
}

export default App;
