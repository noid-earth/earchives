export interface Article {
    id: string,
    title: string,
    createdAt: Date,
    author: User | undefined,
    authorId: string,
    subjects: string[],
    year: number[],
    body: string,
    bannerURL: string,
    private: boolean,
    history: ArticleHistory[],
}

export interface ArticleHistory {
    date: Date,
    id: string,
    articleId: string,
    type: ArticleHistoryType,
    userId: string
}

export type ArticleHistoryType = 'View' | 'Upvote' | 'Downvote' | 'Favorite' | undefined;