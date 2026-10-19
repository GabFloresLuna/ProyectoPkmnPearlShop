import { cleanup, render } from '@testing-library/react';
import Logo from './Logo.jsx';

describe('<Logo />', () => {
  afterEach(cleanup);

  it('PROPS: usa size como ancho y alto del SVG', () => {
    const { container } = render(<Logo size={60} />);
    const svg = container.querySelector('svg');
    expect(svg.getAttribute('width')).toBe('60');
    expect(svg.getAttribute('height')).toBe('60');
  });

  it('PROPS: por defecto mide 40 px', () => {
    const { container } = render(<Logo />);
    expect(container.querySelector('svg').getAttribute('width')).toBe('40');
  });

  it('RENDERIZADO: dos logos en la misma página no comparten el id del degradado', () => {
    const { container } = render(<><Logo /><Logo size={32} /></>);
    const ids = [...container.querySelectorAll('[id^="perla-"]')].map((e) => e.id);
    expect(ids.length).toBe(2);
    expect(ids[0]).not.toBe(ids[1]);
  });
});
