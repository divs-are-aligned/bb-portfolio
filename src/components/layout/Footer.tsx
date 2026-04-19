export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/50 bg-background py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Bart K Budak. All rights reserved.</p>
        <p>
          Built with{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            Next.js
          </a>{" "}
          &amp;{" "}
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            shadcn/ui
          </a>
        </p>
      </div>
    </footer>
  );
}
