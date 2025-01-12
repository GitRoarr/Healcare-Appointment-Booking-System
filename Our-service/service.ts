
interface Service {
    image: string;
    title: string;
    description: string;
  }
  
  async function loadServices() {
    try {
      const response = await fetch('data.json');
      const services: Service[] = await response.json();
      
     
      const servicesRow = document.querySelector('#services .row') as HTMLElement;
  
      
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
    } catch (error) {
      console.error('Error loading the services:', error);
    }
  }
  
  
  window.onload = loadServices;
  