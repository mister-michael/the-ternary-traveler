import API from "./api.js"
import renderDomComponent from "./domManager.js";

const listenerEvents = {
  clearForm() {
    const targetNameInput = document.getElementById("poiName");
    const targetPlaceInput = document.getElementById("poiPlace");
    const targetDescriptionInput = document.getElementById("poiDescription");
    const targetCostInput = document.getElementById("poiCost");
    const targetReviewInput = document.getElementById("poiReview");
    const targetHiddenIdInput = document.getElementById("hiddenId")

    targetHiddenIdInput.value = ""
    targetNameInput.value = ""
    targetPlaceInput.value = ""
    targetDescriptionInput.value = ""
    targetCostInput.value = ""

    const targetReviewDiv = document.getElementById("reviewDiv")
    targetReviewDiv.innerHTML = ""

  },
  submitButton() {

    const targetSubmitButton = document.getElementById("submit--button");

    targetSubmitButton.addEventListener("click", () => {

      const targetNameInput = document.getElementById("poiName");
      const targetPlaceInput = document.getElementById("poiPlace");
      const targetDescriptionInput = document.getElementById("poiDescription");
      const targetCostInput = document.getElementById("poiCost");
      const targetReviewInput = document.getElementById("poiReview");

      const targetHiddenIdInput = document.getElementById("hiddenId")
      const targetNoReview = document.getElementById("noReview")
      const targetReviewDiv = document.getElementById("reviewDiv")

      if (targetHiddenIdInput.value !== "") {

        const poiCardAfterUpdate = {
          "placeId": parseInt(targetPlaceInput.value),
          "name": targetNameInput.value,
          "description": targetDescriptionInput.value,
          "cost": parseInt(targetCostInput.value),
          "review": targetReviewInput.value
        }

        poiCardAfterUpdate.id = parseInt(targetHiddenIdInput.value);

        API.updateEntry(poiCardAfterUpdate)
          .then(() => {
            API.getPlaces()
              .then(renderDomComponent)
              .then(targetReviewDiv.innerHTML = "")
              .then(this.clearForm)
          })

      } else {

        const poiCardFirstEntry = {
          "placeId": parseInt(targetPlaceInput.value),
          "name": targetNameInput.value,
          "description": targetDescriptionInput.value,
          "cost": parseInt(targetCostInput.value),
          "review": targetNoReview.value
        }
        API.saveEntry(poiCardFirstEntry)
          .then(() => API.getPlaces().then(renderDomComponent))
          .then(this.clearForm)
          .then(targetHiddenIdInput.value = "")
      }
    })
  },

  updateFormFields(entryId) {
    const targetNameInput = document.getElementById("poiName");
    const targetPlaceInput = document.getElementById("poiPlace");
    const targetDescriptionInput = document.getElementById("poiDescription");
    const targetCostInput = document.getElementById("poiCost");

    const targetHiddenIdInput = document.getElementById("hiddenId")

    const reviewHtml =
      `<fieldset>
          <label id="reviewInput" for="poiReview">Review: </label>
          <input name="poiReview" id="poiReview" placeholder="write a review"/>
        </fieldset>`

    const targetReviewDiv = document.getElementById("reviewDiv")

    targetReviewDiv.innerHTML += reviewHtml

    const targetReviewInput = document.getElementById("poiReview");

    fetch(`http://localhost:8088/interests/${entryId}?_expand=place`)
      .then(resp => resp.json())
      .then(entry => {
        targetHiddenIdInput.value = entry.id
        targetNameInput.value = entry.name
        targetPlaceInput.value = entry.place.id
        targetDescriptionInput.value = entry.description
        targetCostInput.value = entry.cost
        targetReviewInput.value = entry.review

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
  },

  deleteButton() {
    const targetPrintLocation = document.querySelector("#printLocation");

    targetPrintLocation.addEventListener("click", event => {

      if (event.target.id.startsWith("deleteButton--")) {
      
      const result = confirm("are you sure?")

      if (result) {

        const entryToDelete = event.target.id.split("--")[1];

        API.deleteEntry(entryToDelete)
          .then(API.getPlaces)
          .then(renderDomComponent)
        }
      }
    })
  }
}

export default listenerEvents;