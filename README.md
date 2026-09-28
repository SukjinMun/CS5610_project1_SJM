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

1. Help me plan an interactive physics page before changing any files. It read my pages, compared three ideas, and asked me five questions, with no files changed.
2. Plan a 2D Ising model page with a temperature slider, play, reset, and grid size. It wrote a six phase plan with a check for each phase, with no files changed.
3. Build lab.html with my shared header and footer. The page first appeared, with the navbar, footer, explanation, controls, and an empty canvas area.
4. Write the simulation in js/ising.js. The Metropolis simulation first ran on the canvas, and Play, Reset, and the grid size worked.
5. Connect the controls and the readouts. The temperature slider moved to steps of 0.05 and shows its value, and the readouts update live.
6. Test the page in Chrome and fix any errors. Every control worked with no console errors, so no files changed.
7. Add a Tc mark and a small magnetization plot. The Tc tick and its sentence appeared under the slider, with a live plot of the last 200 frames.
8. Match the style of my other pages and make it work on a phone. Play and Reset turned teal, the Tc text got narrower, and the phone layout puts the canvas first.
9. Add canvas labels and keyboard focus. A screen reader status line and a teal keyboard focus outline were added.
10. Fix the ESLint and W3C errors. All checks already passed, and it explained the Metropolis update to me step by step.

The biggest changes came at iterations 3 and 4, when the page and the simulation first appeared, and at iterations 7 and 8, when the Tc mark, the plot, and the phone layout were added.

The same assistant also helped build and review my other two pages, the design document, and this README, and it later shortened the Lab page text and tidied the Lab code.

## License

Released under the [MIT License](LICENSE).
