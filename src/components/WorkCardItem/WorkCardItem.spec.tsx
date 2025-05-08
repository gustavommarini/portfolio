import { render, screen, renderHook } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { WorkCardItem } from './WorkCardItem';

describe('WorkCardItem', () => {
  const mockWorkItem = {
    id: '1',
    name: 'Test Company',
    location: 'Test Location',
    description: 'test_description',
    from: '2020',
    to: '2023',
  };

  const renderWorkCardItem = () => {
    return render(<WorkCardItem workItem={mockWorkItem} />);
  };

  test('renders work item details', () => {
    const t = renderHook(() => useTranslation(['experience']));
    renderWorkCardItem();

    // Check company name
    expect(screen.getByText(mockWorkItem.name)).toBeInTheDocument();

    // Check location
    expect(screen.getByText(mockWorkItem.location)).toBeInTheDocument();

    // Check description
    expect(
      screen.getByText(
        t.result.current.t(`experience:${mockWorkItem.description}`)
      )
    ).toBeInTheDocument();
  });

  test('renders date range', () => {
    renderWorkCardItem();

    // Check date range
    expect(
      screen.getByText(`${mockWorkItem.from} - ${mockWorkItem.to}`)
    ).toBeInTheDocument();
  });

  test('renders without end date', () => {
    const workItemWithoutEndDate = {
      ...mockWorkItem,
      to: '',
    };

    render(<WorkCardItem workItem={workItemWithoutEndDate} />);

    // Check date without end date
    expect(screen.getByText(mockWorkItem.from)).toBeInTheDocument();
    expect(screen.queryByText('-')).not.toBeInTheDocument();
  });
});
