<template>
  <div class="form-container animate__animated animate__fadeInLeft">
    <form class="form-card">
      <h5 class="title">
        <img
          class="logo"
          src="https://i.ibb.co/gWjNNLt/LOGO-removebg-preview.png"
          alt=""
        />
        <hr />
      </h5>

      <ul class="example-2">
        <RouterLink to="/entrada">
          <li class="icon-content">
            <a data-social="opciones">
              <div class="filled"></div>
              <i class="bi bi-person-up icon"></i>
            </a>
            <div class="tooltip">Entrada</div>
          </li>
        </RouterLink>

        <RouterLink to="/salida">
          <li class="icon-content">
            <a data-social="opciones">
              <div class="filled"></div>
              <i class="bi bi-person-down icon"></i>
            </a>
            <div class="tooltip">Salida</div>
          </li>
        </RouterLink>

        <RouterLink to="/admin">
          <li class="icon-content">
            <a data-social="opciones">
              <div class="filled"></div>
              <i class="bi bi-person-gear icon"></i>
            </a>
            <div class="tooltip">Admin</div>
          </li>
        </RouterLink>
      </ul>
    </form>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
