import { useParams, Link } from "react-router-dom";
import blogs from "@/data/blogs";
import { Button } from "@/components/ui/button";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogs.find((b) => b.slug === slug);
  if (!post) return <div className="min-h-screen container py-16">Post not found.</div>;

  return (
    <div className="min-h-screen bg-background text-foreground py-16">
      <div className="container max-w-3xl">
        <Link to="/blog" className="text-sm text-muted-foreground underline">← Back to blog</Link>
        <h1 className={`${post.titleStyle?.bold ? "font-bold" : ""} ${post.titleStyle?.italic ? "italic" : ""} ${post.titleStyle?.underline ? "underline" : ""} text-3xl mt-4`}>{post.title}</h1>
        <p className="text-sm text-muted-foreground mt-1 mb-4">{post.publishedAt}</p>
        {post.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.image} alt={post.title} className="w-full object-cover rounded-md mb-6 max-h-[480px]" />
        )}
        <div className="prose max-w-none text-muted-foreground">
          <p>{post.content || post.excerpt}</p>
        </div>

        <div className="flex gap-2 mt-6">
          {post.mediumUrl && (
            <Button asChild>
              <a href={post.mediumUrl} target="_blank" rel="noreferrer">Open on Medium</a>
            </Button>
          )}
          {post.linkedinUrl && (
            <Button asChild variant="outline">
              <a href={post.linkedinUrl} target="_blank" rel="noreferrer">Open on LinkedIn</a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
