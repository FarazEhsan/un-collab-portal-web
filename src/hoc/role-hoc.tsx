import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";

export function withRole(PageComponent: any, roles: string[]) {
  const WithRoleComponent = (props: any) => {
    const { user, isLoading } = useUser();

    if (isLoading) {
      return null; // or return a loading component
    }

    //@ts-ignore
    const userRoles: string[] = user['unhroles'] as string[];
    const hasRole = roles.some(role => userRoles.includes(role));

    if (!hasRole) {
      if (typeof window !== 'undefined') {
        window.location.href = '/unauthorized';
      }
      return null;
    }

    return <PageComponent {...props} />;
  }

  WithRoleComponent.getInitialProps = async (context:any) => {
    const pageProps = (PageComponent.getInitialProps) ? await PageComponent.getInitialProps(context) : {};
    return { ...pageProps };
  };

  return withPageAuthRequired(WithRoleComponent);
}