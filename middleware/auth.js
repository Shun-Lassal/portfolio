export default defineNuxtRouteMiddleware((to, from) => {

  const token = localStorage.getItem('jwtToken');

  if(!token)
  {
    useStorage()
  }

})