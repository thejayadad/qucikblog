import { signOut } from "@/auth";
import { FiLogOut } from "react-icons/fi";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        type="submit"
        className="flex items-center px-4 py-2 text-red-600 hover:bg-gray-100 w-full"
      >
        <FiLogOut className="w-5 h-5 mr-2" />
        Logout
      </button>
    </form>
  );
}
