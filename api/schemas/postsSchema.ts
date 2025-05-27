import { JSONSchemaType } from "ajv";
import { PostResponse } from "api/models";

export const postsSchema: JSONSchemaType<PostResponse[]> = {
  type: "array",
  items: {
    type: "object",
    properties: {
      userId: {
        type: "number",
      },
      id: {
        type: "number",
      },
      title: {
        type: "string",
      },
      body: {
        type: "string",
      },
    },
    required: ["userId", "id", "title", "body"],
  },
};
