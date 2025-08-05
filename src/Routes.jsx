import React from "react";
import { HashRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Homepage from "pages/Homepage";
import AboutPage from "pages/AboutPage";
import ProjectsPage from "pages/ProjectsPage";
import SongSelectorPage from "pages/SongSelectorPage";
import NotFound from "pages/NotFound";
import { SongContextProvider } from "pages/SongSelectorPage/contexts/SongContext";
import { StorageProvider } from "pages/SongSelectorPage/contexts/StorageContext";

const Routes = () => {
  return (
    <HashRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/song-selector" element={
          <StorageProvider><SongContextProvider>
            <SongSelectorPage/>
          </SongContextProvider></StorageProvider>
        }/>
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </HashRouter>
  );
};

export default Routes;