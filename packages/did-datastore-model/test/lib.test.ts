/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { model } from '../src'

test('DID DataStore model', () => {
  expect(model).toEqual({
    schemas: {
      Definition: expect.any(Object),
      IdentityIndex: expect.any(Object),
    },
    definitions: {},
    tiles: {},
  })
})
