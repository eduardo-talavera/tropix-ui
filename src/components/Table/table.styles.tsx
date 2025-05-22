import { Theme } from "@emotion/react";
import { css } from "@emotion/react";

export const tableStyles = (theme: Theme, isDark: boolean, height: number) => css`
    background: ${isDark ? theme.colors.jet[12] : '#fff'};
    padding: 1.5rem;
    border-radius: 1rem;
    box-sizing: border-box;
    max-height: ${height ?? '500px'};
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  
    .table-wrapper {
      overflow-y: auto;
      max-height: ${height ? height -50 : 450}px;
      padding-right: 2rem;
      max-width: 1000px;
      overflow-x: auto; 
    }

    .table-wrapper table thead {
        position: -webkit-sticky; /* Safari... */
        position: sticky;
        top: 0;
        left: 0;
    }
    
   .styled-table {
      border-collapse: collapse;
      border-spacing: 0;
      margin: 25px 0;
      font-size: 0.8em;
      font-family: ${theme.fonts.sans};
    }

   .styled-table thead tr {
      background-color: ${isDark ? theme.colors.jet[12] : '#fff'};
      color: ${isDark ? theme.colors.jet[3]: '#000'};
      text-align: left;
      border-bottom: 1px solid #dddddd;
    }

    .styled-table tbody tr {
      color: ${isDark ? theme.colors.jet[3]: '#000'};
    }

    .styled-table th,
    .styled-table td {
        padding: 16px 30px;
    }

    .styled-table tbody tr {
        border-bottom: ${isDark ? undefined : '1px solid #dddddd'};
    }

    .styled-table tbody tr:nth-of-type(even) {
        background: ${isDark ? theme.colors.jet[10] : undefined};
    }
`
