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

  static async getChannelListUrl() {
    return `${await Settings.getBaseUrl()}/gdcsite.cdnsrv.jio.com/jiotv.data.cdn.jio.com/apis/v1.3/getMobileChannelList/get/?os=android&devicetype=phone`
  }

  static async getImageBaseUrl() {
    return `http://smumcdnems03.cdnsrv.jio.com/mumsite.cdnsrv.jio.com/jiotv.catchup.cdn.jio.com/dare_images/images`
  }

  static getCategoryMap() {
    return {
      'All'           : '*',
      'Entertainment' : 5,
      'Movies'        : 6,
      'Kids'          : 7,
      'Sports'        : 8,
      'Lifestyle'     : 9,
      'Science'       : 10,
      'News'          : 12,
      'Music'         : 13,
      'Business News' : 16,
    }
  }

  static getCategoryId(category) {
    return Settings.getCategoryMap()[category];
  }
}
