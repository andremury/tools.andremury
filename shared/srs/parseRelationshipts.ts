import { SRS } from '../types';

const findByKey = (
  key: string,
  reqs: SRS.ShortRequirement[]
): SRS.ShortRequirement | null => {
  const found = reqs.find((r) => r._key === key);
  if (!found) return null;

  return SRS.enshortRequirement(found);
};

const cmpRequirements = (
  req1: SRS.ShortRequirement,
  req2: SRS.ShortRequirement
) => {
  return (
    JSON.stringify(SRS.enshortRequirement(req1)) ===
    JSON.stringify(SRS.enshortRequirement(req2))
  );
};

export function parseRelationships(srs: SRS.Specification) {
  const allReqs = srs.requirements.functional;

  const updateDeps = (deps: any | undefined, updateRelated: boolean) => {
    if (!deps) return;
    deps.forEach((dep: any, idx: number) => {
      if (!dep) return;
      const original = findByKey(dep._key, allReqs);
      if (!original) return;
      if (!cmpRequirements(dep, original)) {
        deps[idx] = {
          ...SRS.enshortRequirement(original),
          ...(updateRelated && {
            relatedRequirements: dep.relatedRequirements,
          }),
        };
      }
    });
  };

  allReqs.forEach((req) => {
    updateDeps(req.dependencies, true);
    updateDeps(req.relatedRequirements, false);
  });

  srs.requirements.functional = allReqs;
  return srs;
}
