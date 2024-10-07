import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const appFrameGuard: CanActivateFn = (route, state) => {
  const allow = false;

  if (allow) {
    return true;
  } else {
    return false;
  }
};
