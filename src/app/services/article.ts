import { createApi , fetchBaseQuery  } from "@reduxjs/toolkit/query/react";
import { env } from "process";

const rapidApiKey = process.env.NEXT_RAPID_API_ARTICLE_KEY
console.log(rapidApiKey)


export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers:any) => {
            headers.set('x-rapidapi-key' , 'f3d261b412msh1f57a16a193f235p1c7eaejsnd4eb1342e487');
            headers.set('x-rapidapi-host' , 'article-extractor-and-summarizer.p.rapidapi.com')

            return headers
        },
    }),
    
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (params) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
        }),
    }),
});

export const { useLazyGetSummaryQuery }:any = articleApi
