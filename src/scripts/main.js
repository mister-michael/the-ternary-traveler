import API from "./api.js"
import renderDomComponent from "./domManager.js"
import listenerEvents from "./eventListener.js"

// if (API.getPlaces().length === 0) {}
// else {

listenerEvents.submitButton();
listenerEvents.editButton();

API.getPlaces().then(entries => renderDomComponent(entries));
// }

// console.log(API.getPlaces().then(entries => entries.length))