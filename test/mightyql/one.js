// @flow

/* eslint-disable flowtype/no-weak-types */

import test from 'ava';
import sinon from 'sinon';
import {
  one,
  DataIntegrityError,
  NotFoundError
} from '../../src';

test('returns the first row', async (t) => {
  const stub = sinon.stub().returns([
    [
      {
        foo: 1
      }
    ]
  ]);

  const connection: any = {
    query: stub
  };

  const result = await one(connection, 'SELECT foo FROM bar');

  t.deepEqual(result, {
    foo: 1
  });
});

test('throws an error if no rows are returned', async (t) => {
  const stub = sinon.stub().returns([
    []
  ]);

  const connection: any = {
    query: stub
  };

  await t.throws(one(connection, 'SELECT foo FROM bar'), NotFoundError);
});

test('throws an error if more than one row is returned', async (t) => {
  const stub = sinon.stub().returns([
    [
      {
        foo: 1
      },
      {
        foo: 2
      }
    ]
  ]);

  const connection: any = {
    query: stub
  };

  await t.throws(one(connection, 'SELECT foo FROM bar'), DataIntegrityError);
});