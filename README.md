# Event Page

## Deployment

Node.js module `serve` must be installed. Use `npm install -g serve` if necessary.

Clone/download the repo from [github.com/maxcct/event-page](https://github.com/maxcct/event-page).

`cd` to the directory containing the build folder, then run `serve -s build`.

The app should now be running at localhost:5000.

Alternatively, [just visit the page](https://maxcct.github.io/event-page).


## Technology

I chose to create this webpage using React — the first time I've built something in React.
It allowed me to produce a design that is very flexible and that ought to work efficiently in
practice (by virtue of the VDOM). Please note that it is possible to switch between event
pages using the navbar. In order to implement this feature, I have used my own multi-event
JSON (though with only IDs for all but the first) instead of the one provided.

I have also used React's states to implement little features like changing 'Places available'
to 'Sorry, there are no places left' if the associated number drops to zero, and to generate
a personalised altert on submission of the booking form.

## Challenges

The most difficult aspect of this design was implementing the border chevrons that point at
the nav bar element corresponding with the current page. I used a combination of CSS and some
JavaScript logic combined with a React-injected style property to arrive at a solution. At
present the position of the chevron adjusts to match changes in screen size upon rendering,
but ideally I would add an event listener to detect window resizing and adjust the chevron
position using a React state.

The next biggest challenges were getting the footer to stick at the bottom, and getting the
image to resize in a way that matched the design reference images as closely as possible.
These were pure CSS problems, and solving them was a matter of research combined with trial
and error.

One challenge I was unable to solve was figuring out how to get the 'Matt Torey's' venue text
from Google Maps to display next to the map marker using the Google Maps API. I enquired on
Stack Overflow, but have yet to receive an instructive responsive.

## Enhancements

I think the page is aesthetically lacking and outdated. I would seek to modernise the design
while maintaining its clean efficiency. From a functional perspective, I think it accomplishes
everything it needs to and I'm not sure adding clever new features would in fact be additive.

## Mobile

In order to better accommodate mobile/touch devices, the form input elements should be changed.
The submit button could be enlarged and centred on the page, and the radio buttons could be
replaced with a solution such as a pair of easily tappable panels each indicating (perhaps
graphically) 'need' or 'have a room' on their face.

I would also suggest that on mobile devices it should be possible to swipe the screen to change
between different event pages. However, this kind of feature has to be implemented carefully as
it can often produce more annoyance than convenience.

