import Image from "next/image";
import { fetchAdminStatistics } from "@/lib/admin/actions/statistics";

const TotalReport = async () => {
  const totalReport = await fetchAdminStatistics();

  return (
    <div className="flex gap-4 flex-wrap mb-6">
      {totalReport.map(({ title, total, status, value }, index) => (
        <section
          className="space-y-2.5 p-5 bg-white rounded-xl min-w-fit flex-1 transition-all duration-200 hover:shadow-sm"
          key={index}
        >
          <h6 className="font-medium text-base text-gray-400 tracking-tight flex gap-2.5 items-center">
            <span>{title}</span>
            <span className="flex gap-0.5 items-center">
              <Image
                src={
                  status === "up"
                    ? "/icons/admin/caret-up.svg"
                    : "/icons/admin/caret-down.svg"
                }
                alt="decrease"
                width={18}
                height={18}
              />
              <span
                className={`${
                  status === "up" ? "text-green-500" : "text-red-500"
                }`}
              >
                {value}
              </span>
            </span>
          </h6>
          <h3 className="font-semibold text-3xl text-dark-400 tracking-tighter">
            {total}
          </h3>
        </section>
      ))}
    </div>
  );
};

export default TotalReport;
