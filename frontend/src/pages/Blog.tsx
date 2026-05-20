import { Link } from "react-router-dom";
import blogs from "@/data/blogs";
import { Button } from "@/components/ui/button";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background text-foreground py-16">
      <div className="container">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {blogs.map((b) => (
            <article key={b.slug} className="rounded-2xl border border-border/60 bg-background/80 p-4 shadow">
              {b.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={b.image} alt={b.title} className="w-full h-44 object-cover rounded-md mb-3" />
              )}
              <h2 className={`${b.titleStyle?.bold ? "font-bold" : ""} ${b.titleStyle?.italic ? "italic" : ""} ${b.titleStyle?.underline ? "underline" : ""} text-lg`}>{b.title}</h2>
              <p className="text-sm text-muted-foreground mt-2 mb-3">{b.excerpt}</p>
              <div className="flex items-center gap-2">
                <Button asChild size="sm">
                  <Link to={`/blog/${b.slug}`}>Read more</Link>
                </Button>
                {b.mediumUrl && (
                  <Button asChild variant="ghost" size="sm">
                    <a href={b.mediumUrl} target="_blank" rel="noreferrer">Medium</a>
                  </Button>
                )}
                {b.linkedinUrl && (
                  <Button asChild variant="ghost" size="sm">
                    <a href={b.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a>
                  </Button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
