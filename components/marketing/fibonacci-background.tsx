import styles from "./fibonacci-background.module.css";

type Square = Readonly<{ x: number; y: number; size: number }>;

/** Add each Fibonacci square clockwise around the preceding rectangle. */
function createFibonacciTiling(count: number) {
  const squares: Square[] = [{ x: 0, y: 0, size: 1 }];
  let previous = 0;
  let size = 1;
  let left = 0;
  let top = 0;
  let right = 1;
  let bottom = 1;

  for (let index = 1; index < count; index++) {
    [previous, size] = [size, previous + size];
    const direction = index % 4;
    const x = direction === 1 ? right : direction === 3 ? left - size : left;
    const y = direction === 2 ? bottom : direction === 0 ? top - size : top;
    squares.push({ x, y, size });
    left = Math.min(left, x);
    top = Math.min(top, y);
    right = Math.max(right, x + size);
    bottom = Math.max(bottom, y + size);
  }

  // Quarter-circle endpoints follow the same clockwise turn as the squares.
  const spiral = squares.reduce((path, square, index) => {
    const { x, y, size } = square;
    const direction = index % 4;
    const endX = direction < 2 ? x + size : x;
    const endY = direction === 1 || direction === 2 ? y + size : y;
    return `${path} A ${size} ${size} 0 0 1 ${endX} ${endY}`;
  }, "M 0 1");

  return {
    squares,
    spiral,
    viewBox: `${left - 0.5} ${top - 0.5} ${right - left + 1} ${bottom - top + 1}`,
  };
}

// Deterministic server-rendered geometry; no client loop or viewport listeners.
const geometry = createFibonacciTiling(9);

function FibonacciDrawing({ className }: Readonly<{ className: string }>) {
  return (
    <svg
      viewBox={geometry.viewBox}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <g className={styles.tiles}>
        {geometry.squares.map(({ x, y, size }, index) => (
          <rect
            key={index}
            x={x}
            y={y}
            width={size}
            height={size}
            vectorEffect="non-scaling-stroke"
            className={index % 3 === 0 ? styles.tint : undefined}
          />
        ))}
      </g>
      <path
        d={geometry.spiral}
        vectorEffect="non-scaling-stroke"
        className={styles.spiral}
      />
    </svg>
  );
}

/** Decorative edge geometry leaves the hero's reading area clear. */
export function FibonacciBackground() {
  return (
    <div className={styles.background} aria-hidden="true">
      <FibonacciDrawing className={styles.left} />
      <FibonacciDrawing className={styles.right} />
    </div>
  );
}

/** A small, static signature for the shared site footers. */
export function FibonacciMark({ className }: Readonly<{ className?: string }>) {
  return (
    <div className={className} aria-hidden="true">
      <div className={styles.mark}>
        <FibonacciDrawing className={styles.markDrawing} />
      </div>
    </div>
  );
}
