"use strict";

class DashboardManager {
    constructor() {
        this.doctors = [];
        this.name = "";  // Holds the selected doctor's name
        this.card = ["pink", "blue", "green"];
        this.initialize();
    }

    async initialize() {
        await this.fetchDoctors();
        this.initializeDashboard();
    }

    RandomCardColor() {
        return this.card[Math.floor(Math.random() * this.card.length)];
    }

    async fetchDoctors() {
        try {
            const response = await fetch('http://localhost:3000/doctor');
            if (!response.ok) {
                throw new Error(`Error fetching doctors: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            console.log(data);

            if (!Array.isArray(data)) {
                throw new Error("Invalid data format received from server.");
            }

            this.doctors = data;
        } catch (error) {
            console.error("Failed to fetch doctors:", error.message);
            this.doctors = [];
        }
    }

    async submitForm(doctorName) {
        const name = document?.getElementById('fullName');
        const email = document?.getElementById('email');
        const phoneNumber = document?.getElementById('phoneNumber');
        const date = document?.getElementById('date');
        const time = document?.getElementById('time');
        console.log('Submitting form with values:', name.value, email.value, phoneNumber.value, date.value, time.value);

        // Make the POST request to create an appointment
        await fetch('http://localhost:3000/appointment/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                doctorName: doctorName,
                patientName: name.value,
                email: email.value,
                phoneNumber: phoneNumber.value,
                date: date.value,
                time: time.value
            })
        });

        // Optionally, close the form or show a success message
        alert("Appointment booked successfully!");
        this.toggleFormView();
    }

    initializeDashboard() {
        this.renderDoctorCards();
        this.attachEventListeners();
    }

    renderDoctorCards() {
        const gridContainer = document.getElementById('doctorGrid');
        if (!gridContainer) return;

        const cardsHTML = this.doctors.map(doctor => this.createDoctorCard(doctor)).join('');
        gridContainer.innerHTML = cardsHTML;
    }

    createDoctorCard(doctor) {
        return `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="doctor-card ${this.RandomCardColor()}" 
                     data-doctor-id="${Math.random() * 100000}"
                     data-first-name="${doctor.firstName}" 
                     data-last-name="${doctor.lastName}">
                    <img src="${doctor.imageUrl}" alt="${doctor.name}" class="doctor-image">
                    <div class="doctor-info">
                        <div class="doctor-name">${doctor.firstName} ${doctor.lastName}</div>
                        <div class="doctor-specialty">${doctor.speciality}</div>
                        <button class="view-button book">Book Appointment</button>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        document.addEventListener('click', (e) => {
            const target = e.target;

            // Check if the clicked element is a view button
            if (target.classList.contains('view-button')) {
                const card = target.closest('.doctor-card');
                if (card) {
                    const doctorId = card.getAttribute('data-doctor-id');
                    const firstName = card.getAttribute('data-first-name');
                    const lastName = card.getAttribute('data-last-name');

                    this.handleDoctorCardClick(doctorId, firstName, lastName);
                }
            }
        });

        // Close the form when close button is clicked
        document.querySelector(".btn-close")?.addEventListener("click", () => {
            this.toggleFormView();
        });
    }

    handleDoctorCardClick(doctorId, firstName, lastName) {
        if (doctorId) {
            console.log(`Viewing doctor with ID: ${doctorId}`);
            console.log(`Viewing doctor with name:`, firstName, lastName);

            // Store the selected doctor's name
            this.name = firstName + " " + lastName;

            // Show the form
            this.toggleFormView();
        }
    }

    toggleFormView() {
        const formContainer = document.querySelector('.form-container');
        const gridContainer = document.querySelector('#doctorGrid');

        if (formContainer && gridContainer) {
            formContainer.classList.toggle('d-none');
            gridContainer.classList.toggle('d-none');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const dashboardManager = new DashboardManager();

    // Attach event listener to dynamically rendered book buttons
    document.querySelector('.form-container')?.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('book')) {
            dashboardManager.submitForm(dashboardManager.name);
        }
    });
});
