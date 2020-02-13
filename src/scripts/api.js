const baseUrl = "http://localhost:8088/"
const expandedUrl = "http://localhost:8088/interests?_expand=place"
const expandedTrim = "interests?_expand=place"

const API = {
  getPlaces() {

    return fetch(expandedUrl)
      .then(resp => resp.json())
      
  },
}