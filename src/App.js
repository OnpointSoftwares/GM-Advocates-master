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
    <div className="fixed bottom-6 left-[80%] sm:left-auto sm:right-6 transform -translate-x-1/2 sm:translate-x-0 flex flex-col gap-3 z-50">
      
      {/* Call Button */}
      <a href="tel:+254786437754" className="bg-green-500 text-white p-2 sm:p-3 rounded-full shadow-md hover:bg-green-600 transition-all flex items-center justify-center w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14" title="Call Us">
        <i className="fas fa-phone-alt text-sm sm:text-base lg:text-lg"></i>
      </a>

      {/* WhatsApp Button */}
      <a href="https://wa.me/254786437754" target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white p-2 sm:p-3 rounded-full shadow-md hover:bg-green-700 transition-all flex items-center justify-center w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14" title="WhatsApp">
        <i className="fab fa-whatsapp text-sm sm:text-base lg:text-lg"></i>
      </a>

      {/* Email Button - Sends to BOTH emails */}
      <a href="mailto:info@gmorinaadvocates.com,gmorinaadvocates@gmail.com" 
         className="bg-blue-500 text-white p-2 sm:p-3 rounded-full shadow-md hover:bg-blue-600 transition-all flex items-center justify-center w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14" 
         title="Email Us">
        <i className="fas fa-envelope text-sm sm:text-base lg:text-lg"></i>
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
