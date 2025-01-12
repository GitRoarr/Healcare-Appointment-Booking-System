interface Doctor {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    department: string;
    gender: string;
    bio: string;
    imageUrl: string;
}

class DoctorManager {
    private doctors: Doctor[] = [];

    constructor() {
        this.initializeEventListeners();
        this.loadDoctors();
    }

    private initializeEventListeners(): void {
        const form = document.getElementById('addDoctorForm') as HTMLFormElement;
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('doctorImage') as HTMLInputElement;

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

    private handleImageUpload(e: Event): void {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const uploadArea = document.getElementById('uploadArea');
                if (uploadArea) {
                    uploadArea.innerHTML = `<img src="${e.target?.result}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
                }
            };
            reader.readAsDataURL(file);
        }
    }

    private handleFormSubmit(): void {
        const firstName = (document.getElementById('firstName') as HTMLInputElement).value;
        const lastName = (document.getElementById('lastName') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const department = (document.getElementById('department') as HTMLSelectElement).value;
        const gender = (document.getElementById('gender') as HTMLSelectElement).value;
        const bio = (document.getElementById('bio') as HTMLTextAreaElement).value;
        const uploadArea = document.getElementById('uploadArea');
        const imageUrl = uploadArea?.querySelector('img')?.src || '';

        const newDoctor: Doctor = {
            id: Date.now().toString(),
            firstName,
            lastName,
            email,
            phone,
            department,
            gender,
            bio,
            imageUrl
        };

        this.doctors.unshift(newDoctor);
        this.saveDoctors();
        this.updateDoctorsList();
        this.resetForm();
    }

    private saveDoctors(): void {
        localStorage.setItem('doctors', JSON.stringify(this.doctors));
    }

    private loadDoctors(): void {
        const savedDoctors = localStorage.getItem('doctors');
        if (savedDoctors) {
            this.doctors = JSON.parse(savedDoctors);
            this.updateDoctorsList();
        }
    }

    private updateDoctorsList(): void {
        const doctorsList = document.getElementById('doctorsList');
        if (doctorsList) {
            doctorsList.innerHTML = this.doctors.map(doctor => `
                <div class="doctor-list-item">
                    <div class="doctor-avatar">
                        ${doctor.imageUrl ? 
                            `<img src="${doctor.imageUrl}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">` :
                            ''
                        }
                    </div>
                    <div>
                        <div>Dr. ${doctor.firstName} ${doctor.lastName}</div>
                        <small class="text-muted">${doctor.department}</small>
                    </div>
                </div>
            `).join('');
        }
    }

    private resetForm(): void {
        (document.getElementById('addDoctorForm') as HTMLFormElement).reset();
        const uploadArea = document.getElementById('uploadArea');
        if (uploadArea) {
            uploadArea.innerHTML = '<span>Upload</span>';
        }
    }
}


// Initialize the DoctorManager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DoctorManager();
});