# A curriculum vitae built with modern web technologies

[![Netlify Status](https://api.netlify.com/api/v1/badges/53c5b088-2498-40b4-8e82-8f6ae243713c/deploy-status)](https://app.netlify.com/sites/hopeful-johnson-2088ad/deploys)

A simple and effective way to keep my CV up to date and always available, published as an accessible and optimized responsive web site.

Regardless of the technology used, since long you can always find the most up-to-date version of my CV at [https://cv.l3x.in/](https://cv.l3x.in/).

## Features

- easy to keep up to date, all content in [Markdown](https://www.markdownguide.org/) files
- layout easy to reshuffle
- fast load times, [Google Insights](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fcv.l3x.in%2F) gives 100% thumbs up
- displays decently on any modern web browser (including small screen devices)
- semantic markup accessible from a vast number of devices (including screen readers)
- printable from the browser as A4 or PDF
- single section views exposed as `/<section name>/`, e.g. [https://cv.l3x.in/about/](https://cv.l3x.in/about/)

## Tech

- [Hugo](https://gohugo.io/) static site generator:
  - generate HTML pages from Markdown content through partials HTML templates
  - build CSS files from SCSS sources thanks to the [native integration](https://gohugo.io/hugo-pipes/scss-sass/)
  - expose partial content as pretty urls thanks to [section templates](https://gohugo.io/templates/section-templates/)
  - all personal metadata in `config.toml`
- (as much [semantic](https://guide.freecodecamp.org/html/html5-semantic-elements/) as possible) HTML5 for markup
- CSS3 _Grid_, _Flexbox_ and _Media queries_ for the responsive layout

## Usage

Please feel free to fork this repo, just remember to **clean up before publishing** the content:

- `static/me.jpg`
- `content/*.md`: sections, e.g. "about"
- `content/work/*.md`: job entries
- `config.toml`: base URL, name, job title and link to GitHub repo
- `README.md`: this very file

Everything else should be relatively abstract and possibly reusable.

## Tweaks

- As it is well described in the CSS-Tricks article mentioned [below](#credits), named CSS `grid-template-areas` are used to position the various sections, which makes it pretty easy to update the current layout if needed (search for `grid-template-areas` in `assets/style.scss` and `assets/style-desktop.scss` for more details).
- If you want to add more sections and/or jobs, be aware that a new `.md` content file needs to be created (via `hugo new new-section.md` or `hugo new work/my-last-workplace.md` for example).

## Deploy

I'm using [Netlify](#credits) to automate deployment at each new commit pushed to master, check the [official documentation](https://docs.netlify.com/site-deploys/overview/) if you want to know more about their CI/CD features.

PS Netlify supports latest Hugo (stable) version.

## Credits

Many thanks to:

- [Ali Churcher](https://css-tricks.com/author/alichurcher/) for her [excellent CSS-Tricks article](https://css-tricks.com/new-year-new-job-lets-make-a-grid-powered-resume/) which gave me the idea in the first place
- Tim Holman for the [modern take](http://tholman.com/github-corners/) on the _fork me on Github_ link (fully in SVG!)
- [Netlify](https://www.netlify.com/) for their amazing platform and (free) services
