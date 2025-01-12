
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import '@fullcalendar/core/main.css';
import '@fullcalendar/timegrid/main.css';


interface Appointment {
    id: string;
    title: string;
    start: Date;
    end: Date;
    patientId: string;
}

interface Patient {
    id: string;
    name: string;
    age: number;
    gender: string;
    contact: string;
    medicalHistory: string[];
}

interface TimeSlot {
    start: string;
    end: string;
    isAvailable: boolean;
}

class DoctorDashboardManager {
    private calendar: any; // FullCalendar instance
    private appointments: Appointment[] = [];
    private patients: Map<string, Patient> = new Map();

    constructor() {
        this.initializeCalendar();
        this.loadSampleData();
        this.initializeEventListeners();
    }

    private initializeCalendar(): void {
        const calendarEl = document.getElementById('calendar');
        if (!calendarEl) return;

        this.calendar = new Calendar(calendarEl, {
            initialView: 'timeGridWeek',
            headerToolbar: false,
            slotMinTime: '08:00:00',
            slotMaxTime: '18:00:00',
            height: '100%',
            events: this.appointments,
            eventClick: (info: any) => {
                this.handleAppointmentClick(info.event.extendedProps.patientId);
            }
        });

        this.calendar.render();
    }

    private loadSampleData(): void {
        // Sample patients data
        this.patients.set('P1', {
            id: 'P1',
            name: 'John Doe',
            age: 35,
            gender: 'Male',
            contact: '+1234567890',
            medicalHistory: ['Hypertension', 'Diabetes']
        });

        // Sample appointments
        this.appointments = [
            {
                id: 'A1',
                title: 'John Doe - Checkup',
                start: new Date('2024-01-20T09:00:00'),
                end: new Date('2024-01-20T10:00:00'),
                patientId: 'P1'
            }
        ];

        this.calendar?.addEventSource(this.appointments);
    }

    private initializeEventListeners(): void {
        // View toggles
        document.getElementById('dayView')?.addEventListener('click', () => this.changeCalendarView('timeGridDay'));
        document.getElementById('weekView')?.addEventListener('click', () => this.changeCalendarView('timeGridWeek'));
        document.getElementById('monthView')?.addEventListener('click', () => this.changeCalendarView('timeGridMonth'));

        // New appointment button
        document.getElementById('newAppointmentBtn')?.addEventListener('click', () => this.handleNewAppointment());

        // Working hours inputs
        document.querySelectorAll('input[type="time"]').forEach(input => {
            input.addEventListener('change', (e) => this.handleWorkingHoursChange(e));
        });
    }

    private changeCalendarView(view: string): void {
        this.calendar?.changeView(view);
        
        // Update active button state
        const buttons = document.querySelectorAll('.btn-group .btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        
        const viewMap: { [key: string]: string } = {
            'timeGridDay': 'dayView',
            'timeGridWeek': 'weekView',
            'timeGridMonth': 'monthView'
        };
        
        document.getElementById(viewMap[view])?.classList.add('active');
    }

    private handleAppointmentClick(patientId: string): void {
        const patient = this.patients.get(patientId);
        if (!patient) return;

        const patientDetailsEl = document.getElementById('patientDetails');
        if (!patientDetailsEl) return;

        patientDetailsEl.innerHTML = `
            <div class="patient-info">
                <h6 class="mb-3">${patient.name}</h6>
                <p><strong>Age:</strong> ${patient.age}</p>
                <p><strong>Gender:</strong> ${patient.gender}</p>
                <p><strong>Contact:</strong> ${patient.contact}</p>
                <div class="mt-3">
                    <h6>Medical History</h6>
                    <ul>
                        ${patient.medicalHistory.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    private handleNewAppointment(): void {
        // Implement new appointment logic
        alert('New appointment functionality to be implemented');
    }

    private handleWorkingHoursChange(e: Event): void {
        const input = e.target as HTMLInputElement;
        console.log('Working hours updated:', input.value);
        // Implement working hours update logic
    }
}

// Initialize the DashboardManager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DoctorDashboardManager();
});