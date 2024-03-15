export enum ErrorService {
  Instaling,
  Quizizz,
  Testportal,
  GoogleForms,
}

export class InvalidCredentialsException extends Error {
  constructor(service: ErrorService) {
    super(`Invalid login credentials for ${ErrorService[service]}`);
  }
}

export class ExternalServiceException extends Error {
  constructor(service: ErrorService) {
    super(`An error occurred on the ${ErrorService[service]} server`);
  }
}

export class SessionExpiredException extends Error {
  constructor(service: ErrorService) {
    super(`Session expired on ${ErrorService[service]}`);
  }
}
