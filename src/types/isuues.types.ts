export interface IssuesMap {
  [key: number]: Issue;
}

export interface Issue {
  id: number;
  body: string;
  state: string;
  title: string;
  created_at: Date;
  number: number;
  user: {
    login: string;
  };
  comments: number;
}

export type StatusComponent = {
  isOpen: boolean;
};
