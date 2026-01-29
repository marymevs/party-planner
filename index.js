// === constants ===
const COHORT = "/2601-ftb-et-web-ft";
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

// === state ===
let parties = [];
let selectedParty;

async function getParties() {
  const response = await fetch(API);
  const responseBody = await response.json();
  const events = responseBody.data;
  parties = events;
}

async function getParty(id) {
  await getParties();
  for (const party of parties) {
    if (party.id === id) {
      selectedParty = party;
      continue;
    }
  }
  console.log(selectedParty);
  render();
}

// === components ===
function PartyList() {
  const $ul = document.createElement("ul");
  const $events = parties.map(PartyListItem);
  $ul.replaceChildren(...$events);
  return $ul;
}

function PartyListItem(event) {
  const $li = document.createElement("li");
  $li.innerHTML = `
    <a href=#selected>${event.name}</a>
  `;

  $li.addEventListener("click", () => {
    getParty(event.id);
  });

  return $li;
}

function PartyDetails() {
  if (!selectedParty) {
    const $p = document.createElement("p");
    $p.innerText = "select an event to see details";
    return $p;
  }

  const $details = document.createElement("section");
  $details.innerHTML = `
    <p>${selectedParty.name} #${selectedParty.cohortId}</p>
    <section>
      <p>${selectedParty.date}</p>
      <p>${selectedParty.location}</p>
    </section>
    <p>${selectedParty.description}</p>
  `;

  return $details;
}

// === render ===
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planners</h1>
    <main>
      <section class="cards">
        <section>
          <h2>Upcoming Parties</h2>
          <EventList></EventList>
        </section>
        <section>
          <h2>Party Details</h2>
          <EventDetails></EventDetails>
        </section>
      </section>
    </main>
  `;

  $app.querySelector("EventList").replaceWith(PartyList());
  $app.querySelector("EventDetails").replaceWith(PartyDetails());
}

async function init() {
  await getParties();
  render();
}

init();
