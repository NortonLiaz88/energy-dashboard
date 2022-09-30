import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ScoreLevel } from '../../../../modules/Feedbacks/components/ScoreLevel';
import theme from '../../../../styles/theme';

describe('ScoreLevel', () => {
  const renderScoreLevel = ({ label = 'label', percentage = 23 }) =>
    render(
      <ThemeProvider theme={theme}>
        <ScoreLevel label={label} percentage={percentage} />
      </ThemeProvider>,
    );
  it('should render ScoreLevel', () => {
    const { getByText } = renderScoreLevel({
      label: 'label-teste',
      percentage: 50,
    });

    waitFor(() => {
      expect(getByText('label-teste')).toBeTruthy();
    });
  });
});
