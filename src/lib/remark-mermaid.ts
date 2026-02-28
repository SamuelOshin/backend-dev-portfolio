import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Root, Code } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx-jsx";

/**
 * A remark plugin that transforms ```mermaid code blocks into
 * <Mermaid chart="..." /> MDX JSX elements.
 * This runs BEFORE rehype-pretty-code so mermaid blocks are never
 * treated as syntax-highlighted code.
 */
const remarkMermaid: Plugin<[], Root> = () => {
    return (tree) => {
        visit(tree, "code", (node: Code, index, parent) => {
            if (node.lang !== "mermaid") return;
            if (!parent || index === undefined) return;

            const mermaidNode: MdxJsxFlowElement = {
                type: "mdxJsxFlowElement",
                name: "Mermaid",
                attributes: [
                    {
                        type: "mdxJsxAttribute",
                        name: "chart",
                        value: node.value,
                    },
                ],
                children: [],
            };

            // Replace the code node with the Mermaid JSX element
            parent.children.splice(index as number, 1, mermaidNode as any);
        });
    };
};

export default remarkMermaid;
