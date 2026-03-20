// source.config.ts
import { z } from "zod";
import {
  defineConfig,
  defineDocs,
  defineCollections,
  frontmatterSchema,
  metaSchema
} from "fumadocs-mdx/config";
var docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema,
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
  schema: frontmatterSchema.extend({
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
  }),
  postprocess: {
    includeProcessedMarkdown: true
  }
});
var source_config_default = defineConfig({
  mdxOptions: {}
});
export {
  blog,
  source_config_default as default,
  docs
};
