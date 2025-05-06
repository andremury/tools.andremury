export const getRequirementId = (tab: TabType, key?: string) => {
  switch (tab) {
    case 'Content':
      return `doc-${key || ''}`;
    default:
      return `requirement-def-${key || ''}`;
  }
};
