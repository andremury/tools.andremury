export const TabTypes = ['Content', 'Functional', 'Non-Functional'] as const;
export type TabType = (typeof TabTypes)[number];

export const useCurrentSReTab = () =>
  useState('current-srs-tab', (): TabType => 'Content');
