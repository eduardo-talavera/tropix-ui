    
<p align="center">
    <img
        max-width="350px"
        width="350px"
        alt="Tropix UI is a colorful and vibrant design system built with React, Typescript, Emotion styles, and Vite."
        src="https://raw.githubusercontent.com/eduardo-talavera/tropix-ui/main/static/tropix_ui_logo.png"
    >
</p>

Tropix UI is a colorful and vibrant design system built with React, Typescript, Emotion styles, and Vite.

## Getting started


### Installation

```shell
npm i tropix-ui @emotion/react @emotion/styled
```

### Usage

import the provider into your root file

```jsx title="src/main.js"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'tropix-ui'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
        {/* your app here */}
    </ThemeProvider>
  </StrictMode>,
)
```



use your desired component into your application
```jsx title="src/App.jsx"
import { Button } from 'tropix-ui'

export const App = () => {

    return (<>
        <Button>Some text</Button>     
    </>)
}
```



Use the useThemeMode hook with the Toggle component to switch between light and dark mode.

```jsx
import { Toggle, Button, useThemeMode } from 'tropix-ui'

export const App = () => {
    const { toggleTheme } = useThemeMode()

    return (<>
        <Toggle onPress={() => toggleTheme())} isThemeSwitch />
        <hr />
        <Button>Some text</Button>     
    </>)
}
```


## Documentation

Visit [Tropix Ui Docs](https://tropix-ui-docs.vercel.app/docs/getting-started/).


