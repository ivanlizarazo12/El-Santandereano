<template>
  <div class="form-container animate__animated animate__fadeInLeft">
    <form
      id="studentForm"
      @submit.prevent="submitForm"
      @keydown="blockEnterKey"
      class="form-card"
    >
      <RouterLink to="/bdusuarios">
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
        <span class="label-title">Nombre</span>
        <input
          type="text"
          id="nombre"
          v-model="nombre"
          required
          class="input"
        />
      </label>
      <br />
      <label class="label">
        <span class="label-title">Documento</span>
        <input
          type="number"
          id="documento"
          v-model="documento"
          required
          class="input"
        />
      </label>

      <button style="margin-bottom: 7px" class="button" type="submit">
        Registrar
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import db from "../../firebaseConfig";

export default {
  setup() {
    const nombre = ref("");
    const documento = ref("");

    const blockEnterKey = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    };

    const submitForm = async () => {
      try {
        // Validar que el número de documento tenga al menos 10 dígitos
        if (documento.value.toString().length < 9) {
          swal({
            title: "¡Vaya!",
            text: "El número de documento debe tener al menos 10 dígitos",
            icon: "warning",
          });
          return;
        }

        // Verificar si el número de documento ya existe en la base de datos
        const q = query(
          collection(db, "empleados"),
          where("documento", "==", documento.value)
        );
        const querySnapshot = await getDocs(q);

        // Si ya existe un usuario con el mismo número de documento, muestra una alerta
        if (!querySnapshot.empty) {
          swal({
            title: "¡Vaya!",
            text: "El número de documento ya existe",
            icon: "warning",
          });
          return;
        }

        // Si el número de documento no existe y tiene al menos 10 dígitos, agregar el nuevo usuario a la base de datos
        const docRef = await addDoc(collection(db, "empleados"), {
          nombre: nombre.value,
          documento: documento.value,
        });
        console.log("Document written with ID: ", docRef.id);
        nombre.value = "";
        documento.value = "";
        // Alerta de registro exitoso
        swal({ title: "¡Hecho!", text: "Registro exitoso", icon: "success" });
      } catch (e) {
        console.error("Error adding document: ", e);
        // Alerta en caso de error
        swal({ title: "¡Vaya!", text: "Algo salió mal", icon: "warning" });
      }
    };

    return { nombre, documento, submitForm, blockEnterKey };
  },
};
</script>
