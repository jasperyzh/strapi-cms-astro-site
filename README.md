# Deno Astro Strapi: Customizable Landing Page

This project combines the power of Astro as a frontend framework with Strapi CMS to create a fully customizable landing page. Strapi allows content editors to modify text, images, and other content without touching the code.

## Project Structure

```text
/
├── public/                 # Static assets
├── src/                    # Astro frontend code
│   ├── layouts/            # Page layouts
│   ├── components/         # UI components
│   └── pages/              # Page routes and templates
├── strapi-cms/             # Strapi CMS backend
└── package.json            # Project dependencies
```

## Getting Started

### Frontend (Astro)

```bash
# Start the Astro development server
deno dev
```

### Backend (Strapi)

```bash
# Navigate to the Strapi directory
cd strapi-cms

# Start the Strapi development server
npm run develop
```

## Implementation Steps

### 1. Content Type Setup in Strapi

1. **Access the Strapi Admin Panel**: 
   - Go to http://localhost:1337/admin
   - Create an admin user if you haven't already

2. **Create Content Types**:
   - **Hero Section**:
     - Fields: title, description, primaryButtonText, primaryButtonUrl, secondaryButtonText, secondaryButtonUrl, image
   - **About Us Section**:
     - Fields: title, description, features (repeatable component)
   - **Experience Section**:
     - Fields: title, description, testimonials (repeatable component)
   - **Pricing Section**:
     - Fields: title, description, plans (repeatable component)
   - **CTA Section**:
     - Fields: title, description, buttonText, buttonUrl

3. **Create Components** (for repeatable fields):
   - **Feature Component**:
     - Fields: title, description, icon
   - **Testimonial Component**:
     - Fields: name, role, content, avatar
   - **Plan Component**:
     - Fields: title, price, description, features (text array), isPopular, buttonText

4. **Create Global Types**:
   - **Site Configuration**:
     - Fields: siteName, siteDescription, logo, favicon, socialLinks

### 2. Connect Astro to Strapi

1. **Install Required Packages**:
   ```bash
   deno add @astrojs/node
   ```

2. **Create API Utility**:
   - Create a utility file to handle API calls to Strapi
   - Implement error handling and caching strategies

3. **Update Components to use Strapi Data**:
   - Modify each component to fetch and display dynamic content
   - Implement loading states and error handling

### 3. Image Management

1. **Configure Image Uploads in Strapi**:
   - Set up appropriate permissions for image uploads
   - Configure image optimization settings

2. **Handle Images in Astro**:
   - Create a utility function to generate image URLs
   - Implement responsive images with appropriate sizes

## Next Steps for Learning Strapi

1. **Explore the Admin Panel**:
   - Familiarize yourself with the Content Manager, Media Library, and User Management

2. **Study the Content Type Builder**:
   - Learn about different field types and their use cases
   - Understand relations between content types

3. **API Development**:
   - Try the API explorer in Strapi to understand available endpoints
   - Learn how to use filters, pagination, and sorting

4. **User Roles & Permissions**:
   - Set up different user roles for content editors
   - Configure specific permissions for each role

5. **Advanced Topics**:
   - Content versioning and publishing workflows
   - Webhooks for automated actions
   - Custom plugins development

## Resources

- [Strapi Documentation](https://docs.strapi.io)
- [Astro Documentation](https://docs.astro.build)
- [Strapi Content API Reference](https://docs.strapi.io/dev-docs/api/content-api)
- [Astro API Reference](https://docs.astro.build/en/reference/api-reference/)

## Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `deno install`            | Installs dependencies                            |
| `deno dev`                | Starts local dev server at `localhost:4321`      |
| `deno build`              | Build your production site to `./dist/`          |
| `deno preview`            | Preview your build locally, before deploying     |
| `deno astro ...`          | Run CLI commands like `astro add`, `astro check` |
| `deno astro -- --help`    | Get help using the Astro CLI                     |


---


### [250314]

Let me summarize the situation so far:

The user has an Astro application that's trying to fetch data from a Strapi CMS.
We've created the content types in Strapi, but we're still getting "Not Found" errors.
We tried to populate content via API but got "Method Not Allowed" errors.
The Strapi admin panel is accessible at http://localhost:1337/admin.
The next step should be to guide the user through creating content using the Strapi admin panel. I'll provide instructions for accessing the admin panel and creating content for each of the required sections.

I can see that the Strapi admin panel is accessible. Now let's create the content that your Astro application is trying to fetch.

Let me guide you through creating content using the Strapi admin panel:

Open your browser and navigate to: http://localhost:1337/admin
If you haven't already created an admin user, you'll need to do so first
After logging in, you'll need to create content for each of these sections:

1. Site Configuration
Click on "Site Configuration" in the sidebar
Click "Create new entry"
Fill in:
Site Name: "My Awesome Website" (or whatever you prefer)
Save and Publish
2. Hero Section
Click on "Hero Section" in the sidebar
Click "Create new entry"
Fill in:
Title: "Welcome to My Awesome Website"
Subtitle: "A modern website built with Astro and Strapi"
Button Text: "Get Started"
Button Link: "#about"
Save and Publish
3. About Section
Click on "About Section"
Click "Create new entry"
Fill in:
Title: "About Us"
Description: "We are a team of passionate developers building amazing web experiences."
Save and Publish
4. Experience Section
Click on "Experience Section"
Click "Create new entry"
Fill in:
Title: "Our Experience"
Description: "We have worked with clients from various industries."
Save and Publish
5. Pricing Section
Click on "Pricing Section"
Click "Create new entry"
Fill in:
Title: "Our Pricing"
Description: "Choose the plan that fits your needs."
Save and Publish
6. CTA Section
Click on "CTA Section"
Click "Create new entry"
Fill in:
Title: "Ready to Get Started?"
Description: "Contact us today to learn more about our services."
Button Text: "Contact Us"
Button Link: "/contact"
Save and Publish
After you've created and published content for all these sections, your Astro application should be able to fetch the data successfully without the "Not Found" errors.

Additionally, if you want to make this content available to your application without authentication, you'll need to update the permissions:

Go to Settings (gear icon) → Roles
Click on "Public"
For each content type (Hero, About, etc.), enable "find" and "findOne" permissions
Save
After setting these permissions, restart your Astro server, and it should be able to fetch the data without authentication.

Let me know if you need help with any specific part of this process!

---

I've implemented the necessary components and guides to make your landing page customizable with Strapi CMS. Here's a
  summary of what's been done:

  1. Created a utility file (src/utils/strapi.js) with functions to fetch content from Strapi
  2. Updated key components (Hero, AboutUs) to use dynamic content from Strapi
  3. Updated the Layout to use site configuration from Strapi
  4. Added a connection status check on the homepage
  5. Updated the project structure and package.json for better development
  6. Created detailed documentation in both README.md files:
    - Main README: Implementation steps and learning guide
    - Strapi README: Content type setup guide and API endpoints

  To continue implementing the dynamic content for other components (Experience, Pricing, CTA), follow the same pattern
  used for Hero and AboutUs components.

  To get started with Strapi:
  1. Start the Strapi server: cd strapi-cms && npm run develop
  2. Follow the setup instructions in the Strapi README.md
  3. Create the content types and add your content
  4. Start the Astro server: deno dev

  The components are designed to fall back to default content if Strapi is unavailable or specific content fields are
  missing.
