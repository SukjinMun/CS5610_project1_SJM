# Suk Jin Mun, personal homepage

A three page static homepage built with HTML5, CSS3, ES6 modules, and Bootstrap 5.3.

## Links

\# Live site: [https://sukjinmun.github.io/CS5610_project1_SJM/](https://sukjinmun.github.io/CS5610_project1_SJM/)\
\# Design document: [docs/design_document.pdf](docs/design_document.pdf)\
\# Video: [https://www.youtube.com/watch?v=YFa4BTQpu7U](https://www.youtube.com/watch?v=YFa4BTQpu7U)\
\# Slides: [Google Slides](https://docs.google.com/presentation/d/1GkdRYpRmGIRh9DSRDWldRN4j6XZGo7R_d9KolcGOJHA/edit?usp=sharing)

## Author

Suk Jin Mun, [mun.s@northeastern.edu](mailto:mun.s@northeastern.edu), GitHub [SukjinMun](https://github.com/SukjinMun)

## Class link

[CS5610 Web Development, Northeastern University](https://johnguerra.co/classes/webDevelopment_online_fall_2026/)

## Project objective

I am an M.S. Data Science student at Northeastern University, and I use data science and machine learning for materials research. The site shows who I am, my research and publications, and how to reach me.

## Screenshot

![Home page at 1280 by 800 pixels](images/screenshot.png)

## Pages

\# index.html is the home page, with a short introduction, highlights, education, and contact links.\
\# research.html lists my interests, research positions, and publications, and it holds the Bragg peak explorer.\
\# lab.html runs an interactive 2D Ising model, and it is the page made with GenAI as described below.

All pages share the navbar, the footer, and css/style.css. js/main.js marks the current page, sets the footer year, and shares the palette colors and canvas sizing with both demos.

## Original component

The Bragg peak explorer on research.html shows the angles at which a crystal scatters light into peaks. I wrote it from scratch in js/bragg.js. You pick a crystal type, a size, and a light source, and it draws the peaks on a canvas and lists them in a table.

## Instructions to build

The site is static and has no build step.

1. Clone the repository and open its folder.

   ```bash
   git clone https://github.com/SukjinMun/CS5610_project1_SJM.git
   cd CS5610_project1_SJM
   ```

2. `npm install` installs Bootstrap 5.3.8 and the dev tools (ESLint, Prettier, http-server). The pages load Bootstrap's ES module build from jsDelivr, and the import map in each page head points its one import, @popperjs/core 2.11.8, to the same CDN.
3. `npm start` serves the site at http://localhost:8080.
4. `npm run lint` runs ESLint with the class config.
5. `npm run format` formats the files with Prettier.

Any static server works, for example `python3 -m http.server 8080`. Use a server, since ES modules do not load from file:// URLs.

## Project structure

```text
CS5610_project1_SJM/
├── index.html          Home
├── research.html       Research and the Bragg peak explorer
├── lab.html            Lab and the 2D Ising model
├── css/style.css       Styles on top of Bootstrap
├── js/main.js          Navbar link, footer year, shared canvas helpers
├── js/bragg.js         Bragg peak explorer
├── js/ising.js         Ising model
├── images/             Avatar, favicon, screenshot, thumbnail
├── docs/               Design document PDF, GenAI prompts
├── eslint.config.js    Class ESLint config
├── package.json        Scripts and dependencies
└── LICENSE             MIT License
```

## GenAI use

Model: Claude Opus 5.5 (claude-opus-5-5) by Anthropic, through Claude Code 2.1.283, September 2026.

AI made the Lab page (lab.html, js/ising.js, and the Lab part of css/style.css) after I finished my other two pages. It took ten iterations, each listed with my prompt and what changed. The full prompts are in [docs/genai_prompts.md](docs/genai_prompts.md).

**Iteration 1.** I asked for help planning an interactive physics page before any file changed. It compared a 2D Ising model, a crystal lattice viewer, and a random walk, and asked me five questions.

**Iteration 2.** I chose the Ising model with a temperature slider, play, reset, and grid size, and asked for a plan. It wrote six phases with a check for each.

**Iteration 3.** I asked it to build lab.html with my shared header and footer. The page appeared with a short explanation, the controls, and a blank canvas.

**Iteration 4.** I asked for the simulation in js/ising.js. The canvas came alive, ordering into one color at low temperature and staying random at high temperature.

**Iteration 5.** I asked it to connect the controls and the readouts. The slider moved to steps of 0.05, and a new grid size restarts the model without stopping it.

**Iteration 6.** I asked it to test the page in Chrome. Every control worked with no console errors, so no file changed.

**Iteration 7.** I asked for a Tc mark and a magnetization plot. A Tc tick with one sentence appeared under the slider, and a second canvas plots the last 200 frames.

**Iteration 8.** I asked it to match my other pages and fit a phone. The buttons turned teal, and on a phone the canvas comes first with the controls below.

**Iteration 9.** I asked for canvas labels and keyboard focus. Screen readers now hear a status line, and the focused control shows a teal outline.

**Iteration 10.** I asked it to fix the ESLint and W3C errors. All checks already passed, and it explained the Metropolis update to me step by step.

The page changed most at iterations 3, 4, 7, and 8.

The same assistant also helped build and review my other two pages, the design document, and this README, and it later shortened the Lab page text and tidied the Lab code.

## License

Released under the [MIT License](LICENSE).
