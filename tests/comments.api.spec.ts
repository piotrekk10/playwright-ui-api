import { test as _test } from "@playwright/test";
import { CommentsAPIClient } from "api/clients/commentsAPI";
import { getDefaultAPIContext } from "api/contexts";
import { CommentResponse } from "api/models";
import { commentsSchema } from "api/schemas/commentsSchema";
import { validateSchema } from "api/schemas/validator";
import { assertComment, assertCommentCount } from "utils/assertions";
import { expectStatusCode } from "utils/assertions/solutions";
import { FIRST_COMMENT, NEW_COMMENT } from "utils/data/comments";

interface TestProps {
  commentsClient: CommentsAPIClient;
}

const test = _test.extend<TestProps>({
  // eslint-disable-next-line no-empty-pattern
  commentsClient: async ({}, use) => {
    const defaultContext = await getDefaultAPIContext();
    await use(new CommentsAPIClient(defaultContext));
  },
});

test("GET comment", async ({ commentsClient }) => {
  const response = await commentsClient.getComment(FIRST_COMMENT.id!);
  const json: CommentResponse = await response.json();
  await expectStatusCode({ actual: response.status(), expected: 200, api: response.url() });
  await assertComment({ expectedComment: FIRST_COMMENT, actualComment: json });
});

test("GET all comments", async ({ commentsClient }) => {
  const response = await commentsClient.getComments();
  const json: CommentResponse[] = await response.json();
  await expectStatusCode({ actual: response.status(), expected: 200, api: response.url() });
  await assertCommentCount({ actualComments: json, expectedCount: 500 });
  await validateSchema({ schema: commentsSchema, json });
});

test("GET comment - resource not found", async ({ commentsClient }) => {
  const response = await commentsClient.getComment(501);
  await expectStatusCode({ actual: response.status(), expected: 404, api: response.url() });
});

test("POST comment", async ({ commentsClient }) => {
  const response = await commentsClient.commentComment(NEW_COMMENT);
  const json: CommentResponse = await response.json();

  await expectStatusCode({ actual: response.status(), expected: 201, api: response.url() });
  await assertComment({ expectedComment: NEW_COMMENT, actualComment: json });
});

test("PATCH comment", async ({ commentsClient }) => {
  const expectedData = { id: 1, postId: 1, name: NEW_COMMENT.name, email: NEW_COMMENT.email, body: NEW_COMMENT.body };
  const response = await commentsClient.patchComment(1, {
    name: NEW_COMMENT.name,
    email: NEW_COMMENT.email,
    body: NEW_COMMENT.body,
  });
  const json: CommentResponse = await response.json();

  await expectStatusCode({ actual: response.status(), expected: 200, api: response.url() });
  await assertComment({ expectedComment: expectedData, actualComment: json });
});

test("PUT comment", async ({ commentsClient }) => {
  const expectedData = {
    id: 1,
    postId: NEW_COMMENT.postId,
    name: NEW_COMMENT.name,
    email: NEW_COMMENT.email,
    body: NEW_COMMENT.body,
  };
  const response = await commentsClient.putComment(1, NEW_COMMENT);
  const json: CommentResponse = await response.json();

  await expectStatusCode({ actual: response.status(), expected: 200, api: response.url() });
  await assertComment({ expectedComment: expectedData, actualComment: json });
});

test("DELETE comment", async ({ commentsClient }) => {
  const response = await commentsClient.deleteComment(FIRST_COMMENT.id);

  await expectStatusCode({ actual: response.status(), expected: 200, api: response.url() });
});

test("GET filtered comments", async ({ commentsClient }) => {
  const response = await commentsClient.filterComments({ postId: 10 });
  const json: CommentResponse[] = await response.json();

  await expectStatusCode({ actual: response.status(), expected: 200, api: response.url() });
  await assertCommentCount({ actualComments: json, expectedCount: 5 });
});

test("GET comments by postId", async ({ commentsClient }) => {
  const response = await commentsClient.getCommentsByPost(10);
  const json: CommentResponse[] = await response.json();

  await expectStatusCode({ actual: response.status(), expected: 200, api: response.url() });
  await assertCommentCount({ actualComments: json, expectedCount: 5 });
});
