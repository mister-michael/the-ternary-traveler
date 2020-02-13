import API from "./api.js"
import renderDomComponent from "./domManager.js"
import listenerEvents from "./eventListener.js"

listenerEvents.submitButton();
listenerEvents.editButton();
listenerEvents.deleteButton();

API.getPlaces().then(entries => renderDomComponent(entries));