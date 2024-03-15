<template>
  <div class="form-container animate__animated animate__fadeInLeft">
    <form
      class="form-card"
      @submit.prevent="registerEntry"
      @keydown="blockEnterKey"
    >
      <RouterLink to="/">
        <button class="back-button">
          <i class="bi bi-arrow-left-circle-fill"></i>
        </button>
      </RouterLink>
      <div class="form-group">
        <!--  -->
        <label class="label">
          <span class="label-title">Registra tu entrada</span>
          <input
            id="documento"
            v-model="documento"
            class="input"
            placeholder="Escribe tu número de documento..."
            type="number"
            required
          />
        </label>
        <!--  -->
      </div>
      <button class="button" type="submit">Confirmar</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import db from "../../../firebaseConfig";

export default {
  setup() {
    const documento = ref("");

    const blockEnterKey = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    };

    const registerEntry = async () => {
      const querySnapshot = await getDocs(collection(db, "empleados"));
      const user = querySnapshot.docs.find(
        (doc) => doc.data().documento === documento.value
      );

      if (user) {
        const userRef = doc(db, "empleados", user.id);
        const registrosRef = collection(userRef, "registros");
        const now = new Date();
        await addDoc(registrosRef, {
          fecha: now.toLocaleDateString(),
          horaEntrada: now.toLocaleTimeString(),
        });
        swal({ title: "¡Hecho!", text: "Entrada registrada", icon: "success" });
      } else {
        swal({
          title: "¡Vaya!",
          text: "No se encontró un empleado con ese número de documento",
          icon: "warning",
        });
      }

      documento.value = "";
    };

    return { documento, registerEntry, blockEnterKey };
  },
};
</script>
