export const breakpoints = {
    xs: '320px',
    sm: '567px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  }
  
  export type BreakPointType = typeof breakpoints;
  
  const generateMediaQueries = (points: BreakPointType): BreakPointType => ({
    xs: `@media (min-width: ${points.xs})`,
    sm: `@media (min-width: ${points.sm})`,
    md: `@media (min-width: ${points.md})`,
    lg: `@media (min-width: ${points.lg})`,
    xl: `@media (min-width: ${points.xl})`,
  })  
  
  export { generateMediaQueries }