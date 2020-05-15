export interface IVideoDetails {
    kind: string;
    etag: string;
    items: IDetails[]
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    }
}

export interface IDetails {
    kind: string;
    etag: string;
    id: string;
    snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
            default: {
                url: string;
                width: number;
                height: number;
            };
            medium: {
                url: string;
                width: number;
                height: number;
            };
            high: {
                url: string;
                width: number;
                height: number;
            };
            standard: {
                url: string;
                width: number;
                height: number;
            };
            maxres: {
                url: string;
                width: number;
                height: number;
            }
        };
        channelTitle: string;
        tags: string[];
        categoryId: string;
        liveBroadcastContent: string;
        defaultLanguage: string;
        localized: {
            title: string;
            description: string;
        };
        defaultAudioLanguage: string;
    }
}

export interface IContentDetails {
    kind: string;
    etag: string;
    items: [
        {
            kind: string;
            etag: string;
            id: string;
            contentDetails: {
                duration: string;
                dimension: string;
                definition: string;
                caption: string;
                licensedContent: boolean;
                contentRating: {

                };
                projection: string
            }
        }
    ];
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    }
}

export interface IStatistics {
    kind: string;
    etag: string;
    items: [
        {
            kind: string;
            etag: string;
            id: string;
            statistics: {
                viewCount: string;
                likeCount: string;
                dislikeCount: string;
                favoriteCount: string;
                commentCount: string;
            }
        }
    ];
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    }
}