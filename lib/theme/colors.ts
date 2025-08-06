import Values from "values.js"

const jungleGreen = new Values('#06A77D')
const teal = new Values('#177E89')  
const cobaltBlue = new Values('#1446A0')
const poppy = new Values('#DB3A34')
const sunGlow = new Values('#FFC857')
const jet = new Values('#323031')
const purple = new Values('purple')

export const palette = {
   jungleGreen: jungleGreen.all(10).map(color => '#' + color.hex),
   teal: teal.all(10).map(color => '#' + color.hex),
   cobaltBlue: cobaltBlue.all(10).map(color => '#' + color.hex),
   purple: purple.all(10).map(color => '#' + color.hex),
   poppy: poppy.all(10).map(color => '#' + color.hex),
   sunGlow: sunGlow.all(10).map(color => '#' + color.hex),
   jet: jet.all(10).map(color => '#' + color.hex)
}



