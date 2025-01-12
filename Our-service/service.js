"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Function to fetch the services data and dynamically populate the section
function loadServices() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Fetch the JSON file (data.json)
            const response = yield fetch('service.json');
            const services = yield response.json();
            
            const servicesRow = document.querySelector('#services .row');
            
            if (servicesRow) {
                
                servicesRow.innerHTML = '';
                
                services.forEach(service => {
                    const serviceCard = document.createElement('div');
                    serviceCard.classList.add('col-lg-4', 'col-md-6');
                    
                    const card = document.createElement('div');
                    card.classList.add('card');
                    
                    const img = document.createElement('img');
                    img.src = service.image;
                    img.alt = service.title;
                    img.classList.add('card-img-top');
                    
                    const cardBody = document.createElement('div');
                    cardBody.classList.add('card-body');
                    
                    const title = document.createElement('h5');
                    title.classList.add('card-title');
                    title.textContent = service.title;
                    
                    const description = document.createElement('p');
                    description.classList.add('card-text');
                    description.textContent = service.description;
                    
                    cardBody.appendChild(title);
                    cardBody.appendChild(description);
                    
                    card.appendChild(img);
                    card.appendChild(cardBody);
                 
                    serviceCard.appendChild(card);
                    
                    servicesRow.appendChild(serviceCard);
                });
            }
        }
        catch (error) {
            console.error('Error loading the services:', error);
        }
    });
}

window.onload = loadServices;
