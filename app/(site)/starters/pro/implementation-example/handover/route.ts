import {
  createExampleHandover,
  implementationExample,
} from "@/lib/products/implementation-example";

export const dynamic = "force-static";

export function GET() {
  return new Response(createExampleHandover(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${implementationExample.filename}"`,
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex",
    },
  });
}
