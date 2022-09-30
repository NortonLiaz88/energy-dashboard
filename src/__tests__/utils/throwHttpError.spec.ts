/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { HttpError } from '../../models/HttpErrors';
import { throwHttpError } from '../../utils/throwHttpError';

jest.mock('axios', () => {
  const restOfAxios = jest.requireActual('axios');
  return {
    ...restOfAxios,
    isAxiosError(err: any) {
      return true;
    },
  };
});

describe('ThrowHttpError', () => {
  it('should throw bad request', () => {
    try {
      const error = { response: { status: 400 } };
      throwHttpError(error);
    } catch (err) {
      expect(err).toEqual(HttpError.badRequest);
    }
  });

  it('should throw unauthorized', () => {
    try {
      const error = { response: { status: 401 } };
      throwHttpError(error);
    } catch (err) {
      expect(err).toEqual(HttpError.unauthorized);
    }
  });

  it('should throw forbidden', () => {
    try {
      const error = { response: { status: 403 } };
      throwHttpError(error);
    } catch (err) {
      expect(err).toEqual(HttpError.forbidden);
    }
  });

  it('should throw not found', () => {
    try {
      const error = { response: { status: 404 } };
      throwHttpError(error);
    } catch (err) {
      expect(err).toEqual(HttpError.notFound);
    }
  });

  it('should throw conflict', () => {
    try {
      const error = { response: { status: 409 } };
      throwHttpError(error);
    } catch (err) {
      expect(err).toEqual(HttpError.conflitc);
    }
  });

  it('should throw invalid format', () => {
    try {
      const error = { response: { status: 413 } };
      throwHttpError(error);
    } catch (err) {
      expect(err).toEqual(HttpError.invalidFormat);
    }
  });

  it('should throw exceeds file size', () => {
    try {
      const error = { response: { status: 415 } };
      throwHttpError(error);
    } catch (err) {
      expect(err).toEqual(HttpError.exceedsFileSize);
    }
  });

  it('should throw unprocessable entity', () => {
    try {
      const error = { response: { status: 422 } };
      throwHttpError(error);
    } catch (err) {
      expect(err).toEqual(HttpError.unprocessableEntity);
    }
  });

  it('should throw geolocation error', () => {
    try {
      const error = { response: { status: 427 } };
      throwHttpError(error);
    } catch (err) {
      expect(err).toEqual(HttpError.geolocationError);
    }
  });

  it('should throw server error', () => {
    try {
      const error = { response: { status: 500 } };
      throwHttpError(error);
    } catch (err) {
      expect(err).toEqual(HttpError.serverError);
    }
  });

  it('should throw server error of no axios error', () => {
    jest.clearAllMocks();
    jest.mock('axios', () => {
      const restOfAxios = jest.requireActual('axios');
      return {
        ...restOfAxios,
        isAxiosError(err: any) {
          return false;
        },
      };
    });

    try {
      const error = { axiosError: false };
      throwHttpError(error);
    } catch (err) {
      expect(err).toEqual(HttpError.serverError);
    }
  });
});
