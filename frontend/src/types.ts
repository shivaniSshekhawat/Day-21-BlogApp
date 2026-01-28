export interface Blog {
    _id: string;
    title: string;
    content: string;
    author: {
        _id: string;
        name: string;
        email: string;
    };
    isPublished: boolean;
    isPremium: boolean;
    createdAt: string;
}
