import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Home from '@/components/Home'
import Gene from '@/components/Gene'
import GeneD from '@/components/GeneD'
import Genotype from '@/components/Genotype'
import Product from '@/components/Product'
import PanelC from '@/components/PanelC'
import Variation from '@/components/Variation'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/gene',
      name: 'gene',
      component: Gene
    },
    {
      path: '/geneD',
      name: 'geneD',
      component: GeneD
    },
    {
      path: '/genotype',
      name: 'genotype',
      component: Genotype
    },
    {
      path: '/variation',
      name: 'variation',
      component: Variation
    },
    {
      path: '/product',
      name: 'product',
      component: Product
    },
    {
      path: '/panelC',
      name: 'panelC',
      component: PanelC
    },
  ]
})
