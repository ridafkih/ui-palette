# UI Palette [![Tweet](https://img.shields.io/twitter/url/http/shields.io.png?style=social)](https://twitter.com/intent/tweet?text=Check%20out%20RayThis%20by%20@ridafkih%20to%20automatically%20upload%20your%20code%20snippets%20right%20from%20Visual%20Studio%20Code,%20powered%20by%20RayCast.%20@raycastapp%20%0A%0Ahttps://github.com/ridarf/ray-this/) [![Follow](https://img.shields.io/twitter/follow/ridafkih.png?style=social&label=Follow)](https://twitter.com/intent/follow?screen_name=ridafkih)

##### Generate & visualize mobile design UI Palette's and display them on a 3D model of a mobile device! 🎨
![GIF of app being used](https://i.imgur.com/ud3PZva.gif)📱
___
This was a learning project with no real use case. Just wanted to work on my TypeScript & React skills. UI Palette uses ThreeJS to render a 3D iPhone, and uses SVG element templates with contrast-checking code to allow a user to preview UI colours on the 3D iPhone on 3 different screens. The experience isn't currently mobile-compatible, but if the project gets some traction I will implement mobile compatibility. If you want to view more things I've created, go ahead and follow me on Twitter [@ridafkih](https://twitter.com/ridafkih), I promise I just might impress you one day!

The way this works uses one SVG element hidden outside the DOM, as well as two canvas'. The first step comes from the SVG template, which is exported from Figma, and then fitted with code that compares the contrast of certain elements with others. After all that is computed, it renders the SVG onto a canvas, then this canvas is used as the screen texture on the iPhone model, and then finally rendered onto the canvas you see on the screen!

___
### Usage Instructions
1. Select your desired colours.
2. Select your desired screen.
3. Select your desired view type, being 3D or 2D.
