import type { SRS } from '../types';

export function getIndependentTrees(
  requirements: SRS.Requirement[]
): SRS.Requirement[][] {
  const graph: Record<string, SRS.Requirement[]> = {};
  const reverseDeps: Record<string, SRS.ShortRequirement[]> = {};

  // Inicializa grafos
  for (const req of requirements) {
    const id = req._key;
    graph[id] = [];
  }

  for (const req of requirements) {
    for (const dep of req.dependencies || []) {
      if (!dep?._key) continue;
      graph[dep._key].push(req);

      if (!reverseDeps[req._key]) reverseDeps[req._key] = [];
      reverseDeps[req._key].push(dep);
    }
  }

  // Raízes: requisitos que não são dependência de ninguém
  const rootIds = [...requirements].filter(
    (req) => !reverseDeps[req._key]?.length
  );

  const trees: SRS.Requirement[][] = [];

  // DFS para cada raiz, com controle de visitados por árvore
  for (const root of rootIds) {
    const visited = new Set<string>();
    const tree: SRS.Requirement[] = [];

    function dfs(node: SRS.Requirement) {
      if (visited.has(node._key)) return;
      visited.add(node._key);
      tree.push(node);
      for (const dependent of graph[node._key]) {
        dfs(dependent);
      }
    }

    dfs(root);
    trees.push(tree);
  }

  return trees;
}
