# CoderHouse

*BackEnd*


> This is a project for the course of BackEnd from the CoderHouse.


# Conclusión 

```ini
Benchmark con console Log

$ npm run test

> desafio-15@1.0.0 test
> node benchmark.js

Running 20s test @ http://localhost:8080/info
100 connections

┌─────────┬────────┬────────┬────────┬────────┬──────────┬─────────┬────────┐
│ Stat    │ 2.5%   │ 50%    │ 97.5%  │ 99%    │ Avg      │ Stdev   │ Max    │
├─────────┼────────┼────────┼────────┼────────┼──────────┼─────────┼────────┤
│ Latency │ 283 ms │ 390 ms │ 673 ms │ 747 ms │ 406.1 ms │ 93.4 ms │ 852 ms │
└─────────┴────────┴────────┴────────┴────────┴──────────┴─────────┴────────┘
┌───────────┬─────────┬─────────┬────────┬────────┬────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%    │ 97.5%  │ Avg    │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼────────┼────────┼────────┼─────────┼─────────┤
│ Req/Sec   │ 139     │ 139     │ 246    │ 310    │ 244.25 │ 42.11   │ 139     │
├───────────┼─────────┼─────────┼────────┼────────┼────────┼─────────┼─────────┤
│ Bytes/Sec │ 66.3 kB │ 66.3 kB │ 117 kB │ 148 kB │ 117 kB │ 20.1 kB │ 66.3 kB │
└───────────┴─────────┴─────────┴────────┴────────┴────────┴─────────┴─────────┘
Req/Bytes counts sampled once per second.
# of samples: 20

5k requests in 20.13s, 2.33 MB read

```

El resultado de Artillery nos indica (ver archivo para resultados completos)

```sh

http.response_time:
  min: ......................................................................... 3
  max: ......................................................................... 102
  median: ...................................................................... 44.3
  p95: ......................................................................... 70.1
  p99: ......................................................................... 85.6

  ```
Sin console log

```sh

$ npm run test

> desafio-15@1.0.0 test
> node benchmark.js

Running 20s test @ http://localhost:8080/info
100 connections


┌─────────┬───────┬───────┬────────┬────────┬──────────┬──────────┬────────┐
│ Stat    │ 2.5%  │ 50%   │ 97.5%  │ 99%    │ Avg      │ Stdev    │ Max    │
├─────────┼───────┼───────┼────────┼────────┼──────────┼──────────┼────────┤
│ Latency │ 47 ms │ 55 ms │ 104 ms │ 120 ms │ 61.92 ms │ 21.49 ms │ 370 ms │
└─────────┴───────┴───────┴────────┴────────┴──────────┴──────────┴────────┘
┌───────────┬────────┬────────┬────────┬────────┬────────┬────────┬────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%    │ 97.5%  │ Avg    │ Stdev  │ Min    │
├───────────┼────────┼────────┼────────┼────────┼────────┼────────┼────────┤
│ Req/Sec   │ 648    │ 648    │ 1719   │ 1988   │ 1601.8 │ 340.86 │ 648    │
├───────────┼────────┼────────┼────────┼────────┼────────┼────────┼────────┤
│ Bytes/Sec │ 308 kB │ 308 kB │ 819 kB │ 947 kB │ 763 kB │ 163 kB │ 308 kB │
└───────────┴────────┴────────┴────────┴────────┴────────┴────────┴────────┘

Req/Bytes counts sampled once per second.
# of samples: 20

32k requests in 20.09s, 15.3 MB read

```

El resultado de Artillery nos indica (ver archivo para resultados completos)

```sh

http.response_time:
  min: ......................................................................... 4
  max: ......................................................................... 146
  median: ...................................................................... 34.1
  p95: ......................................................................... 94.6
  p99: ......................................................................... 144

  ```