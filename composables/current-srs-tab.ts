export const TabTypes = ['Content', 'Functional', 'Non-Functional'] as const;
export type TabType = (typeof TabTypes)[number];

export const useCurrentSRSTab = () =>
  useState('current-srs-tab', (): TabType => 'Content');
