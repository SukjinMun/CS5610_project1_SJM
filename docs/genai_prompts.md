# GenAI prompts for the Lab page

The ten prompts I gave Claude Opus 5.5 (claude-opus-5-5) in Claude Code 2.1 to make lab.html and js/ising.js, in order and condensed.

1. I am building my homepage with HTML, CSS, ES6 modules, and Bootstrap 5.3. Read index.html, research.html, css/style.css, and the js folder. I want a third page, lab.html, with an interactive physics demo. Help me choose between a 2D Ising model, a crystal lattice viewer, and a random walk. Do not change any files yet.

2. Let's do the 2D Ising model on its own page with my navbar and footer. Add a short plain explanation, a temperature slider, play and pause, reset, and a grid size of 32, 64, or 128. Show the magnetization and the energy per spin. Use the Metropolis algorithm on a canvas with no libraries, in js/ising.js as an ES module, and pass my ESLint config and the W3C validator. Write the plan in phases first.

3. Implement phase 1: lab.html with the shared head, navbar, and footer, and the layout for the text, the canvas, and the controls, matching research.html.

4. Implement phase 2: the simulation in js/ising.js, with a typed array, periodic boundaries, and a few sweeps per frame. Do not touch my other pages.

5. Implement phase 3: the controls and the readouts. Temperature runs from 0.5 to 5.0 in steps of 0.05, one button plays and pauses, reset starts over, and a new size restarts the grid.

6. Serve the site, open lab.html in Chrome, check the console, test every control, and fix what breaks.

7. Add a Tc mark near 2.269 with one sentence about it, and a small plot of the magnetization over the last 200 frames.

8. Match the headings, card padding, text width, and teal accent of research.html, and make the canvas and controls work on a phone.

9. Give each canvas a role and a label, keep a text readout for screen readers, add a visible keyboard focus, and respect prefers-reduced-motion.

10. Run ESLint, Prettier, and the W3C validator on lab.html and js/ising.js, fix every error, and explain the Metropolis update to me step by step.
