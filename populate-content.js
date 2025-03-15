/**
 * Script to populate Strapi with initial content
 */
import fetch from 'node-fetch';

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = null; // Replace with your API token if you have one set up

// Helper function to make API requests
async function strapiRequest(endpoint, method = 'GET', data = null) {
  const url = `${STRAPI_URL}/api/${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (API_TOKEN) {
    options.headers['Authorization'] = `Bearer ${API_TOKEN}`;
  }

  if (data) {
    options.body = JSON.stringify({ data });
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      console.error(`Error ${response.status}: ${response.statusText}`);
      const errorText = await response.text();
      console.error(`Response: ${errorText}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`Request error: ${error.message}`);
    return null;
  }
}

// Create site configuration
async function createSiteConfig() {
  console.log('Creating site configuration...');
  const data = {
    siteName: 'My Awesome Website',
    // You can't set media fields directly via API
    // You'll need to upload these via the admin panel
  };

  const result = await strapiRequest('site-config', 'POST', data);
  if (result) {
    console.log('✅ Site configuration created successfully!');
  }
}

// Create hero section
async function createHeroSection() {
  console.log('Creating hero section...');
  const data = {
    title: 'Welcome to My Awesome Website',
    subtitle: 'A modern website built with Astro and Strapi',
    buttonText: 'Get Started',
    buttonLink: '#about',
  };

  const result = await strapiRequest('hero', 'POST', data);
  if (result) {
    console.log('✅ Hero section created successfully!');
  }
}

// Create about section
async function createAboutSection() {
  console.log('Creating about section...');
  const data = {
    title: 'About Us',
    description: 'We are a team of passionate developers building amazing web experiences.',
    // Features would need to be added via the admin panel or a more complex API flow
  };

  const result = await strapiRequest('about', 'POST', data);
  if (result) {
    console.log('✅ About section created successfully!');
  }
}

// Create experience section
async function createExperienceSection() {
  console.log('Creating experience section...');
  const data = {
    title: 'Our Experience',
    description: 'We have worked with clients from various industries.',
    // Testimonials would need to be added via the admin panel or a more complex API flow
  };

  const result = await strapiRequest('experience', 'POST', data);
  if (result) {
    console.log('✅ Experience section created successfully!');
  }
}

// Create pricing section
async function createPricingSection() {
  console.log('Creating pricing section...');
  const data = {
    title: 'Our Pricing',
    description: 'Choose the plan that fits your needs.',
    // Plans would need to be added via the admin panel or a more complex API flow
  };

  const result = await strapiRequest('pricing', 'POST', data);
  if (result) {
    console.log('✅ Pricing section created successfully!');
  }
}

// Create CTA section
async function createCtaSection() {
  console.log('Creating CTA section...');
  const data = {
    title: 'Ready to Get Started?',
    description: 'Contact us today to learn more about our services.',
    buttonText: 'Contact Us',
    buttonLink: '/contact',
  };

  const result = await strapiRequest('cta', 'POST', data);
  if (result) {
    console.log('✅ CTA section created successfully!');
  }
}

// Run all content creation functions
async function populateContent() {
  await createSiteConfig();
  await createHeroSection();
  await createAboutSection();
  await createExperienceSection();
  await createPricingSection();
  await createCtaSection();
  
  console.log('✨ Content population complete!');
}

populateContent();
