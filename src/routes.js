import { createRouter, createWebHistory } from 'vue-router';
import bdusuarios from './components/usuariosRegistrados.vue'
import registrar from './components/registroUsuario.vue'
import activos from './components/usuariosActivos.vue'
import admin from './components/userAdmin.vue'
import inicio from './components/inicioEmpleados.vue'
import registrarEntrada from './components/Registros/registrarEntrada.vue'
import registrarSalida from './components/Registros/registrarSalida.vue'
import informeEmpleado from './components/informeEmpleado.vue'

const routes = [
  { path: '/', name: 'inicio', component: inicio },
  { path: '/entrada', name: 'registrarEntrada', component: registrarEntrada },
  { path: '/salida', name: 'registrarSalida', component: registrarSalida },
  { path: '/bdusuarios', name: 'bdusuarios', component: bdusuarios },
  { path: '/registrar', name: 'registrar', component: registrar },
  { path: '/activos', name: 'activos', component: activos },
  { path: '/admin', name: 'admin', component: admin },
  { path: '/informeEmpleado/:id', name: 'informeEmpleado', component: informeEmpleado, props: true },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;