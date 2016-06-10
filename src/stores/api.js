'use strict';

let API_URL = 'http://localhost:5000';

export default class Api {
  tents() {
    let uri = '/tents'
    return this._fetchData(API_URL + uri)
  }

  _fetchData(url) {
    return fetch(url)
      .then((response) => {
        let r = response.json()
        return r
      })
  }

  vote(vote) {
    let uri = '/vote'
    fetch(API_URL + uri + '?vote=' + vote.val)
  }

  signup(credentials) {
    let uri = '/users'
    return fetch(API_URL + uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ user: credentials })
    }).then((response) => {
      let r = response.json()
      return r
    })
  }

  authenticate(credentials) {
    let uri = '/users/login'
    return fetch(API_URL + uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ user: credentials })
    }).then((response) => {
      let r = response.json()
      return r
    })
  }
}