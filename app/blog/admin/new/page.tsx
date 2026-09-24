import BackLink from "@/_lib/navigation/BackLink";
import PostForm from "@/blog/[slug]/admin/_lib/form/PostForm";

export default function NewBlogPostAdmin() {
  return (
    <div className="flex flex-col gap-6">
      <BackLink href="/blog/admin" label="Back to posts" />
      <PostForm post={null} slug="" tags={[]} thumbnail={null} />
    </div>
  );
}
