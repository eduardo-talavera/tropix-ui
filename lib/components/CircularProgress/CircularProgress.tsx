import { Container, ContainerProps } from './Container';
import { Circle } from './Circle';
import { Thumb } from './Thumb';
import { Label } from './Label';


export interface CircularProgressComponent extends React.FC<ContainerProps> {
  Circle: React.FC<{ enableTransition?: boolean }>;
  Thumb: React.FC;
  Label: React.FC<{ text: string }>;
}

export const CircularProgress: CircularProgressComponent = Object.assign(Container, {
    Circle: Circle,
    Thumb: Thumb,
    Label: Label
});
