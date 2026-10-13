# The Grand Plan Website

Plain HTML, CSS, and JavaScript website for Vercel. No framework or build step.

## Structure
- public/: published website files
- public/assets/css/styles.css: shared styles
- public/assets/js/main.js: shared JavaScript
- public/assets/images/: image assets
- vercel.json: clean URLs, output directory, and legacy redirects

## Deployment
Import this repository into Vercel. Choose Framework Preset: Other. Keep Root Directory at the repository root. Override Build Command to blank. Output Directory: public.

Pages are placeholders until the existing client content is migrated. Do not connect the live domain until migration and testing are complete.

## URLs
index.html -> /
about.html -> /about
donate.html -> /donate
groups.html -> /groups
contact.html -> /contact
6-summit-journey.html -> /6-summit-journey
on-demand-course.html -> /on-demand-course
individual-access.html -> /individual-access
privacy-policy.html -> /privacy-policy
terms-of-use.html -> /terms-of-use

Test extensionless links through Vercel; opening files directly does not apply Vercel routing. Never commit secrets or private customer data.
