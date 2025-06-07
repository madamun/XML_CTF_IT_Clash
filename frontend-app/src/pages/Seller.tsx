
import { Button, InputField, Navbar, Footer} from "@/components";
import { Helmet } from "react-helmet-async";
import React from 'react';
import ProductForm, { ProductData } from "@/features/ProductForm";
const DevPage = () => {


    const handleFormSubmit = async (data: ProductData) => 
    console.log("Form data received in DevPage:", data);


  return (   
  <>
    <Helmet>
      <title>Seller</title>
      <meta name="description" content="This is the developer page." />
    </Helmet>

    <ProductForm onSubmit={handleFormSubmit}  />
  </>
  )
};

export default DevPage;