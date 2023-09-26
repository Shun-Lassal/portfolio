export default defineNuxtRouteMiddleware((to, from) => {

  const token = localStorage.getItem('jwtToken');

  const passportRoutes = ['login', 'api/login', 'api/register'];
  
  

})
