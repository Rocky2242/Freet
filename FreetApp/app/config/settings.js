import store from 'react-native-simple-store';

const DEFAULT_BASE_URL = 'http://sgdccdnems03.cdnsrv.jio.com';
const DEFAULT_BITRATE = '800';

export default class Settings {
  static async getBaseUrl() {
    return (await(store.get('baseUrl')) || DEFAULT_BASE_URL)
  }

  static async setBaseUrl(url) {
    return await(store.save('baseUrl', url))
  }

  static async getBitrate() {
    return (await(store.get('bitrate')) || DEFAULT_BITRATE)
  }

  static async setBitrate(bitrate) {
    return await(store.save('bitrate', bitrate))
  }
}
