'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function MintProperty() {
  const [formData, setFormData] = useState({
    propertyName: '',
    propertyAddress: '',
    propertyDescription: '',
    propertyImage: null,
  });

  const handleChange = (e: { target: { name: any; value: any; type: any; files: any; }; }) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };


  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      // 1. Prepare the data for minting
      const { propertyName, propertyAddress, propertyDescription, propertyImage } = formData;
      const formDataForUpload = new FormData();
      formDataForUpload.append('name', propertyName);
      formDataForUpload.append('address', propertyAddress);
      formDataForUpload.append('description', propertyDescription);
      formDataForUpload.append('image', propertyImage);


      // 2. Perform the minting process (replace with your actual minting logic)
      // Example using a hypothetical 'mintNFT' function:
      const response = await fetch('/api/mint', {
        method: 'POST',
        body: formDataForUpload,
      });

      if (response.ok) {
        alert('Property NFT minted successfully!');
        // Optionally, reset the form here
        setFormData({
          propertyName: '',
          propertyAddress: '',
          propertyDescription: '',
          propertyImage: null,
        });
      } else {
        const errorData = await response.json();
        alert(`Minting failed: ${errorData.message || 'An error occurred'}`);
      }
    } catch (error) {
      console.error('Minting error:', error);
      alert('An error occurred during minting.');
    }
  };

  return (
    <div>
      <Header />
      <section>
        <h2>Mint Your Property NFT</h2>
        <p>
          To mint a property NFT, please fill out the form below and ensure you meet all the
          requirements.
        </p>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="propertyName">Property Name:</label>
            <input
              type="text"
              id="propertyName"
              name="propertyName"
              value={formData.propertyName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="propertyAddress">Property Address:</label>
            <input
              type="text"
              id="propertyAddress"
              name="propertyAddress"
              value={formData.propertyAddress}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="propertyDescription">Property Description:</label>
            <textarea
              id="propertyDescription"
              name="propertyDescription"
              value={formData.propertyDescription}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="propertyImage">Property Image:</label>
            <input
              type="file"
              id="propertyImage"
              name="propertyImage"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Mint NFT</button>
        </form>
      </section>
      <Footer />
    </div>
  );
}

export default MintProperty;