<template>
  <div class="table-container animate__animated animate__fadeInDownBig">
    <div class="info-container" v-if="empleado">
      <h6
        style="
        text-align: start font-size: 25px;
        color: #000000;
        display: inline-flex;
        align-items: center;
        padding: 0;
        margin-top: -2px;
        width: auto;"
      >
        Informe del empleado: {{ empleado.nombre }}
      </h6>
      <router-link to="/bdusuarios">
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
        @click="deleteAllRegistros"
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
      <br />
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora de entrada</th>
            <th>Hora de salida</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="registro in registros" :key="registro.id">
            <td>{{ registro.fecha }}</td>
            <td>{{ registro.horaEntrada }}</td>
            <td>{{ registro.horaSalida }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-center">
      <div class="spinner-grow text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-grow text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-grow text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-grow text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-grow text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-grow text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import db from "../../firebaseConfig";
import * as XLSX from "xlsx/dist/xlsx.full.min";

const empleado = ref(null);
const registros = ref([]);

const props = defineProps({
  id: String,
});

const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(registros.value);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");
  XLSX.writeFile(workbook, "usuarios.xlsx");

  swal({
          title: "¡Hecho!",
          text: `Se completó la descarga`,
          icon: "success",
          
        });
      

};

const deleteAllRegistros = async () => {
  const confirmDelete = await swal({
    title: "¿Estás seguro?",
    text: "Se eliminarán todos los registros de entrada y salida",
    icon: "warning",
    dangerMode: true,
  });

  if (confirmDelete) {
    try {
      // Obtén una referencia a la colección de registros del empleado
      const registrosRef = collection(db, "empleados", props.id, "registros");

      // Obtén todos los documentos de la colección de registros
      const querySnapshot = await getDocs(registrosRef);

      // Itera sobre los documentos y borra cada uno de ellos
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      // Vacía la lista de registros localmente
      registros.value = [];

      // Muestra una alerta de éxito
      swal({
        title: "¡Hecho!",
        text: "Registros eliminados con éxito",
        icon: "success",
      });
    } catch (error) {
      console.error("Error deleting registros: ", error);
      // Muestra una alerta en caso de error
      swal({
        title: "¡Vaya!",
        text: "Algo salió mal al eliminar los registros",
        icon: "warning",
      });
    }
  }
};

onMounted(async () => {
  const docRef = doc(db, "empleados", props.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    empleado.value = docSnap.data();

    // Obtén los registros de entrada y salida del empleado
    const registrosRef = collection(docRef, "registros");
    const querySnapshot = await getDocs(registrosRef);
    registros.value = querySnapshot.docs.map((doc) => doc.data());
  } else {
    console.log("No such document!");
  }
});
</script>
