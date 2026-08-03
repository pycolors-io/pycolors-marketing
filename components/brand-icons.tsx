import * as React from "react";

type BrandIconProps = React.SVGProps<SVGSVGElement>;

export const GithubIcon = React.forwardRef<SVGSVGElement, BrandIconProps>(
  function GithubIcon(props, ref) {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
      >
        <path d="M12 .5a12 12 0 0 0-3.8 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.92 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.46 11.46 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.62-5.48 5.92.43.37.82 1.1.82 2.23v3.3c0 .32.21.69.83.57A12 12 0 0 0 12 .5Z" />
      </svg>
    );
  },
);

export const LinkedinIcon = React.forwardRef<SVGSVGElement, BrandIconProps>(
  function LinkedinIcon(props, ref) {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
      >
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.11 20.45H3.56V9h3.55v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.2 0 22.23 0Z" />
      </svg>
    );
  },
);

export const TwitterIcon = React.forwardRef<SVGSVGElement, BrandIconProps>(
  function TwitterIcon(props, ref) {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
      >
        <path d="M18.9 2.25h3.68l-8.04 9.19L24 21.75h-7.4l-5.8-7.58-6.63 7.58H.49l8.6-9.83L0 2.25h7.58l5.24 6.93 6.08-6.93Zm-1.29 17.68h2.04L6.47 3.98H4.28l13.33 15.95Z" />
      </svg>
    );
  },
);
