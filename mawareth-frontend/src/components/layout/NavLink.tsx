import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom"; // Import RouterNavLink
import { forwardRef } from "react"; // Import forwardRef
import { cn } from "@/lib/utils"; // Import class utility

// Define Props for custom NavLink
interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string; // Base class
  activeClassName?: string; // Class when active
  pendingClassName?: string; // Class when pending
}

// Custom NavLink component wrapping React Router's NavLink
const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) => // Dynamically determine class based on state
          cn(className, isActive && activeClassName, isPending && pendingClassName)
        }
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink"; // Set display name for debugging

export { NavLink }; // Export component
