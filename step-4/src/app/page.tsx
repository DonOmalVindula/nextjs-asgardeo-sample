import { auth, signIn } from "@/auth"
import { SignOutButton } from "@/components/sign-out-button";

export default async function Home() {
  const session = await auth();

  return (
          <div>
            {
              !session ? (
                <form
                  action={async () => {
                    "use server"
                    await signIn("asgardeo")
                  }}
                >
                  <button
                    className="bg-foreground text-background text-lg px-4"
                    type="submit"
                  >
                    Sign in
                  </button>
                </form>
              ) : (
                <>
                  <p className="text-center mb-3">
                    Welcome, { `${session?.user?.given_name} ${session?.user?.family_name}` }
                  </p>
                  <SignOutButton />
                </>
              )
            }
          </div>
  );
}
