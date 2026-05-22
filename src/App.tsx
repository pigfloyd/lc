import { Routes, Route } from 'react-router-dom';
import { SidebarProvider } from './context/SidebarContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import NavigatorPage from './pages/NavigatorPage';
import SectionPage from './pages/SectionPage';
import AppendixPage from './pages/AppendixPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <SidebarProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="navigator" element={<NavigatorPage />} />
          <Route path="unit/:unitId/:sectionId" element={<SectionPage />} />
          <Route path="appendix/:appendixId" element={<AppendixPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </SidebarProvider>
  );
}
