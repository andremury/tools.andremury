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

import uniqBy from 'lodash.uniqby';
export function parseRelationships(srs: SRS.Specification) {
  const allReqs = srs.requirements.functional;

  const updateDeps = (deps: any | undefined, updateRelated: boolean) => {
    if (!deps) return;
    deps.forEach((dep: any, idx: number) => {
      if (!dep) return;
      if (Array.isArray(dep.relatedRequirements)) {
        dep.relatedRequirements = uniqBy(dep.relatedRequirements, '_key');
      }
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
    req.dependencies = uniqBy(req.dependencies, '_key');
    req.relatedRequirements = uniqBy(req.relatedRequirements, '_key');

    updateDeps(req.dependencies, true);
    updateDeps(req.relatedRequirements, false);
  });

  srs.requirements.functional = allReqs;
  return srs;
}
