export interface CommentsMap {
  [key: number]: Comment;
}

export interface Comment {
  id: number;
  body: string;
}
