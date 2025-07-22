import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { UserProfileDisplay } from "./components/UserProfileDisplay";

export default async function PrivatePage() {
  console.log("DashboardPage: render");
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto p-8">
        <div className="hero bg-base-200 rounded-box mb-8">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-4xl font-bold text-base-content">Welcome!</h1>
              <UserProfileDisplay />
              <p className="py-6 text-base-content/70">
                Hello{" "}
                <span className="font-semibold text-primary">
                  {data.user.email}
                </span>
                !
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
