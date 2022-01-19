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
    'goth man',
    'fatherly man',
    'princess',
    'rich woman',
    'woman doctor',
    'woman ceo',
    'woman lawyer',
    'stripper',
    'gardner',
    'chef',
    'nerd',
    'nerd woman',
    'janitor',
    'man with flowers',
    'man holding fish',
    'fraternity bro',
    'female scientist',
    'pop star',
    'personal trainer',
    'italian man',
    'gnome',
    'gamer girl',
    'portrait',
    'headshot'
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
