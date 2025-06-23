import { Theme } from '@emotion/react';
import styled from '@emotion/styled';

export const TableCard = styled.div<{ isDark?: boolean; height?: number }>`
  background: transparent;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 1.5rem;
    border-radius: 0.5rem;
    max-height: ${({ height }) => height ? height + 'px' : '500px'};
    background: ${({ isDark, theme }) => (isDark ? theme.colors.jet[10] : '#fff')};
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  }
`

export const TableWrapper = styled.div<{ height?: number, theme: Theme, isDark: boolean }>`
  display: flex;
  flex-direction: column;
  background: transparent;
  font-size: 0.8em;
  font-family: ${({ theme }) => theme.fonts.sans};

  @media (min-width: 768px) {
    display: flow;
    border-collapse: collapse;
    max-width: 1000px;
    overflow-y: auto;
    max-height: ${({ height }) => height ? height -50 : 450}px;
    padding-right: 2rem;

    &::-webkit-scrollbar {
      width: 10px;             
    }

    &::-webkit-scrollbar-track {
      background: ${({ isDark, theme }) => isDark ? theme.colors.jet[2]: theme.colors.jet[8]};   
      border-radius: 20px;
      border: 4px solid transparent;
      background-clip: content-box;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ isDark, theme }) => isDark ? theme.colors.jet[8]: theme.colors.jet[3]};  ;  
      border-radius: 20px;  
  }
`;

export const TableHeader = styled.div<{ columns: number, isDark: boolean, theme: Theme }>`
  display: none;

  @media (min-width: 768px) {
    display: table-header-group;
    background-color: ${({ isDark, theme }) => isDark ? theme.colors.jet[10] : '#fff'};
    color: ${({isDark, theme}) => isDark ? theme.colors.jet[3]: '#000'};
    text-align: left;

     position: -webkit-sticky; /* Safari... */
     position: sticky;
     top: 0;
      left: 0;

    div {
      display: table-cell;
      padding: 15px 25px;
      font-weight: bold;
      border-bottom: 1px solid #dddddd;
    }
  }
`;

export const RowWrapper = styled.div<{ isDark: boolean, theme: Theme }>`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  margin: 0.5rem;
  padding: 2rem;
  background-color: ${({ isDark, theme }) => isDark ? theme.colors.jet[10] : '#fff'};
  border-bottom: ${({ isDark }) => isDark ? undefined : '1px solid #dddddd'};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
 
  @media (min-width: 768px) {
    display: table-row;
    padding: 0;
    border-radius: 0;
    box-shadow: none;

    &:nth-of-type(odd) {
        background: ${({ isDark, theme }) => isDark ? theme.colors.jet[8] : undefined};
    }
  }
`;

export const CellWrapper = styled.div<{ isDark: boolean, theme: Theme }>`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  font-size: 0.8rem;

  color: ${({ isDark, theme }) => isDark ? theme.colors.jet[3]: '#000'};

  @media (min-width: 768px) {
    display: table-cell;
    text-align: left;
    padding: 15px 25px;
    align-content: center;
  }
`;

export const Label = styled.span`
  font-weight: 600;
  padding-right: 2rem;

  @media (min-width: 768px) {
    display: none;
  }
`;
