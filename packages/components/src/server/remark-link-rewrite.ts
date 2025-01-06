import { Root } from 'mdast';
import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

const EXTERNAL_URL_RE = /^https?:\/\//;

export type RemarkLinkRewriteOptions = {
  pattern: RegExp;
  replace: string;
};

export const remarkLinkRewrite: Plugin<[RemarkLinkRewriteOptions], Root> =
  ({ pattern, replace }) =>
  ast => {
    visit(ast, 'link', node => {
      if (EXTERNAL_URL_RE.test(node.url)) {
        return;
      }
      node.url = node.url.replace(pattern, replace);
    });
  };
