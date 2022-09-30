/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { HttpError } from '../models/HttpErrors';

function throwHttpError<Type>(err: any): Type {
  if (axios.isAxiosError(err)) {
    switch (err.response?.status) {
      case 400:
        throw HttpError.badRequest;
      case 401:
        throw HttpError.unauthorized;
      case 403:
        throw HttpError.forbidden;
      case 404:
        throw HttpError.notFound;
      case 409:
        throw HttpError.conflitc;
      case 413:
        throw HttpError.invalidFormat;
      case 415:
        throw HttpError.exceedsFileSize;
      case 422:
        throw HttpError.unprocessableEntity;
      case 427:
        throw HttpError.geolocationError;
      default:
        throw HttpError.serverError;
    }
  } else {
    throw HttpError.serverError;
  }
}

export { throwHttpError };
