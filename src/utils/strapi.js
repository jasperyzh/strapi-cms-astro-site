/**
 * Utility functions for interacting with Strapi CMS
 */

// Use environment variable for Strapi URL with fallback to localhost for development
// Remove trailing slash if present to ensure consistent URL formatting
let strapiUrl = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';
// Remove trailing slash if it exists
if (strapiUrl.endsWith('/')) {
  strapiUrl = strapiUrl.slice(0, -1);
}
const STRAPI_URL = strapiUrl;

// Log the Strapi URL being used for debugging
console.log('Using Strapi URL:', STRAPI_URL);
// Add your Strapi API token here after creating it in the Strapi admin panel
const STRAPI_API_TOKEN = import.meta.env.STRAPI_API_TOKEN; // You'll need to fill this in with your actual token



/**
 * Fetch data from Strapi API
 * @param {string} endpoint - API endpoint to fetch
 * @param {Object} options - Additional fetch options
 * @returns {Promise<Object>} - Parsed response data
 */
export async function fetchFromStrapi(endpoint, options = {}) {
  try {
    // Keep it simple - just use the basic API endpoint
    const url = `${STRAPI_URL}/api/${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Add Authorization header if API token is available
    if (STRAPI_API_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
    }
    
    console.log('Fetching from Strapi:', url);
    
    const response = await fetch(url, {
      headers,
      ...options,
    });

    if (!response.ok) {
      console.warn(`Warning: Error fetching from Strapi: ${response.status} ${response.statusText} for endpoint ${endpoint}`);
      return { data: null };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Strapi fetch error:', error);
    return null;
  }
}

/**
 * Get image URL from Strapi
 * @param {Object} image - Strapi image object
 * @returns {string} - Full image URL
 */
export function getStrapiImageUrl(image) {
  if (!image) return '';
  
  // Check if image is a full URL
  if (image.url.startsWith('http')) {
    return image.url;
  }
  
  // Otherwise, prepend the Strapi URL
  return `${STRAPI_URL}${image.url}`;
}

/**
 * Get hero section data
 * @returns {Promise<Object>} - Hero section data
 */
export async function getHeroSection() {
  const data = await fetchFromStrapi('hero?populate=*');
  return data?.data;
}

/**
 * Get about section data
 * @returns {Promise<Object>} - About section data
 */
export async function getAboutSection() {
  const data = await fetchFromStrapi('about?populate=*');
  return data?.data;
}

/**
 * Get experience section data
 * @returns {Promise<Object>} - Experience section data
 */
export async function getExperienceSection() {
  const data = await fetchFromStrapi('experience?populate=*');
  return data?.data;
}

/**
 * Get pricing section data
 * @returns {Promise<Object>} - Pricing section data
 */
export async function getPricingSection() {
  const data = await fetchFromStrapi('pricing?populate=*');
  return data?.data;
}

/**
 * Get CTA section data
 * @returns {Promise<Object>} - CTA section data
 */
export async function getCtaSection() {
  const data = await fetchFromStrapi('cta?populate=*');
  return data?.data;
}

/**
 * Get site configuration
 * @returns {Promise<Object>} - Site configuration
 */
export async function getSiteConfig() {
  const data = await fetchFromStrapi('site-config?populate=socialLinks');
  return data?.data;
}
