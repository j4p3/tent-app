export default class S3 {
  upload(image, data) {
    let d = new FormData()
    let h = {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    }
    for (var k in data.fields) {
      d.append(k, data.fields[k])
    }
    d.append('file', {
      uri: image.uri,
      name: 'avatar',
      type: 'image/jpg'
    })
    return fetch(data.url, {
      method: 'POST',
      headers: h,
      body: d
    }).then((response) => {
      return response.text().then(t => {
        if (t.indexOf('Error') > 0) {
          return { error: 'Image upload failed.' }
        } else {
          let location = t.substring(t.indexOf('<Location>') + '<Location>'.length, t.indexOf('</Location>'))
          return { location: location }
        }
      })
    })
  }
}

