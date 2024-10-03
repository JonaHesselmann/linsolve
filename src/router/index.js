/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
*/


import { createRouter, createWebHistory } from 'vue-router'
import Agb from '../view/Agb.vue'
import About from '../view/About.vue'
import GeneralProblemPage from '../view/GeneralProblemPage.vue'
import SpezificProblemPage from '../view/SpezificProblemPage.vue'
import SelectionPage from '../view/SelectionPage.vue'
import Result from '../view/Result.vue'
import Imprint from '../view/Imprint.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'SelectionPage',
      component: SelectionPage,
    },
    {
      path: '/result',
      name: 'Result',
      component: Result,
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
    {
      path: '/imprint',
      name: 'Imprint',
      component: Imprint,
    },

  ]
})

export default router

