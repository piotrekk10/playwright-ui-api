import { test as _test } from "@playwright/test";
import { PostsAPIClient } from "api/clients/postsAPI";
import { getDefaultAPIContext } from "api/contexts";
import { PostResponse } from "api/models";
import { assertPost, assertPostCount } from "utils/assertions";
import { expectStatusCode } from "utils/assertions/solutions";
import { FIRST_POST, NEW_POST } from "utils/data/posts";

interface TestProps {
  postsClient: PostsAPIClient;
}

const test = _test.extend<TestProps>({
  // eslint-disable-next-line no-empty-pattern
  postsClient: async ({}, use) => {
    const defaultContext = await getDefaultAPIContext();
    await use(new PostsAPIClient(defaultContext));
  },
});

test("GET post", async ({ postsClient }) => {
  const response = await postsClient.getPost(FIRST_POST.id!);
  const json: PostResponse = await response.json();
  await expectStatusCode({ actual: response.status(), expected: 200, api: response.url() });
  await assertPost({ expectedPost: FIRST_POST, actualPost: json });
});

test("GET all posts", async ({ postsClient }) => {
  const response = await postsClient.getPosts();
  const json: PostResponse[] = await response.json();
  await expectStatusCode({ actual: response.status(), expected: 200, api: response.url() });
  await assertPostCount({ actualPosts: json, expectedCount: 100 });
});

test("GET post - resource not found", async ({ postsClient }) => {
  const response = await postsClient.getPost(101);
  await expectStatusCode({ actual: response.status(), expected: 404, api: response.url() });
});

test("POST post", async ({ postsClient }) => {
  const response = await postsClient.postPost(NEW_POST);
  const json: PostResponse = await response.json();

  await expectStatusCode({ actual: response.status(), expected: 201, api: response.url() });
  await assertPost({ expectedPost: NEW_POST, actualPost: json });
});

test("PATCH post", async ({ postsClient }) => {
  const expectedData = { id: 1, userId: 1, title: NEW_POST.title, body: NEW_POST.body };
  const response = await postsClient.patchPost(1, { title: NEW_POST.title, body: NEW_POST.body });
  const json: PostResponse = await response.json();

  await expectStatusCode({ actual: response.status(), expected: 200, api: response.url() });
  await assertPost({ expectedPost: expectedData, actualPost: json });
});

test("PUT post", async ({ postsClient }) => {
  const expectedData = { id: 1, userId: NEW_POST.userId, title: NEW_POST.title, body: NEW_POST.body };
  const response = await postsClient.putPost(1, NEW_POST);
  const json: PostResponse = await response.json();

  await expectStatusCode({ actual: response.status(), expected: 200, api: response.url() });
  await assertPost({ expectedPost: expectedData, actualPost: json });
});

test("DELETE post", async ({ postsClient }) => {
  const response = await postsClient.deletePost(FIRST_POST.id);

  await expectStatusCode({ actual: response.status(), expected: 200, api: response.url() });
});

test("GET filtered posts", async ({ postsClient }) => {
  const response = await postsClient.filterPosts({ userId: 10 });
  const json: PostResponse[] = await response.json();

  await expectStatusCode({ actual: response.status(), expected: 200, api: response.url() });
  await assertPostCount({ actualPosts: json, expectedCount: 10 });
});
