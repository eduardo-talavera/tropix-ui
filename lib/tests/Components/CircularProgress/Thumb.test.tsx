import { screen } from '@testing-library/react';
import { render } from '@/utils/test-utils/RenderWithCirclreProgressProvider';
import { describe, it, expect, vi } from 'vitest';
import { Thumb } from '@/components/CircularProgress/Thumb';
//import { ProgressContext } from '@/components/CircularProgress/Container';


vi.mock('@/context/ThemeContext', async () => {
  const actual = await vi.importActual<typeof import('@/context/ThemeContext')>(
    '@/context/ThemeContext'
  )

  return {
    ...actual,
    useThemeMode: () => ({ isDark: false }),
  }
})

// vi.mock('@/components/CircularProgress/CircularProgress', async () => {
//   const actual = await vi.importActual<typeof import('@/components/CircularProgress/CircularProgress')>(
//     '@/components/CircularProgress/CircularProgress'
//   )

//   return {
//     ...actual,
//     // puedes sobrescribir aquí si lo deseas, o dejarlo igual
//     //CircularProgress: actual.CircularProgress,
//     useProgress: () => ({
//       value: 50,
//       max: 100,
//       update: updateMock,
//       size: 'md',
//       progressColors: ['#ff0000', '#00ff00'],
//   }),
//     sizePropertyVariants: {
//       md: { radius: 40 }
//     }
//   }
// })


describe('Thumb', () => {

  it('renderiza el thumb correctamente', () => {
    render(<Thumb />);
    expect(screen.getByTestId('circular-thumb')).toBeInTheDocument();
  });

  it('renderiza el thumb en la posición correcta', () => {
    render(<Thumb />);
    const thumb = screen.getByTestId('circular-thumb').firstChild as HTMLElement;
    expect(thumb).toHaveStyle('width: 20px');
    expect(thumb).toHaveStyle('height: 20px');
    expect(thumb).toHaveStyle('background: linear-gradient(135deg, #ff0000, #00ff00)');
  });

  // it('llama a update al mover el mouse con botón presionado', () => {
  //   const updateMock = vi.fn()

  //   const { getByTestId } = render(
  //     <ProgressContext.Provider
  //       value={{
  //         value: 30,
  //         max: 100,
  //         update: updateMock,
  //         size: 'md',
  //         progressColors: ['#ff0000', '#00ff00'],
  //       }}
  //     >
  //       <Thumb />
  //     </ProgressContext.Provider>
  //   )

  //   const thumb = getByTestId('circular-thumb') // asegúrate de tener data-testid="thumb" en el componente

  //   // Simular mouseDown primero
  //   fireEvent.mouseDown(thumb, { buttons: 1, clientX: 0, clientY: 0 })

  //   // Simular movimiento
  //   fireEvent.mouseMove(document, { buttons: 1, clientX: 50, clientY: 50 })

  //   expect(updateMock).toHaveBeenCalled();
  // });

  // it('llama a update al mover el touch', () => {
  //   const updateMock = vi.fn()

  //   const { getByTestId } = render(
  //     <ProgressContext.Provider
  //       value={{
  //         value: 30,
  //         max: 100,
  //         update: updateMock,
  //         size: 'md',
  //         progressColors: ['#ff0000', '#00ff00'],
  //       }}
  //     >
  //       <Thumb />
  //     </ProgressContext.Provider>
  //   )

  //   const thumb = getByTestId('circular-thumb') // asegúrate de tener data-testid="thumb" en el componente

  //   fireEvent.touchStart(thumb, {
  //     touches: [{ clientX: 0, clientY: 0 }],
  //   })

  //   fireEvent.touchMove(document, {
  //     touches: [{ clientX: 60, clientY: 60 }],
  //   })

  //   expect(updateMock).toHaveBeenCalled();
  // });
});