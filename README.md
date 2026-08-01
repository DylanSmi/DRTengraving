# DRT Engraving — Website

A fast, fully responsive single-page website for **DRT Engraving**, a small
business specialising in custom laser wood engraving.

Built with plain **HTML, CSS and JavaScript** — no frameworks, no build step,
no external dependencies. It loads fast and is easy to host anywhere.

## Features

- **Mobile-first, fully responsive** layout
- Warm, natural wood-tone palette with a burnt-orange accent
- Sections: Hero, About, Gallery, Services, How It Works, Contact, Footer
- Sticky header with an accessible mobile navigation menu
- Subtle hover effects and scroll-reveal animations (respects
  `prefers-reduced-motion`)
- Client-side contact form validation (ready to wire up to a backend)
- Basic SEO meta tags, Open Graph tags, and JSON-LD structured data
- SVG favicon placeholder

## Project structure

```
.
├── index.html            # All page markup
├── css/
│   └── styles.css        # All styles + responsive rules
├── js/
│   └── main.js           # Nav, scroll reveal, form validation
├── assets/
│   ├── favicon.svg       # Favicon placeholder
│   └── gallery/          # Placeholder gallery images (SVG)
│       └── 01–06.svg
└── README.md
```

## Running locally

Because it's static, you can just open `index.html` in a browser. For the best
experience (and so relative paths behave), serve it with any static server:

```bash
# Python 3 (built in on most machines)
python3 -m http.server 8000

# or Node (if you have it)
npx serve .
```

Then visit **http://localhost:8000**.

## Customising

### Business details
Text, email, phone, location and social links live directly in `index.html`.
Search for `hello@drtengraving.com`, `+353 87 000 0000`, and the social `href="#"`
links and replace them with the real values. Update the URLs in the SEO/Open
Graph tags and the JSON-LD block near the top of `index.html` too.

### Colours & fonts
All theme colours are CSS custom properties at the top of `css/styles.css`
(under `:root`) — change the wood tones or the `--accent` burnt-orange in one
place. Fonts use a system serif/sans stack, so there are no web-font requests.

### Gallery photos
The gallery currently uses SVG placeholders in `assets/gallery/`. To swap in
real photos, drop your images into that folder and update the `<img src="…">`
paths (and the `alt` text) in the **Gallery** section of `index.html`. Keeping
a ~4:3 aspect ratio matches the current layout best.

### Contact form
The form validates on the client and shows a placeholder success message. To
actually send messages, connect it to a form backend. The simplest option is a
hosted service such as [Formspree](https://formspree.io) or
[Getform](https://getform.io):

1. Create a form there and copy your endpoint URL.
2. In `index.html`, add `action="YOUR_ENDPOINT" method="POST"` to the
   `<form id="contact-form">`.
3. In `js/main.js`, replace the placeholder success block with a `fetch()`
   POST to the endpoint (or remove the JS handler to let the browser submit).

## Deploying

### GitHub Pages (already set up)

This repo ships a GitHub Actions workflow at
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) that publishes
the site to GitHub Pages automatically on every push to the default branch.
The workflow enables Pages for you (`configure-pages` with `enablement: true`),
so there's usually no manual toggle needed.

- Watch the run under the repo's **Actions** tab. When it finishes, the live
  URL appears in the workflow's `github-pages` deployment (and under
  *Settings → Pages*), typically `https://<user>.github.io/<repo>/`.
- If the first run fails at the "Configure Pages" step, open
  *Settings → Pages → Build and deployment* and set **Source** to
  **GitHub Actions**, then re-run the workflow.

### Other static hosts

Any static host works. A few free options:
- **Netlify** — drag the folder onto the Netlify dashboard, or connect the repo
  for automatic deploys.
- **Cloudflare Pages / Vercel** — connect the repo; no build command needed,
  output directory is the project root.

Once live, update the `canonical` / Open Graph URLs in `index.html` to your real
domain.

## License

© DRT Engraving. All rights reserved.
