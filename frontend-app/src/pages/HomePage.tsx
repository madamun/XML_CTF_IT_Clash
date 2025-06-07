// import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button, InputField, Navbar, Footer } from "@/components";
import { Helmet } from 'react-helmet-async';



const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.search && !location.search.includes('=')) {
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

  return (
    
    <div className=''>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="แก้ไขรหัสผ่านของบัญชีคุณได้ที่นี่" />
      </Helmet>
      <div className="p-10">
          <div className="">
            <h1>Welcome to BlackMarket</h1>
          </div>
      </div>

    </div>
  )
};

export default HomePage;