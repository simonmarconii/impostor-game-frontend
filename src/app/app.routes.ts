import { CanActivateFn, RedirectCommand, Router, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ChangeUsername } from './pages/change-username/change-username';
import { inject } from '@angular/core';
import { User } from './service/user';
import { Impostor } from './pages/impostor/impostor';

/**
 * Guardia para verificar si el usuario tiene un nombre establecido
 * @param route 
 * @param state 
 * @returns 
 */
export const needNameGuard: CanActivateFn = (route, state) => {
  const userService = inject(User);
  const router = inject(Router);
  // Si el usuario tiene nombre, permitir el acceso
  if (userService.username()) return true;
  // Si no tiene nombre, redirigir a cambiar-nombre
  const url = router.parseUrl('/change-username');
  return new RedirectCommand(url, {skipLocationChange: true});
};

export const routes: Routes = [
    {
        path: '',
        component: Home,
        canActivate: [needNameGuard]
    },
    {
        path: 'impostor/:id',
        component: Impostor,
        canActivate: [needNameGuard]
    },
    {
        path: 'change-username',
        component: ChangeUsername
    }
];
