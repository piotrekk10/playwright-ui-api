import { CommentResponse } from "api/models";
import { CommentsDataType } from "utils/data/comments";
import { expectToEqual } from "./solutions";

interface AssertCommentProps {
  expectedComment: CommentsDataType;
  actualComment: CommentResponse;
}

interface AssertCommentsProps {
  expectedCount: number;
  actualComments: CommentResponse[];
}

export const assertComment = async ({ expectedComment, actualComment }: AssertCommentProps) => {
  await expectToEqual({
    actual: actualComment.postId,
    expected: expectedComment.postId,
    description: 'comment "postId"',
  });
  await expectToEqual({
    actual: actualComment.id,
    expected: expectedComment.id,
    description: 'comment "id"',
  });
  await expectToEqual({
    actual: actualComment.name,
    expected: expectedComment.name,
    description: 'comment "name"',
  });
  await expectToEqual({
    actual: actualComment.email,
    expected: expectedComment.email,
    description: 'comment "email"',
  });
  await expectToEqual({
    actual: actualComment.body,
    expected: expectedComment.body,
    description: 'comment "body"',
  });
};

export const assertCommentCount = async ({ expectedCount, actualComments }: AssertCommentsProps) => {
  await expectToEqual({
    actual: actualComments.length,
    expected: expectedCount,
    description: "comment count",
  });
};
