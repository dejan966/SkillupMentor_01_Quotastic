import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { user, params } = context.switchToHttp().getRequest()
/*     const req = context.switchToHttp().getRequest()
    for (const iterator of req.user.quotes){
      if (iterator.id == req.user.id) return true
    } */
    for (const iterator of user.quotes) {
      if (iterator.id == params.id) return true
    }
    return false
  }
}