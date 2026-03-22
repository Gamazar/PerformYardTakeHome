import { Request, Response } from 'express';
import * as artistService from '../service/artistService';
import { search, addArtist } from '../controller/artistController';

const mockReq = (overrides: Partial<Request> = {}): Request =>
  ({ query: {}, body: {}, ...overrides } as unknown as Request);

const mockRes = (): jest.Mocked<Response> => {
  const res = {} as jest.Mocked<Response>;
  res.status = jest.fn().mockReturnValue(res);
  res.json   = jest.fn().mockReturnValue(res);
  res.send   = jest.fn().mockReturnValue(res);
  return res;
};
describe('search() controller', () => {
  test('returns 400 when search param is missing', () => {
    const res = mockRes();
    search(mockReq({ query: {} }), res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Search string is needed' });
  });

  test('calls service and returns results when query is valid', () => {
    const mockResults = [{ name: 'Eddy Verde', score: 6, matches: ['name', 'artists'] }];
    jest.spyOn(artistService, 'search').mockReturnValue(mockResults);

    const res = mockRes();
    search(mockReq({ query: { search: 'ed' } }), res);

    expect(artistService.search).toHaveBeenCalledWith('ed');
    expect(res.json).toHaveBeenCalledWith(mockResults);
  });
});
describe('addArtist() controller', () => {
  test('returns 400 when genre is missing', () => {
    const res = mockRes();
    addArtist(mockReq({ body: { artist: 'Beethoven' } }), res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid genre, please check genre if empty' });
  });

  test('returns 400 when genre is empty string', () => {
    const res = mockRes();
    addArtist(mockReq({ body: { genre: '  ', artist: 'Beethoven' } }), res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('returns 400 when artist is missing', () => {
    const res = mockRes();
    addArtist(mockReq({ body: { genre: 'Classical' } }), res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid artist, please check artist name' });
  });

  test('returns 204 and calls service when valid', () => {
    jest.spyOn(artistService, 'addArtist').mockImplementation(() => {});

    const res = mockRes();
    addArtist(mockReq({ body: { genre: 'Classical', artist: 'Beethoven' } }), res);

    expect(artistService.addArtist).toHaveBeenCalledWith('Classical', 'Beethoven');
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});
