import { eventsStore } from "./events-data.js";

// Selectors for filters and events container
const typeSelector = document.getElementById("type");
const distanceSelector = document.getElementById("distance");
const categorySelector = document.getElementById("category");
const eventsContainer = document.getElementById("events-container");

// Main function to render events
function renderEvents() {

  // Get selected filter values
  const type = typeSelector.value;
  const distance = distanceSelector.value;
  const category = categorySelector.value;

  // Check if eventsStore is empty or undefined
  if (!eventsStore || eventsStore.length === 0) {
    eventsContainer.innerHTML = "<p>No events available.</p>";
    return;
  }

  // Filter events based on selected filters
  const filterEvents = eventsStore.filter((event) => {
    // Filter by type
    if (type !== "all" && event.type !== type) return false;

    // Filter by distance
    if (distance !== "all") {
      const [minDistance, maxDistance] = distance.split("-").map(Number);
      if (event.distance < minDistance || event.distance > maxDistance)
        return false;
    }

    // Filter by category (case-insensitive)
    if (
      category !== "all" &&
      event.category.toLowerCase() !== category.toLowerCase()
    )
      return false;

    return true; // Include the event if it passes all filters
  });

  // Clear the events container before rendering
  eventsContainer.innerHTML = "";

  // Helper function to format event dates
  function formatDate(dateObj) {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return dateObj.toLocaleString("en-US", options);
  }

  // Render filtered events
  if (filterEvents.length > 0) {
    filterEvents.forEach((event) => {
      // Create a new event card
      const eventCard = document.createElement("div");
      eventCard.className = "events-item";

      // Check if attendees exist and add the attendees info
      const attendeesInfo = event.attendees
        ? `<p class="events-item-attendees">${event.attendees} attendees</p>`
        : "";

      // Populate the event card with event details
      eventCard.innerHTML = `
        <img src="${event.image}" alt="${event.title}" />
        <div class="events-item-info">
          <p class="events-item-date">${formatDate(event.date)}</p>
          <p class="events-item-title">${event.title}</p>
          <p class="events-item-type">${event.category} (${
        event.distance
      } km)</p>
          ${attendeesInfo} <!-- Add attendees info if available -->
        </div>
      `;

      // Append the event card to the events container
      eventsContainer.append(eventCard);
    });
  } else {
    // Display a message if no events match the filters
    eventsContainer.innerHTML =
      "<p>No events found matching your criteria.</p>";
  }
}

// Add event listeners to filters
typeSelector.addEventListener("change", renderEvents);
distanceSelector.addEventListener("change", renderEvents);
categorySelector.addEventListener("change", renderEvents);

// Initial render of events
renderEvents();
