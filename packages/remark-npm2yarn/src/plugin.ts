import { Root } from 'mdast';
import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

export const remarkNpm2Yarn: Plugin<[], Root> = () => (ast, _file, done) => {
  const codeblocks: any[][] = [];
  visit(ast, { type: 'code',
    // lang: 'mermaid'
  }, (node, index, parent) => {
    codeblocks.push([node, index, parent]);
  });

  // if (codeblocks.length !== 0) {
  //   for (const [node, index, parent] of codeblocks) {
  //     parent.children.splice(index, 1, getMermaidElementAST(node.value));
  //   }
  //   ast.children.unshift(MERMAID_IMPORT_AST);
  // }

  done();
};
