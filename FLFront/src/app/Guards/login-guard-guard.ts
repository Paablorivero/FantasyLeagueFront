import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const loginGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  let isAuth: boolean = false;
  if(localStorage.getItem('token')){
    isAuth = true;
  } else {
    router.createUrlTree(['/daznfantasy/login']); //me da error constantemente con un router.navigate asi que uso esta opcion
  }
  return isAuth;
};
