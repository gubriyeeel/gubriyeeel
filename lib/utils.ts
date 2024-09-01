import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { Post } from "#site/content"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sortPosts(posts: Array<Post>) {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}