    
<p align="center">
    <img
        max-width="350px"
        width="350px"
        alt="Tropix UI is a colorful and vibrant design system built with React, Typescript, Emotion styles, and Vite."
        src="https://raw.githubusercontent.com/eduardo-talavera/moka-ui/main/public/tropix_ui_logo.png"
    >
</p>

Tropix UI is a colorful and vibrant design system built with React, Typescript, Emotion styles, and Vite.

## Getting started


install the package

```shell
npm i moka-ui
```


import the provider into your root file

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'moka-ui'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
        {/* your app here */}
    </ThemeProvider>
  </StrictMode>,
)
```



use your desired component into your application

```jsx
import { useState } from 'react'
import { Button } from 'moka-ui'

export const App = () => {

    return (<>
        <Button>Some text</Button>     
    </>)
}
```



Use the useThemeMode hook with the Toggle component to switch between light and dark mode.

```jsx
import { useState } from 'react'
import { Toggle, Button, useThemeMode } from 'moka-ui'

export const App = () => {
    const { toggleTheme } = useThemeMode()

    return (<>
        <Toggle onPress={() => toggleTheme())} isThemeSwitch />
        <hr />
        <Button>Some text</Button>     
    </>)
}
```


documentation in process...


