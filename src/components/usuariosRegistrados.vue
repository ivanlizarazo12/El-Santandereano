<template>
  <div class="table-container animate__animated animate__fadeInDownBig">
    <h5 class="nus">
      <i class="bi bi-person-check"></i>
      <span class="users-length">{{ users.length }}</span>
    </h5>

    <router-link to="/admin">
      <i
        style="
          margin-left: 20px;
          margin-top: -5px;
          font-size: 25px;
          cursor: pointer;
          float: right;
          color: #ed1b24;
        "
        class="bi bi-x-circle-fill"
      ></i>

      <div
        style="
          margin-top: 0px;
          float: right;
          margin-right: -10px;
          height: 25px;
          border-left: 1px solid #0000001b;
        "
      ></div>
    </router-link>
    <i
      @click="exportToExcel"
      style="
        margin-left: 10px;
        margin-top: -5px;
        font-size: 25px;
        cursor: pointer;
        float: right;
      "
      class="bi bi-filetype-xlsx"
    ></i>
    <i
      @click="deleteAllUsers"
      style="
        margin-left: 10px;
        margin-top: -5px;
        margin-bottom: 5px;
        font-size: 26px;
        cursor: pointer;
        float: right;
      "
      class="bi bi-database-x"
    ></i>
    <RouterLink class="link" to="/registrar">
      <i
        style="
          margin-left: 10px;
          margin-top: -5px;
          font-size: 26px;
          cursor: pointer;
          float: right;
        "
        class="bi bi-person-add"
      ></i>
    </RouterLink>

    <!-- INICIO TABLA -->

    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Documento</th>
          <th>Informe</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="users.length === 0">
          <td colspan="5">
            <i class="bi bi-exclamation-circle-fill"></i> Aun no hay usuarios
            registrados
          </td>
        </tr>
        <tr v-else v-for="user in users" :key="user.id">
          <td class="nombre">{{ user.nombre }}</td>
          <td>{{ user.documento }}</td>
        
          <td>
            <router-link
              :to="{ name: 'informeEmpleado', params: { id: user.id } }"
            >
              <button style="margin-top: 0px" class="button">Detalles</button>
            </router-link>
          </td>

          <td>
            <button
              style="margin-top: 0px"
              class="button"
              @click="deleteUser(user)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- FIN TABLA -->

    <!-- <div class="button-container">
      <router-link to="/admin">
        <button style="margin-top: 0px" class="button">Finalizar sesión</button>
      </router-link>
    </div> -->
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import db from "../../firebaseConfig";
import * as XLSX from "xlsx/dist/xlsx.full.min";

export default {
  setup() {
    const users = ref([]);

    onMounted(async () => {
      const querySnapshot = await getDocs(collection(db, "empleados")); // Cambiado a 'empleados'
      users.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });

    const exportToExcel = () => {
      const worksheet = XLSX.utils.json_to_sheet(users.value);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");
      XLSX.writeFile(workbook, "usuarios.xlsx");

      swal({
          title: "¡Hecho!",
          text: `Se completó la descarga`,
          icon: "success",
          
        });
    
    };

    const deleteUser = async (user) => {
      try {
        await deleteDoc(doc(db, "empleados", user.id));
        swal({
          title: "¡Hecho!",
          text: `Se completó correctamente.`,
          icon: "success",
          
        });

        const index = users.value.findIndex((u) => u.id === user.id);
        if (index !== -1) {
          users.value.splice(index, 1);
        }
      } catch (error) {
        console.error("Error al eliminar el usuario: ", error);
      }
    };

    const deleteAllUsers = async () => {
      const confirmDelete = await swal({
        title: "¿Estás seguro?",
        text: "Se eliminarán todos los empleados",
        icon: "warning",
        dangerMode: true,
      });

      if (confirmDelete) {
        // Crear una copia de la lista de usuarios
        const usersCopy = [...users.value];

        // Iterar sobre la copia y eliminar los usuarios
        for (const user of usersCopy) {
          await deleteUser(user);
        }
      }
    };

    return { users, exportToExcel, deleteUser, deleteAllUsers };
  },
};
</script>
