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
        
      }

      if (targetHiddenIdInput.value !== "") {
        const targetReviewDiv = document.getElementById("reviewDiv")
        poiCard.id = parseInt(targetHiddenIdInput.value);
        API.updateEntry(poiCard)
          .then(() => {
            API.getPlaces()
              .then(renderDomComponent)
              .then(targetReviewDiv.innerHTML = "")
          })

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

    const reviewHtml =
      `<fieldset>
          <label id="reviewInput" for="poiReview">Review: </label>
          <input name="poiReview" id="poiReview" placeholder="write a review"/>
        </fieldset>`

    const targetReviewDiv = document.getElementById("reviewDiv")

    targetReviewDiv.innerHTML += reviewHtml

    // targetReviewInput.type = "text"

    fetch(`http://localhost:8088/places/${entryId}?_embed=interests`)
      .then(resp => resp.json())
      .then(entry => {
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