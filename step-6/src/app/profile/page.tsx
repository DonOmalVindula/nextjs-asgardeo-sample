"use client";

import { SignOutButton } from "@/components/sign-out-button";
import { withProtectedRoute } from "@/components/with-protected-route";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserDetails {
    emails: string[];
    name: {
        givenName: string;
        familyName: string;
    };
}

const Profile = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const [userDetails, setUserDetails] = useState<UserDetails>({} as UserDetails);

useEffect(() => {
    fetchProtectedData();
}, []);

const fetchProtectedData = async () => {
    if (!session?.user?.access_token) {
        console.error('Access token not found');
        return;
    }
    
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_AUTH_ASGARDEO_ME_ENDPOINT as string, {
            method: 'GET',
            headers: {
                "Accept": "application/scim+json",
                "Content-Type": "application/scim+json",
                "Authorization": `Bearer ${session?.user?.access_token}`,
            },
        });            

        if (!response.ok) {
            throw new Error('Failed to fetch protected data');
        }

        const data = await response.json();        
        setUserDetails(data);
        
    } catch (error) {
        console.error('Error fetching protected data:', error);
    }
};

    if (!session || !userDetails) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <h1>You need to sign in to view this page</h1>
            </div>
        );
    }

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center">
            <h1 className="mb-5">Profile Page</h1>
            <p>Email : { userDetails?.emails && userDetails?.emails[0] }</p>
            <p>First Name : { userDetails?.name?.givenName }</p>
            <p>Last Name : { userDetails?.name?.familyName }</p>
            <button
                className="rounded-full border border-solid flex items-center justify-center text-sm h-10 px-4 mt-3"
                onClick={() => router.push('/')}
            >
                Go to index page
            </button>
            <div className="mt-5">
                <SignOutButton />
            </div>
        </div>
    );
}

export default withProtectedRoute(Profile);
