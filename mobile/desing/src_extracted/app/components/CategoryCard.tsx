interface CategoryCardProps {
  icon: string;
  title: string;
  itemCount: number;
  onClick?: () => void;
}

export function CategoryCard({ icon, title, itemCount, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary transition-all hover:shadow-lg p-6 text-left"
    >
      <div className="flex flex-col items-center text-center gap-3">
        <div className="size-16 rounded-lg bg-primary/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </p>
        </div>
      </div>
    </button>
  );
}
