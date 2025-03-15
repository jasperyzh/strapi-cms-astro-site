/**
 * Script to create content types in Strapi CMS
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define content types to create
const contentTypes = [
  {
    name: 'hero',
    displayName: 'Hero Section',
    description: 'Hero section content for the homepage',
    attributes: {
      title: {
        type: 'string',
        required: true,
      },
      subtitle: {
        type: 'text',
      },
      buttonText: {
        type: 'string',
      },
      buttonLink: {
        type: 'string',
      },
      image: {
        type: 'media',
        allowedTypes: ['images'],
      },
    },
  },
  {
    name: 'about',
    displayName: 'About Section',
    description: 'About section content',
    attributes: {
      title: {
        type: 'string',
        required: true,
      },
      description: {
        type: 'richtext',
      },
      features: {
        type: 'component',
        component: 'sections.feature',
        repeatable: true,
      },
    },
  },
  {
    name: 'experience',
    displayName: 'Experience Section',
    description: 'Experience section content',
    attributes: {
      title: {
        type: 'string',
        required: true,
      },
      description: {
        type: 'richtext',
      },
      testimonials: {
        type: 'component',
        component: 'sections.testimonial',
        repeatable: true,
      },
    },
  },
  {
    name: 'pricing',
    displayName: 'Pricing Section',
    description: 'Pricing section content',
    attributes: {
      title: {
        type: 'string',
        required: true,
      },
      description: {
        type: 'richtext',
      },
      plans: {
        type: 'component',
        component: 'sections.plan',
        repeatable: true,
      },
    },
  },
  {
    name: 'cta',
    displayName: 'CTA Section',
    description: 'Call to action section content',
    attributes: {
      title: {
        type: 'string',
        required: true,
      },
      description: {
        type: 'richtext',
      },
      buttonText: {
        type: 'string',
      },
      buttonLink: {
        type: 'string',
      },
    },
  },
  {
    name: 'site-config',
    displayName: 'Site Configuration',
    description: 'Global site configuration',
    attributes: {
      siteName: {
        type: 'string',
        required: true,
      },
      logo: {
        type: 'media',
        allowedTypes: ['images'],
      },
      favicon: {
        type: 'media',
        allowedTypes: ['images'],
      },
      socialLinks: {
        type: 'component',
        component: 'config.social-link',
        repeatable: true,
      },
    },
  },
];

// Define components to create
const components = [
  {
    category: 'sections',
    name: 'feature',
    displayName: 'Feature',
    attributes: {
      title: {
        type: 'string',
        required: true,
      },
      description: {
        type: 'text',
      },
      icon: {
        type: 'media',
        allowedTypes: ['images'],
      },
    },
  },
  {
    category: 'sections',
    name: 'testimonial',
    displayName: 'Testimonial',
    attributes: {
      name: {
        type: 'string',
        required: true,
      },
      position: {
        type: 'string',
      },
      quote: {
        type: 'text',
        required: true,
      },
      avatar: {
        type: 'media',
        allowedTypes: ['images'],
      },
    },
  },
  {
    category: 'sections',
    name: 'plan',
    displayName: 'Pricing Plan',
    attributes: {
      name: {
        type: 'string',
        required: true,
      },
      price: {
        type: 'string',
        required: true,
      },
      period: {
        type: 'string',
      },
      features: {
        type: 'json',
      },
      isFeatured: {
        type: 'boolean',
        default: false,
      },
      buttonText: {
        type: 'string',
      },
      buttonLink: {
        type: 'string',
      },
    },
  },
  {
    category: 'config',
    name: 'social-link',
    displayName: 'Social Link',
    attributes: {
      platform: {
        type: 'string',
        required: true,
      },
      url: {
        type: 'string',
        required: true,
      },
      icon: {
        type: 'string',
      },
    },
  },
];

// Create component schema files
function createComponentSchema(component) {
  const componentDir = path.join(
    __dirname,
    'strapi-cms',
    'src',
    'components',
    component.category
  );
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }
  
  const schemaPath = path.join(componentDir, `${component.name}.json`);
  const schema = {
    collectionName: `components_${component.category}_${component.name.replace(/-/g, '_')}s`,
    info: {
      displayName: component.displayName,
      icon: 'puzzle-piece',
    },
    options: {},
    attributes: component.attributes,
  };
  
  fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2));
  console.log(`Created component schema: ${schemaPath}`);
}

// Create content type schema files
function createContentTypeSchema(contentType) {
  const apiDir = path.join(
    __dirname,
    'strapi-cms',
    'src',
    'api',
    contentType.name
  );
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(apiDir)) {
    fs.mkdirSync(apiDir, { recursive: true });
  }
  
  // Create content-types directory
  const contentTypesDir = path.join(apiDir, 'content-types', contentType.name);
  if (!fs.existsSync(contentTypesDir)) {
    fs.mkdirSync(contentTypesDir, { recursive: true });
  }
  
  // Create schema.json
  const schemaPath = path.join(contentTypesDir, 'schema.json');
  const schema = {
    kind: 'singleType',
    collectionName: contentType.name.replace(/-/g, '_'),
    info: {
      singularName: contentType.name,
      pluralName: `${contentType.name}s`,
      displayName: contentType.displayName,
      description: contentType.description,
    },
    options: {
      draftAndPublish: true,
    },
    attributes: contentType.attributes,
  };
  
  fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2));
  console.log(`Created content type schema: ${schemaPath}`);
  
  // Create controllers directory
  const controllersDir = path.join(apiDir, 'controllers');
  if (!fs.existsSync(controllersDir)) {
    fs.mkdirSync(controllersDir, { recursive: true });
  }
  
  // Create controller.js
  const controllerPath = path.join(controllersDir, `${contentType.name}.js`);
  const controller = `'use strict';

/**
 * ${contentType.name} controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::${contentType.name}.${contentType.name}');
`;
  
  fs.writeFileSync(controllerPath, controller);
  console.log(`Created controller: ${controllerPath}`);
  
  // Create routes directory
  const routesDir = path.join(apiDir, 'routes');
  if (!fs.existsSync(routesDir)) {
    fs.mkdirSync(routesDir, { recursive: true });
  }
  
  // Create routes.js
  const routesPath = path.join(routesDir, `${contentType.name}.js`);
  const routes = `'use strict';

/**
 * ${contentType.name} router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::${contentType.name}.${contentType.name}');
`;
  
  fs.writeFileSync(routesPath, routes);
  console.log(`Created routes: ${routesPath}`);
  
  // Create services directory
  const servicesDir = path.join(apiDir, 'services');
  if (!fs.existsSync(servicesDir)) {
    fs.mkdirSync(servicesDir, { recursive: true });
  }
  
  // Create service.js
  const servicePath = path.join(servicesDir, `${contentType.name}.js`);
  const service = `'use strict';

/**
 * ${contentType.name} service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::${contentType.name}.${contentType.name}');
`;
  
  fs.writeFileSync(servicePath, service);
  console.log(`Created service: ${servicePath}`);
}

// Create components
components.forEach(createComponentSchema);

// Create content types
contentTypes.forEach(createContentTypeSchema);

console.log('Content types and components created successfully!');
console.log('Please restart your Strapi server to apply the changes.');
