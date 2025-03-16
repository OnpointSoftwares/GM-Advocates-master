import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ScrollToTop from "./ScrollToTop";

// 🔹 Admin Dashboard & Components
import Dashboard from "./pages/dashboard";
import Articles from "./components/Articles";
import ManageAppointments from "./components/ManageAppointments";
import TeamMembers from "./components/TeamMembers";
import SystemUsers from "./components/SystemUsers";
import Reports from "./components/Reports";
import AddArticle from "./components/AddArticle";
import ArticlesDetail from "./pages/ArticlesDetail";
import BlogGrid from "./components/Articles/blog_grid";

// 🔹 Authentication Pages (✅ Newly Added)
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

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
import PersonProfile from "./components/People/PersonProfile"; // ✅ Dynamic Profile Page

// 🔹 Careers
import Careers from "./pages/Careers";
import JobDetail from "./pages/JobDetail";

function App() {
  return (
    <div className="App">
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
          <Route path="/add-article" element={<AddArticle />} />

          {/* 🔹 Authentication Pages (✅ Newly Added) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

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
          <Route path="/our-people/:name" element={<PersonProfile />} /> {/* ✅ Dynamic Route */}

          {/* 🔹 Admin Dashboard & Management */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/articles" element={<Articles />} />
          <Route path="/dashboard/appointments" element={<ManageAppointments />} />
          <Route path="/dashboard/team-members" element={<TeamMembers />} />
          <Route path="/dashboard/system-users" element={<SystemUsers />} />
          <Route path="/dashboard/reports" element={<Reports />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
