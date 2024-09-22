import { createRouter, createWebHistory } from 'vue-router'
import Agb from '../view/Agb.vue'
import About from '../view/About.vue'
import GeneralProblemPage from '../view/generalProblemPage.vue'
import SpezificProblemPage from '../view/spezificProblemPage.vue'
import SelectionPage from '../view/selectionPage.vue'



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