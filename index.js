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
  console.log(events);
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
  return $li;
}

// === render ===
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planners</h1>
    <main>
      <section>
        <h2>Upcoming Parties</h2>
        <EventList></EventList>
        <h2>Party Details</h2>
      </section>
    </main>
  `;

  $app.querySelector("EventList").replaceWith(PartyList());
}

async function init() {
  await getParties();
  render();
}

init();
