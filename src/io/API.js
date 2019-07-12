// @flow
import { hostname } from './location';

declare var ENV:string;
declare var GATEWAY_HOST:string;

export const API = {
  baseUrl: () => {
    // Production and review apps going through legacy need to be proxied through legacy
    if (ENV === 'production' || ENV === 'review' && global.location.hostname.indexOf('churchonline.us') === -1) {
      return '';
    } else {
      // Local and churchonline.us need to go directly to the gateway.
      return GATEWAY_HOST;
    }
  },

  _handleError: (_res:Response) => _res.ok ? _res : Promise.reject(_res.statusText),

  async _handleContentType (_res:Response) {
    const contentType = _res.headers.get('content-type');

    if (contentType) {
      if (contentType.includes('application/json')) {
        return await _res.json();
      } else if (contentType.includes('text/plain')) {
        return await _res.text();
      }
    }

    return Promise.reject(`Oops, we couldn't parse the response.`);
  },

  get (_endpoint:string) {
    return fetch(this.baseUrl() + _endpoint, {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Application-Domain': hostname(),
      }),
    }).then(this._handleError)
      .then(this._handleContentType)
      .catch(error => {
        throw new Error(error);
      });
  },

  post (_endpoint:string, _body:any) {
    return fetch(this.baseUrl() + _endpoint, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Application-Domain': hostname(),
      }),
      body: JSON.stringify(_body),
    }).then(this._handleError)
      .then(this._handleContentType)
      .catch(error => {
        throw new Error(error);
      });
  },
};
