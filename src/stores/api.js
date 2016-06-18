'use strict';

let API_URL = 'http://localhost:5000';

export default class Api {
  _fetchData(url) {
    return fetch(url)
      .then((response) => {
        let r = response.json()
        return r
      })
  }

  tents() {
    let uri = '/tents'
    return this._fetchData(API_URL + uri)
  }

  posts(tentId) {
    console.log('api module calling for posts')
    let uri = '/posts'
    if (tentId) {
      uri += '?tent_id=' + tentId
    }
    return this._fetchData(API_URL + uri)
  }

  post(post) {
    let uri = '/posts'
    return fetch(API_URL + uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ post: post })
    }).then((response) => {
      let r = response.json()
      return r
    })
  }

  interact(interaction) {
    let uri = '/interactions'
    return fetch(API_URL + uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ interaction: interaction })
    }).then((response) => {
      let r = response.json()
      return r
    })
  }

  interactions(user) {
    let uri = '/interactions'
    return this._fetchData(API_URL + uri + '?user_id=' + user.id)
  }

  vote(vote) {
    let uri = '/vote'
    fetch(API_URL + uri + '?vote=' + vote.val)
  }

  interact(interaction) {
    let uri = '/interactions'
    return fetch(API_URL + uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ interaction: interaction })
    }).then((response) => {
      let r = response.json()
      return r
    })
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

  // @todo clean up this collection of clutter
  // also @todo set env vars
  store() {
    return new Firebase('https://inthetent.firebaseio.com/')
      .child('dev/v7')
  }
}