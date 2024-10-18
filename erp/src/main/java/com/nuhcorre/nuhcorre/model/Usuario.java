package com.nuhcorre.nuhcorre.model;

import java.util.Collection;
import java.util.List;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="Usuario")
public class Usuario{
  @Id
  @Column(unique = true)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull
  @Size (max = 50)
  private String email;

  private Long idAvatar;

  @NotNull
  @Size(max = 100)
  private String nome;

  @Size (max = 20)
  private String telefone;

  @NotNull
  private Boolean ativo;

  @ToString.Exclude
  @NotNull
  private String senha;

  private Boolean recebeNotificacaoFinanceiro;

}
