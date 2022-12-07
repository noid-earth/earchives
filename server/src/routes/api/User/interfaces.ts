export interface User {
    createdAt: Date,
    id: string,
    provider: string,
    providerId: string,
    name: string,
    picture: string,
    email: string,
    details: UserDetails,
    history: UserHistory[],
}

interface UserDetails {
  emailVerified: boolean,
  articleWriter: boolean,
  feedWriter: boolean,
  private: boolean,
  administrator: boolean,
}

interface UserHistory {
    date: Date,
    id: string,
    refId: string | null,
    type: UserHistoryType,
}

type UserHistoryType = 'VIEW' | 'UPVOTE' | 'DOWNVOTE' | 'FAVORITE' | null;

/* Auth0 Provided

Profile {
  displayName: 'ju************@outlook.com',
  id: 'auth0|6390b*************',
  user_id: 'auth0|6390b*************',
  provider: 'auth0',
  name: { familyName: undefined, givenName: undefined },
  emails: [ { value: 'ju************@outlook.com' } ],
  picture: 'https://s.gravatar.com/avatar/82c0c9f489ea3669fb8b539082d7d496?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fju.png',
  nickname: 'jurgenjacobsen',
  _json: {
    sub: 'auth0|6390b*************',
    nickname: 'jurgenjacobsen',
    name: 'ju************@outlook.com',
    picture: 'https://s.gravatar.com/avatar/82c0c9f489ea3669fb8b539082d7d496?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fju.png',
    updated_at: '2022-12-07T17:34:59.501Z',
    email: 'ju************@outlook.com',
    email_verified: true
  }
}

*/