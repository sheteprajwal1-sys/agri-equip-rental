package com.agriequip.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.agriequip.security.filter.JwtFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
        	
             //required for image + frontend access  
            .cors(Customizer.withDefaults())

            .csrf(csrf -> csrf.disable())
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable())

            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            .authorizeHttpRequests(auth -> auth

                
            	// public access 
                .requestMatchers("/users/login", "/users/register")
                    .permitAll()

                
                .requestMatchers("/uploads/**")
                    .permitAll()

                
                .requestMatchers(HttpMethod.GET, "/equipment/**")
                    .permitAll()

                
                 // admin only access
                .requestMatchers(HttpMethod.POST, "/equipment/**")
                    .hasAuthority("ROLE_ADMIN")

                .requestMatchers(HttpMethod.PUT, "/equipment/**")
                    .hasAuthority("ROLE_ADMIN")

                .requestMatchers(HttpMethod.DELETE, "/equipment/**")
                    .hasAuthority("ROLE_ADMIN")

                .requestMatchers(
                    "/rentals/admin",
                    "/rentals/dashboard-stats"
                ).hasAuthority("ROLE_ADMIN")

                
                .anyRequest().authenticated()
            )

            // JWT Filter
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
