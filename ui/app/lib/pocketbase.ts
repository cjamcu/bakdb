import PocketBase from 'pocketbase'

const pocketbaseUrl = import.meta.env.VITE_POCKETBASE_URL ;



const pb = new PocketBase(pocketbaseUrl);



const baseApiUrl = pocketbaseUrl == undefined ? '/api/' : `${pocketbaseUrl}/api/`;

export { pb, baseApiUrl }