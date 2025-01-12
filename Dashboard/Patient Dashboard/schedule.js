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
// Navigation items data
// const navItems: NavItem[] = [
//     { icon: "📅", text: "Schedule", link: "#" },
//     { icon: "👥", text: "Doctors", link: "#" },
//     { icon: "📊", text: "Statistics", link: "#" },
//     { icon: "⚙️", text: "Settings", link: "#" },
// ];
// Appointments data
const appointments = [
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
"use strict";

// Generate appointments list
async function generateAppointments() {
    const email = sessionStorage.getItem('email');
    
    try {
        const response = await fetch(`http://localhost:3000/appointment/getMyAppointments?name=${email}`);
        const responseData = await response.json();
        console.log(responseData)
        const appointmentsList = document.getElementById('appointments-list');
        const noAppointments = document.getElementById('no-appointments');
        
        // If there are no appointments
        if (responseData.length === 0) {
            
            appointmentsList.classList.add('d-none');
            noAppointments.classList.remove('d-none');
        } else {
            appointmentsList.classList.remove('d-none');
            noAppointments.classList.add('d-none');
          
            const appointmentsHTML = await Promise.all(responseData.map(async (appointment) => {
                let firstName = (appointment.doctorName.split(" ")[0])
                console.log(`http://localhost:3000/doctor/info?name=${firstName}`)
               
                const doctor = await fetch(`http://localhost:3000/doctor/info?name=${firstName}`);
                const doctorData = await doctor.json();
                console.log(doctorData)

                return `
                    <div class="doctor-card">
                        <div class="row align-items-center">
                            <div class="col-auto">
                                <img src="${doctorData.imageUrl || '/Photo/placeholder.jpg'}" alt="${doctorData.firstName}" class="rounded-circle" width="50" height="50">
                            </div>
                            <div class="col">
                                <h5 class="mb-1">${doctorData.firstName} ${doctorData.lastName}</h5>
                                <div class="d-flex align-items-center mb-2">
                                    <span class="me-2">${doctorData.speciality || 'Specialty not specified'}</span>
                                   
                                </div>
                                <div class="d-flex align-items-center">
                                    <span class="time" > ${appointment.time || 'Time not specified'}</span>
                                    <span class="date" > ${appointment.date || 'Date not specified'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }));

            appointmentsList.innerHTML = appointmentsHTML.join('');
        }
    } catch (error) {
        console.error('Error fetching appointments:', error);
        // Handle error (e.g., show an error message to the user)
    }
}


// ... (rest of your existing JavaScript code)

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    generateAppointments();
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');
    conditionalRendering(token, role);
});
function conditionalRendering(token, role) {
    return __awaiter(this, void 0, void 0, function* () {
        //the token might not exist
        const loginButton = document.querySelector('.btn-outline-primary');
        const signupButton = document.querySelector('.btn-primary');
        if (signupButton) {
            signupButton.classList.add('remove');
        }
        if (loginButton && token) {
            loginButton.textContent = 'Logout';
            loginButton.addEventListener('click', () => {
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('role');
                window.location.replace('http://localhost:3000/Home');
            });
        }
        const email = sessionStorage.getItem('email');
        const profileDetail = yield getProfileData(email);
        const profileImage = document.getElementById('profileImage');
        if (profileImage && profileDetail) {
            console.log(profileDetail.imageUrl);
            profileImage.src = profileDetail.imageUrl;
        }
    });
}
function getProfileData(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`http://localhost:3000/profile?email=${email}`);
            const data = yield response.json();
            return data; // Returning the fetched data
        }
        catch (error) {
            console.error('Error:', error); // Handle error
            throw error; // Optionally re-throw the error
        }
    });
}
// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    generateAppointments();
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');
    conditionalRendering(token, role);
});
