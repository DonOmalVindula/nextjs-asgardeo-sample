import { auth, signIn } from "@/auth"
import { SignOutButton } from "@/components/sign-out-button";

export default async function Home() {
  const session = await auth();

  return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div className="flex gap-4 items-center flex-col">
            {
              !session ? (
                <form
                  action={async () => {
                    "use server"
                    await signIn("asgardeo")
                  }}
                >
                  <button
                    className="rounded-full border border-solid border-transparent flex items-center justify-center bg-foreground text-background text-lg h-10 px-4"
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
        </main>
      </div>
  );
}
