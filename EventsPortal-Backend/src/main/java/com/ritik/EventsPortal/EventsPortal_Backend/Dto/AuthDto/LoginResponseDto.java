package com.ritik.EventsPortal.EventsPortal_Backend.Dto.AuthDto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDto {
    private String JwtToken;

}
