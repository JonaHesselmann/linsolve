import { createRouter, createWebHistory } from 'vue-router'
import Agb from '../view/Agb.vue'
import About from '../view/About.vue'
import GeneralProblemPage from '../view/GeneralProblemPage.vue'
import SpezificProblemPage from '../view/SpezificProblemPage.vue'
import SelectionPage from '../view/SelectionPage.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'SelectionPage',
      component: SelectionPage,
    },
    {
      path: '/spezifischesProblem',
      name: 'SpecificProblemPage',
      component: SpezificProblemPage,
    },
    {
      path: '/allgemeinesProblem',
      name: 'GernalProblemPage',
      component: GeneralProblemPage,
    },
    {
      path: '/agb',
      name: 'Agb',
      component: Agb,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },

  ]
})

export default router