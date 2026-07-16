export type UserRole = "ADMIN" | "STUDENT" | "PROFESSIONAL" | "ENGINEER" |  "OTHER";

// This interface defines the minimum required fields for a User 
// object returned by the NestJS /users/profile endpoint.

export interface User {
    // Unique identifier for the user
    id: string;

    // Credentials / Basic Info
    email: string;
    firstname: string;
    lastname: string;

    // Custom Application Fields
    // NOTE: organization and role are crucial fields from your registration DTO
    organization: string;
    role: 'STUDENT' | 'PROFESSIONAL' | 'ENGINEER' | 'ADMIN' | 'OTHER';

    // Status Fields
    isVerified: boolean;

    // Timestamps
    createdAt: string;
    updatedAt: string;
}