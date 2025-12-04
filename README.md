# Suncare Customer Portal (static prototype)

This repository contains a single-page, large-print portal for Suncare customers and prospects. It surfaces resources, FAQs, event registrations (with transport/payment preferences), home safety and personal details, medical updates, and service schedules in an accessible layout.

## Running locally

No build steps are required. From the project root run a simple static server and open the page in your browser:

```bash
python -m http.server 8000
```

Then browse to `http://localhost:8000/`.

All form data is stored in `localStorage` only and never leaves the browser.
