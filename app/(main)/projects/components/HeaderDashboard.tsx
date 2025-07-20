import { Header } from "../../dashboard/components/HeaderDashboard";

export function HeaderDashboard({ title }: { title: string }) {
  return (
    <div>
      <Header />
      <div className="px-8 py-4 border-b border-base-200 bg-base-100">
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
    </div>
  );
}
