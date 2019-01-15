# mock-rest
Customizable mock REST web service.

The following command runs the container and exposes the REST mock web service to host port `8080`.

```
$ docker run -p 8080:8080 -v ./endpoints.json:/home/node/app/config/endpoints.json sidneibjunior/mock-rest:latest
```

The web service endpoints can be configured through a json file mapped to `/home/node/app/config/endpoints.json` container's file.

The following properties can be seted up for each endpoint:
- `path`: The endpoint path
- `method`: HTTP method (`post`, `get`, `put`, `delete`, etc)
- `responseBody`: JSON string containing the response body (optional)

```
[
    {
        "path": "/api/comments/:id",
        "method": "get",
        "responseBody": "{\"message\":\"My comment message\"}"
    },
    {
        "path": "/api/comments",
        "method": "post",
        "responseBody": "{\"message\":\"My comment message\"}"
    }
]
```