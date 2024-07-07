package com.unnamedproject.backend.mappers;

import com.unnamedproject.backend.dtos.SignUpDto;
import com.unnamedproject.backend.dtos.UserDto;
import com.unnamedproject.backend.entites.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto signUpDto);

}
