"use client"

import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
    const { user, error, isLoading } = useUser();
    return (
        <>
        <h1>Home  <a href="/api/auth/logout">Logout {user?.email}</a></h1>
        </>
    )
}
