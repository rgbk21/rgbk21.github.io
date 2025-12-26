'use strict';

// --- New Sidebar/Index Toggle Logic ---
const sidebarToggleButton = document.getElementById('sidebarToggle');
const indexColumn = document.querySelector('.index-column');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const body = document.body;

const sidebarWidth = 250; // Must match the width defined in CSS for .index-column
const breakpointLg = 991.98; // Bootstrap's 'lg' breakpoint

function toggleSidebar() {
  const isOpen = indexColumn.classList.contains('open');
  if (isOpen) {
    closeSidebar();
  } else {
    indexColumn.classList.add('open');
    sidebarOverlay.classList.add('active');
    body.classList.add('sidebar-open'); // This will add the transform to body
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