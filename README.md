# tiger-roofing-masonry
Professional website and lead-generation platform for Tiger Roofing &amp; Masonry, built with HTML5, CSS3, and modern JavaScript.

## Drop-In Photo Architecture

The Portfolio grid and the Home-page project marquee are wired to sequential local
filenames (`project-1.jpg` through `project-11.jpg`, all lowercase). To swap a
photo, overwrite its file in the repo root — no HTML, CSS, or JS changes needed.
Every image slot uses `loading="lazy"` and `object-fit: cover`, so any aspect
ratio scales flawlessly.

To add a 12th photo: upload it as `project-12.jpg` and add a matching
`portfolio-item` tile in `index.html` (plus one `<img>` in each half of the
marquee track).

## Lead Form

The contact form posts to SheetMonkey and lands each lead as a row in the
connected Google Sheet (name, email, phone, project details, ROI estimate,
timestamp, source). Submission is async with live success/error button states,
a honeypot spam trap, and a no-JavaScript fallback via the form's native action.
