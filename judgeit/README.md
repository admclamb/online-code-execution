## Judgeit

Judgeit is an online code execution system built to run untrusted and possibly malicious code.

#### Installation

- Install Docker https://www.docker.com/get-started
- `git clone https://github.com/admclamb/online-code-execution`
- `cd judgeit/docker`
- `./build`

#### Execute Endpoint

`POST http://localhost:3000/execute`
This endpoint requests execution of some arbitrary code.

```json
{
  "language": "node",
  "source": "console.log('testing')"
}
```

A typical response upon successful execution will contain `ran` and `output`.

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "ran": true,
    "output": "testing\n"
}
```
