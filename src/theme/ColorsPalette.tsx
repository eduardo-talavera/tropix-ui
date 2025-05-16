/** @jsxImportSource @emotion/react */
import { css, Theme, useTheme } from "@emotion/react"
import { palette } from "./colors"


const colorsPaletteStyles = (theme: Theme) =>  ({
  wrapper: css({
    display: 'flex',
    flexDirection: 'column'
  }),
  container: css({
    display: 'flex',
    flexWrap: 'wrap'
  }),
  box: (hex: string) => css({
    width: '80px',
    height: '80px',
    backgroundColor: hex,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }),
  text: css({
    fontFamily: theme.fonts.base,
    color: theme.colors.text,
    textAlign: 'center'
  }),
  textColor: (i: number) => css({
    fontFamily: theme.fonts.base,
    color: i > 7 ? theme.colors.jet[1] : theme.colors.jet[9],
    textAlign: 'center'
  })
})


export const ColorsPalette = () => {

  const theme = useTheme()
  const styles = colorsPaletteStyles(theme)
  const brandColors = Object.keys(palette)

  return (
    <div css={styles.wrapper}>
      {
       brandColors.map(key => (<div key={key}>
          <h3 css={styles.text}>{ key }</h3>
          <div css={styles.container}>
            {
              theme.colors[key as keyof typeof palette].map((color, i) =>{

                if (i === 0 || i === 20) return null

                return  (
                  <div key={color} css={styles.box(color)}>
                    <span css={styles.textColor(i)}>
                        { color }
                    </span>
                  </div>
              )
              })
            }
          </div>
        </div>))
      }
    </div>
  )
}


