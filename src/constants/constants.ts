// src/constants.ts
const isProduction = process.env.NODE_ENV === 'production';

export const CLIENT_ID = 'Iv23likog4otrC7hbvzF'; // Replace with your client ID
export const DEV_URL = 'https://9000-idx-bnbpropertylink-1733251621445.cluster-6yqpn75caneccvva7hjo4uejgk.cloudworkstations.dev/'; // Replace with your development URL
export const PROD_URL = 'https://BNB-Propertylink.vercel.app'; // Replace with your production URL

export const API_URL = isProduction ? PROD_URL : DEV_URL;
