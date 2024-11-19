import { auth, signIn, signOut } from "@/auth"

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
              className="bg-foreground text-background text-lg p-4"
              type="submit"
            >
              Sign in
            </button>
          </form>
        ) : (
          <>
            <p className="text-center mb-3">
              You are now signed in!
            </p>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <form
              action={async () => {
                "use server"
                await signOut()
              }}
            >
              <button
                type="submit"
              >
                Sign Out
              </button>
            </form>
          </>
        )
      }
    </div>
  );
}
