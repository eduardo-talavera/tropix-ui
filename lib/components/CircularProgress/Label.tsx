import { useTheme, css } from "@emotion/react";
import { useProgress } from "./Container";

export const Label: React.FC<{ text: string }> = ({ text }) => {
  const { value } = useProgress();
  const theme = useTheme();

  return (
    <div
      css={css`
        position: relative;
        text-align: center;
      `}
    >
      <div
        css={css`
          font-size: 18px;
          font-weight: bold;
          font-family: ${theme.fonts.base};
          color: ${theme.colors.text}
        `}
      >
        <span>{ text }</span> <br />
       <span>{ value }%</span>
      </div>
    </div>
  );
};
