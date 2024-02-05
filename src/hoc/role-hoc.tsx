import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from 'react';

export function withRole(PageComponent: any, roles: string[]) {
  return function WithRoleComponent(props: any) {
    const { user, isLoading } = useUser();

    useEffect(() => {
      if (!isLoading && user) {
        const userRoles: string[] = user['unhroles'] as string[];
        const hasRole = roles.some(role => userRoles.includes(role));

        if (!hasRole && typeof window !== 'undefined') {
          window.location.href = '/unauthorized';
        }
      }
    }, [isLoading, user]);

    // Don't render the page component until the role check is complete
    if (isLoading) {
      return null; // or return a loading component
    }

    return <PageComponent {...props} />;
  }
}