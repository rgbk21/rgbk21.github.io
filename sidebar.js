// In order for the sidebar to highlight the entries properly
// All the anchor links at the top should have class as index-column-entry
// And the href that they link to should have one of the class as index-column-link.
// See AI.html for working exmaple.

'use strict';

// --- New Sidebar/Index Toggle Logic ---
const sidebarToggleButton = document.getElementById('sidebarToggle');
const indexColumn = document.querySelector('.index-column');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const body = document.body;

const sidebarWidth = 250; // Must match the width defined in CSS for .index-column
const breakpointLg = 991.98; // Bootstrap's 'lg' breakpoint

// 1. Grab all the target content elements and the index links
const contentTargets = document.querySelectorAll('.content-column .index-column-link');
const indexEntries = document.querySelectorAll('.index-column-entry');

/**
 * Force-updates the active sidebar link based on what is currently on screen.
 * Fixes: Scroll on mobile, reopen the sidebar, the highlighted entry in the index is not updated.
 */
function syncSidebarActiveItem() {
  if (contentTargets.length === 0) return;

  let activeTarget = contentTargets[0];
  // Define a trigger line 20% down from the top of the viewport
  const triggerPoint = window.innerHeight * 0.2;

  // Find the last element that has scrolled past our trigger line
  contentTargets.forEach(target => {
    const rect = target.getBoundingClientRect();
    if (rect.top <= triggerPoint) {
      activeTarget = target;
    }
  });

  if (activeTarget) {
    const currentId = activeTarget.getAttribute('id');
    indexEntries.forEach(link => link.classList.remove('active'));
    const matchingIndexEntry = document.querySelector(`.index-column-entry[href="#${currentId}"]`);
    if (matchingIndexEntry) {
      matchingIndexEntry.classList.add('active');
    }
  }
}

function toggleSidebar() {
  const isOpen = indexColumn.classList.contains('open');
  if (isOpen) {
    closeSidebar();
  } else {
    indexColumn.classList.add('open');
    sidebarOverlay.classList.add('active');
    body.classList.add('sidebar-open'); // This will add the transform to body
    syncSidebarActiveItem();
  }
}

function closeSidebar() {
  indexColumn.classList.remove('open');
  sidebarOverlay.classList.remove('active');
  body.classList.remove('sidebar-open'); // This will remove the transform from body
}

// Event listeners
if (sidebarToggleButton) sidebarToggleButton.addEventListener('click', toggleSidebar);
if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

// Close sidebar when an index entry is clicked (for single-page navigation)
if (indexColumn) {
  indexColumn.querySelectorAll('.index-column-entry').forEach(entry => {
    entry.addEventListener('click', closeSidebar);
  });
}

// Handle resize to ensure correct state on orientation change or window resize
function handleSidebarResponsive() {
  if (window.innerWidth > breakpointLg) {
    // On large screens, ensure sidebar is not in mobile-open state
    closeSidebar(); // This removes 'open', 'active', 'sidebar-open' classes

    // Ensure body transform is reset if it was applied by JS
    body.style.transform = '';
    body.style.transition = ''; // Remove transition to avoid conflicts on large screens

    // Ensure index-column styles are reset to default flex behavior (CSS handles this via media query)
    indexColumn.style.left = '';
    indexColumn.style.width = '';
    indexColumn.style.height = '';
    indexColumn.style.paddingTop = '';
    indexColumn.style.boxShadow = '';
    indexColumn.style.zIndex = '';
    indexColumn.style.borderRight = '';
  } else {
    // On small screens, ensure body has transition for smooth sidebar open/close
    body.style.transition = 'transform 0.3s ease-in-out';
  }
}

// Initial call and event listener for resize
window.addEventListener('resize', handleSidebarResponsive);
handleSidebarResponsive(); // Call on load to set initial state

// 2. Identify the scrolling container
// If the right column itself has the scrollbar (overflow-y: auto), use it as the root.
// If the entire webpage scrolls as one unit, change this to: root: null
const scrollContainer = document.querySelector('.content-column');

// If the whole web page scrolls as one big unit (i.e., the scrollbar is on the edge of the screen/browser window,
// not tightly bound inside the right column),
// then .content-column isn't actually scrolling—the window is.
// Because the elements aren't moving inside .content-column, the observer never triggers.
const observerOptions = {
  // root: scrollContainer,
  root: null, // Watch the entire browser window scroll
  // Creates a tight trigger zone near the top of the container
  rootMargin: '-5% 0px -85% 0px',
  threshold: 0
};


// 3. Define what happens when an element enters the trigger zone
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // Only trigger when the element is entering the top zone
    if (entry.isIntersecting) {

      // Remove the active class from all index entries
      indexEntries.forEach(link => link.classList.remove('active'));

      // Get the ID of the currently visible chapter/sub-heading
      const currentId = entry.target.getAttribute('id');

      // Find the matching sidebar link using the href attribute
      const matchingIndexEntry = document.querySelector(`.index-column-entry[href="#${currentId}"]`);

      if (matchingIndexEntry) {
        matchingIndexEntry.classList.add('active');
      }
    }
  });
}, observerOptions);

// 4. Start tracking all chapters and sub-headings
contentTargets.forEach(target => observer.observe(target));