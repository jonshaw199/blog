"use client";

import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import ContentEditorField from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/ContentEditorField";
import DescriptionField from "@/blog/[slug]/admin/_lib/form/fields/DescriptionField";
import SlugField from "@/blog/[slug]/admin/_lib/form/fields/SlugField";
import ThumbnailField from "@/blog/[slug]/admin/_lib/form/fields/ThumbnailField";
import TitleField from "@/blog/[slug]/admin/_lib/form/fields/TitleField";
import { MediaWithUrl } from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/actions";
import { Tables } from "@/blog/_lib/supabase/database";
import {
  postFormSchema,
  PostFormValues,
} from "@/blog/[slug]/admin/_lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPost, updatePost } from "@/blog/[slug]/admin/_lib/actions";
import PublishField from "@/blog/[slug]/admin/_lib/form/fields/PublishField";
import TagsField from "@/blog/[slug]/admin/_lib/form/fields/tags/TagsField";
import Button from "@/_lib/button/Button";

export default function PostForm({
  post,
  slug,
  tags,
  thumbnail,
}: {
  post: Tables<"posts"> | null;
  slug: Tables<"posts">["slug"];
  tags: Tables<"tags">[];
  thumbnail: MediaWithUrl | null;
}) {
  const router = useRouter();
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      slug,
      title: post?.title ?? "",
      description: post?.description ?? "",
      content: typeof post?.content === "string" ? post.content : "",
      thumbnailId: post?.thumbnail_id ?? null,
      isPublished: !!post?.published_at,
      tagIds: tags.map(({ id }) => id),
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (formValues: PostFormValues) => {
    const savedPost = post
      ? await updatePost(post, formValues)
      : await createPost(formValues);

    router.push(`/blog/${savedPost.slug}/admin`);
    router.refresh();
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 p-1"
      >
        <SlugField />
        <TitleField />
        <DescriptionField />
        <ThumbnailField initialThumbnail={thumbnail} />
        <ContentEditorField />
        <TagsField tags={tags} />
        <PublishField publishedAt={post?.published_at} />
        <div className="sticky bottom-0 relative p-2 before:absolute before:inset-y-0 before:left-1/2 before:w-screen before:-translate-x-1/2 before:border-t before:border-border before:bg-surface-strong/95 before:backdrop-blur before:content-['']">
          <Button
            type="submit"
            primary
            disabled={isSubmitting}
            className="relative z-10 w-full"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
