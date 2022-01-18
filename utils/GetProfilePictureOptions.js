import * as nodeFetch from 'node-fetch';
global.fetch = nodeFetch;

import { createApi } from 'unsplash-js';
import lodash from 'lodash';

const queryTerms = [
    'hairy man',
    'powerful lady',
    'queer woman',
    'small man',
    'business woman',
    'mustache man',
    'nonbinary person',
    'human',
    'weak man',
    'muscle woman',
    'punk rock chick',
    'animal trainer',
    'sexy clown',
    'goth man',
    'fatherly man',
    'princess',
    'rich woman',
    'farmer',
    'woman doctor',
    'woman ceo',
    'woman lawyer',
    'stripper',
    'fire fighter',
    'gardner',
    'sports coach',
    'chef',
    'nerd',
    'nerd woman',
    'astronaut',
    'janitor'
];

const serverApi = createApi({
    accessKey: '-SntHO69kzosPKpSpJ7VQfLobD2BFK9k55Qm-LC-8Ek',
    fetch: nodeFetch.default
});

export const getProfilePictureOptions = async () => {
    const requests = queryTerms.map(
        async term =>
            await serverApi.search.getPhotos({
                query: term,
                per_page: 100
            })
    );

    const goo = await Promise.all(requests);
    const foo = lodash.flattenDeep(goo.map(data => data.response.results));

    return lodash.sampleSize(
        foo.map(image => image?.urls?.small),
        15
    );
};
