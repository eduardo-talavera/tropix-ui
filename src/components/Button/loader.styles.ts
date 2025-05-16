import { css, keyframes } from "@emotion/react";

const rotation = keyframes`
  0%    { transform: rotate(0deg)}
  100%  { transform: rotate(360deg)}
`

export const loaderStyles = () => css`
  width: 25px;
  height: 25px;
  display: inline-block;
  position: relative;
  background-color: #FFF;
  background: radial-gradient(ellipse at center, #FF3D00 0%, #FF3D00 14%, #FFF 15%, #FFF 100%);
  background-size: cover;
  background-position: center;
  border-radius: 50%;

 &::after,
 &::before {
  content: '';  
  position: absolute;
  height: 8px;
  width: 2px;
  background: #FF3D00;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) rotate(0deg);
  transform-origin: 25% 0;
  box-sizing: border-box;
  animation: ${rotation} 10s linear infinite;
}
&::before {
  height: 11px;
  width: 1px;
  transform: translateX(-50%) rotate(0deg);
  animation-duration: 1s;
} 
`