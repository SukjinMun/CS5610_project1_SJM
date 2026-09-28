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

AI made the Lab page (lab.html, js/ising.js, and the Lab part of css/style.css) after I finished my other two pages. It took ten iterations, listed below with my prompt and what changed at each one. The full prompts are in [docs/genai_prompts.md](docs/genai_prompts.md).

**Iteration 1: choose the idea.** Help me plan an interactive physics page before changing any files.
_Result:_ it read my two pages, compared a 2D Ising model, a crystal lattice viewer, and a random walk, and asked me five questions about the audience, controls, and readouts. No files changed.

**Iteration 2: plan.** Plan a 2D Ising model page with a temperature slider, play, reset, and grid size.
_Result:_ a six phase plan (page shell, explanation and controls, simulation, drawing, styles, final checks) with a check for each phase. No files changed.

**Iteration 3: the page appears.** Build lab.html with my shared header and footer.
_Result:_ lab.html with my navbar and footer, a three paragraph plain explanation, and a card with the temperature slider, the size select, Play and Reset buttons, and a canvas area that was still blank.

**Iteration 4: the simulation runs.** Write the simulation in js/ising.js.
_Result:_ the canvas came alive. The spins sit in a typed array with wrap-around edges, four Metropolis sweeps run per frame, and up spins are drawn teal and down spins white. At low temperature the grid settled into one color, and at high temperature it stayed a random mix.

**Iteration 5: wire the controls.** Connect the controls and the readouts.
_Result:_ the slider moved to steps of 0.05 and shows its value, and a new size restarts the grid while the model keeps running.

**Iteration 6: test in Chrome.** Test the page in Chrome and fix any errors.
_Result:_ every control worked with an empty console, so no files changed.

**Iteration 7: Tc mark and plot.** Add a Tc mark and a small magnetization plot.
_Result:_ a small Tc tick under the slider at 2.269 with one sentence on what happens there, and a second canvas that plots the magnetization over the last 200 frames.

**Iteration 8: my style on every screen.** Match the style of my other pages and make it work on a phone.
_Result:_ Play turned solid teal and Reset a teal outline, the Tc sentence wraps at my text width, and on a phone the canvas comes first with the controls stacked below it.

**Iteration 9: accessibility.** Add canvas labels and keyboard focus.
_Result:_ a hidden status line that screen readers announce on Play, Pause, Reset, and size changes, and a teal outline on whichever control has keyboard focus.

**Iteration 10: final checks.** Fix the ESLint and W3C errors.
_Result:_ ESLint, Prettier, and W3C already passed, and it explained the Metropolis update to me step by step.

The page took shape at iterations 3 and 4, gained the Tc mark and the plot at iteration 7, and took on my style and the phone layout at iteration 8.

The same assistant also helped build and review my other two pages, the design document, and this README, and it later shortened the Lab page text and tidied the Lab code.

## License

Released under the [MIT License](LICENSE).
