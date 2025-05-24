import TotalReport from "@/components/admin/TotalReport";
import { Book, BookRequests } from "@/types";
import AccountRequests from "@/components/admin/AccountRequests";
import BookList from "@/components/admin/BookList";
import { Container } from "@/components/admin/Container";
import { fetchDashboardData } from "@/lib/admin/actions/dashboard";

interface AccountRequest {
  fullName: string;
  email: string;
}

const Admin = async () => {
  const { recentBooks, bookRequests, accountRequests } =
    await fetchDashboardData();

  return (
    <div>
      <TotalReport />
      <div className="flex flex-wrap flex-col lg:flex-row gap-4">
        <div className="space-y-5 flex-1">
          <Container title="Book Requests" href="borrow-requests">
            <BookList type="bookRequests" books={bookRequests} />
          </Container>
          <Container title="Account Requests" href="account-requests">
            <AccountRequests accountRequests={accountRequests} />
          </Container>
        </div>
        <div className="flex-1">
          <Container title="Recently Added Books" href="books">
            <BookList type="latestBooks" books={recentBooks} />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Admin;
