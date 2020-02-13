const htmlFactory = (entry) => {

  const domComponent =
    `
  <article>
      <div id="nameDom">${entry.name}</div>
      <div id="placeDom">${entry.place.name}</div>
      <div id="descriptionDom">${entry.description}</div>
      <section id="constAndReview">
        <div id="costDom">$${entry.cost}</div>
        <div id="reviewDom">${entry.review}</div>
      </section>
    </article>
    `
  const renderDomComponent = (entry) => {
    const targetLocation = document.getElementById("printLocation");

    targetLocation.innerHTML += domComponent

  }
}