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
  createdAt: Date | null;
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
