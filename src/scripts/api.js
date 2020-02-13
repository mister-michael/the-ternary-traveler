const baseUrl = "http://localhost:8088/"
const interestUrl = "http://localhost:8088/interests"
const expandedUrl = "http://localhost:8088/interests?_expand=place"
const expandedTrim = "interests?_expand=place"

const API = {
  getPlaces() {

    return fetch(expandedUrl)
      .then(resp => resp.json())

  },
  saveEntry(entry) {

    return fetch(interestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    })
  },
  updateEntry(entry) {
    return fetch(`${interestUrl}/${entry.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    })
  },
  deleteEntry(buttonId) {
    return fetch(`${interestUrl}/${buttonId}`, {
      method: "DELETE"
    })
  }
}

export default API;