import API from "./api.js"
import htmlFactory from "./domManager.js"
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

      const poiCard = {
        "placeId": parseInt(targetPlaceInput.value),
        "name": targetNameInput.value,
        "description": targetDescriptionInput.value,
        "cost": parseInt(targetCostInput.value),
      }

      API.saveEntry(poiCard).then(() => API.getPlaces().then(renderDomComponent))


    })
  }
}

export default listenerEvents;