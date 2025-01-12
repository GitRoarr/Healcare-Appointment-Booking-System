"use strict";
class DoctorManager {
    constructor() {
        this.doctors = [];
        this.initializeEventListeners();
        this.loadDoctors();
    }

    initializeEventListeners() {
        const form = document.getElementById('addDoctorForm');
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('doctorImage');

        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        uploadArea?.addEventListener('click', () => {
            fileInput?.click();
        });

        fileInput?.addEventListener('change', (e) => {
            this.handleImageUpload(e);
        });
    }

    handleImageUpload(e) {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();

            // Clear any previous image preview before loading new one
            const uploadArea = document.getElementById('uploadArea');
            uploadArea.innerHTML = '<span>Loading...</span>';

            reader.onload = (e) => {
                const uploadArea = document.getElementById('uploadArea');
                if (uploadArea) {
                    uploadArea.innerHTML = `<img src="${e.target?.result}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
                }
            };

            reader.onerror = () => {
                const uploadArea = document.getElementById('uploadArea');
                if (uploadArea) {
                    uploadArea.innerHTML = '<span>Error loading image</span>';
                }
            };

            reader.readAsDataURL(file);
        }
    }

    handleFormSubmit() {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phoneNumber').value;
        const department = document.getElementById('department').value;
        const uploadArea = document.getElementById('uploadArea');

        const imageUrl = uploadArea?.querySelector('img')?.src || '';

        const newDoctor = {
            firstName,
            lastName,
            password,
            email,
            phone,
            speciality: department,
            imageUrl
        };

        console.log(newDoctor);
        this.doctors.unshift(newDoctor);
        this.saveDoctors();
        this.updateDoctorsList();
        this.resetForm();

        // Send data to the server
        fetch('http://localhost:3000/add-doctor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDoctor)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
    }

    saveDoctors() {
        localStorage.setItem('doctors', JSON.stringify(this.doctors));
    }

    loadDoctors() {
        const savedDoctors = localStorage.getItem('doctors');
        if (savedDoctors) {
            this.doctors = JSON.parse(savedDoctors);
            this.updateDoctorsList();
        }
    }

    updateDoctorsList() {
        const doctorsList = document.getElementById('doctorsList');
        if (doctorsList) {
            doctorsList.innerHTML = this.doctors.map(doctor => `
                <div class="doctor-list-item">
                    <div class="doctor-avatar">
                        ${doctor.imageUrl ? 
                            `<img src="${doctor.imageUrl}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`:'' 
                           
                        }
                    </div>
                    <div>
                        <div>Dr. ${doctor.firstName} ${doctor.lastName}</div>
                        <small class="text-muted">${doctor.speciality}</small>
                    </div>
                </div>
            `).join('');
        }
    }

    resetForm() {
        document.getElementById('addDoctorForm').reset();
        const uploadArea = document.getElementById('uploadArea');
        if (uploadArea) {
            uploadArea.innerHTML = '<span>Upload</span>';
        }
        const fileInput = document.getElementById('doctorImage');
        if (fileInput) {
            fileInput.value = ''; // Clear the file input
        }
    }
}

// Initialize the DoctorManager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DoctorManager();
});
