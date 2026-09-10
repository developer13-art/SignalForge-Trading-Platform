import React from 'react';
import { Route } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import {
  Home,
  HowSignalForgeWorks,
  Features,
  Pricing,
  Enterprise,
  WhiteLabel,
  APIPlatform,
  Security,
  About,
  Contact,
  FAQ,
} from '../pages/public';

export const publicRoutes = (
  <Route element={<PublicLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/how-it-works" element={<HowSignalForgeWorks />} />
    <Route path="/features" element={<Features />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/enterprise" element={<Enterprise />} />
    <Route path="/white-label" element={<WhiteLabel />} />
    <Route path="/api-platform" element={<APIPlatform />} />
    <Route path="/security" element={<Security />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/faq" element={<FAQ />} />
  </Route>
);