# Oak & Grain — Technical Project Overview

## Project Type

**Responsive static portfolio + commission-builder website**

## Architecture

The application is primarily a client-side experience:

```text
HTML
 │
 ├── Content sections
 ├── Forms
 ├── Project cards
 └── UI structure
      │
      ▼
CSS
 │
 ├── Design system
 ├── Responsive layouts
 ├── Animation
 └── Component styling
      │
      ▼
JavaScript
 │
 ├── Filters
 ├── Favorites
 ├── Commission builder
 ├── localStorage
 ├── Form interactions
 └── Scroll/reveal effects
```

## State

The site uses browser state rather than a server.

The main persistent features are:

- Favorite projects
- Saved commission brief

This is implemented with `localStorage`.

### Advantages

- No database required
- No account required
- Very simple deployment
- Works on static hosting

### Limitations

- Data is browser-specific
- Clearing browser storage removes saved information
- No account synchronization
- No server-side inquiry management

## Commission Builder

The commission builder is one of the main interactive components.

It collects:

- Piece type
- Wood species
- Approximate size
- Budget range
- Reference image
- Notes about the space/project

The UI is divided into three steps to reduce the amount of information shown at once.

The estimate card updates as selections change and provides a planning range.

## UX Approach

The website uses progressive disclosure:

```text
Discover studio
      ↓
Browse work
      ↓
Understand process
      ↓
Check availability
      ↓
Build a brief
      ↓
Save / send inquiry
```

This gives visitors context before asking them to provide project information.

## Engineering Strengths

- Clear page hierarchy
- Responsive layout
- Reusable CSS classes
- Accessible button/label structure
- Client-side persistence
- Multi-step form state
- Dynamic project filtering
- Visual feedback
- Graceful responsive behavior

## Current Technical Limitations

### Static data

Projects are currently defined in HTML rather than coming from an API/CMS.

### No backend

The inquiry flow is primarily frontend UI. A production implementation should connect submissions to a secure backend or email service.

### Demo content

Some business information, dates, contact details, testimonials, and project imagery are demonstration content.

### External assets

Images and fonts rely on external URLs.

## Recommended Production Architecture

A larger version could evolve toward:

```text
Frontend
   ↓
API
   ↓
Database
   ├── Projects
   ├── Users
   ├── Favorites
   ├── Commission briefs
   └── Inquiries
```

The client dashboard could then become a real authenticated workspace.

## Development Roadmap

### Phase 1 — Frontend cleanup
- Split JavaScript into modules
- Organize CSS into logical sections/files
- Centralize project data
- Improve naming consistency

### Phase 2 — Content system
- Move projects to JSON/CMS
- Add proper project detail records
- Add real image management

### Phase 3 — Backend
- Contact/inquiry API
- Database
- Authentication
- Persistent favorites
- Persistent briefs

### Phase 4 — Production
- Form validation and security
- Accessibility audit
- SEO
- Analytics
- Automated deployment
- Error monitoring

## Summary

Oak & Grain is more than a static visual mockup. It combines a polished editorial interface with several real client-side application patterns.

Its most useful engineering elements are the **filterable project gallery, multi-step commission builder, browser persistence, responsive design, and interactive dashboard**.
