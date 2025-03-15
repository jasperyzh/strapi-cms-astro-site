export async function get() {
  // Check for environment variables
  const envStatus = {
    PUBLIC_STRAPI_URL: {
      defined: !!import.meta.env.PUBLIC_STRAPI_URL,
      value: import.meta.env.PUBLIC_STRAPI_URL || 'undefined'
    },
    STRAPI_API_TOKEN: {
      defined: !!import.meta.env.STRAPI_API_TOKEN,
      // Don't return the actual token value for security reasons
      value: import.meta.env.STRAPI_API_TOKEN ? '[REDACTED]' : 'undefined'
    },
    NODE_ENV: import.meta.env.NODE_ENV || 'undefined',
    IS_PROD: import.meta.env.PROD ? true : false,
    IS_DEV: import.meta.env.DEV ? true : false
  };

  return new Response(
    JSON.stringify({
      success: true,
      message: 'Environment variables status',
      data: envStatus
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}
