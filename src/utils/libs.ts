export default class Libs {
  public static validateKey(key: string): string {
    const err = 'Api key invalid. Find your api key from wakatime.com/settings/api-key';
    if (!key) return err;
    const re = new RegExp(
      '^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$',
      'i',
    );
    if (!re.test(key)) return err;
    return '';
  }
}
