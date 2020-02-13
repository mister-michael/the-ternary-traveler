const renderDomComponent = (entries) => {
  const targetLocation = document.getElementById("printLocation");

  targetLocation.innerHTML = ""
  entries.forEach(entry => targetLocation.innerHTML += htmlFactory(entry))
}

const htmlFactory = (entry) => {

  return `<article>
      <div id="nameDom">${entry.name}</div>
      <div id="placeDom">${entry.place.name}</div>
      <div id="descriptionDom">${entry.description}</div>
      <section id="constAndReview">
        <div id="costDom">Cost: $${entry.cost}</div>
        <div id="review">Review: ${entry.review}</div>
      </section>
      <button type="button" id="editButton--${entry.id}" class="editButton">Edit</button>
      <button id="deleteButton--${entry.id}" class="deleteButton">Delete</button>
    </article>
    `
};

export default renderDomComponent