export interface PostsDataType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const FIRST_POST: PostsDataType = {
  userId: 1,
  id: 1,
  title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
};

export const NEW_POST: PostsDataType = {
  userId: 101,
  id: 101,
  title: "New post",
  body: "Body for new post",
};
