class DoctorDashboardManager {
    constructor() {
        this.appointments = [];
        this.patients = new Map();
        this.token = sessionStorage.getItem('token');
        this.role = sessionStorage.getItem('role');
        this.email = sessionStorage.getItem('email');
        this.doctorName = sessionStorage.getItem('name') || 'Doctor';

        this.initializeUI();
        if (this.token && this.role === 'doctor') {
            this.initializeDashboard();
        } else {
            // this.showAccessDenied();
        }
    }

    initializeUI() {
        console.log(this.role);
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');
        const logoutBtn = document.createElement('a');
        logoutBtn.href = '#';
        logoutBtn.className = 'btn btn-outline-primary';
        logoutBtn.textContent = 'Logout';
        logoutBtn.addEventListener('click', this.handleLogout.bind(this));

        if (this.token) {
            loginBtn.replaceWith(logoutBtn);
            signupBtn.style.display = 'none';
        }
        document.getElementById('doctorName').textContent = this.doctorName;
    }

    initializeDashboard() {
        this.initializeCalendar();
        this.loadDoctorAppointments();
        this.initializeEventListeners();
        this.updateProfileImage();
    }

    // showAccessDenied() {
    //     const mainContent = document.querySelector('.main-content');
    //     if (mainContent) {
    //         mainContent.innerHTML = `
    //             <div class="alert alert-danger" role="alert">
    //                 <h4 class="alert-heading">Access Denied</h4>
    //                 <p>You do not have permission to view this page. Please log in as a doctor to access the dashboard.</p>
    //             </div>
    //         `;
    //     }
    // }

    updateProfileImage() {
        if (this.email) {
            this.getProfileData(this.email)
                .then(profileDetail => {
                    const profileImage = document.getElementById('profileImage');
                    if (profileImage && profileDetail && profileDetail.imageUrl) {
                        profileImage.src = profileDetail.imageUrl;
                    }
                })
                .catch(error => {
                    console.error('Error updating profile image:', error);
                });
        }
    }

    initializeCalendar() {
        const calendarEl = document.getElementById('calendar');
        if (!calendarEl) return;

        this.calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'timeGridWeek',
            headerToolbar: false,
            slotMinTime: '08:00:00',
            slotMaxTime: '18:00:00',
            height: '100%',
            events: this.appointments,
            eventClick: (info) => {
                this.handleAppointmentClick(info);
            }
        });
        this.calendar.render();
    }

    async loadDoctorAppointments() {
        try {
            const extract = await fetch(`http://localhost:3000/doctor/email?email=${this.email}`);
            const res = await extract.json();
            const name = res.firstName + " " + res.lastName;  // Concatenate first and last name with a space
            
            // URL encode the name to ensure it's safe for use in a query string
            const encodedName = encodeURIComponent(name);
            console.log(encodedName);  // This will log the encoded name
            
            // Make the request with the correctly formatted and encoded name
            const response = await fetch(`http://localhost:3000/appointment/getDoctorSchedule?name=${encodedName}`);
            
            
            
            
           
    
            const appointments = await response.json();
        
            console.log('Fetched appointments:', appointments);
    
            this.appointments = appointments
                .filter(apt => new Date(apt.date).getTime() >= Date.now()) // Only future appointments
                .map(apt => {
                    const start = new Date(`${apt.date.split('T')[0]}T${apt.time}`);
                    const end = new Date(start.getTime() + 30 * 60000); // Assuming 30-minute appointments
    
                    return {
                        id: apt._id,
                        title: apt.patientName,
                        start,
                        end,
                        extendedProps: {
                            doctorName: apt.doctorName,
                            phoneNumber: apt.phoneNumber,
                            email: apt.email,
                        },
                    };
                });
    
            console.log('Mapped appointments for the calendar:', this.appointments);
    
            this.calendar.removeAllEvents();
            this.calendar.addEventSource(this.appointments);
            this.calendar.render(); // Ensure the calendar updates
        } catch (error) {
            console.error('Error loading doctor appointments:', error);
        }
    }
    

    initializeEventListeners() {
        document.getElementById('dayView')?.addEventListener('click', () => this.changeCalendarView('timeGridDay'));
        document.getElementById('weekView')?.addEventListener('click', () => this.changeCalendarView('timeGridWeek'));
        document.getElementById('monthView')?.addEventListener('click', () => this.changeCalendarView('timeGridMonth'));
    }

    changeCalendarView(view) {
        this.calendar?.changeView(view);
        const buttons = document.querySelectorAll('.btn-group .btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        const viewMap = {
            'timeGridDay': 'dayView',
            'timeGridWeek': 'weekView',
            'timeGridMonth': 'monthView'
        };
        document.getElementById(viewMap[view])?.classList.add('active');
    }

    handleAppointmentClick(info) {
        const appointment = info.event;
        const patientDetailsEl = document.getElementById('patientDetails');
        if (!patientDetailsEl) return;

        patientDetailsEl.innerHTML = `
            <div class="patient-info">
                <h6 class="mb-3">${appointment.title}</h6>
                <p><strong>Date:</strong> ${appointment.start.toLocaleDateString()}</p>
                <p><strong>Time:</strong> ${appointment.start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                <p><strong>Phone:</strong> ${appointment.extendedProps.phoneNumber}</p>
                <p><strong>Email:</strong> ${appointment.extendedProps.email}</p>
            </div>
        `;
    }

    handleLogout() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('email');
        window.location.replace('/Home');
    }

    getProfileData(email) {
        return fetch(`http://localhost:3000/profile?email=${email}`)
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching profile data:', error);
                throw error;
            });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DoctorDashboardManager();
});

