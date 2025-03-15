// Simple script to test connection to Strapi
const STRAPI_URL = 'https://strapi-cms-0m1d.onrender.com';
const STRAPI_API_TOKEN = '3ff19d7e69a2303512e46d599d842c80e95570fb7f594cbeb7956e560c4063e33ae233a8f6a670827e07c48fdcf4aa1624f580f5f2741f0cfd13f94816d46a0e92f86d8925ff842c19ebd6fe3c5e15406ec87630bf82b5e4c2331ff69feab493f0302df8a45c8692e16235e624962d1b9dcbc492bb4452bf8a46e778beef7587';

async function testStrapiConnection() {
  try {
    console.log('Testing connection to Strapi at:', STRAPI_URL);
    
    // Remove trailing slash if it exists
    const baseUrl = STRAPI_URL.endsWith('/') ? STRAPI_URL.slice(0, -1) : STRAPI_URL;
    
    // Try to fetch the site-config endpoint
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (STRAPI_API_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
      console.log('Using API token for authentication');
    }
    
    // Test different endpoints to see which ones work
    const endpoints = [
      '/api/site-config',
      '/api/hero',
      '/api/about',
      '/api/experience',
      '/api/pricing',
      '/api/cta'
    ];
    
    for (const endpoint of endpoints) {
      try {
        console.log(`\nTesting endpoint: ${endpoint}`);
        const url = `${baseUrl}${endpoint}`;
        console.log('Fetching URL:', url);
        
        const response = await fetch(url, { headers });
        console.log('Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Response data:', JSON.stringify(data, null, 2).substring(0, 200) + '...');
        } else {
          console.error('Error response:', response.statusText);
        }
      } catch (endpointError) {
        console.error(`Error testing endpoint ${endpoint}:`, endpointError.message);
      }
    }
  } catch (error) {
    console.error('Error testing Strapi connection:', error);
  }
}

testStrapiConnection();
