interface Appointment {
    id: number;
    name: string;
    email: string;
    age: number;
    gender: string;
    department: string;
    date: string;
    time: string;
    doctor: string;
}

class AppointmentManager {
    private appointments: Appointment[] = [];

    constructor() {
        this.loadSampleData();
        this.initializeEventListeners();
    }

    private initializeEventListeners(): void {
        const todayBtn = document.getElementById('todayBtn');
        const newAppointmentBtn = document.getElementById('newAppointmentBtn');

        todayBtn?.addEventListener('click', () => this.filterTodayAppointments());
        newAppointmentBtn?.addEventListener('click', () => this.openNewAppointmentModal());
    }

    private loadSampleData(): void {
        // Sample data for demonstration
        this.appointments = [
            {
                id: 1,
                name: "Howard Tanner",
                email: "howard@example.com",
                age: 25,
                gender: "Male",
                department: "Cardiology",
                date: "2025-01-20",
                time: "11:00 AM",
                doctor: "Dr. Calvin Carlo",
               
            },
            {
                id: 2,
                name: "Anna Karenina",
                email: "anna@example.com",
                age: 32,
                gender: "Female",
                department: "Neurology",
                date: "2025-01-21",
                time: "2:00 PM",
                doctor: "Dr. Elizabeth Blackwell",
               
            }
        ];

        this.renderAppointments();
    }

    private renderAppointments(): void {
        const tableBody = document.getElementById('appointmentsTable');
        if (tableBody) {
            tableBody.innerHTML = this.appointments.map(appointment => `
                <tr>
                    <td>${appointment.id}</td>
                    <td>${appointment.name}</td>
                    <td>${appointment.email}</td>
                    <td>${appointment.age}</td>
                    <td>${appointment.gender}</td>
                    <td>${appointment.department}</td>
                    <td>${appointment.date}</td>
                    <td>${appointment.time}</td>
                    <td>${appointment.doctor}</td>
                  
                    <td class="status">
                       
                        <button class="btn btn-sm btn-link text-success" title="Approve">
                            <i class="bi bi-check"></i>
                        </button>
                        <button class="btn btn-sm btn-link text-danger" title="Cancel">
                            <i class="bi bi-x"></i>
                        </button>
                    </td>
                </tr>
            `).join('');
        }
    }

    private filterTodayAppointments(): void {
        const today = new Date().toISOString().split('T')[0];
        const filteredAppointments = this.appointments.filter(
            appointment => appointment.date === today
        );
        this.appointments = filteredAppointments;
        this.renderAppointments();
    }

    private openNewAppointmentModal(): void {
        // Implementation for new appointment modal
        alert('New Appointment functionality to be implemented');
    }
}

// Initialize the AppointmentManager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AppointmentManager();
});