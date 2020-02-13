const renderDomComponent = (entries) => {
  const targetLocation = document.getElementById("printLocation");


  entries.forEach(entry => targetLocation.innerHTML += htmlFactory(entry))
  
}

const htmlFactory = (entry) => {

  return `<article>
      <div id="nameDom">${entry.name}</div>
      <div id="placeDom">${entry.place.name}</div>
      <div id="descriptionDom">${entry.description}</div>
      <section id="constAndReview">
        <div id="costDom">$${entry.cost}</div>
        <div id="reviewDom">${entry.review}</div>
      </section>
    </article>
    `
};

export default renderDomComponent