import test, { APIRequestContext, APIResponse } from "@playwright/test";
import { APIClient } from "api/models";
import { APIRoutes } from "utils/constants/routes";
import { CommentsDataType } from "utils/data/comments";

export class CommentsAPIClient implements APIClient {
  constructor(public context: APIRequestContext) {}

  async getComment(commentId: number): Promise<APIResponse> {
    return await test.step(`Getting comment with id "${commentId}"`, async () => {
      return await this.context.get(`${APIRoutes.Comments}/${commentId}`);
    });
  }

  async getComments(): Promise<APIResponse> {
    return await test.step("Getting all comments", async () => {
      return await this.context.get(`${APIRoutes.Comments}`);
    });
  }

  async commentComment(commentData: CommentsDataType): Promise<APIResponse> {
    return await test.step("Adding new comment", async () => {
      return await this.context.post(`${APIRoutes.Comments}`, { data: commentData });
    });
  }

  async patchComment(commentId: number, query: Record<string, number | string | boolean>): Promise<APIResponse> {
    return await test.step(`Updating comment with id "${commentId}"`, async () => {
      return await this.context.patch(`${APIRoutes.Comments}/${commentId}`, { data: query });
    });
  }

  async putComment(commentId: number, query: CommentsDataType): Promise<APIResponse> {
    return await test.step(`Replacing comment with id "${commentId}"`, async () => {
      return await this.context.put(`${APIRoutes.Comments}/${commentId}`, { data: query });
    });
  }

  async deleteComment(commentId: number): Promise<APIResponse> {
    return await test.step(`Deleting comment with id "${commentId}"`, async () => {
      return await this.context.delete(`${APIRoutes.Comments}/${commentId}`);
    });
  }

  async filterComments(paramsData: Record<string, number | string | boolean>): Promise<APIResponse> {
    return await test.step(`Getting comments filtered with params "${paramsData}"`, async () => {
      return await this.context.get(`${APIRoutes.Comments}`, { params: paramsData });
    });
  }

  async getCommentsByPost(postId: number): Promise<APIResponse> {
    return await test.step(`Getting comments by postId "${postId}"`, async () => {
      return await this.context.get(`${APIRoutes.Posts}/${postId}${APIRoutes.Comments}`);
    });
  }
}
