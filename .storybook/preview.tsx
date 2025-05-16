
/** @jsxImportSource @emotion/react */
import { Preview } from '@storybook/react';

import { ThemeProvider, useThemeMode } from '../src/context/ThemeContext';
import { css, Theme, useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Toggle } from '../src/components/Toggle/Toggle';

const getScreenSizeHelper = (isDocs: boolean) =>  {
  if (isDocs) return {
    width: document.querySelector('.docs-story')?.clientWidth + 'px',
    height: 'auto'
  }

  return {
    width: '100vw',
    height: '100vh'
  }
}


const generatePreviewStyles = (theme: Theme, isDocs: boolean) => ({
   container: css({
        boxSizing: 'border-box',
        width: getScreenSizeHelper(isDocs).width,
        height: getScreenSizeHelper(isDocs).height,
        backgroundColor: theme.colors.background,
        padding: '1rem 2rem',
   }),
    text: css({
        fontFamily: theme.fonts.base,
        color: theme.colors.text
    }),
    header: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        padding: '0 2rem',
        marginBottom: '3rem'
    }),
    childrenWrapper: css({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '3rem'
    })
})

const ThemeToggleButton = () => {
  const { toggleTheme } = useThemeMode();
  return <Toggle onPress={() => toggleTheme()} isThemeSwitch />
}

const AppContent = ({ children }) => {

  const [isDocs, setIsDocs] = useState(location.search.includes('--docs'))

 const theme = useTheme()
 const styles = generatePreviewStyles(theme, isDocs)

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) body.style.padding = '0';
  }, [document])  

  useEffect(() => {
      if (isDocs) {
        setIsDocs(true)
      }
  }, [location.search])

  useEffect(() => {
     const docsWrapper = document.querySelector('.docs-story > div') as HTMLElement | null
     if (docsWrapper) docsWrapper.style.padding = '0'
  }, [])

  return (
    <div css={styles.container}>
      <header css={styles.header}>
        <h1 css={styles.text}>Tropix UI</h1>
        <ThemeToggleButton />
      </header>
      <div css={styles.childrenWrapper}>
        { children }
      </div>
    </div>
  );
}

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <AppContent>
            <Story />
        </AppContent>
      </ThemeProvider>
    ),
  ],
};

export default preview;