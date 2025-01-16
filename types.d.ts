interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: nubmer;
  total_copies: number;
  available_copies: number;
  description: string;
  color: string;
  cover: string;
  video: string;
  summary: string;
  isLoanedBook?: boolean;
}

interface AuthCredentials {
  fullname: string;
  email: string;
  password: string;
  university_id: number;
  university_card: string;
}
