// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

  let taxSwitch=document.getElementById("flexSwitchCheckDefault");
  taxSwitch.addEventListener("click",()=>{
       let taxInfo=document.getElementsByClassName("taxInfo");
       for(info of taxInfo){
        if(info.style.display!="inline"){
          info.style.display="inline";
        }
        else{
          info.style.display="none";
        }
        
       }
  })

  document.addEventListener("DOMContentLoaded", function () {
    let filters = document.querySelectorAll(".filter");

    filters.forEach(filter => {
        filter.addEventListener("click", function () {
            let category = this.getAttribute("data-category");

            if (!category) {
                console.error("Category not found!");
                return;
            }

            console.log("Fetching listings for category:", category);

            fetch(`/listings/filter?category=${category}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Filtered Listings:", data);
                    updateListings(data);
                })
                .catch(error => console.error("Error fetching filtered listings:", error));
        });
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    let searchForm = document.querySelector(".d-flex"); // Selecting the search form

    if (!searchForm) {
        console.error("Search form not found!");
        return;
    }

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission
        
        let searchInput = document.querySelector(".search-inp");
        if (!searchInput) {
            console.error("Search input field not found!");
            return;
        }

        let query = searchInput.value.trim();

        if (!query) {
            console.error("Search query is empty!");
            return;
        }

        console.log("Searching for:", query);

        fetch(`/listings/search?q=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                console.log("Search Results:", data);
                updateListings(data); // Assuming updateListings function updates UI
            })
            .catch(error => console.error("Error fetching search results:", error));
    });
});



  function updateListings(listings) {
    let listingsContainer = document.querySelector(".row");
    listingsContainer.innerHTML = ""; // Clear existing listings

    if (listings.length === 0) {
        listingsContainer.innerHTML = `<p>No results found.</p>`;
        return;
    }

    listings.forEach(listing => {
        let listingElement = document.createElement("div");
        listingElement.innerHTML = `
            <a href="/listings/${listing._id}" class="listing-link">
                <div class="card col listing-card">
                    <img src="${listing.image.url}" class="card-img-top" alt="listing-img" style="height: 20rem;">
                    <div class="card-body">
                        <p class="card-text">
                            <b>${listing.title}</b><br>
                            &#8377;${(listing.price || 0).toLocaleString("en-IN")} /night
                             <i class="taxInfo">&nbsp;+18% GST</i>
                        </p>
                    </div>
                </div>
            </a>`;
        listingsContainer.appendChild(listingElement);
    });
}