import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeApiBaseUrl } from '../src/js/api/url.js';

test('normaliza el origen y elimina barra final', () => {  
  assert.equal(    
    normalizeApiBaseUrl(' http://127.0.0.1:5000/api/v1/ '),    
    'http://127.0.0.1:5000/api/v1',  
  );
});

test('admite HTTPS en una API externa', () => {  
  assert.equal(normalizeApiBaseUrl('https://api.example.org/api/v1'),    
  'https://api.example.org/api/v1');
});

test('rechaza valor vacio', () => {  
  assert.throws(() => normalizeApiBaseUrl(''), /obligatoria/);
});

test('rechaza esquemas distintos de HTTP', () => {  
  assert.throws(() => normalizeApiBaseUrl('file:///tmp/api/v1'), /HTTP/);
});

test('rechaza texto sin URL absoluta', () => {  
  assert.throws(() => normalizeApiBaseUrl('api-invalida'), /URL valida/);
});

test('rechaza un prefijo diferente al contrato', () => {  
  assert.throws(() => normalizeApiBaseUrl('http://127.0.0.1:5000/api/v2'),    
  /api\/v1/);
});

test('rechaza credenciales y parametros en URL', () => {  
  assert.throws(() => normalizeApiBaseUrl('http://u:p@127.0.0.1/api/v1'),    
  /credenciales/);  
  assert.throws(() => normalizeApiBaseUrl('https://api.example.org/api/v1?x=1'),    
  /credenciales/);
});