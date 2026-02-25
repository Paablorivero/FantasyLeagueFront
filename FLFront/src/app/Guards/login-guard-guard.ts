import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const loginGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  let isAuth: boolean = false;
  if(localStorage.getItem('token')){
    isAuth = true;
  } else {
    router.navigate(['/daznfantasy']);
  }
  return isAuth;
};
