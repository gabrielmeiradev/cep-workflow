// __tests__/compare.test.js

const axios = require('axios');

const testCep = "01001000";

describe('Comparing the time taken by fetch and axios for /cep/:cep endpoint', () => {

  it('should compare fetch and axios performance', async () => {
    const fetchStartTime = performance.now();
    const fetchResponse = await fetch(`http://localhost:8000/cep/${testCep}`);
    const fetchEndTime = performance.now();
    const fetchDuration = fetchEndTime - fetchStartTime;

    const axiosStartTime = performance.now();
    const axiosResponse = await axios.get(`http://localhost:8000/cep/${testCep}`);
    const axiosEndTime = performance.now();
    const axiosDuration = axiosEndTime - axiosStartTime;

    console.log(`Fetch duration: ${fetchDuration}ms`);
    console.log(`Axios duration: ${axiosDuration}ms`);

    expect(fetchResponse.status).toBe(200);
    expect(axiosResponse.status).toBe(200);

    console.log(`Fetch took ${fetchDuration}ms`);
    console.log(`Axios took ${axiosDuration}ms`);

    expect(Math.abs(fetchDuration - axiosDuration)).toBeLessThan(1000); // Threshold of 1000ms for performance difference
  });

});
