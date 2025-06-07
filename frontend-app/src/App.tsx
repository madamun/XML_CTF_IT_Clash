// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import React, { Suspense } from "react";

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { Routes, Route } from "react-router-dom";
import RequireAuth from './components/RequireAuth';
import FeedbackPage from './pages/FeedbackPage';
import Seller from './pages/Seller';
import NotFoundPage from "./pages/NotFoundPage";
import { HelmetProvider } from 'react-helmet-async';
import  PageLayout  from "@/layouts/PageLayout";


function App() {
  return (
    <HelmetProvider>
      <div className="flex flex-col min-h-screen w-full">
        <Routes>
          <Route
            path="/login/*"
                  element={
                        <LoginPage />
                  }
        />
          <Route element={<RequireAuth><PageLayout /></RequireAuth>}>
            <Route
                path="/"
                      element={
                            <HomePage />
                      }
            />

            <Route
                path="*"
                      element={
                          <NotFoundPage />
                      }
            />
            {/* <Route
                path="/home/*"
                      element={
                          <HomePage />
                      }
            /> */}
          
            <Route
                path="/feedback/*"
                      element={
                          <FeedbackPage />
                      }
            />
            
            <Route
                path="/feedback/*"
                      element={
                          <FeedbackPage />
                      }
            />

            <Route
                path="/seller/*"
                      element={
                          <Seller />
                      }
            />
          </Route>
        </Routes>
      </div>
    </HelmetProvider>
  )
}



export default App
