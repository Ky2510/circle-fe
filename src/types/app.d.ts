export interface IThread {
    _count: any;
    id? : number;
    content? : string;
    image?: IThread[];
    userId: number;
    threadId?: number;
    author?: IUser;
    _count? : {
        replies: number;
        likes: number;
    }
}

interface IThreadImage { 
    image?: string;
}

export interface IUser {
    id : number
    name : string
    username : string
    fullname : string
    email: string
    profile: IProfile
    avatar: string
    follower: IFollower[]
    following: IFollower[]
}

export interface IProfile {
    bio?: string;
    avatar?: string;
    cover?: string
    user: IUser
    id?: number
    userId: number
}

export interface IFollow {
    username: string;
    fullname: string;
    id: number;
    profile: {
        avatar: string
    }
}

export interface IFollower {
    followerId: number
    followingId: number
}

export interface IFollowing {
    followingId: number
}