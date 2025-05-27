import { JSONSchemaType } from "ajv";
import { CommentResponse } from "api/models";

export const commentsSchema: JSONSchemaType<CommentResponse[]> = {
  type: "array",
  items: {
    type: "object",
    properties: {
      postId: {
        type: "number",
      },
      id: {
        type: "number",
      },
      name: {
        type: "string",
      },
      email: {
        type: "string",
      },
      body: {
        type: "string",
      },
    },
    required: ["postId", "id", "name", "email", "body"],
  },
};
