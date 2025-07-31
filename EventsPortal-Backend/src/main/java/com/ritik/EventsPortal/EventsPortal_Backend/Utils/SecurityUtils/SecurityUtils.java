package com.ritik.EventsPortal.EventsPortal_Backend.Utils.SecurityUtils;

import com.ritik.EventsPortal.EventsPortal_Backend.Exception.UserNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtils {

    public UserDetails getAuthenticatedUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof UserDetails)) {
            throw new UserNotFoundException("User not found!");
        }
        return (UserDetails) authentication.getPrincipal();
    }

    public void setAuthenticatedUser(Authentication authentication) {
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
