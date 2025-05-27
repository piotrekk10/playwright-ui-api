import { PostResponse } from "api/models";
import { PostsDataType } from "utils/data/posts";
import { expectToEqual } from "./solutions";

interface AssertPostProps {
  expectedPost: PostsDataType;
  actualPost: PostResponse;
}

interface AssertPostsProps {
  expectedCount: number;
  actualPosts: PostResponse[];
}

export const assertPost = async ({ expectedPost, actualPost }: AssertPostProps) => {
  await expectToEqual({
    actual: actualPost.userId,
    expected: expectedPost.userId,
    description: 'post "userId"',
  });
  await expectToEqual({
    actual: actualPost.id,
    expected: expectedPost.id,
    description: 'post "id"',
  });
  await expectToEqual({
    actual: actualPost.title,
    expected: expectedPost.title,
    description: 'post "title"',
  });
  await expectToEqual({
    actual: actualPost.body,
    expected: expectedPost.body,
    description: 'post "body"',
  });
};

export const assertPostCount = async ({ expectedCount, actualPosts }: AssertPostsProps) => {
  await expectToEqual({
    actual: actualPosts.length,
    expected: expectedCount,
    description: "posts count",
  });
};
