# Varad Salunkhe — Freelance Website Developer

A responsive business-profile site built with Vite, semantic HTML, CSS, and vanilla JavaScript.

## Run locally
1. Install Node.js LTS.
2. Run `npm install` in this folder.
3. Run `npm run dev` and open the local URL Vite prints.
4. Run `npm run build` for a production bundle in `dist/`; `npm run preview` previews it.

## Edit the business profile
Use `src/config.js` for the name, copy, enabled services, concept/project entries, benefits, process, packages, policies, FAQ, contact details, form endpoint, and SEO settings. Set a service or package `enabled: false` to hide it. The site serves optimized JPEGs at `public/images/varadsalunkhe.jpg` and `public/images/landing.jpg`; original PNGs are retained outside the public build in `source-assets/images/`. The landing image is an illustrative concept, not client work.

Prices, page limits, revision limits, and support policies are not binding by default. Confirm and configure any offer before enabling it.

## Contact form
The current endpoint is configured in `contact.formEndpoint`. The form uses client validation and a honeypot. A success message appears only after Formspree returns success. Verify the endpoint and test receipt in your Formspree account before publishing; do not add secret API keys to frontend code.

## SEO and production
Set `seo.siteUrl` in `src/config.js` to the deployed site origin. The page then adds canonical/Open Graph URL data and the Vite build generates `dist/sitemap.xml`. No placeholder domain or sitemap is published while this field is empty. `robots.txt` permits crawling; connect a real domain, verify it in Google Search Console, then submit the generated sitemap. Indexing and search rankings are not guaranteed.

Run `npm run build` and deploy `dist/` to a static host whose current terms allow your intended commercial use. `public/404.html` provides the branded not-found page; configure your host to use `/404.html` for missing pages if it does not do so automatically. Check the chosen host plan and any domain, hosting, or form-provider charges before publishing. For a project-page URL such as GitHub Pages, configure Vite's `base` in `vite.config.js` first.

## Deploy on Render
This project includes `render.yaml` for a Render Static Site. Push the project, including `package-lock.json` and `render.yaml`, to a GitHub, GitLab, or Bitbucket repository. In Render, create a **New → Blueprint Instance** from that repository and review the detected `varad-salunkhe-website` static site. The Blueprint builds with `npm ci && npm run build` and publishes `dist/`. You can also create **New → Static Site** and enter those same build and publish values manually. No rewrite rule is needed because the site uses one homepage with in-page anchors. The build includes `404.html`; after deployment, check whether Render serves it automatically for an unknown path and configure not-found handling in the dashboard if needed.

After the first deploy, open the assigned `onrender.com` URL and check the images, WhatsApp link, Formspree form, and unknown-path 404 page. Set that URL as `seo.siteUrl` in `src/config.js`, rebuild, and push the change so the canonical URL and sitemap use the live domain. Render deploys updates when you push to the connected branch.

## Before publishing
- Add your preferred email and professional social links.
- Confirm the configured Formspree endpoint is active and test receipt with a non-sensitive test enquiry.
- Confirm enabled services, quote terms, and any policies.
- Replace or expand the concept image only with clearly labeled, authentic work.
- Set the production URL and check the generated sitemap.
