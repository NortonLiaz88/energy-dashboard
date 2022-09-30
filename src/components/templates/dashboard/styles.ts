import styled from 'styled-components';

export const DashboardWrapper = styled.div`
  /* height: 100vh; */
  margin-top: 1rem;
`;

export const MapWrapper = styled.div``;

export const UserInterationsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.dashboardBackground};
  height: 100%;
`;

export const WordsSection = styled.div`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.dashboardBackground};
  padding: 4.25rem 5rem;
  padding-bottom: 2rem;

  @media (max-width: 680px) {
    flex-direction: column;
    align-items: flex-start;
  }

  @media (max-width: 500px) {
    padding: 4.25rem 0.5rem;
  }
`;

export const AnalyticsSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;

  padding: 0 5rem;

  @media (max-width: 500px) {
    padding: 0 0.5rem;
  }
`;

export const LittleGraphContainer = styled.div`
  height: 24rem;
`;

export const SectionContainer = styled.div`
  height: 60.375rem;
  width: 100%;
`;

export const SizedBox = styled.div`
  width: 1.5rem;
  @media (max-width: 680px) {
    height: 1.5rem;
  }
`;

export const VerticalSizedBox = styled.div`
  height: 1.5rem;
`;
