import type { SRS } from '../types';

export function getLayeredDevelopmentPlan(
  requirements: SRS.Requirement[]
): SRS.Requirement[][] {
  const graph: Record<string, SRS.Requirement[]> = {};
  const inDegree: Record<string, number> = {};

  // Inicializa grafo e graus
  for (const req of requirements) {
    const id = req._key;
    graph[id] = [];
    inDegree[id] = 0;
  }

  // Preenche dependências
  for (const req of requirements) {
    for (const dep of req.dependencies || []) {
      if (!dep?._key) continue;
      graph[dep._key].push(req);
      inDegree[req._key] += 1;
    }
  }

  const result: SRS.Requirement[][] = [];
  let queue: SRS.Requirement[] = requirements.filter(
    (req) => inDegree[req._key] === 0
  );

  while (queue.length > 0) {
    result.push([...queue]); // adiciona o nível atual
    const nextQueue: SRS.Requirement[] = [];

    for (const current of queue) {
      for (const dependent of graph[current._key]) {
        inDegree[dependent._key] -= 1;
        if (inDegree[dependent._key] === 0) {
          nextQueue.push(dependent);
        }
      }
    }

    queue = nextQueue;
  }

  return result;
}
