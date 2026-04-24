import type { ReactNode } from 'react';

type PageNode = {
  name?: ReactNode;
  title?: string;
  url?: string;
  path?: string;
  children?: PageNode[];
};

type PageTreeRoot = {
  children?: PageNode[];
};

type FlatPage = {
  title: string;
  url: string;
};

function getNodeTitle(node: PageNode): string | null {
  if (typeof node.title === 'string' && node.title.length > 0) {
    return node.title;
  }

  if (typeof node.name === 'string' && node.name.length > 0) {
    return node.name;
  }

  return null;
}

function getNodeUrl(node: PageNode): string | null {
  if (typeof node.url === 'string' && node.url.length > 0) {
    return node.url;
  }

  if (typeof node.path === 'string' && node.path.length > 0) {
    return node.path;
  }

  return null;
}

function flattenTree(
  tree: PageTreeRoot | PageNode[] | undefined,
): FlatPage[] {
  const result: FlatPage[] = [];

  function walk(nodes?: PageNode[]) {
    if (!Array.isArray(nodes)) return;

    for (const node of nodes) {
      const title = getNodeTitle(node);
      const url = getNodeUrl(node);

      if (title && url) {
        result.push({ title, url });
      }

      walk(node.children);
    }
  }

  if (Array.isArray(tree)) {
    walk(tree);
  } else {
    walk(tree?.children);
  }

  return result;
}

export function getPrevNextFromTree(
  tree: PageTreeRoot | PageNode[] | undefined,
  currentUrl: string,
) {
  const flat = flattenTree(tree);

  const index = flat.findIndex((page) => page.url === currentUrl);

  if (index === -1) {
    return {
      previous: null,
      next: null,
    };
  }

  return {
    previous: flat[index - 1] ?? null,
    next: flat[index + 1] ?? null,
  };
}
