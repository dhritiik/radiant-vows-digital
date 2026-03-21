import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-accent fill-accent" />
          <span className="font-display text-sm text-foreground">Wedding Invite</span>
        </div>
        <p className="font-sans text-xs text-muted-foreground">
          © {new Date().getFullYear()} Wedding Invite. Crafted with love.
        </p>
      </div>
    </footer>
  );
}
