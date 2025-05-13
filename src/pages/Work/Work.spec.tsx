import { render, screen, renderHook, within } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import '@/test-utils/envMock';
import { PageWrapper } from '@/test-utils';
import { jobInfo, skills } from '@/services';
import Work from './Work';

describe('Work', () => {
  const renderWork = () => {
    return render(
      <PageWrapper>
        <Work />
      </PageWrapper>
    );
  };

  test('renders main sections', () => {
    const t = renderHook(() => useTranslation(['experience']));
    renderWork();

    // Check title and subtitle
    expect(
      screen.getByText(t.result.current.t('experience:title'))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t.result.current.t('experience:subtitle'))
    ).toBeInTheDocument();

    // Check skills section title
    expect(
      screen.getByText(t.result.current.t('experience:skills_title'))
    ).toBeInTheDocument();
  });

  test('renders all work experience items', () => {
    const t = renderHook(() => useTranslation(['experience']));
    renderWork();

    // Check if all job items are rendered
    jobInfo.forEach((job) => {
      expect(screen.getByText(job.name)).toBeInTheDocument();
      expect(
        screen.getByText(t.result.current.t(`experience:${job.description}`))
      ).toBeInTheDocument();
    });
  });

  test('renders all skills with correct values', () => {
    renderWork();

    // Check if all skills are rendered with their values
    skills.forEach((skill) => {
      const skillElement = screen.getByText(skill.name);
      expect(skillElement).toBeInTheDocument();

      // Check if the skill value is rendered as a percentage
      const { getByText } = within(skillElement.parentElement!);
      const skillValue = getByText(`${skill.value}%`);
      expect(skillValue).toBeInTheDocument();
    });
  });
});
