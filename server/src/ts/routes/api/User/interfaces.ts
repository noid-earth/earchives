interface User {
    createdAt: Date,
    id: string,
    username: string,
    name: string,
    birthday: Date,
    bio: string,

    history: UserHistory[],

    private: boolean,
    admin: boolean,
    editor: boolean,
    verified: boolean,
}

interface  UserHistory {
    date: Date,
    id: string,
    articleId: string,
    type: UserHistoryType,
    userId: string,
}

type UserHistoryType = 'View' | 'Upvote' | 'Downvote' | 'Favorite' | undefined;