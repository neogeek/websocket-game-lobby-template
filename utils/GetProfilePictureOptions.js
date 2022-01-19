import * as nodeFetch from 'node-fetch';
global.fetch = nodeFetch;

import { createApi } from 'unsplash-js';

const serverApi = createApi({
    accessKey: '-SntHO69kzosPKpSpJ7VQfLobD2BFK9k55Qm-LC-8Ek',
    fetch: nodeFetch.default
});

export const getProfilePictureOptions = async () => {
    const data = await serverApi.photos.getRandom({
        count: 30,
        collections:
            '3678902,4172658,418611,1060022,8983925,2074689,516966,47557894,75593519,30270697,89335907'
    });

    return data.response.map(image => image?.urls?.small);
};
