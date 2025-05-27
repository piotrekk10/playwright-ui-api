export interface CommentsDataType {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const FIRST_COMMENT: CommentsDataType = {
  postId: 1,
  id: 1,
  name: "id labore ex et quam laborum",
  email: "Eliseo@gardner.biz",
  body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
};

export const NEW_COMMENT: CommentsDataType = {
  postId: 101,
  id: 501,
  name: "New comment",
  email: "new@comment.test",
  body: "Body for new comment",
};
