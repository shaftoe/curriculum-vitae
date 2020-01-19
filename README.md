# Alexander Fortin's curriculum vitae

A simple and effective way to keep my CV up to date and always online, instantly published as a responsive web site.

You can always find the most up-to-date version at [https://cv.l3x.in/](https://cv.l3x.in/)

## Tech

- [Hugo](https://gohugo.io/), to generate the HTML from config and _partials_ templates, keeping all the actual data in easy-to-maintain [Markdown](https://www.markdownguide.org/) files
- (as much [semantic](https://guide.freecodecamp.org/html/html5-semantic-elements/) as possible) HTML5 for markup
- CSS3 Grid + Flexbox for the responsive layout

## Usage

Please feel free to fork it, just remember to clean up my personal content from:

- `content/*.md` files (the actual CV data)
- `config.toml` (base URL, name, job title and links to profile photo and GitHub repo)
- this very file: `README.md`

before publishing. Everything else should be relatively abstract and possibly reusable.

If you want to add more sections, be aware that a new file under `content/` needs to be added (via `hugo new my-content.md` for example), with matching class name in [front matter](https://hugo).

As it is well described in the CSS-Tricks article mentioned in the [credits section](#credits), named CSS3 `grid-template-areas` are used to position the various sections, which should make it pretty easy to update the current layout if needed.

## Tweaks

The content of `content/work.md` is treated differently from the other sections to properly display job place, title, etc. See the comments in `content/work.md` front matter to know more.

## Deploy

I'm using a free account on [Netlify](#credits) to automate deployment at each new commit pushed to master, check the [official documentation](https://docs.netlify.com/site-deploys/overview/) if you want to know more about their CI/CD features.

PS Netlify supports latest stable Hugo version.

## Credits

Many thanks to:

- [Ali Churcher](https://css-tricks.com/author/alichurcher/) for her [excellent CSS-Tricks article](https://css-tricks.com/new-year-new-job-lets-make-a-grid-powered-resume/) which gave me the idea in the first place
- Tim Holman for the [modern take](http://tholman.com/github-corners/) on the _fork me on Github_ link (in SVG!)
- [Netlify](https://www.netlify.com/) for their awesome free service
