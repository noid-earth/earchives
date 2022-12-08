import { User } from "../User/interfaces";

export interface Article {
    id: string,
    title: string,
    createdAt: Date,
    author: User | null,
    authorId: string,
    body: ArticleBody,
    history: ArticleHistory[],
    subjects: string[],
    years: number[],
    attachments: ArticleAttachments[],
    details: ArticleDetails,
}

interface ArticleBody {
    markdown: string,
    html: string,
}

interface ArticleDetails {
    showAfter: Date | null,
    private: boolean,
    outdated: boolean,
}

interface ArticleAttachments {
    type: string,
    url: string,
    refId: string,
}

export interface ArticleHistory {
    date: Date,
    articleId: string,
    refId: string,
    type: ArticleHistoryType,
}

export type ArticleHistoryType = 'VIEW' | 'UPVOTE' | 'DOWNVOTE' | 'FAVORITE' | 'EDIT' | null;