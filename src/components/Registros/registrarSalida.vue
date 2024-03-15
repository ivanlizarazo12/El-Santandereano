<template>
  <div class="form-container animate__animated animate__fadeInLeft">
    <form
      class="form-card"
      @submit.prevent="registerExit"
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
          <span class="label-title">Registra tu salida</span>
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

    const registerExit = async () => {
      const querySnapshot = await getDocs(collection(db, "empleados"));
      const user = querySnapshot.docs.find(
        (doc) => doc.data().documento === documento.value
      );

      if (user) {
        const userRef = doc(db, "empleados", user.id);
        const registrosRef = collection(userRef, "registros");
        const now = new Date();
        const today = now.toLocaleDateString();

        // Busca un registro existente para el día actual
        const registroSnapshot = await getDocs(registrosRef);
        const registroHoy = registroSnapshot.docs.find(
          (doc) => doc.data().fecha === today
        );

        if (registroHoy) {
          // Si existe un registro para el día actual, actualiza la hora de salida
          const registroRef = doc(registrosRef, registroHoy.id);
          await updateDoc(registroRef, {
            horaSalida: now.toLocaleTimeString(),
          });
        } else {
          // Si no existe un registro para el día actual, crea uno nuevo
          await addDoc(registrosRef, {
            fecha: today,
            horaSalida: now.toLocaleTimeString(),
          });
        }

        swal({ title: "¡Hecho!", text: "Salida registrada", icon: "success" });
      } else {
        swal({
          title: "¡Vaya!",
          text: "No se encontró un empleado con ese número de documento",
          icon: "warning",
        });
      }

      documento.value = "";
    };

    return { documento, registerExit, blockEnterKey };
  },
};
</script>
