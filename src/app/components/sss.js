import Home from './components/home.vue'

const routers = [
  {
    path: '/home',
    name: 'home',
    component: Home
  }，
  {
    path: '/',
    component: Home
  }，
]
export default routers