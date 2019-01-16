# mock-rest
Customizable mock REST web service.

The following command runs the container and exposes the REST mock web service to host port `8080`.

```
$ docker run -p 8080:8080 -v ./mock-rest-config.json:/home/node/app/config/mock-rest-config.json sidneibjunior/mock-rest:latest
```

The web service endpoints can be configured through a json file mapped to `/home/node/app/config/mock-rest-config.json` container's file.

The following properties can be set up for each endpoint:
- `path`: The endpoint path. Path variables can be defined using `:` prefix, like in `:id`
- `method`: HTTP method (`post`, `get`, `put`, `delete`, etc)
- `responseBody`: JSON string containing the response body (optional)

```
{
    "endpoints": [
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
}
```