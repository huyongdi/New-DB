import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Home from '@/components/Home'
import Gene from '@/components/Gene'
import GeneD from '@/components/GeneD'
import OMIMD from '@/components/OMIMD'
import Genotype from '@/components/Genotype'
import Product from '@/components/Product'
import PanelC from '@/components/PanelC'
import Variation from '@/components/Variation'
import VariationD from '@/components/VariationD'


import Test from '@/components/Test'

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
      path: '/oMIMD',
      name: 'oMIMD',
      component: OMIMD
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
      path: '/variationD',
      name: 'variationD',
      component: VariationD
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
    {
      path: '/test',
      name: 'test',
      component: Test
    },
  ]
})
