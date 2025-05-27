import test, { APIRequestContext, APIResponse } from "@playwright/test";
import { APIClient } from "api/models";
import { APIRoutes } from "utils/constants/routes";
import { PostsDataType } from "utils/data/posts";

export class PostsAPIClient implements APIClient {
  constructor(public context: APIRequestContext) {}

  async getPost(postId: number): Promise<APIResponse> {
    return await test.step(`Getting post with id "${postId}"`, async () => {
      return await this.context.get(`${APIRoutes.Posts}/${postId}`);
    });
  }

  async getPosts(): Promise<APIResponse> {
    return await test.step("Getting all posts", async () => {
      return await this.context.get(`${APIRoutes.Posts}`);
    });
  }

  async postPost(postData: PostsDataType): Promise<APIResponse> {
    return await test.step("Adding new post", async () => {
      return await this.context.post(`${APIRoutes.Posts}`, { data: postData });
    });
  }

  async patchPost(postId: number, query: Record<string, number | string | boolean>): Promise<APIResponse> {
    return await test.step(`Updating post with id "${postId}"`, async () => {
      return await this.context.patch(`${APIRoutes.Posts}/${postId}`, { data: query });
    });
  }

  async putPost(postId: number, query: PostsDataType): Promise<APIResponse> {
    return await test.step(`Replacing post with id "${postId}"`, async () => {
      return await this.context.put(`${APIRoutes.Posts}/${postId}`, { data: query });
    });
  }

  async deletePost(postId: number): Promise<APIResponse> {
    return await test.step(`Deleting post with id "${postId}"`, async () => {
      return await this.context.delete(`${APIRoutes.Posts}/${postId}`);
    });
  }

  async filterPosts(paramsData: Record<string, number | string | boolean>): Promise<APIResponse> {
    return await test.step(`Getting posts filtered with params "${paramsData}"`, async () => {
      return await this.context.get(`${APIRoutes.Posts}`, { params: paramsData });
    });
  }
}
