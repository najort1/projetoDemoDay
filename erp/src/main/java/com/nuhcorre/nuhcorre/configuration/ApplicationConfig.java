package com.nuhcorre.nuhcorre.configuration;

import com.nuhcorre.nuhcorre.model.DAO.UsuarioSecurityDAO;
import com.nuhcorre.nuhcorre.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {
  
  private final UserRepository userRepository;

  @Bean
  UserDetailsService userDetailsService() {
    UsuarioSecurityDAO usuarioSecurityDAO = new UsuarioSecurityDAO();
    return username -> {
      var user = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("Bad credentials"));
      usuarioSecurityDAO.setId(user.getId());
      usuarioSecurityDAO.setEmail(user.getEmail());
      usuarioSecurityDAO.setSenha(user.getSenha());
      usuarioSecurityDAO.setAtivo(user.getAtivo());
      return usuarioSecurityDAO;
    };

  }

  @Bean
  AuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
    authProvider.setUserDetailsService(userDetailsService());
    authProvider.setPasswordEncoder(passwordEncoder());
    return authProvider;
  }

  @Bean
  AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
    return configuration.getAuthenticationManager();
  }

  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  }




