import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthServiceService} from '../Services/auth-service.service';

export const backinterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthServiceService);

  const token = localStorage.getItem('token');

  console.log(token);

  if(!token || req.url.includes('login') || req.url.includes('register')) {
    return next(req);
  }

  const cloneRequest= req.clone({
    setHeaders:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });

  return next(cloneRequest);
};
