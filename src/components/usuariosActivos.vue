<template>
  <div class="table-container animate__animated animate__fadeInDownBig">
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Documento</th>
          <th>Hora de entrada</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="users.length === 0">
          <td colspan="4">
            <i class="bi bi-exclamation-circle-fill"></i> Aun no hay usuarios activos
          </td>
        </tr>
        <tr v-else v-for="user in users" :key="user.id">
          <td class="nombre">{{ user.nombre }}</td>
          <td>{{ user.documento }}</td>
          <td class="entrada">{{ user.horaEntrada }}</td>
          <td>
            <button @click="registerExit(user)">
              <i class="bi bi-box-arrow-left"></i> Registrar salida
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="button-container">
      <router-link to="/admin">
        <button><i class="bi bi-x-lg"></i> Finalizar sesión</button>
      </router-link>
      <router-link to="/bdusuarios">
        <button><i class="bi bi-people-fill"></i> Ver registros</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import db from "../../firebaseConfig";

export default {
  setup() {
    const users = ref([]);

    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      users.value = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((user) => !user.horaSalida);
    };

    onMounted(fetchUsers);

    const registerExit = async (user) => {
      const userRef = doc(db, "users", user.id);
      try {
        await updateDoc(userRef, { horaSalida: new Date().toLocaleString() });
        swal({
          title: "¡Hecho!",
          text: `Salida registrada para ${user.nombre}`,
          icon: "success",
        });
        // Filtrar usuarios nuevamente para eliminar el usuario cuya salida ha sido registrada
        users.value = users.value.filter((u) => u.id !== user.id);
      } catch (error) {
        console.error("Error al registrar la salida:", error);
        alert(
          "Hubo un error al registrar la salida del usuario. Por favor, inténtalo de nuevo."
        );
      }
    };

    return { users, registerExit };
  },
};
</script>
