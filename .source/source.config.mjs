// source.config.ts
import { z } from "zod";
import {
  defineConfig,
  defineDocs,
  defineCollections,
  frontmatterSchema,
  metaSchema
} from "fumadocs-mdx/config";
import { rehypeCode } from "fumadocs-core/mdx-plugins";
var docsFrontmatterSchema = frontmatterSchema.extend({
  toc: z.boolean().optional(),
  full: z.boolean().optional(),
  hero: z.boolean().optional(),
  lastUpdated: z.union([z.string(), z.date()]).optional().transform((value) => {
    if (!value) return void 0;
    if (value instanceof Date)
      return value.toISOString().slice(0, 10);
    return value;
  }),
  appliesTo: z.string().optional(),
  footerCtaLabel: z.string().optional(),
  footerCtaHref: z.string().optional()
});
var blogFrontmatterSchema = frontmatterSchema.extend({
  author: z.string(),
  date: z.string(),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  readingTime: z.string().optional(),
  cover: z.string().optional(),
  cta: z.object({
    label: z.string(),
    href: z.string(),
    variant: z.enum(["free", "pro", "blocks"]).default("free")
  }).optional()
});
var docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: docsFrontmatterSchema,
    postprocess: {
      includeProcessedMarkdown: true
    }
  },
  meta: {
    schema: metaSchema
  }
});
var blog = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: blogFrontmatterSchema,
  postprocess: {
    includeProcessedMarkdown: true
  }
});
var source_config_default = defineConfig({
  mdxOptions: {
    rehypePlugins: [
      [
        rehypeCode,
        {
          themes: {
            light: "github-light",
            dark: "github-dark"
          },
          defaultLang: "tsx"
        }
      ]
    ]
  }
});
export {
  blog,
  source_config_default as default,
  docs
};
