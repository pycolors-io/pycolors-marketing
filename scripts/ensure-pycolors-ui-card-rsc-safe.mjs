import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);

const unsafePattern =
  /handleKeyDown|role:\s*isInteractiveElement|tabIndex:\s*isInteractiveElement/;

const unsafeCardImplementation = `export const Card = React.forwardRef(({ className, variant, interactive, asChild = false, onKeyDown, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    const isInteractiveElement = Boolean(interactive) && !asChild;
    const handleKeyDown = (event) => {
        onKeyDown?.(event);
        if (isInteractiveElement &&
            (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            event.currentTarget.click();
        }
    };
    return (_jsx(Comp, { ref: ref, "data-slot": "card", role: isInteractiveElement ? 'button' : undefined, tabIndex: isInteractiveElement ? 0 : undefined, onKeyDown: handleKeyDown, className: cn(cardVariants({ variant, interactive }), className), ...props }));
});`;

const safeCardImplementation = `export const Card = React.forwardRef(({ className, variant, interactive, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (_jsx(Comp, { ref: ref, "data-slot": "card", className: cn(cardVariants({ variant, interactive }), className), ...props }));
});`;

const cardPath = join(
  dirname(require.resolve('@pycolors/ui')),
  'components/ui/card.js',
);

const source = await readFile(cardPath, 'utf8');

if (!unsafePattern.test(source)) {
  console.log('@pycolors/ui Card is already RSC-safe.');
  process.exit(0);
}

if (!source.includes(unsafeCardImplementation)) {
  throw new Error(
    '@pycolors/ui Card has an unexpected implementation; refusing to patch it.',
  );
}

await writeFile(
  cardPath,
  source.replace(unsafeCardImplementation, safeCardImplementation),
);

console.log('Patched @pycolors/ui Card for React Server Component safety.');
