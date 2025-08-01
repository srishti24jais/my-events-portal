package com.srishti.EventsPortal.EventsPortal_Backend.Controller;

import com.srishti.EventsPortal.EventsPortal_Backend.Dto.AuthDto.LoginRequestDto;
import com.srishti.EventsPortal.EventsPortal_Backend.Dto.AuthDto.LoginResponseDto;
import com.srishti.EventsPortal.EventsPortal_Backend.Dto.AuthDto.PasswordUpdateRequestDto;
import com.srishti.EventsPortal.EventsPortal_Backend.Dto.AuthDto.UserRegistrationRequestDto;
import com.srishti.EventsPortal.EventsPortal_Backend.Model.User;
import com.srishti.EventsPortal.EventsPortal_Backend.Service.AuthService;
import com.srishti.EventsPortal.EventsPortal_Backend.Service.UserService;
import com.srishti.EventsPortal.EventsPortal_Backend.Utils.JwtUtils.JwtUtils;
import com.srishti.EventsPortal.EventsPortal_Backend.Utils.SecurityUtils.SecurityUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController // Marks this class as a REST controller where each method returns a ResponseEntity or JSON response
@RequestMapping("/api/auth") // Base path for all endpoints in this controller
@RequiredArgsConstructor // Lombok will automatically create a constructor for final fields (Dependency Injection)
public class AuthController {

    private final AuthService authService; // JwtUtils class is used to generate and validate JWTs
    private final JwtUtils jwtUtils;
    private final SecurityUtils securityUtils; // SecurityUtils class is used to get the authenticated user's details
    private final AuthenticationManager authenticationManager; // Manages authentication process
    private final UserService userService;


    /*
    ResponseEntity<?>` is a part of the Spring Framework and is used to represent the entire HTTP response,
    including the status code, headers, and body.
    The `<?> is a wildcard that indicates that the body of the response can be of any type.
     */

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegistrationRequestDto userDto){


        // Map fields from UserRegistrationRequestDto to User
        User user = new User();
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setRoles(userDto.getRoles());
        user.setPhone(userDto.getPhone());

        authService.saveUser(user);

        return ResponseEntity.ok("User registered successfully!");
    }

    // Register multiple users (for testing purposes)
    @PostMapping("/registers")
    public ResponseEntity<?> registerUsers( @RequestBody List<UserRegistrationRequestDto> userDtos){

        for(UserRegistrationRequestDto userDto : userDtos){
            User user = new User();
            user.setFirstName(userDto.getFirstName());
            user.setLastName(userDto.getLastName());
            user.setEmail(userDto.getEmail());
            user.setPassword(userDto.getPassword());
            user.setRoles(userDto.getRoles());
            user.setPhone(userDto.getPhone());

            authService.saveUser(user);
        }
        return ResponseEntity.ok("User registered successfully!");
    }


    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequestDto loginRequestDto){
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(), loginRequestDto.getPassword()));
        } catch (AuthenticationException e){
            Map<String, Object> map = new HashMap<>();
            map.put("message", "Bad Credentials");
            map.put("status", false);
            return new ResponseEntity<Object>(map, HttpStatus.NOT_FOUND);
        }

        // Set the authenticated user into the SecurityContext
        securityUtils.setAuthenticatedUser(authentication);

        // Retrieve the authenticated user's details
        UserDetails userDetails = securityUtils.getAuthenticatedUserDetails();

        User user = userService.findByEmail(userDetails.getUsername());

        String jwtToken = jwtUtils.generateTokenFromUsername(userDetails, user.getFirstName(), user.getRoles());

        LoginResponseDto loginResponseDto = new LoginResponseDto(jwtToken);
        return ResponseEntity.ok(loginResponseDto);
    }


    @PutMapping("/update-password")
    public ResponseEntity<?> updatePassword(@Valid @RequestBody PasswordUpdateRequestDto updatePasswordDto){
        if(!updatePasswordDto.getNewPassword().equals(updatePasswordDto.getConfirmPassword())){
            return ResponseEntity.badRequest().body("Passwords do not match!");
        }

        UserDetails userDetails = securityUtils.getAuthenticatedUserDetails();
        String username = userDetails.getUsername();

        authService.updatePassword(username, updatePasswordDto.getOldPassword(), updatePasswordDto.getNewPassword());
        return ResponseEntity.ok("Password updated successfully!");
    }

    //////////////////////////////////// Helper Methods ////////////////////////////////////

}
