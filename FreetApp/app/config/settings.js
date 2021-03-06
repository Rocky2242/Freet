import store from 'react-native-simple-store';

const DEFAULT_BASE_URL = 'http://sgdccdnems03.cdnsrv.jio.com';
const DEFAULT_IMAGE_BASE_URL = 'http://smumcdnems03.cdnsrv.jio.com/mumsite.cdnsrv.jio.com/jiotv.catchup.cdn.jio.com/dare_images/images';
const DEFAULT_SOCKET_SERVER_URL = 'http://192.168.1.133:3000';
const DEFAULT_BITRATE = '800';

export default class Settings {
  static async setBaseUrl(url) {
    return await(store.save('baseUrl', url))
  }

  static async getBaseUrl() {
    return (await(store.get('baseUrl')) || DEFAULT_BASE_URL)
  }

  static async setBitrate(bitrate) {
    return await(store.save('bitrate', bitrate))
  }

  static async getBitrate() {
    return (await(store.get('bitrate')) || DEFAULT_BITRATE)
  }

  static async setImageBaseUrl(url) {
    return await(store.save('imageBaseUrl', url));
  }

  static async getImageBaseUrl() {
    return (await(store.get('imageBaseUrl')) || DEFAULT_IMAGE_BASE_URL)
  }

  static async setSocketServerUrl(url) {
    return await(store.save('socketServerUrl', url))
  }

  static async getSocketServerUrl() {
    return (await(store.get('socketServerUrl')) || DEFAULT_SOCKET_SERVER_URL)
  }

  static async getChannelListUrl() {
    return `${await Settings.getBaseUrl()}/gdcsite.cdnsrv.jio.com/jiotv.data.cdn.jio.com/apis/v1.3/getMobileChannelList/get/?os=android&devicetype=phone`
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

  static getDisabledLanguages() {
    return {
      'Punjabi': 3,
      'Bengali': 5,
      'Malayalam': 7,
      'Tamil': 8,
      'Gujarati': 9,
      'Odia': 10,
      'Telugu': 11,
      'Bhojpuri': 12,
      'Kannada': 13,
      'Assamese': 14,
      'Nepali': 15,
      'French': 16,
    }
  }
}
