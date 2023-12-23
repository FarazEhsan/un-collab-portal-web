import { UserProfile } from '@auth0/nextjs-auth0/client';
import { Session, getSession, withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';
import { NextResponse } from 'next/server';

// Define a type for the roles
type Role = 'admin' | 'user';

// Define a mapping of roles to paths
const rolePaths: Record<Role, string[]> = {
  admin: ['/register', '/admin', '/profile', '/admin/user/add', '/'],
  user: ['/dashboard', '/profile'],
  // Add more roles and paths as needed
};

// Define a type for the user object that includes the roles property
type UserWithRoles = UserProfile & {
  'https://unhabitat-cop.com/roles': Role[];
};

export default withMiddlewareAuthRequired(async function middleware(req) {
  const res = NextResponse.next();
  const session = await getSession(req, res) as Session;
  const user = session.user as UserWithRoles;
  const roles = user['https://unhabitat-cop.com/roles'];
  const requestedPath = req.nextUrl.pathname;

  // Check if the user's roles allow them to access the requested path
  const canAccess = await roles.some(role => rolePaths[role]?.includes(requestedPath));
  console.log('requested path', requestedPath)
  console.log('user profile', user)
  console.log('roles', roles)
  console.log('can access from middleware', canAccess)

  if (canAccess) {
    return res;
} else {
    return NextResponse.redirect(new URL("/api/auth/login", req.url));
  }
});