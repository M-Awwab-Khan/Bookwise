interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
  createdAt: string | null;
}

export enum ROLE {
  "USER" = "USER",
  "ADMIN" = "ADMIN",
}

export interface TableBook extends Book {
  info: {
    title: string;
    coverColor: string;
    coverUrl: string;
  };
}

interface AuthCredentials {
  fullname: string;
  email: string;
  password: string;
  university_id: number;
  university_card: string;
}
interface BookParams {
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  description: string;
  totalCopies: number;
  videoUrl: string;
  summary: string;
}
interface BorrowBookParams {
  bookId: string;
  userId: string;
}

interface User {
  fullName: string;
  email: string;
  universityId: number;
  universityCard: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | null;
  role: "USER" | "ADMIN" | null;
}

// NextAuth.js type extensions
import "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
  }

  interface Session {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}

export interface BookRequests {
  id: string;
  bookInfo: {
    id: string;
    coverUrl: string;
    coverColor: string;
    title: string;
    genre?: string;
    author?: string;
  };
  userInfo: {
    name: string;
    email: string;
  };
  status: "BORROWED" | "RETURNED" | "LATE RETURN";
  borrowedDate: string;
  returnDate: string | null;
  dueDate: string;
}

export interface TableUser {
  id: string;
  info: {
    name: string;
    email: string;
  };
  universityId: number;
  universityCard: string;
  role: "USER" | "ADMIN";
  universityCard: string;
  dateJoined: string;
  booksBorrowed: number;
}
export interface AccountRequests {
  id: string;
  info: {
    name: string;
    email: string;
  };
  universityId: number;
  universityCard: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  universityCard: string;
  dateJoined: string;
}
