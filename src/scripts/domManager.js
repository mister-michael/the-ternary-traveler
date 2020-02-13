const renderDomComponent = (entries) => {
  const targetLocation = document.getElementById("printLocation");

  targetLocation.innerHTML = ""
  entries.forEach(entry => targetLocation.innerHTML += htmlFactory(entry))
}

const htmlFactory = (entry) => {

  return `<article class="displayCard">
      <div id="nameDom" class="cardTitle">${entry.name}</div>
      <div id="placeDom" class="italic">${entry.place.name}</div>
      <div id="descriptionDom">${entry.description}</div>
      <section id="constAndReview">
        <div id="costDom">Cost: $${entry.cost}</div>
        <div id="review">Review: ${entry.review}</div>
      </section>
      <section class="buttonBox">
      <button type="button" id="editButton--${entry.id}" class="editButton">Edit</button>
      <button id="deleteButton--${entry.id}" class="deleteButton">Delete</button>
      </section>
    </article>
    `
};

export default renderDomComponent