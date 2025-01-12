"use strict";

export interface Appointment {
    id: number;
    name: string;
    specialty: string;
    hospital: string;
    rating: number;
    time: string;
    image: string;
}

export const appointments: Appointment[] = [
    {
        id: 11,
        name: "Dr. Marvin McKinney",
        specialty: "Gynecologist",
        hospital: "Upcoming",
        rating: 4.9,
        time: "2pm-5pm",
        image: "/placeholder.svg?height=50&width=50"
    },
    {
        id: 12,
        name: "Dr. Dianne Russell",
        specialty: "Urology",
        hospital: "Christ Hospital",
        rating: 4.8,
        time: "2pm-5pm",
        image: "/placeholder.svg?height=50&width=50"
    },
    {
        id: 13,
        name: "Dr. Savannah Nguyen",
        specialty: "Psychiatrist",
        hospital: "Ceforme Hospital",
        rating: 4.2,
        time: "2pm-5pm",
        image: "/placeholder.svg?height=50&width=50"
    }
];

