export interface IVideosList {
    kind: string;
    etag: string;
    regionCode: string;
    items: Item[];
    nextPageToken?: string;
    prevPageToken?: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number
    }
}

export interface Item {
    kind: string;
    etag: string;
    id: {
        kind: string;
        videoId?: string;
        playlistId?: string;
    }
    snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
            default: {
                url: string;
                width: number;
                height: number
            };
            medium: {
                url: string;
                width: number;
                height: number
            };
            high: {
                url: string;
                width: number;
                height: number
            };
            standard: {
                url: string;
                width: number;
                height: number
            };
            maxres: {
                url: string;
                width: number;
                height: number
            }
        };
        channelTitle: string;
        tags: string[];
        categoryId: string;
        liveBroadcastContent: string;
        localized: {
            title: string;
            description: string
        };
        defaultAudioLanguage: string
    }
}