package com.nuhcorre.nuhcorre.config;

import com.nuhcorre.nuhcorre.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final HandlerExceptionResolver handlerExceptionResolver;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final UserDetailsService empresaDetailsService;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            UserDetailsService userDetailsService,
            UserDetailsService empresaDetailsService,
            HandlerExceptionResolver handlerExceptionResolver
    ) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.empresaDetailsService = empresaDetailsService;
        this.handlerExceptionResolver = handlerExceptionResolver;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");

        if (isInvalidAuthHeader(authHeader)) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            final String jwt = extractJwt(authHeader);
            final String userEmail = jwtService.extractUsername(jwt);

            if (userEmail != null && isAuthenticationNull()) {
                UserDetails userDetails = loadUserDetails(userEmail);
                authenticateUser(request, jwt, userDetails);
            }

            filterChain.doFilter(request, response);
        } catch (Exception exception) {
            handlerExceptionResolver.resolveException(request, response, null, exception);
        }
    }

    private boolean isInvalidAuthHeader(String authHeader) {
        return authHeader == null || !authHeader.startsWith("Bearer ");
    }

    private String extractJwt(String authHeader) {
        return authHeader.substring(7);
    }

    private boolean isAuthenticationNull() {
        return SecurityContextHolder.getContext().getAuthentication() == null;
    }

    private UserDetails loadUserDetails(String userEmail) {
        return userEmail.contains("@")
                ? userDetailsService.loadUserByUsername(userEmail)
                : empresaDetailsService.loadUserByUsername(userEmail);
    }

    private void authenticateUser(HttpServletRequest request, String jwt, UserDetails userDetails) {
        if (jwtService.isTokenValid(jwt, userDetails)) {
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
            );

            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
    }
}
