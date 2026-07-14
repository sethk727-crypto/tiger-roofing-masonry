# tiger-roofing-masonry
Professional website and lead-generation platform for Tiger Roofing &amp; Masonry, built with HTML5, CSS3, and modern JavaScript.

## Drop-In Photo Architecture

The Portfolio grid and the Home-page project marquee are wired to sequential local
filenames. To publish your own photos, just overwrite the files in the repo root:

```
project-1.jpg  project-2.jpg  ...  project-12.jpg
```

No HTML, CSS, or JS changes needed — every image slot uses `loading="lazy"` and
`object-fit: cover`, so any aspect ratio scales flawlessly. The current
`project-*.jpg` files are branded placeholders meant to be replaced.
