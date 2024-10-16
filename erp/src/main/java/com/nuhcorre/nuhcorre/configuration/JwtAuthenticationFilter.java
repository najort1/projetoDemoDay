package com.nuhcorre.nuhcorre.configuration;

import java.io.IOException;

import com.nuhcorre.nuhcorre.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtService jwtService;
  private final UserDetailsService userDetailsService;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
          throws ServletException, IOException {

    final String authHeader = request.getHeader("Authorization");
    final String jwt;
    final String email;

    if (request.getMethod().equals(HttpMethod.OPTIONS.name())) {
      filterChain.doFilter(request, response);
      return;
    } else {
        if (request.getRequestURI().startsWith("/auth/authenticate")) {
          filterChain.doFilter(request, response);
          return;
        }else if (request.getRequestURI().startsWith("/usuarios")) {
          filterChain.doFilter(request, response);
          return;
        }

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
           response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid Authorization header.");
              return;
        } else {
          jwt = authHeader.substring(7);
          email = jwtService.extractUsername(jwt);

          if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            if (jwtService.isTokenValid(jwt, userDetails)) {
              UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                      userDetails, null, userDetails.getAuthorities()
              );
              authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
              SecurityContextHolder.getContext().setAuthentication(authToken);

            } else {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token.");
                return;
            }
          }

          filterChain.doFilter(request, response);
            return;
        }
    }

  }
}
