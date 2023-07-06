// window.addEventListener("load", function () {
//     var is_interested_images = document.getElementsByClassName("is-interested-image");
//     Array.from(is_interested_images).forEach(element => {
//         element.addEventListener("click", function (event) {
//             var XHR = new XMLHttpRequest();
//             var property_id = event.target.getAttribute("property_id");

//             // On success
//             XHR.addEventListener("load", toggle_interested_success);

//             // On error
//             XHR.addEventListener("error", on_error);

//             // Set up request
//             XHR.open("GET", "api/toggle_interested.php?property_id=" + property_id);

//             // Initiate the request
//             XHR.send();

//             document.getElementById("loading").style.display = 'block';
//             event.preventDefault();
//         });
//     });
// });

// var toggle_interested_success = function (event) {
//     document.getElementById("loading").style.display = 'none';

//     var response = JSON.parse(event.target.responseText);
//     if (response.success) {
//         var property_id = response.property_id;

//         var is_interested_image = document.querySelectorAll(".property-id-" + property_id + " .is-interested-image")[0];
//         var interested_user_count = document.querySelectorAll(".property-id-" + property_id + " .interested-user-count")[0];

//         if (response.is_interested) {
//             is_interested_image.classList.add("fas");
//             is_interested_image.classList.remove("far");
//             interested_user_count.innerHTML = parseFloat(interested_user_count.innerHTML) + 1;
//         } else {
//             is_interested_image.classList.add("far");
//             is_interested_image.classList.remove("fas");
//             interested_user_count.innerHTML = parseFloat(interested_user_count.innerHTML) - 1;
//         }
//     } else if (!response.success && !response.is_logged_in) {
//         window.$("#login-modal").modal("show");
//     } 
// };
////
window.addEventListener("load", function() {
  var is_interested_images = document.getElementsByClassName("is-interested-image");
  Array.from(is_interested_images).forEach(element => {
    element.addEventListener("click", function(event) {
      // ... Existing code for toggling interested status
      var XHR = new XMLHttpRequest();
      var property_id = event.target.getAttribute("property_id");
      // On success
      XHR.addEventListener("load", toggle_interested_success);
      // On error
      XHR.addEventListener("error", on_error);
      // Set up request
      XHR.open("GET", "api/toggle_interested.php?property_id=" + property_id);
      // Initiate the request
      XHR.send();
      document.getElementById("loading").style.display = 'block';
      event.preventDefault();
    });
  });
  // Sort properties in descending order by default
  sortProperties("desc");
});
var toggle_interested_success = function(event) {
  document.getElementById("loading").style.display = 'none';
  var response = JSON.parse(event.target.responseText);
  if (response.success) {
    var property_id = response.property_id;
    var is_interested_image = document.querySelectorAll(".property-id-" + property_id + " .is-interested-image")[0];
    var interested_user_count = document.querySelectorAll(".property-id-" + property_id + " .interested-user-count")[0];
    if (response.is_interested) {
      is_interested_image.classList.add("fas");
      is_interested_image.classList.remove("far");
      interested_user_count.innerHTML = parseFloat(interested_user_count.innerHTML) + 1;
    } else {
      is_interested_image.classList.add("far");
      is_interested_image.classList.remove("fas");
      interested_user_count.innerHTML = parseFloat(interested_user_count.innerHTML) - 1;
    }
  } else if (!response.success && !response.is_logged_in) {
    window.$("#login-modal").modal("show");
  }
};
var sortProperties = function(order) {
  var propertyCards = Array.from(document.getElementsByClassName("property-card"));
  propertyCards.sort(function(a, b) {
    var rentA = parseFloat(a.querySelector(".rent").textContent.replace(/[^0-9.-]+/g, ""));
    var rentB = parseFloat(b.querySelector(".rent").textContent.replace(/[^0-9.-]+/g, ""));
    return order === "desc" ? rentB - rentA : rentA - rentB;
  });
  var pageContainer = document.querySelector(".page-container");
  propertyCards.forEach(function(card) {
    pageContainer.appendChild(card);
  });
};

document.getElementById("sort-desc").addEventListener("click", function() {
  sortProperties("desc");
});

document.getElementById("sort-asc").addEventListener("click", function() {
  sortProperties("asc");
});
