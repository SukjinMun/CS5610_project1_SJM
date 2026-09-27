# Suk Jin Mun, personal homepage

A three page static homepage built with HTML5, CSS3, ES6 modules, and Bootstrap 5.3, with research, publications, a Bragg peak explorer, and a 2D Ising model.

## Links

- Live site: added when the public repository is deployed with GitHub Pages
- Design document: [docs/design_document.pdf](docs/design_document.pdf)
- Video: added after recording
- Slides: added after upload

## Author

Suk Jin Mun, [mun.s@northeastern.edu](mailto:mun.s@northeastern.edu), GitHub [SukjinMun](https://github.com/SukjinMun)

## Class link

[CS5610 Web Development, Northeastern University](https://johnguerra.co/classes/webDevelopment_online_fall_2026/)

## Project objective

The site is the personal homepage of Suk Jin Mun, an M.S. Data Science student at Northeastern University who builds machine learning methods for materials discovery and crystallography. It tells a visitor who he is, what research he has done and published, and how to reach him, and it adds one interactive piece that shows what diffraction analysis computes. Its readers are professors who review PhD applications, engineers who hire for materials informatics and machine learning roles, and classmates or lab collaborators.

## Screenshot

![Home page at 1280 by 800 pixels](images/screenshot.png)

## Pages

- index.html, Home: a hero with the name, a role line, and a short about text, three highlight cards that link into the research page, education, and contact links.
- research.html, Research: research interests, six research positions from newest to oldest, publications, and the Bragg peak explorer.
- lab.html, Lab: the third page, made as described in [GenAI use](#genai-use), with a short explanation and an interactive 2D Ising model that has a temperature slider marked at the critical temperature, a lattice size select, Play and Reset buttons, live magnetization and energy per spin, and a plot of the magnetization over the last 200 frames with the same data in a table.

All three pages share the navbar, the footer, and css/style.css, and js/main.js marks the current page in the navbar and sets the footer year.

## Original component

The Bragg peak explorer on research.html, written from scratch in js/bragg.js with no library, shows where the powder X-ray diffraction peaks of a cubic crystal fall. The visitor picks simple, body centered, or face centered cubic, a lattice constant a from 3.00 to 6.00 Å, and a Cu Kα or Mo Kα source, and the module keeps the hkl reflections that the lattice allows, groups those with the same h² + k² + l², and computes d = a / √(h² + k² + l²) and 2θ = 2 arcsin(λ / 2d) for each peak. Every peak between 10° and 90° in 2θ is drawn as a stick on a canvas, the first ones carrying their hkl labels, and listed in a table with its d and 2θ.

## Instructions to build

The site is static and has no build step.

1. Clone the repository and open its folder.

   ```bash
   git clone https://github.com/SukjinMun/CS5610_project1_SJM.git
   cd CS5610_project1_SJM
   ```

2. `npm install` installs the packages listed in package.json: Bootstrap 5.3.8, the version the pages load from the jsDelivr CDN, and the dev dependencies ESLint, Prettier, http-server, and the ESLint plugins.
3. `npm start` serves the folder with http-server at http://localhost:8080 and opens the home page.
4. `npm run lint` runs ESLint with the class config in eslint.config.js.
5. `npm run format` formats the files with Prettier.

Any static server works too, for example `python3 -m http.server 8080` in the project folder. Open the pages through a server, since ES modules do not load from file:// URLs.

## Project structure

```text
CS5610_project1_SJM/
├── index.html          Home
├── research.html       Research and the Bragg peak explorer
├── lab.html            Lab and the 2D Ising model
├── css/style.css       Palette and page rules on top of Bootstrap
├── js/main.js          Active navbar link and footer year
├── js/bragg.js         Bragg peak explorer
├── js/ising.js         Ising model simulation
├── images/             Avatar, favicon, screenshot, and thumbnail
├── docs/               Design document PDF
├── eslint.config.js    Class ESLint config
├── package.json        Scripts and dependencies
└── LICENSE             MIT License
```

## GenAI use

The tool was Claude by Anthropic with the model Claude Opus 5.5 (model ID claude-opus-5-5), used through the Claude Code agent in September 2026.

The Lab page, lab.html, its module js/ising.js, and the Lab block at the end of css/style.css were generated with it after index.html and research.html were finished. The session started in plan mode, where the agent read the two finished pages, css/style.css, js/main.js, and js/bragg.js as the style reference and agreed on a plan before it wrote any code. These are the ten prompts, verbatim, each followed by what it produced.

1. > Act as a professional full stack developer with 20 years of experience. We are in plan mode: do not create or change any file until I tell you to implement. I am building my personal homepage for my web development class with vanilla HTML, CSS, ES6 modules, and Bootstrap 5.3. First read index.html, research.html, css/style.css, js/main.js, and js/bragg.js. They are the pages I built and they define my style. I need a third page, lab.html, made together with you. I want something interactive that connects to my physics background, and I am undecided between a 2D Ising model simulation, a crystal lattice viewer, and a random walk visualizer. Help me think it through, and ask me the questions you need before proposing anything.

   The agent read the five files, weighed the three ideas, and asked five questions about the goal, the research link, the controls, the readouts, and the limits, and changed no file.

2. > Let's go with the 2D Ising model. My answers: it is a separate page at lab.html with the same navbar and footer as my other pages. The visitor may have no physics background, so include a short plain explanation. Controls: a temperature slider, play and pause, reset, and a lattice size choice of 32, 64, or 128. Show the live magnetization and energy per spin. Use the Metropolis algorithm on a canvas with no libraries, and put the code in js/ising.js as an ES module. It must pass my class ESLint config (double quotes, semicolons, two space indent) and the W3C validator. Now write the plan in phases with a verification step for each phase. Still do not implement.

   The agent wrote a phased plan for the page with a verification step for each phase, and no code yet.

3. > The plan looks good. Implement phase 1 only: lab.html with the shared head, navbar, and footer, and the layout for the explanation, the canvas area, and the controls, matching the cards and spacing of research.html. Show me what you changed.

   The agent created lab.html with the shared head, navbar, and footer, the explanation, and one card holding the controls, the canvas, and the readouts, plus an empty js/ising.js module.

4. > Implement phase 2: the simulation in js/ising.js. Keep the lattice in a typed array with periodic boundaries, run a fixed number of Metropolis sweeps per animation frame, and draw the spins in two colors from my palette. Do not touch my other pages.

   The agent wrote the simulation in js/ising.js, which keeps the spins in an Int8Array with periodic edges, runs four Metropolis sweeps per animation frame, and draws up spins in the teal accent and down spins in white, and it wired Play, Reset, size, and temperature.

5. > Implement phase 3: wire up the controls and the readouts. The temperature slider goes from 0.5 to 5.0 in steps of 0.05 and shows its value. Play and pause is one button whose label changes. Reset randomizes the lattice again. Changing the size restarts the simulation at that size.

   The agent set the temperature step to 0.05 in lab.html and moved the default from 2.27 to 2.25, since the rest of the wiring was already in place.

6. > Now verify it: serve the site locally, open lab.html in Chrome, check the console for errors, and check that play, pause, reset, size, and temperature all work. Fix anything that is broken and tell me what you found.

   The agent tested the page in Chrome, found no console errors and every control working, and changed no file.

7. > Add two things: a marker on the temperature scale at the critical temperature of about 2.269 with one sentence saying what happens there, and a small live line plot of the magnetization over the last 200 frames, drawn on its own canvas.

   The agent added a Tc marker at 2.269 under the temperature slider with one sentence on what happens there, and a canvas plot of the magnetization over the last 200 frames.

8. > It still does not look like my other pages in a few places. Match the heading sizes, card padding, and text width of research.html, use my teal accent for the controls, and make sure it works on a phone: the canvas scales to the column width and the controls stack under it.

   The agent held the Tc sentence to the prose width, set the readout labels to normal weight, made the buttons and focus rings teal, and ordered the phone layout with the canvas first and the controls stacked under it.

9. > Accessibility pass: give each canvas a role and an accessible label, keep a text readout that screen readers can follow, make every control reachable by keyboard with a visible focus, and when prefers-reduced-motion is set, do not start the animation until the visitor presses play.

   The agent added a screen reader status line for Play and Pause, Reset, size changes, and every 5 seconds of running, kept screen readers from reading the readouts every frame, and added a teal outline on the focused control, and the paused start already covered reduced motion.

10. > Final check: run my class ESLint config, Prettier, and the W3C validator on lab.html and js/ising.js and fix every error. Then explain to me step by step how the Metropolis update in ising.js works, so I understand the code I am submitting.

    The agent ran ESLint, Prettier, and the W3C validator with nothing to fix, and explained the Metropolis update in js/ising.js step by step.

After the ten prompts, a review of the site led to more edits of the Lab page, made with the same assistant: a table of the magnetization history in lab.html that js/ising.js fills for screen reader users, a note on the temperature units and on what a finite lattice shows at the critical temperature, and small wording fixes.

The same assistant was also used to help build and review the other two pages, the design document, and this README.

## License

Released under the [MIT License](LICENSE).
