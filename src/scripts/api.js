const baseUrl = "http://localhost:8088/"
const placeUrl = "http://localhost:8088/interests"
const expandedUrl = "http://localhost:8088/interests?_expand=place"
const expandedTrim = "interests?_expand=place"

const API = {
  getPlaces() {

    return fetch(expandedUrl)
      .then(resp => resp.json())

  },
  saveEntry(entry) {

    return fetch(placeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    })
  }
}

export default API;