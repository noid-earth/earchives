export interface Article {
    id: string,
    createdAt: Date,
    author: User | undefined,
    authorId: string,
    subject: string[],
    categories: string[],
    body: string,
    bannerURL: string,
    private: boolean,
    sensitive: boolean,
    premium: boolean,
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