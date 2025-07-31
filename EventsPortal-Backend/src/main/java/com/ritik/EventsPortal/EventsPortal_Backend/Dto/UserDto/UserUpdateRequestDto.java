package com.ritik.EventsPortal.EventsPortal_Backend.Dto.UserDto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class UserUpdateRequestDto {
    @NotEmpty(message = "First name is required")
    private String firstName;

    @NotEmpty(message = "Last name is required")
    private String lastName;

    private String phone;
}
