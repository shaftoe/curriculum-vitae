# A curriculum vitae built with modern web technologies

[![Netlify Status](https://api.netlify.com/api/v1/badges/53c5b088-2498-40b4-8e82-8f6ae243713c/deploy-status)](https://app.netlify.com/sites/hopeful-johnson-2088ad/deploys)

A simple and effective way to keep the CV up to date and always available as an (accessible and blazing fast) web site.

Regardless of the technology used, since long you can always find the most up-to-date version of my CV at <https://cv.l3x.in/>.

## Features

- easy to keep updated: all the actual content is filed under `content/`, formatted in [Markdown](#markdown)
- simply reshuffle the layout editing one CSS property
- fast load times, [Google Insights](#insights) gives 100% thumbs up
- displays decently on any modern web browser (including low-end smartphones and screen readers)
- unadorned printable version (A4 for paper print or PDF)
- single section views exposed as `/<section name>/`, e.g. <https://cv.l3x.in/about/>

## Tech

- [Hugo](https://gohugo.io/) static site generator:
  - generate HTML pages from Markdown content through [partials templates](#hugo-partials)
  - compile CSS files from SCSS assets thanks to the [native integration](https://gohugo.io/hugo-pipes/scss-sass/)
  - expose partial content as _pretty urls_ with [section templates](#hugo-section-templates)
  - all personal metadata in `config.toml`
- (as much [semantic](https://guide.freecodecamp.org/html/html5-semantic-elements/) as possible) HTML5 for markup
- CSS3 _Grid_, _Flexbox_ and _Media queries_ for the responsive layout
- no JavaScript

## Usage

Please feel free to fork this repo, just remember to **clean up before publishing**:

- `config.toml`: base URL, name, job title and link to GitHub repo
- `content/*.md`: sections, e.g. `about.md`
- `content/work/*.md`: job entries
- `README.md`: this very file
- `static/me.jpg`

Everything else should be relatively abstract and reusable _as is_.

## Tweaks

- As it is well described in the CSS-Tricks article mentioned [below in the _credits_ section](#credits), named CSS `grid-template-areas` are used to position the various sections on the viewport, which makes it pretty easy to update the current layout when needed:

  ```css
    grid-template-areas:    =>      grid-template-areas:
      "header header"       =>        "header header"
      "work   skills"       =>        "about  skills"
      "work   ......"       =>        "work   work"
      "about  ......";      =>        "work   work";
  ```

  Search for `grid-template-areas` in `assets/style.scss` and `assets/large.scss` for current implementation.

- If you want to add more sections and/or jobs, be aware that a new Markdown content file needs to be created, e.g:

  - `hugo new new-section.md`
  - `hugo new work/my-last-workplace.md`

## Deploy

I'm using [Netlify](#netlify) to automate deployment at each new commit pushed to `origin/master`, see the [official documentation](#netlify-docs) if you want to know more about their CI/CD features.

PS Netlify supports latest Hugo (stable) version.

## Credits

Many thanks to:

- [Ali Churcher](https://css-tricks.com/author/alichurcher/) for her [excellent CSS-Tricks article](#css-tricks-article) which gave me the idea in the first place
- Tim Holman for the [modern take](http://tholman.com/github-corners/) on the _fork me on Github_ link (in pure SVG!)
- [Netlify](#netlify) for their amazing platform and (free) services
- Francesco Albanese of [Studio Compresso](#studio-compresso) for continuous feedback plus shooting the profile picture

[insights]: <https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fcv.l3x.in%2F> "Google Insights page results for <https://cv.l3x.in/>"
[netlify]: <https://www.netlify.com/>
[netlify-docs]: <https://docs.netlify.com/site-deploys/overview/>
[markdown]: <https://www.markdownguide.org/>
[hugo-partials]: <https://gohugo.io/templates/partials/>
[hugo-section-templates]: <https://gohugo.io/templates/section-templates/>
[css-tricks-article]: <https://css-tricks.com/new-year-new-job-lets-make-a-grid-powered-resume/>
[studio-compresso]: <https://www.studiocompresso.com/en/>
