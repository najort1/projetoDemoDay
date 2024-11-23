package com.nuhcorre.nuhcorre.config;

import com.nuhcorre.nuhcorre.model.Usuario;
import com.nuhcorre.nuhcorre.model.details.EmpresaUserDetails; // Adicione esta linha
import com.nuhcorre.nuhcorre.repository.EmpresaRepository;
import com.nuhcorre.nuhcorre.repository.UsuarioRepository;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.nuhcorre.nuhcorre.utils.ValidaCNPJ;
import com.nuhcorre.nuhcorre.utils.ValidaCPF;

import java.util.logging.Logger;

@Configuration
public class ApplicationConfiguration {
    private final UsuarioRepository usuarioRepository;
    private final EmpresaRepository empresaRepository;

    private Logger logger = Logger.getLogger(ApplicationConfiguration.class.getName());

    public ApplicationConfiguration(UsuarioRepository usuarioRepository, EmpresaRepository empresaRepository) {
        this.usuarioRepository = usuarioRepository;
        this.empresaRepository = empresaRepository;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            String tipoUsuario;
            String tipoLogin;

            if (ValidaCPF.isCPF(username)) {
                tipoLogin = "cpf";
                tipoUsuario = "usuario";
            } else if (ValidaCNPJ.isCNPJ(username)) {
                tipoLogin = "cnpj";
                tipoUsuario = "empresa";
            } else {
                tipoLogin = "email";
                tipoUsuario = "usuario";
            }

            if (tipoUsuario.equals("usuario")) {
                if (tipoLogin.equals("cpf")) {
                    return usuarioRepository.findByCpf(username)
                            .orElseThrow(() -> new UsernameNotFoundException("CPF não encontrado"));
                } else {
                    return usuarioRepository.findByEmail(username)
                            .map(usuario -> (UserDetails) usuario)
                            .or(() -> empresaRepository.findByEmail(username).map(EmpresaUserDetails::new))
                            .orElseThrow(() -> new UsernameNotFoundException("Email não encontrado"));
                }
            } else {
                return tipoLogin.equals("cnpj")
                        ? empresaRepository.findByCnpj(username)
                        .map(EmpresaUserDetails::new)
                        .orElseThrow(() -> new UsernameNotFoundException("CNPJ não encontrado"))
                        : empresaRepository.findByEmail(username)
                        .map(EmpresaUserDetails::new)
                        .orElseThrow(() -> new UsernameNotFoundException("Email não encontrado"));
            }
        };
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .addSecurityItem(new SecurityRequirement().addList("bearer-jwt"))
                .components(new Components().addSecuritySchemes("bearer-jwt", createApiKeyScheme()));
    }

    private io.swagger.v3.oas.models.security.SecurityScheme createApiKeyScheme() {
        return new io.swagger.v3.oas.models.security.SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT");
    }

}