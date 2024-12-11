'use client';

import { useState } from 'react';
import Card from '@/components/Card';

interface Property {
  id: number;
  image: string;
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  type: string;
}

export default function Dashboard() {
  const [properties] = useState<Property[]>([
    {
      id: 1,
      image: '/property1.jpg',
      price: 500000,
      address: '123 Main St, Anytown',
      bedrooms: 3,
      bathrooms: 2,
      type: 'House',
    },
    {
      id: 2,
      image: '/property2.jpg',
      price: 250000,
      address: '456 Oak Ave, Anytown',
      bedrooms: 2,
      bathrooms: 1,
      type: 'Apartment',
    },

    {
      id: 1,
      image: '/property3.jpg',
      price: 500000,
      address: '123 Main St, Anytown',
      bedrooms: 3,
      bathrooms: 2,
      type: 'House',
    },
    {
      id: 2,
      image: '/property4.jpg',
      price: 250000,
      address: '456 Oak Ave, Anytown',
      bedrooms: 2,
      bathrooms: 1,
      type: 'Apartment',
    },

    {
      id: 1,
      image: '/property5.jpg',
      price: 500000,
      address: '123 Main St, Anytown',
      bedrooms: 3,
      bathrooms: 2,
      type: 'House',
    },
    {
      id: 2,
      image: '/property6.jpg',
      price: 250000,
      address: '456 Oak Ave, Anytown',
      bedrooms: 2,
      bathrooms: 1,
      type: 'Apartment',
    },
    // Add more dummy property data here
  ]);

  return (
    <div className="h-screen bg-gradient-to-b from-yellow-400 to-yellow-600">
      {/* Header */}
      <div className="py-4 bg-yellow-500 text-white text-center text-3xl font-bold">
        BNB PropertyLink Dashboard
      </div>

      {/* Main Content */}
      <div className="flex justify-center p-4">
        {/* Sidebar */}
        <div className="w-1/4 bg-yellow-200 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Filter Properties</h2>
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          {/* Add filter options for price range, property type, etc. */}
          <div className="flex flex-col space-y-2">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">
              Filter by Price
            </button>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">
              Filter by Type
            </button>
          </div>
        </div>

        {/* Property Grid */}
        <div className="w-3/4 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((property) => (
              <Card key={property.id} className="bg-yellow-100 rounded-lg shadow-lg">
                <img src={property.image} alt={property.address} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold">${property.price}</h3>
                  <p className="text-gray-600">{property.address}</p>
                  <p className="text-gray-600">
                    {property.bedrooms} beds, {property.bathrooms} baths
                  </p>
                  <p className="text-gray-600">{property.type}</p>
                  <div className="flex justify-between mt-4">
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">
                      Buy
                    </button>
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">
                      Rent
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-4 bg-yellow-500 text-white text-center text-lg font-bold">
        2023 BNB PropertyLink. All rights reserved.
      </div>
    </div>
  );
}
