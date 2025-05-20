import type { SRS } from '../types';

export const normalizeRequirements = (
  srs: SRS.Specification
): SRS.Specification => {
  return {
    ...srs,
    requirements: {
      nonFunctional: srs.requirements.nonFunctional,
      functional: srs.requirements.functional.map((req) => ({
        ...req,
        dependencies: req.dependencies.map(
          (dep): (typeof req.dependencies)[0] =>
            !!dep
              ? {
                  _key: dep?._key,
                  id: dep?.id,
                  relatedRequirements: dep?.relatedRequirements,
                  title: dep?.title,
                  color: dep?.color,
                }
              : null
        ),
      })),
    },
  };
};
