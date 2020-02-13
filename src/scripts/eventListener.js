import API from "./api.js"
import baseUrl from "./api.js"
import expandedTrim from "./api.js"
import renderDomComponent from "./domManager.js";

const listenerEvents = {
  submitButton() {

    const targetSubmitButton = document.getElementById("submit--button");

    targetSubmitButton.addEventListener("click", () => {
      const targetNameInput = document.getElementById("poiName");
      const targetPlaceInput = document.getElementById("poiPlace");
      const targetDescriptionInput = document.getElementById("poiDescription");
      const targetCostInput = document.getElementById("poiCost");
      const targetReviewInput = document.getElementById("poiReview");

      const targetHiddenIdInput = document.getElementById("hiddenId")

      const poiCard = {
        "placeId": parseInt(targetPlaceInput.value),
        "name": targetNameInput.value,
        "description": targetDescriptionInput.value,
        "cost": parseInt(targetCostInput.value),
        "review": targetReviewInput.value
      }

      if (targetHiddenIdInput.value !== "") {
        //post api
      } else {

        API.saveEntry(poiCard).then(() => API.getPlaces().then(renderDomComponent))

      }
    })
  },
  updateFormFields(entryId) {
    const targetNameInput = document.getElementById("poiName");
    const targetPlaceInput = document.getElementById("poiPlace");
    const targetDescriptionInput = document.getElementById("poiDescription");
    const targetCostInput = document.getElementById("poiCost");
    const targetReviewInput = document.getElementById("poiReview");
    const targetHiddenIdInput = document.getElementById("hiddenId")
    
    targetReviewInput.type = "text"

    

    fetch(`http://localhost:8088/places/${entryId}?_embed=interests`)
    .then(resp => resp.json())
    .then(entry => {
      console.log(entry.interests[0].name)
      targetHiddenIdInput.value = entry.interests[0].placeId
      targetNameInput.value = entry.interests[0].name
      targetPlaceInput.value = entry.id
      targetDescriptionInput.value = entry.interests[0].description
      targetCostInput.value = entry.interests[0].cost
    })
  },
  editButton() {

    const targetPrintLocation = document.querySelector("#printLocation");

    targetPrintLocation.addEventListener("click", event => {

      if (event.target.id.startsWith("editButton--")) {
        const entryToEdit = event.target.id.split("--")[1];

        listenerEvents.updateFormFields(entryToEdit)

      }
    })
  }
}

export default listenerEvents;