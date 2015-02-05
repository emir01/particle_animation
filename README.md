# Particle Animations and Canvas Drawing
A small HTML Canvas application that started out as an idea to develop 
a small fireworks inspired particle engine, that would have just allowed
the user to click on a canvas and have pretty particle effects appear.

From that starting point it sort of moved on to a small brush based drawing 
engine with support for brush stroke animations. Currently there is only one brush available
with work being put it to allow multiple brushes with different colorings and animations as well as web based
simple brush selection.

And that is where it currently is in the very earliest stages of development. The actual drawing engine
based on multiple canvas layers (drawing/animations/eventing) still needs major work for some of the more critical pieces. There is still no support currently for path based drawings, as currently all the drawing is done with small simple shapes.

## Important
A lot of the small codebase is still mixed with terms from the original idea. A lot of the names include
"particle" and "game" references as the codebase was also initially meant as a small prototype game. Also the codebase "documentation" is currently very loose as this was initially meant as a hobby project.

## Running
There are no external dependencies. Everything required to run the small example is included in the repository. It can be just cloned/downloaded and then ran via the index.html file or modified by changing any of the javascript files.
