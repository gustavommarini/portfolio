import { render, screen } from '@testing-library/react';
import { SkillItem } from './SkillItem';

describe('SkillItem', () => {
  const defaultProps = {
    name: 'React',
    value: 90,
  };

  test('renders skill name correctly', () => {
    render(<SkillItem {...defaultProps} />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  test('renders skill value correctly', () => {
    render(<SkillItem {...defaultProps} />);
    expect(screen.getByText('90%')).toBeInTheDocument();
  });

  test('applies correct width style to skill bar', () => {
    render(<SkillItem {...defaultProps} />);
    const skillBar = screen.getByTestId('skill-bar');
    expect(skillBar).toHaveStyle({ width: '90%' });
  });

  test('renders with different values', () => {
    const props = {
      name: 'TypeScript',
      value: 75,
    };
    render(<SkillItem {...props} />);

    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();

    const skillBar = screen.getByTestId('skill-bar');
    expect(skillBar).toHaveStyle({ width: '75%' });
  });
});
