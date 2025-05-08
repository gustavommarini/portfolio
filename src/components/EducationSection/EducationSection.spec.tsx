import { render, screen, renderHook } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { EducationSection } from './EducationSection';
import { PageWrapper } from '@/test-utils';

describe('EducationSection', () => {
  const mockEducationItems = [
    {
      id: '1',
      name: 'test_education',
      location: 'Test Location',
      description: 'test_description',
      from: '2020',
      to: '2023',
    },
  ];

  const mockLanguageItems = [
    {
      id: '1',
      name: 'test_language',
      location: '',
      description: 'test_language_desc',
    },
  ];

  const renderEducationSection = (props = {}) => {
    return render(
      <PageWrapper>
        <EducationSection
          title="Test Title"
          eduArray={mockEducationItems}
          {...props}
        />
      </PageWrapper>
    );
  };

  const renderMultipleEducationSection = (props = {}) => {
    return render(
      <PageWrapper>
        <EducationSection
          title="Test Title"
          eduArray={[
            ...mockEducationItems,
            {
              id: '2',
              name: 'test_course',
              location: 'Test Location 2',
              description: 'test_description_2',
              from: '2021',
              to: '',
            },
          ]}
          {...props}
        />
      </PageWrapper>
    );
  };

  test('renders section title', () => {
    renderEducationSection();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('renders education items with dates', () => {
    const t = renderHook(() => useTranslation(['education']));
    renderMultipleEducationSection();

    // Check first item
    expect(
      screen.getByText(t.result.current.t('test_education'))
    ).toBeInTheDocument();
    expect(screen.getByText('Test Location')).toBeInTheDocument();
    expect(
      screen.getByText(t.result.current.t('test_description'))
    ).toBeInTheDocument();
    expect(screen.getByText('2020 - 2023')).toBeInTheDocument();

    // Check second item
    expect(
      screen.getByText(t.result.current.t('test_course'))
    ).toBeInTheDocument();
    expect(screen.getByText('Test Location 2')).toBeInTheDocument();
    expect(
      screen.getByText(t.result.current.t('test_description_2'))
    ).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
  });

  test('renders items without dates', () => {
    const t = renderHook(() => useTranslation(['education']));
    renderEducationSection({ eduArray: mockLanguageItems });

    // Check language item
    expect(
      screen.getByText(t.result.current.t('test_language'))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t.result.current.t('test_language_desc'))
    ).toBeInTheDocument();

    // Check that no date elements are rendered
    expect(screen.queryByText(/2020/)).not.toBeInTheDocument();
    expect(screen.queryByText(/2021/)).not.toBeInTheDocument();
  });

  test('renders with book icon', () => {
    renderEducationSection({ useBookIcon: true });

    // Check if book icon is rendered
    let icon = screen.getByRole('icon');
    expect(icon).toHaveClass('fa-solid', 'fa-book');
  });

  test('renders with graduation cap icon by default', () => {
    renderEducationSection();

    // Check if graduation cap icon is rendered
    let icon = screen.getByRole('icon');
    expect(icon).toHaveClass('fa-solid', 'fa-graduation-cap');
  });

  test('applies correct styles for items without dates', () => {
    renderEducationSection({ eduArray: mockLanguageItems });

    const descriptionContainer = screen.getByTestId('description-education');
    expect(descriptionContainer).toHaveClass('adjust-padding-top');
  });
});
