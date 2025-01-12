interface NavItem {
    icon: string;
    text: string;
    link: string;
}

interface Appointments {
    id: number;
    name: string;
    specialty: string;
    hospital: string;
    rating: number;
    time: string;
    image: string;
}

// Navigation items data
// const navItems: NavItem[] = [
//     { icon: "📅", text: "Schedule", link: "#" },
//     { icon: "👥", text: "Doctors", link: "#" },
//     { icon: "📊", text: "Statistics", link: "#" },
//     { icon: "⚙️", text: "Settings", link: "#" },
   
// ];

// Appointments data
const appointments: Appointments[] = [
    {
        id: 11,
        name: "Dr. Marvin McKinney",
        specialty: "Gynecologist",
        hospital: "Upcoming",
        rating: 4.9,
        time: "2pm-5pm",
        image: "/Photo/placeholder.jpg"
    },
    {
        id: 12,
        name: "Dr. Dianne Russell",
        specialty: "Urology",
        hospital: "Christ Hospital",
        rating: 4.8,
        time: "2pm-5pm",
        image: "/Photo/placeholder.jpg"
    },
    {
        id: 3,
        name: "Dr. Savannah Nguyen",
        specialty: "Psychiatrist",
        hospital: "Ceforme Hospital",
        rating: 4.2,
        time: "2pm-5pm",
        image: "/Photo/placeholder.jpg"
    }
];

// Generate sidebar navigation

// Generate appointments list
function generateAppointments(): void {
    const appointmentsList = document.getElementById('appointments-list');
    if (!appointmentsList) return;

    const appointmentsHTML = appointments.map(doctor => `
        <div class="doctor-card">
            <div class="row align-items-center">
                <div class="col-auto">
                    <img src="${doctor.image}" alt="${doctor.name}" class="rounded-circle" width="50" height="50">
                </div>
                <div class="col">
                    <h5 class="mb-1">${doctor.name}</h5>
                    <div class="d-flex align-items-center mb-2">
                        <span class="me-2">${doctor.specialty}</span>
                        <span class="text-muted">•</span>
                        <span class="ms-2">${doctor.hospital}</span>
                    </div>
                    <div class="d-flex align-items-center">
                        <span class="rating me-2">⭐ ${doctor.rating}</span>
                        <span class="time">• ${doctor.time}</span>
                    </div>
                </div>
                <div class="col-12 mt-3">
                    
                </div>
            </div>
        </div>
    `).join('');

    appointmentsList.innerHTML = appointmentsHTML;
}
async function conditionalRendering(token:string|null, role:string|null){
    //the token might not exist

    const loginButton = document.querySelector('.btn-outline-primary')
    const signupButton = document.querySelector('.btn-primary');
    if(signupButton) {
        signupButton.classList.add('remove')
    }
    
    if(loginButton && token) {
        loginButton.textContent = 'Logout';
       
        loginButton.addEventListener('click', () => {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('role');
            window.location.replace('http://localhost:3000/Home')
        })
    }
    const email = sessionStorage.getItem('email')
    const profileDetail = await getProfileData(email);
    const profileImage = document.getElementById('profileImage') as HTMLImageElement;
    if(profileImage && profileDetail) {
        console.log(profileDetail.imageUrl)
        profileImage.src = profileDetail.imageUrl;
    }
    
    
     
    

    
    
}
async function getProfileData(email:any) {
    try {
      const response = await fetch(`http://localhost:3000/profile?email=${email}`);
      const data = await response.json();
      return data; // Returning the fetched data
    } catch (error) {
      console.error('Error:', error); // Handle error
      throw error; // Optionally re-throw the error
    }
  }

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    generateAppointments();
    const token  = sessionStorage.getItem('token')
    const role = sessionStorage.getItem('role')
    conditionalRendering(token, role)
});