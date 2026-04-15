export function Footer() {
  return (
    <footer className="border-t border-border/50 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Bart K Budak. All rights reserved.</p>
        <p>Built with Next.js &amp; shadcn/ui</p>
      </div>
    </footer>
  );
}
