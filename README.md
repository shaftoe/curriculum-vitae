# A curriculum vitae built with modern web technologies

A simple and effective way to keep my CV up to date and always available, with all the actual content in easy-to-maintain [Markdown](https://www.markdownguide.org/) files, published as an accessible and optimized responsive web site.

Regardless of the technology used, since long you can always find the most up-to-date version of my CV at [https://cv.l3x.in/](https://cv.l3x.in/).

## Tech

- [Hugo](https://gohugo.io/) static site generator:
  - generate HTML pages from Markdown content through _partials_ HTML templates
  - build CSS files from SCSS sources thanks to the [native integration](https://gohugo.io/hugo-pipes/scss-sass/)
  - keep all personal metadata in `config.toml`
- (as much [semantic](https://guide.freecodecamp.org/html/html5-semantic-elements/) as possible) HTML5 for markup
- CSS3 _Grid_, _Flexbox_ and _Media queries_ for the responsive layout

## Usage

Please feel free to fork this repo, just remember to **clean up** the content from:

- `content/*.md` files (my actual curriculum data)
- `config.toml` (base URL, name, job title and links to profile photo and GitHub repo)
- this very file: `README.md`

**before publishing**. Everything else should be relatively abstract and possibly reusable.

## Tweaks

- As it is well described in the CSS-Tricks article mentioned in the [credits section](#credits), named CSS `grid-template-areas` are used to position the various sections, which makes it pretty easy to update the current layout if needed (check `assets/style.scss` for more details).
- If you want to add more sections, be aware that a new `.md` content file needs to be created (via `hugo new my-content.md` for example), with matching class name in [front matter](https://gohugo.io/content-management/front-matter/).
- The content of `content/work.md` is treated differently from the other sections to properly display job place, title, etc. Check the comments in `content/work.md` front matter to know more.

## Deploy

I'm using a free account on [Netlify](#credits) to automate deployment at each new commit pushed to master, check the [official documentation](https://docs.netlify.com/site-deploys/overview/) if you want to know more about their CI/CD features.

PS Netlify supports latest stable Hugo version.

## Credits

Many thanks to:

- [Ali Churcher](https://css-tricks.com/author/alichurcher/) for her [excellent CSS-Tricks article](https://css-tricks.com/new-year-new-job-lets-make-a-grid-powered-resume/) which gave me the idea in the first place
- Tim Holman for the [modern take](http://tholman.com/github-corners/) on the _fork me on Github_ link (fully in SVG!)
- [Netlify](https://www.netlify.com/) for their amazing platform and (free) services
