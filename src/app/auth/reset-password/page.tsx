import Flourish from "@/components/Flourish";
import ResetPasswordForm from "./ResetPasswordForm";

export const metadata = { title: "Reset Password — LumierModest" };

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <h1 className="text-center font-serif italic tracking-tight text-5xl text-taupe-dark">
        Set a new password
      </h1>
      <Flourish className="mt-4" />
      <ResetPasswordForm token={token ?? ""} />
    </div>
  );
}
