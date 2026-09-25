# Oak & Grain — Fine Woodworking Website

A refined, editorial-style woodworking portfolio and commission website built with **HTML, CSS, and vanilla JavaScript**.

The project presents a fictional/portfolio woodworking studio called **Oak & Grain**, combining a premium visual identity with interactive features for browsing work, saving favorites, building a commission brief, and keeping project information in the browser.

## ✦ Overview

The site is designed around three goals:

- Showcase handcrafted furniture and woodworking projects.
- Explain the studio's process, materials, and philosophy.
- Give potential clients an interactive starting point for commissioning a piece.

It is a **static frontend project** and does not currently require a backend or framework.

## Features

- Responsive woodworking portfolio
- Full-screen hero section
- Selected-work gallery
- Work category filters
- Project detail links
- Favorite/save interactions
- Materials and care guides
- Workshop journal
- Studio/about section
- Commission availability section
- Multi-step commission builder
- Budget planning estimate
- Reference-image preview
- Browser-persistent saved project brief
- Browser-persistent favorite projects
- Client/project dashboard
- Testimonials marquee
- Newsletter subscription UI
- Contact/commission CTAs
- Scroll/reveal animations
- Responsive mobile layout

## Technology

| Technology | Role |
|---|---|
| HTML5 | Page structure |
| CSS3 | Layout, typography, responsive design and animation |
| Vanilla JavaScript | Interactions and browser state |
| localStorage | Saved briefs and favorites |
| Google Fonts | DM Sans + Playfair Display |
| Unsplash | Example project imagery |

No frontend framework or build system is required.

## Project Structure

```text
wood/
├── index.html
├── project.html
├── login.html
├── style.css
├── script.js
└── favicon.svg
```

## Main Experience

### Homepage

`index.html` acts as the complete studio experience.

The page moves through:

1. Hero
2. Craft introduction
3. Selected work
4. Philosophy
5. Process
6. Materials and care
7. Workshop journal
8. Studio/about
9. Commission availability
10. Commission builder
11. Project dashboard
12. Testimonials
13. Contact

### Work Gallery

The gallery currently contains example projects including:

- Walnut Lounge
- Oak Dining Table
- Studio Chair
- Lowline Cabinet

Projects are tagged by categories such as seating, dining, and storage.

### Commission Builder

The builder guides a visitor through:

```text
Piece
  ↓
Wood species
  ↓
Size
  ↓
Budget
  ↓
Reference / notes
  ↓
Saved brief
```

The estimate is presented as a **planning range**, not a final quotation.

### Browser Storage

The site uses `localStorage` so users can return to the same browser and find saved information.

This keeps the project completely frontend-based, but it also means saved data is not synchronized across devices or accounts.

## Design System

The visual direction is intentionally premium and editorial:

- Warm paper background
- Dark ink typography
- Muted natural tones
- Serif display typography
- Large photography
- Spacious layouts
- Thin borders
- Subtle motion
- Minimal controls

The design is meant to feel closer to a furniture studio/editorial publication than a conventional ecommerce store.

## Running Locally

Because this is a static website, it can be served with any basic HTTP server.

For example:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Important Notes

The project currently contains placeholder/demo contact information and example content. Before production use, replace these with real business details.

The project also uses externally hosted images and fonts, so an internet connection is required for those resources.

## Future Improvements

- Connect the contact form to a real backend/email service.
- Add a real CMS or database for projects.
- Add authentication for the client dashboard.
- Synchronize saved briefs between devices.
- Add real project detail pages.
- Add image uploads through a backend.
- Add project inquiry management.
- Add SEO metadata and structured data.
- Add accessibility testing.
- Add analytics.
- Add automated deployment.

## Portfolio Skills Demonstrated

This project demonstrates:

- Semantic HTML
- Responsive CSS
- UI/UX design
- JavaScript DOM manipulation
- Form handling
- localStorage
- Multi-step interfaces
- Dynamic filtering
- Interactive galleries
- Browser state management
- Responsive/mobile design
- Frontend architecture

## Author

Built by **btwsalts** as a web-development project.
