<template>
  <div class="form-container animate__animated animate__fadeInLeft">
    <form
      v-if="!isLoggedIn"
      @submit.prevent="login"
      @keydown="blockEnterKey"
      class="form-card"
    >
      <RouterLink to="/">
        <button class="back-button">
          <i class="bi bi-arrow-left-circle-fill"></i>
        </button>
      </RouterLink>
      <h5 class="title">
        <img
          class="logo"
          src="https://i.ibb.co/gWjNNLt/LOGO-removebg-preview.png"
          alt=""
        />
        <hr />
      </h5>
      <br />
      <label class="label">
        <span class="label-title">Correo</span>
        <input
          class="input"
          type="text"
          v-model="email"
          placeholder="Correo"
          required
        />
      </label>
      <br />
      <label class="label">
        <span class="label-title">Contraseña</span>
        <input
          class="input"
          type="password"
          v-model="password"
          placeholder="Contraseña"
          required
        />
      </label>

      <button style="margin-bottom: 7px" class="button" type="submit">
        Entrar
      </button>
    </form>
    <div class="form-card" v-if="isLoggedIn">
      <RouterLink to="/">
        <button class="back-button">
          <i class="bi bi-arrow-left-circle-fill"></i>
        </button>
      </RouterLink>
      <h5 class="title">
        <img
          class="logo"
          src="https://i.ibb.co/gWjNNLt/LOGO-removebg-preview.png"
          alt=""
        />
        <hr />
      </h5>
      <ul class="example-2">
        <RouterLink to="/bdusuarios">
          <li class="icon-content">
            <a data-social="opciones">
              <div class="filled"></div>
              <i class="bi bi-people icon"></i>
            </a>
            <div class="tooltip">Empleados</div>
          </li>
        </RouterLink>

        <RouterLink to="/registrar">
          <li class="icon-content">
            <a data-social="opciones">
              <div class="filled"></div>
              <i class="bi bi-person-plus icon"></i>
            </a>
            <div class="tooltip">Nuevo</div>
          </li>
        </RouterLink>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const isLoggedIn = ref(false);

    const router = useRouter();

    const blockEnterKey = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    };

    const login = async () => {
      const auth = getAuth();
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        if (userCredential.user.email === "relsantandereano@gmail.com") {
          // Alerta de inicio de sesión exitoso
          swal({
            title: "¡Verificado!",
            text: "Bienvenido admin",
            icon: "success",
          });

          // Redireccionar al usuario a la ruta /bdusuarios
          router.push("/bdusuarios");
        } else {
          // Alerta de usuario no autorizado
          swal({
            title: "¡Vaya!",
            text: "El usuario no está autorizado",
            icon: "warning",
          });
        }
      } catch (error) {
        console.error(error);
        // Alerta en caso de error
        swal({
          title: "¡Error!",
          text: "El usuario no está autorizado",
          icon: "warning",
        });
      }
    };

    return { email, password, isLoggedIn, login, blockEnterKey };
  },
};
</script>
